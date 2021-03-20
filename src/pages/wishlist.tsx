import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import protectedRoutes from 'utils/protected-routes'
import { GetServerSidePropsContext } from 'next'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session,
      games: gamesMock,
      recommendedGames: gamesMock.slice(0, 5),
      recommendedHighlight: highlightMock
    }
  }
}
