import logo from './logo.svg';
import logoBlack from './logo-black.svg';
import logoSmall from './logo-small.svg';
import menu from './menu.png';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

function NavBar({ onSearch, forceMinimize } : { onSearch: (query : string, goingToMainPage? : boolean) => void, forceMinimize?: boolean }) {
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

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      left: 0
    })
  }

  return (
    <div className='w-full h-[120px]'>
      <nav className={'h-[80px] p-2 px-4 md:px-8 w-full transition ease-in-out delay-50 z-50' 
        + (headerIsOutOfView || forceMinimize ? ' fixed bg-white text-black' : '')}
        style={{
          boxShadow: headerIsOutOfView || forceMinimize ? '0 1px 0 #f7f7f7' : 'none',
        }}
      >
        <div className='mx-auto max-w-[1216px] 2xl:max-w-[1600px] w-full h-full flex flex-row space-x-4 justify-between'>
          <div className='flex flex-row h-full w-full items-center py-2' onClick={scrollToTop}>
            <Link to='/' className='hidden lg:flex flex-row flex-none h-full hover:brightness-75 duration-200'>
              {
              !(headerIsOutOfView || forceMinimize) ? 
                <img src={logo} className='h-full' alt='logo' /> :
                <img src={logoBlack} className='h-full' alt='logo'/> 
              }
            </Link>
            <Link to='/' className='flex lg:hidden flex-row flex-none h-full hover:brightness-75 duration-200'>
              <img src={logoSmall} className='h-full' alt='logo' />
            </Link>
            { (headerIsOutOfView || forceMinimize) && (
              <div className='flex items-center w-full xl:max-w-[420px] ml-4 h-full'>
                <SearchBar onSearch={onSearch} />
              </div>
            )}
          </div>
          <div className='space-x-1 py-2 flex-none hidden lg:flex'>
            {['Поиск фото', 'Лицензия', 'Загрузка', '•••'].map((item, index, arr) => (
              <Link key={index} className={'flex py-2 px-4 items-center duration-200' + (headerIsOutOfView || forceMinimize ? ' hover:bg-gray-300 rounded-md' : ' hover:text-gray-300')} 
                to='/'>{item}
              </Link>
            ))}
            <div className='w-2'></div>
            <Link className={'flex items-center rounded-md px-4 text-black hover:brightness-75 duration-200' + (headerIsOutOfView || forceMinimize ? ' bg-[#07a081] text-white' : ' bg-white')} to='/'>Регистрация</Link>
          </div>
          <div className='flex flex-row h-full space-x-4 flex lg:hidden items-center'>
            <div className='space-x-8 h-full py-2 flex-none flex'>
              <Link className={'flex items-center rounded-md px-4 text-black hover:brightness-75 duration-200' + (headerIsOutOfView || forceMinimize ? ' bg-[#07a081] text-white' : ' bg-white')} to='/'>Регистрация</Link>
            </div>
            <Link className={'flex items-center w-12 h-12 p-3 rounded-md duration-200' + (headerIsOutOfView || forceMinimize ? ' hover:bg-gray-300' : ' hover:opacity-75')}
              style={{
                filter: headerIsOutOfView || forceMinimize ? 'invert(0)' : 'invert(1)',
              }}
              to='/'
            >
              <img src={menu} alt='menu' />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar;
