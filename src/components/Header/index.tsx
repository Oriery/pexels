import logo from './logo.svg';

function Header() {
  return (
    <header className='App-header m-4 mt-0'>
      <nav className='flex flex-row space-x-4 justify-between h-[80px] p-2'>
        <a href='/' className='flex flex-row'>
          <img src={logo} className='App-logo mr-[-60px]' alt='logo' />
          <h1 className='flex items-center text-xl'>Pexels</h1>
        </a>
        <div className='flex space-x-8 py-2'>
          <a className='flex items-center' href='/'>Поиск фото</a>
          <a className='flex items-center' href='/'>Лицензия</a>
          <a className='flex items-center' href='/'>Загрузка</a>
          <a className='flex items-center' href='/'>...</a>
          <a className='flex items-center bg-white rounded-md px-4' href='/'>Регистрация</a>
        </div>
      </nav>
    </header>
  )
}

export default Header
