import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import { AddShoppingCart } from '@styled-icons/material/AddShoppingCart'
import Button from '.'

describe('<Button />', () => {
  it('should render the medium button size by default', () => {
    const { container } = renderWithTheme(<Button>By now</Button>)

    expect(screen.getByRole('button', { name: /By now/i })).toHaveStyle({
      height: '4rem',
      padding: '0.8rem 3.2rem',
      'font-size': '1.4rem'
    })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the small button size', () => {
    renderWithTheme(<Button size="small">By now</Button>)

    expect(screen.getByRole('button', { name: /By now/i })).toHaveStyle({
      height: '3rem',
      'font-size': '1.2rem'
    })
  })

  it('should render the large button size', () => {
    renderWithTheme(<Button size="large">By now</Button>)

    expect(screen.getByRole('button', { name: /By now/i })).toHaveStyle({
      height: '5rem',
      padding: '0.8rem 4.8rem',
      'font-size': '1.6rem'
    })
  })

  it('should render the fullwidth button', () => {
    renderWithTheme(<Button fullWidth>By now</Button>)

    expect(screen.getByRole('button', { name: /By now/i })).toHaveStyle({
      width: '100%'
    })
  })

  it('should render button with icon', () => {
    renderWithTheme(
      <Button icon={<AddShoppingCart data-testid="icon" />}>By now</Button>
    )
    expect(screen.getByText(/By now/i)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
