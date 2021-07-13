import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { css, keyframes } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const rotate = keyframes`
  0% {
    transform: translate3d(0,0,0)  rotate(0deg);
  }

  50% {
    transform: translate3d(100vw,0,0) rotate(1080deg);
  }
`
const NotFoundPage: React.FC = ({}) => {
  return (
    <Layout>
      <SEO title="Not Found" noindex={true} />
      <h1>😢Not Found</h1>
      <p>お探しのページは移動されたか削除されたようです…</p>
      <div>
        <StaticImage
          layout="fixed"
          src="../../content/images/avator.png"
          width={48}
          height={48}
          quality={95}
          alt="プロフィール画像"
          css={css`
            position: fixed;
            left: 0;
            top: 50vh;
            overflow: hidden;
            animation: ${rotate} 7.5s ease infinite;
            border-radius: 50%;
          `}
        />
      </div>
    </Layout>
  )
}

export default NotFoundPage
