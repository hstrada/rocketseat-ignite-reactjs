import { useMemo } from 'react'
import { ProductItem } from './ProductItem'

type SearchResultProps = {
  results: Array<{
    id: number
    price: number
    title: string
  }>
  onAddToWishlist: (id: number) => void
}

export function SearchResults({ results, onAddToWishlist }: SearchResultProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price
    }, 0)
    // quando quer que o calculo seja refeito
  }, [results]) // somente quando os resultados da busca mudarem

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
