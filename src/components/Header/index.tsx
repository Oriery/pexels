import logo from './logo.svg';
import logoBlack from './logo-black.svg';
import logoSmall from './logo-small.svg';
import menu from './menu.png';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import { Photo } from 'pexels';
import './Header.css'

const SIZES = [240, 360, 480, 720, 1080, 1600, 2400, 3840];

function Header({onSearch, randomNatureImage} : {onSearch: (searchQuery: string) => void, randomNatureImage: Photo | null}) {
  let [bgIsLoaded, setBgIsLoaded] = useState(false)
  let [headerIsOutOfView, setHeaderIsOutOfView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setHeaderIsOutOfView(true)
      } else {
        setHeaderIsOutOfView(false)
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  function search (searchQuery : string) {
    onSearch(searchQuery)
  }

  return (
    <header className='App-header min-h-[500px] flex flex-col items-center text-white relative'>
      <nav className={' h-[80px] p-2 px-4 md:px-8 w-full transition ease-in-out delay-50' 
        + (headerIsOutOfView ? ' fixed bg-white text-black' : '')}
        style={{
          boxShadow: headerIsOutOfView ? '0 1px 0 #f7f7f7' : 'none',
        }}
      >
        <div className='mx-auto max-w-[1216px] 2xl:max-w-[1600px] w-full h-full flex flex-row space-x-4 justify-between'>
          <div className='flex flex-row h-full w-full items-center py-2'>
            <a href='/' className='hidden lg:flex flex-row flex-none h-full'>
              {
              !headerIsOutOfView ? 
                <img src={logo} className='h-full' alt='logo' /> :
                <img src={logoBlack} className='h-full' alt='logo'/> 
              }
            </a>
            <a href='/' className='flex lg:hidden flex-row flex-none h-full'>
              <img src={logoSmall} className='h-full' alt='logo' />
            </a>
            { headerIsOutOfView && (
              <div className='flex items-center w-full xl:max-w-[420px] ml-4 h-full'>
                <SearchBar onSearch={search} />
              </div>
            )}
          </div>
          <div className='space-x-8 py-2 flex-none hidden lg:flex'>
            <a className='flex items-center' href='/'>Поиск фото</a>
            <a className='flex items-center' href='/'>Лицензия</a>
            <a className='flex items-center' href='/'>Загрузка</a>
            <a className='flex items-center' href='/'>•••</a>
            <a className={'flex items-center bg-white rounded-md px-4 text-black' + (headerIsOutOfView ? ' bg-[#07a081] text-white' : '')} href='/'>Регистрация</a>
          </div>
          <div className='flex flex-row h-full space-x-8 flex lg:hidden items-center'>
            <div className='space-x-8 h-full py-2 flex-none flex'>
              <a className={'flex items-center bg-white rounded-md px-4 text-black' + (headerIsOutOfView ? ' bg-[#07a081] text-white' : '')} href='/'>Регистрация</a>
            </div>
            <a className='flex items-center w-6 h-6'
              style={{
                filter: headerIsOutOfView ? 'invert(0)' : 'invert(1)',
              }}
              href='/'
            >
              <img src={menu} alt='menu' />
            </a>
          </div>
        </div>
      </nav>
      <div className='flex flex-col items-center justify-center h-[376px] max-w-[600px]'>
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
      <div className='flex flex-row-reverse mb-6 mr-10 opacity-50 text-sm z-20 w-full'>
        <a href={randomNatureImage?.photographer_url} className='flex flex-row items-center' target='_blank' rel="noreferrer" >
          <p>Автор фото —&nbsp;</p>
          <p className='font-bold'>{randomNatureImage?.photographer}</p>
        </a>
      </div>
      <div 
        className={'absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-700 to-gray-400 z-[-20] header-blurred-bg header-bg flex flex-col-reverse' + (bgIsLoaded ? ' loaded' : '')}
        style={{
          backgroundImage: `url(${randomNatureImage?.src.original}?auto=compress&cs=tinysrgb&w=60)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img className='absolute top-0 left-0 w-full h-full object-cover z-[-10]'
          src={randomNatureImage?.src?.large2x}
          srcSet={SIZES.reduce((acc, px) => acc + `${randomNatureImage?.src?.original}?auto=compress&cs=tinysrgb&w=${px} ${px}w, `, '').slice(0, -2)}
          sizes={`${SIZES.reduce((acc, px, index) => acc + ((index-2 > -1) ? `(max-width: ${px}px) ${SIZES[index-2]}px, ` : ''), '')} 3840px`}
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
