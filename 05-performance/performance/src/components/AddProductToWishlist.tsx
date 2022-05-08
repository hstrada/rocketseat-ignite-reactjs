export interface AddProductToWishlistProps {
  onAddToWishlist: () => void
  onRequestClose: () => void
}

export default function AddProductToWishlist({
  onAddToWishlist,
  onRequestClose,
}: AddProductToWishlistProps) {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishlist}>sim</button>
      <button onClick={onRequestClose}>não</button>
    </span>
  )
}
