import search from './search.svg'
import { FormEvent, useState } from 'react'

function SearchBar({ onSearch } : { onSearch : (searchQuery : string) => void }) {
  let [searchQuery, setSearchQuery] = useState('')

  const onFormSubmit = (event : FormEvent) => {
    event.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form className="search-bar flex flex-row place-content-stretch w-full bg-white rounded-md" onSubmit={onFormSubmit}>
      <div className="flex items-center text-black px-2 m-4">
        Фото
      </div>
      <input className="w-full px-2 text-black focus:outline focus:outline-0" type="text" placeholder="Поиск бесплатных изображений" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
      <button className="flex flex-row place-content-center place-items-center p-2 m-2 h-10 aspect-square">
        <img src={search} alt='search' />
      </button>
    </form>
  );
}

export default SearchBar;
