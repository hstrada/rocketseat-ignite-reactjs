import { ProductItem } from './ProductItem'

type SearchResultProps = {
  results: Array<{
    id: number
    price: number
    title: string
  }>
}

export function SearchResults({ results }: SearchResultProps) {
  return (
    <div>
      {results.map((product) => {
        return <ProductItem product={product} />
      })}
    </div>
  )
}
