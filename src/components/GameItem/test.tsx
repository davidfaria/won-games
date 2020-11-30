import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import GameItem from '.'

const props = {
  img: 'https://source.unsplash.com/user/willianjusten/151x70',
  title: 'Red Dead Redemption 2',
  price: 'R$ 215,00'
}

describe('<GameItem />', () => {
  fit('should render the item', () => {
    renderWithTheme(<GameItem {...props} />)

    //verificar o title se foi renderizado
    //verificar a image
    //verificar o preço
  })
})
