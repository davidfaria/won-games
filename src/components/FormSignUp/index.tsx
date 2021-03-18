import React from 'react'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined'

import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { FormWrapper, FormLink, FormLoading } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/client'

const FormSignUp = () => {
  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const [createUser, { error }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => console.error(err),
    onCompleted: () => {
      !error &&
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        })
    }
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
    await createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    })
    setLoading(false)
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="Username"
          type="username"
          onInputChange={(value) => handleInput('username', value)}
          icon={<AccountCircle />}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          onInputChange={(value) => handleInput('email', value)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(value) => handleInput('password', value)}
          icon={<Lock />}
        />
        <TextField
          name="confirm-password"
          placeholder="Confirm password"
          type="password"
          onInputChange={(value) => handleInput('confirm-password', value)}
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign up now</span>}
        </Button>

        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
