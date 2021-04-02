import 'server.mock'
import { signIn } from 'next-auth/client'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from 'utils/test-utils'
import FormResetPassword from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}
useRouter.mockImplementation(() => ({ query }))

jest.mock('next-auth/client', () => ({
  signIn: jest.fn()
}))

describe('<FormResetPassword />', () => {
  it('should render the form', () => {
    render(<FormResetPassword />)

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Reset password/i })
    ).toBeInTheDocument()
  })

  it('should show validation errors', async () => {
    render(<FormResetPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '321'
    )

    userEvent.click(screen.getByRole('button', { name: /Reset password/i }))

    expect(
      await screen.findByText('confirm password does not match with password')
    ).toBeInTheDocument()
  })

  it('should show error when code provided is wrong', async () => {
    query = { code: 'wrong_code' }
    render(<FormResetPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '123'
    )

    userEvent.click(screen.getByRole('button', { name: /Reset password/i }))

    expect(
      await screen.findByText(/Incorrect code provided/i)
    ).toBeInTheDocument()
  })

  it('should reset the password and sign in the user ', async () => {
    query = { code: 'right_code' }
    render(<FormResetPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '123'
    )

    userEvent.click(screen.getByRole('button', { name: /Reset password/i }))

    waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'valid@mail.com',
        password: '123',
        callbackUrl: '/'
      })
    })
  })
})
