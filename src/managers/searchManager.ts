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
  private isSearching: boolean;

  constructor(defaultQuery: string = 'people') {
    this.defaultQuery = defaultQuery;

    this.lastPage = 0;
    this.searchQuery = this.defaultQuery;
    this.endReached = false;
    this.isSearching = false;
  }

  public getRandomPhotoOfCategory = debounce(async (category: string, onlyLandscape : boolean = false) : Promise<Photo> => {
    console.log(`Searching for random photo of category "${category}"`);
    let res1 = await searchAtPexels({ query: category, per_page: 1, page: 1 });
    let totalPhotos = (res1 as PhotosWithTotalResults).total_results;
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
      }
      if (onlyLandscape && !landscapeFound) {
        console.log('Found only portrait images, trying again');
      }
    } while (gotError || (onlyLandscape && !landscapeFound));
    
    return foundImage!;
  }, {leading: true, trailing: false, wait: 100});

  public searchNextPage = async (query: string | undefined) : Promise<Photo[]> => {
    if (!query) {
      query = this.defaultQuery;
    }

    if (query !== this.searchQuery) {
      this.reset();
      this.searchQuery = query;
    } else if (this.endReached) {
      return [];
    }

    if (this.isSearching) {
      return [];
    }
    this.isSearching = true;

    let pageToLoad = this.lastPage + 1;
    let res = await searchAtPexels({ query: this.searchQuery, per_page: PER_PAGE, page: pageToLoad })
      .finally(() => this.isSearching = false);
    let foundImages = (res as PhotosWithTotalResults).photos;
    this.lastPage = pageToLoad;
    this.endReached = foundImages.length < PER_PAGE;

    return foundImages;
  }

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
