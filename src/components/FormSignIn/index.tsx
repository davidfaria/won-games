import React from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Email, Lock } from '@styled-icons/material-outlined'

import { FormLink, FormWrapper, FormLoading } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import * as S from './styles'

const FormSignIn = () => {
  const { push } = useRouter()

  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  })

  const handleInput = (field: string, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.url) {
      return push(result?.url)
    }

    setLoading(false)
    console.error('Error login')
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          onInputChange={(value) => handleInput('email', value)}
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
        />
        <TextField
          onInputChange={(value) => handleInput('password', value)}
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in now</span>}
        </Button>

        <FormLink>
          Don’t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
