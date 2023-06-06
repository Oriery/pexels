import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PicturesList from './components/PicturesList';
import { createClient, PhotosWithTotalResults } from 'pexels';

function App() {
  const REACT_APP_PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY
  const client = createClient(REACT_APP_PEXELS_API_KEY!);

  let [images, setImages] = React.useState([] as any[])

  useEffect(() => {
    search('people')
  }, [])

  function search(searchQuery : string) {
    client.photos.search({ query: searchQuery, per_page: 40 }).then(photos => {
      console.log(photos);
      setImages((photos as PhotosWithTotalResults).photos)
    });
  }

  return (
    <div className="App">
      <Header onSearch={search}/>
      <PicturesList images={images}/>
    </div>
  );
}

export default App;
