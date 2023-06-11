import { createClient, PhotosWithTotalResults } from 'pexels';
import { debounce } from 'advanced-throttle-debounce';
import { Photo } from 'pexels';

const REACT_APP_PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY
const client = createClient(REACT_APP_PEXELS_API_KEY!);

const searchAtPexels = debounce(client.photos.search, { 
  wait: 10000, 
  leading: true, 
  trailing: false
});

const PER_PAGE = 10;

class SearchManager {
  private lastPage: number;
  private searchQuery: string;
  private defaultQuery: string;
  private endReached: boolean;
  public isSearching: boolean;

  constructor(defaultQuery: string = 'people') {
    this.defaultQuery = defaultQuery;

    this.lastPage = 0;
    this.searchQuery = this.defaultQuery;
    this.endReached = false;
    this.isSearching = false;
  }

  public getRandomPhotoOfCategory = debounce(async (category: string, onlyLandscape : boolean = false) : Promise<Photo> => {
    console.log(`Searching for random photo of category "${category}"`);
    // let res1 = await searchAtPexels({ query: category, per_page: 1, page: 1 });
    // let totalPhotos = (res1 as PhotosWithTotalResults).total_results;
    let totalPhotos = 1000;
    let foundImage
    let gotError = false;
    let landscapeFound = false;
    do {
      const PER_PAGE = 5;
      let randomPage = Math.floor(Math.random() * totalPhotos / PER_PAGE) + 1;
      try {
        let res2 = await searchAtPexels({ query: category, per_page: PER_PAGE, page: randomPage });
        foundImage = (res2 as PhotosWithTotalResults).photos.find((photo) => photo.height < photo.width);
        landscapeFound = foundImage !== undefined;
      } catch (error) {
        gotError = true;
        console.log(error);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      if (onlyLandscape && !landscapeFound) {
        console.log('Found only portrait images, trying again');
      }
    } while (gotError || (onlyLandscape && !landscapeFound));
    
    return foundImage!;
  }, {leading: true, trailing: false, wait: 100});

  public searchNextPage = debounce(async (query: string | undefined, startFromRandomPage: boolean = false) : Promise<Photo[]> => {
    if (!query) {
      query = this.defaultQuery;
    }

    if (query !== this.searchQuery) {
      this.reset();
      this.searchQuery = query;
    }
    
    if (this.endReached) {
      return [];
    }

    if (startFromRandomPage && this.lastPage !== 0) {
      console.warn('Cannot start from random page if already have started searching for current query');
      startFromRandomPage = false;
    }

    if (startFromRandomPage) {
      this.lastPage = Math.floor(Math.random() * 100 / PER_PAGE) + 1;
    }

    if (this.isSearching) {
      return [];
    }
    this.isSearching = true;

    let pageToLoad = this.lastPage + 1;
    let res = await searchAtPexels({ query: this.searchQuery, per_page: PER_PAGE, page: pageToLoad })
      .finally(() => this.isSearching = false);
    let foundImages = (res as PhotosWithTotalResults).photos;
    this.endReached = foundImages.length < PER_PAGE;
    if (startFromRandomPage) {
      this.lastPage = 1;
    } else {
      this.lastPage = pageToLoad;
    }

    return foundImages;
  }, {leading: true, trailing: false, wait: 100});

  public getQuery() {
    return this.searchQuery;
  }

  public reset() {
    this.lastPage = 0;
    this.searchQuery = this.defaultQuery;
    this.endReached = false;
    this.isSearching = false;
  }
}

export default SearchManager
