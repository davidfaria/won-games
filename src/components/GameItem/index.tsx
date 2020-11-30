import { Download } from '@styled-icons/boxicons-solid/Download'
import * as S from './styles'

export type PaymentInfo = {
  flag: string
  img: string
  number: string
  purchaseDate: string
}

export type GameItemProps = {
  img: string
  title: string
  price: string
  downloadLink?: string
  paymentInfo?: PaymentInfo
}

const GameItem = ({
  img,
  title,
  price,
  downloadLink,
  paymentInfo
}: GameItemProps) => (
  <S.Wrapper>
    <S.GameContent>
      <S.ImageBox src={img} alt={title} />
      <S.Content>
        <S.Title>
          {title}
          {!!downloadLink && (
            <S.DownloadLink
              href={downloadLink}
              aria-label={`Get ${title} here`}
              target="_blank"
            >
              <Download size={22} />
            </S.DownloadLink>
          )}
        </S.Title>
        <S.Price>{price}</S.Price>
      </S.Content>
    </S.GameContent>

    {!!paymentInfo && (
      <S.PaymentContent>
        <p>{paymentInfo.purchaseDate}</p>
        <S.CardInfo>
          <span>{paymentInfo.number}</span>
          <img src={paymentInfo.img} alt={paymentInfo.flag} />
        </S.CardInfo>
      </S.PaymentContent>
    )}
  </S.Wrapper>
)

export default GameItem
