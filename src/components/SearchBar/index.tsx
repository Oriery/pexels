import search from './search.svg'
import { FormEvent, useState } from 'react'

function SearchBar({ onSearch } : { onSearch : (searchQuery : string) => void }) {
  let [searchQuery, setSearchQuery] = useState('')

  const onFormSubmit = (event : FormEvent) => {
    event.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form className="search-bar flex flex-row justify-between items-center w-full bg-gray-100 rounded-md h-full" onSubmit={onFormSubmit}>
      <div className="flex items-center text-black px-7 py-1 my-2 pr-6 mr-1" style={{
        boxShadow: '1px 0 0 #e7e7e7',
      }}>
        Фото
      </div>
      <input className="w-full px-2 bg-gray-100 text-black focus:outline focus:outline-0" type="text" placeholder="Поиск бесплатных изображений" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
      <button className="flex flex-row place-content-center place-items-center p-2 m-1 h-10 aspect-square">
        <img src={search} alt='search' />
      </button>
    </form>
  );
}

export default SearchBar;
