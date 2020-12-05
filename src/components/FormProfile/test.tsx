import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import FormProfile from '.'

describe('<FormProfile />', () => {
  it('should render the form profile', () => {
    const { container } = renderWithTheme(<FormProfile />)

    expect(
      screen.getByRole('heading', { name: /My profile/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: /e-mail/i })).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Type your password')
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText('New password')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
