import { MockedProvider } from '@apollo/client/testing'
import { renderHook } from '@testing-library/react-hooks'
import { CartProvider, useCart, CartProviderProps } from '.'
import { setStorageItem } from 'utils/localStorage'
import { gamesMock, cartItems } from './mock'

describe('useCart', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })
  it('should return itens and its info if there are any in the cart', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )
    setStorageItem('cartItems', ['1', '2'])

    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper
    })

    await waitForNextUpdate()

    expect(result.current.items).toStrictEqual(cartItems)
  })
})
