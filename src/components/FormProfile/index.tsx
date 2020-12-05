import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'
import * as S from './styles'

const FormProfile = () => (
  <>
    <Heading lineBottom color="black" lineColor="primary">
      My Profile
    </Heading>

    <S.Form>
      <TextField name="name" label="Name" initialValue="David Faria" />
      <TextField
        type="email"
        name="email"
        label="E-mail"
        initialValue="davidfaria89@gmail.com"
        disabled
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        placeholder="Type your password"
      />

      <TextField
        type="password"
        name="password"
        label="New password"
        placeholder="New password"
      />

      <Button>Save</Button>
    </S.Form>
  </>
)

export default FormProfile
