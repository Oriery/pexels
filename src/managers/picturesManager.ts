import { useState, useRef, useEffect } from 'react';
import SearchManager from './searchManager';
import { Photo } from 'pexels';

const usePicturesManager = (initialQuery: string, autoSearchForInfiniteScroll : boolean = true) => {
  const [images, setImages] = useState<Photo[]>([]);
  const prevQuery = useRef<string>(initialQuery);
  const searchManager = useRef(new SearchManager(initialQuery));

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
    } else {
      setImages(photos);
    }

    prevQuery.current = query;
  };

  const searchNextPage = (query: string, startFromRandomPage: boolean = false) => {
    searchManager.current.searchNextPage(query, startFromRandomPage).then((photos: Photo[]) => {
      addImages(photos, query);
    });
  };

  useEffect(() => {
    if (!autoSearchForInfiniteScroll) return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
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

  return {
    images,
    searchNextPage,
    searchManager
  };
};

export default usePicturesManager;
