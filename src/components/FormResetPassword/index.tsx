import React from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Lock, ErrorOutline } from '@styled-icons/material-outlined'

import { FormWrapper, FormLoading, FormError } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import { FieldErrors, resetValidate } from 'utils/validations'

const FormResetPassword = () => {
  const { query } = useRouter()
  const [formError, setFormError] = React.useState('')
  const [fieldError, setFieldError] = React.useState<FieldErrors>({
    password: '',
    confirm_password: ''
  })
  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState({
    password: '',
    confirm_password: ''
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

    const errors = resetValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: values.password,
          passwordConfirmation: values.confirm_password,
          code: query.code
        })
      }
    )

    const data = await response.json()

    if (data?.error) {
      setFormError(data?.message[0]?.messages[0]?.message)
      setLoading(false)
    } else {
      signIn('credentials', {
        email: data?.user?.email,
        password: values.password,
        callbackUrl: '/'
      })
    }
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
          onInputChange={(value) => handleInput('password', value)}
          icon={<Lock />}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          error={fieldError?.confirm_password}
          onInputChange={(value) => handleInput('confirm_password', value)}
          icon={<Lock />}
        />
        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Reset password</span>}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
