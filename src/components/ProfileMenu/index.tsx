import Link from 'next/link'
import {
  AccountCircle,
  CreditCard,
  FormatListBulleted,
  ExitToApp
} from '@styled-icons/material-outlined'
import * as S from './styles'

export type ProfileMenuProps = {
  activeLink?: '/profile/me' | '/profile/cards' | '/profile/orders'
}

const ProfileMenu = ({ activeLink }: ProfileMenuProps) => (
  <S.Nav>
    <Link href="/profile/me" passHref>
      <S.Link title="My Profile" isActive={activeLink == '/profile/me'}>
        <AccountCircle size="24" />
        <span>My profile</span>
      </S.Link>
    </Link>

    <Link href="/profile/cards" passHref>
      <S.Link title="My cards" isActive={activeLink == '/profile/cards'}>
        <CreditCard size="24" />
        <span>My cards</span>
      </S.Link>
    </Link>

    <Link href="/profile/orders" passHref>
      <S.Link title="My orders" isActive={activeLink == '/profile/orders'}>
        <FormatListBulleted size="24" />
        <span>My orders</span>
      </S.Link>
    </Link>

    <Link href="/logout" passHref>
      <S.Link>
        <ExitToApp size="24" />
        <span>Sign out</span>
      </S.Link>
    </Link>
  </S.Nav>
)

export default ProfileMenu
