import { useMemo } from 'react'
import { List, ListRowRenderer } from 'react-virtualized'
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
  const rowHandler: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={980}
        overscanRowCount={30}
        rowCount={results.length}
        rowRenderer={rowHandler}
      />

      {/* {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        )
      })} */}
    </div>
  )
}

// useMemo -> calculos pesados, igualdade referencial (repassa a informacao a um componente filho)
