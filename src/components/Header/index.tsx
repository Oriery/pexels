import logo from './logo.svg';
import SearchBar from '../SearchBar';

function Header() {
  return (
    <header className='App-header min-h-[500px] flex flex-col items-center bg-gradient-to-t from-gray-700 to-gray-400 text-white'>
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
          <SearchBar />
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
