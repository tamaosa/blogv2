import React, { useEffect } from "react"
import { css } from "@emotion/react"

import { rhythm } from "../utils/typography"

type Props = {
  path?: string
}

declare global {
  interface Window {
    adsbygoogle: any
  }
}

const adStyle = css`
  display: block;
  text-align: center;
  margin-bottom: ${rhythm(1 / 2)};
`

const Ad: React.FC<Props> = ({ path }) => {
  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || []
      adsbygoogle.push({})
    } catch (e) {
      console.error(e)
    }
  }, [path])
  return (
    <ins
      className="adsbygoogle"
      css={adStyle}
      data-ad-client={process.env.GATSBY_GOOGLE_AD_CLIENT}
      data-ad-slot={process.env.GATSBY_GOOGLE_AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

export default Ad
