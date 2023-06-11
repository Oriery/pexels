import logo from './logo.svg';
import SearchBar from '../SearchBar';
import SearchManager from '../../managers/searchManager';
import { useEffect, useState } from 'react';
import { Photo } from 'pexels';

const SIZES = [240, 360, 480, 720, 1080, 1600, 2400, 3840];

function Header({onSearch} : {onSearch: (searchQuery: string) => void}) {
  let [bgIsLoaded, setBgIsLoaded] = useState(false)

  function search (searchQuery : string) {
    onSearch(searchQuery)
  }

  const searchManager = new SearchManager()
  let [randomNatureImage, setRandomNatureImage] = useState(null as Photo | null)

  useEffect(() => {
    searchManager.getRandomPhotoOfCategory('nature', true).then((photo) => {
      setRandomNatureImage(photo)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className='App-header min-h-[500px] flex flex-col items-center text-white overflow-hidden relative'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-700 to-gray-400 z-[-20]'>
        <img className='absolute top-0 left-0 w-full h-full object-cover z-[-10] brightness-50'
          src={randomNatureImage?.src?.large2x}
          srcSet={SIZES.reduce((acc, px) => acc + `${randomNatureImage?.src?.original}?auto=compress&cs=tinysrgb&w=${px} ${px}w, `, '').slice(0, -2)}
          sizes={`${SIZES.reduce((acc, px, index) => acc + ((index-2 > -1) ? `(max-width: ${px}px) ${SIZES[index-2]}px, ` : ''), '')} 3840px`}
          alt='nature'
          onLoad={() => setBgIsLoaded(true)}
          style={{
            visibility: bgIsLoaded ? 'visible' : 'hidden'
          }}
        />
      </div>
      <nav className='flex flex-row space-x-4 justify-between h-[80px] p-2 px-6 w-full max-w-[1280px]'>
        <a href='/' className='flex flex-row'>
          <img src={logo} className='App-logo' alt='logo' />
        </a>
        <div className='flex space-x-8 py-2'>
          <a className='flex items-center' href='/'>Поиск фото</a>
          <a className='flex items-center' href='/'>Лицензия</a>
          <a className='flex items-center' href='/'>Загрузка</a>
          <a className='flex items-center' href='/'>•••</a>
          <a className='flex items-center bg-white rounded-md px-4 text-black' href='/'>Регистрация</a>
        </div>
      </nav>
      <div className='flex flex-col items-center justify-center h-[420px] max-w-[600px]'>
        <h2 className='text-4xl font-bold text-start'>Лучшие бесплатные стоковые фото, изображения без роялти и видео от талантливых авторов.</h2>
        <div className='mt-6 w-full'>
          <SearchBar onSearch={search}/>
        </div>
        <div className='flex flex-row space-x-2 mt-6 w-full'>
          <p className='text-gray-300'>Тенденции:</p>
          <a className='' href='/'>Природа</a>,
          <a className='' href='/'>Путешествия</a>,
          <a className='' href='/'>Архитектура</a>,
          <a className='' href='/'>Культура</a>
        </div>
      </div>
    </header>
  )
}

export default Header
