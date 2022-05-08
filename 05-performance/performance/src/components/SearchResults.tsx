import { useMemo } from 'react'
import { ProductItem } from './ProductItem'

type SearchResultProps = {
  results: Array<{
    id: number
    price: number
    title: string
    priceFormatted: string
  }>
  onAddToWishlist: (id: number) => void
  totalPrice: number
}

export function SearchResults({
  results,
  onAddToWishlist,
  totalPrice,
}: SearchResultProps) {
  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        )
      })}
    </div>
  )
}

// useMemo -> calculos pesados, igualdade referencial (repassa a informacao a um componente filho)
