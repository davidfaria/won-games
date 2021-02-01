import { gql } from '@apollo/client'

export const BannerFragment = gql`
  fragment BannerFragment on Banner {
    image {
      url
    }
    title
    subtitle
    button: button_slider {
      label
      link
    }
    ribbon {
      text
      color
      size
    }
  }
`
