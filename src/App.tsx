import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import PicturesList from './components/PicturesList';
import usePicturesManager from './managers/picturesManager';
import { Photo } from 'pexels';

function App() {

  let picturesManager = usePicturesManager()
  let [randomNatureImage, setRandomNatureImage] = useState(null as Photo | null)

  useEffect(() => {
    picturesManager.searchManager.current.getRandomPhotoOfCategory('nature&orientation=landscape').then((photo) => {
      setRandomNatureImage(photo)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSearch(query : string) {
    picturesManager.searchNextPage(query)
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ 
          <div>
            <Outlet />
          </div>
         } >
          <Route index element={
            <div>
              <link rel="preload" href={`${randomNatureImage?.src.original}?auto=compress&cs=tinysrgb&w=60`} as="image" />
              <Header onSearch={onSearch} randomNatureImage={randomNatureImage}/>
              <PicturesList images={picturesManager.images} picturesManager={picturesManager} posY={500 /* because Header is 500px tall; it is for better scroll */} />
            </div>
          } />
          <Route path="search/:query" element={
            <div>
              <NavBar onSearch={onSearch} forceMinimize/>
              <PicturesList images={picturesManager.images} picturesManager={picturesManager} posY={120} isOnCategoryPage />
            </div>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
