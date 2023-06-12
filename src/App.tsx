import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import PicturesList from './components/PicturesList';
import usePicturesManager from './managers/picturesManager';
import { Photo } from 'pexels';

function App() {

  let picturesManager = usePicturesManager('people')
  let [randomNatureImage, setRandomNatureImage] = useState(null as Photo | null)

  useEffect(() => {
    picturesManager.searchManager.current.getRandomPhotoOfCategory('nature&orientation=landscape').then((photo) => {
      setRandomNatureImage(photo)
    })
    picturesManager.searchNextPage('people', true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ 
          <div>
            <link rel="preload" href={`${randomNatureImage?.src.original}?auto=compress&cs=tinysrgb&w=60`} as="image" />
            <Header onSearch={() => {}} randomNatureImage={randomNatureImage}/>
            <Outlet />
          </div>
         } >
          <Route index element={
            <div>
              <PicturesList images={picturesManager.images} picturesManager={picturesManager} posY={500 /* because Header is 500px tall */} />
            </div>
          } />
          <Route path="search/:query" element={
            <div>
              <PicturesList images={picturesManager.images} picturesManager={picturesManager} posY={200} />
            </div>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
