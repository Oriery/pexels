import search from './search.svg'

function SearchBar() {
  return (
    <form className="search-bar flex flex-row place-content-stretch w-full bg-white rounded-md">
      <div className="flex items-center text-black px-2 m-4">
        Фото
      </div>
      <input className="w-full px-2" type="text" placeholder="Поиск бесплатных изображений" />
      <button className="flex flex-row place-content-center place-items-center p-2 m-2 h-10 aspect-square">
        <img src={search} alt='search' />
      </button>
    </form>
  );
}

export default SearchBar;
