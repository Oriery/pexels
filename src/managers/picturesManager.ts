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

  const search = (query: string) => {
    console.log('usePicturesManager search', query);
    searchManager.current.search(query).then((photos: Photo[]) => {
      addImages(photos, query);
    });
  };

  return {
    images,
    search
  };
};

export default usePicturesManager;
