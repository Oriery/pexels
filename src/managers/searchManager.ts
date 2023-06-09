import { createClient, PhotosWithTotalResults } from 'pexels';

const REACT_APP_PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY
const client = createClient(REACT_APP_PEXELS_API_KEY!);

class SearchManager {
  private lastPage: number;
  private searchQuery: string;
  private defaultQuery: string;
  private endReached: boolean;

  constructor(defaultQuery: string) {
    this.defaultQuery = defaultQuery;

    this.lastPage = 0;
    this.searchQuery = this.defaultQuery;
    this.endReached = false;
  }

  public async search(query: string | undefined) {
    if (!query) {
      query = this.defaultQuery;
    }

    if (query !== this.searchQuery) {
      this.reset();
      this.searchQuery = query;
    } else if (this.endReached) {
      return [];
    }

    let pageToLoad = this.lastPage + 1;
    console.log('SearchManager search', query, 'page:', pageToLoad)
    let res = await client.photos.search({ query: this.searchQuery, per_page: 20, page: pageToLoad });
    let foundImages = (res as PhotosWithTotalResults).photos;
    this.lastPage = pageToLoad;
    this.endReached = foundImages.length < 20;

    return foundImages;
  }

  public getQuery() {
    return this.searchQuery;
  }

  public reset() {
    this.lastPage = 0;
    this.searchQuery = this.defaultQuery;
    this.endReached = false;
  }
}

export default SearchManager
