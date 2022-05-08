import { memo, useState } from 'react'
// no momento em que a aplicacao e carregada
// import { AddProductToWishlist } from './AddProductToWishlist'
import { AddProductToWishlistProps } from './AddProductToWishlist'
// import lodash from 'lodash' // before
import isEqual from 'lodash/isEqual' // after

import dynamic from 'next/dynamic'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import('./AddProductToWishlist')
  },
  { loading: () => <span>carregando</span> }
)

interface ProductItemProps {
  product: {
    id: number
    price: number
    title: string
    priceFormatted: string
  }
  onAddToWishlist: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  return (
    <div>
      {product.title} = <strong>{product.price}</strong> -{' '}
      {product.priceFormatted}
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar</button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return isEqual(prevProps.product, nextProps.product)
  }
)
