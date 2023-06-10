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

  constructor(defaultQuery: string) {
    this.defaultQuery = defaultQuery;

    this.lastPage = 0;
    this.searchQuery = this.defaultQuery;
    this.endReached = false;
    this.isSearching = false;
  }

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
