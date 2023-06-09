import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PicturesList from './components/PicturesList';
import usePicturesManager from './managers/picturesManager';

function App() {
  
  let picturesManager = usePicturesManager('people')

  useEffect(() => {
    picturesManager.searchNextPage('people')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  return (
    <div className="App">
      <Header onSearch={picturesManager.searchNextPage}/>
      <PicturesList images={picturesManager.images}/>
    </div>
  );
}

export default App;
