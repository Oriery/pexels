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
  let [lastQuery, setLastQuery] = useState('')
  let [lastFilters, setLastFilters] = useState('' as string)

  useEffect(() => {
    picturesManager.searchManager.current.getRandomPhotoOfCategory('nature&orientation=landscape&size=large').then((photo) => {
      setRandomNatureImage(photo)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSearch(query : string) {
    if (query === lastQuery) return
    setLastQuery(query)
    picturesManager.searchNextPage(query + lastFilters)
  }

  function onFiltersChanged(filters : string) {
    if (!filters || !lastQuery) return
    if (filters === lastFilters) return
    setLastFilters(filters)
    picturesManager.searchNextPage(lastQuery + filters)
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
              <PicturesList images={picturesManager.images} picturesManager={picturesManager} posY={120} isOnCategoryPage onFiltersChanged={onFiltersChanged} />
            </div>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
