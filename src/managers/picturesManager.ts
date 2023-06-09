import { useState, useRef } from 'react';
import SearchManager from './searchManager';
import { Photo } from 'pexels';

const usePicturesManager = (initialQuery: string) => {
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

  const searchNextPage = (query: string) => {
    searchManager.current.searchNextPage(query).then((photos: Photo[]) => {
      addImages(photos, query);
    });
  };

  return {
    images,
    searchNextPage
  };
};

export default usePicturesManager;
