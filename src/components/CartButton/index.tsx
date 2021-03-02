import {
  AddShoppingCart,
  RemoveShoppingCart
} from '@styled-icons/material-outlined'
import Button, { ButtonProps } from 'components/Button'
import { useCart } from 'hooks/use-cart'

type CartButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const CartButton = ({
  id,
  hasText = false,
  size = 'small'
}: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart()
  const existingInCart = isInCart(id)
  const buttonText = existingInCart ? 'Remove from cart' : 'Add to cart'

  return (
    <Button
      icon={
        existingInCart ? (
          <RemoveShoppingCart aria-label="Remove from cart" />
        ) : (
          <AddShoppingCart aria-label="Add to cart" />
        )
      }
      size={size}
      onClick={() => (existingInCart ? removeFromCart(id) : addToCart(id))}
    >
      {hasText && buttonText}
    </Button>
  )
}

export default CartButton
