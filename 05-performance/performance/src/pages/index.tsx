import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults'

const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault()

    if (!search.trim()) return

    const response = await fetch(`http://localhost:3333/products?q=${search}`)

    const data = await response.json()
    if (data) setResults(data)
  }

  const addToWishlist = useCallback((id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults onAddToWishlist={addToWishlist} results={results} />
    </div>
  )
}

export default Home
