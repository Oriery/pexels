import { useState, useRef, useEffect } from 'react';
import SearchManager from './searchManager';
import { Photo } from 'pexels';

const usePicturesManager = (autoSearchForInfiniteScroll : boolean = true) => {
  const [images, setImages] = useState<Photo[]>([]);
  const prevQuery = useRef<string>('');
  const searchManager = useRef(new SearchManager());
  let [isSearching, setIsSearching] = useState<boolean>(false);

  const addImages = (photos: Photo[], query: string) => {
    if (prevQuery.current === query) {
      setImages((prevImages) => {
        const seenKeys = new Set();
        const newArr = [...prevImages, ...photos].filter(item => {
          if (seenKeys.has(item.id)) {
            return false;
          } else {
            seenKeys.add(item.id);
            return true;
          }
        });

        return newArr;
      });
    }

    prevQuery.current = query;
  };

  const searchNextPage = (query: string, startFromRandomPage: boolean = false) => {
    if (!query) {
      console.warn('Cannot search for empty query');
      return;
    }

    setIsSearching(true);
    searchManager.current.searchNextPage(query, startFromRandomPage).then((photos: Photo[]) => {
      addImages(photos, query);
      if (!searchManager.current.isSearching) {
        setIsSearching(false);
      }
    });
  };

  useEffect(() => {
    if (!autoSearchForInfiniteScroll) return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500) {
        searchNextPage(prevQuery.current);
      }
    };
    const interval = setInterval(() => {
      handleScroll();
    }, 500);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearImages() {
    setImages([]);
    prevQuery.current = '';
  }

  return {
    images,
    clearImages,
    searchNextPage,
    searchManager,
    isSearching,
  };
};

export default usePicturesManager;
