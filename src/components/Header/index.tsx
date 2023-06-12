import SearchBar from '../SearchBar';
import NavBar from '../NavBar';
import { useState } from 'react';
import { Photo } from 'pexels';
import './Header.css'

const SIZES = [240, 360, 480, 720, 1080, 1600, 2400, 3840];

function Header({onSearch, randomNatureImage} : {onSearch: (searchQuery: string) => void, randomNatureImage: Photo | null}) {
  let [bgIsLoaded, setBgIsLoaded] = useState(false)

  return (
    <header className='App-header min-h-[500px] flex flex-col items-center text-white relative overflow-hidden'>
      <NavBar onSearch={onSearch}/>
      
      <div className='flex flex-col items-center justify-center h-[376px] max-w-[600px]'>
        <h2 className='text-4xl font-bold text-start'>Лучшие бесплатные стоковые фото, изображения без роялти и видео от талантливых авторов.</h2>
        <div className='mt-6 w-full'>
          <SearchBar onSearch={onSearch}/>
        </div>
        <div className='flex flex-row space-x-2 mt-6 w-full'>
          <p className='text-gray-300'>Тенденции:</p>
          <a className='' href='/'>Природа</a>,
          <a className='' href='/'>Путешествия</a>,
          <a className='' href='/'>Архитектура</a>,
          <a className='' href='/'>Культура</a>
        </div>
      </div>
      <div className='flex flex-row-reverse mb-6 mr-10 opacity-50 text-sm z-20 w-full'>
        <a href={randomNatureImage?.photographer_url} className='flex flex-row items-center' target='_blank' rel="noreferrer" >
          <p>Автор фото —&nbsp;</p>
          <p className='font-bold'>{randomNatureImage?.photographer}</p>
        </a>
      </div>
      <div 
        className={'absolute top-[-5%] left[-5%] w-[110%] h-[110%] z-[-20] header-blurred-bg header-bg flex flex-col-reverse' 
        + (bgIsLoaded ? ' loaded' : '')}
        style={{
          backgroundImage: `url(${randomNatureImage?.src.original}?auto=compress&cs=tinysrgb&w=60)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
        <img className='absolute top-0 left-0 w-full h-full object-cover z-[-10]'
          src={randomNatureImage?.src?.large2x}
          srcSet={SIZES.reduce((acc, px) => acc + `${randomNatureImage?.src?.original}?auto=compress&cs=tinysrgb&w=${px} ${px}w, `, '').slice(0, -2)}
          sizes={`${SIZES.reduce((acc, px) => acc + `(max-width: ${px}px) ${px}px, `, '')} 3840px`}
          alt='nature'
          onLoad={() => setBgIsLoaded(true)}
          style={{
            visibility: bgIsLoaded ? 'visible' : 'hidden'
          }}
          loading='lazy'
          />
      </div>
    </header>
  )
}

export default Header
