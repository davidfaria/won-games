import React from 'react'
import { getStorageItem, setStorageItem } from 'utils/localStorage'
import { useQueryGames } from 'graphql/queries/games'

import { cartMapper } from 'utils/mappers'
import formatPrice from 'utils/format-price'

const CART_KEY = 'cartItems'

export type CartItem = {
  id: string
  img: string
  title: string
  price: string
}

export type CartContextData = {
  items: CartItem[]
  quantity: number
  total: string
  loading: boolean
  isInCart: (id: string) => boolean
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}
export const CartContextDefaultValues = {
  items: [],
  quantity: 0,
  total: '$0.00',
  loading: false,
  isInCart: () => false,
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  clearCart: () => undefined
}

export const CartContext = React.createContext<CartContextData>(
  CartContextDefaultValues
)

export type CartProviderProps = {
  children: React.ReactNode
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = React.useState<string[]>([])

  React.useEffect(() => {
    const data = getStorageItem(CART_KEY)
    if (data) {
      setCartItems(data)
    }
  }, [])

  const { data, loading } = useQueryGames({
    skip: !cartItems?.length,
    variables: {
      where: { id: cartItems }
    }
  })

  const total =
    data?.games.reduce((acc, game) => {
      return acc + game.price
    }, 0) || 0

  const isInCart = (id: string): boolean =>
    id ? cartItems.includes(id) : false

  const saveCart = (cartItems: string[]) => {
    setCartItems(cartItems)
    setStorageItem(CART_KEY, cartItems)
  }

  const addToCart = (id: string) => {
    const newCartItems = [...cartItems, id]
    saveCart(newCartItems)
  }

  const removeFromCart = (id: string) => {
    const newCartItems = cartItems.filter((item: string) => item !== id)
    saveCart(newCartItems)
  }

  const clearCart = () => {
    saveCart([])
  }

  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: formatPrice(total),
        loading,
        isInCart,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => React.useContext(CartContext)

export { CartProvider, useCart }
