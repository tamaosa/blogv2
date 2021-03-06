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
      <h1>๐ขNot Found</h1>
      <p>ใๆขใใฎใใผใธใฏ็งปๅใใใใๅ้คใใใใใใงใโฆ</p>
      <div>
        <StaticImage
          layout="fixed"
          src="../../content/images/avator.png"
          width={48}
          height={48}
          quality={95}
          alt="ใใญใใฃใผใซ็ปๅ"
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
