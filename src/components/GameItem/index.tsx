import * as S from './styles'

export type GameItemProps = {
  img: string
  title: string
  price: string
}

const GameItem = ({ img, title, price }: GameItemProps) => (
  <S.Wrapper>
    <S.GameContent>
      <S.ImgBox src={img} alt={title} />
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Price>{price}</S.Price>
      </S.Content>
    </S.GameContent>
  </S.Wrapper>
)

export default GameItem
