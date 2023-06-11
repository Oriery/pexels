import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import PicturesList from './components/PicturesList';
import usePicturesManager from './managers/picturesManager';
import { Photo } from 'pexels';

function App() {
  
  let picturesManager = usePicturesManager('people')
  let [randomNatureImage, setRandomNatureImage] = useState(null as Photo | null)

  useEffect(() => {
    picturesManager.searchManager.current.getRandomPhotoOfCategory('nature', true).then((photo) => {
      setRandomNatureImage(photo)
    })
    picturesManager.searchNextPage('people', true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <link rel="preload" href={`${randomNatureImage?.src.original}?auto=compress&cs=tinysrgb&w=60`} as="image" />
      <Header onSearch={picturesManager.searchNextPage} randomNatureImage={randomNatureImage}/>
      <PicturesList images={picturesManager.images} picturesManager={picturesManager}/>
    </div>
  );
}

export default App;
