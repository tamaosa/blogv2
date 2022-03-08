import React from "react"
import { css } from "@emotion/react"

import GlobalStyle from "./global"
import Header from "./header"
import Footer from "./footer"
import { rhythm } from "../../utils/typography"
import { contentWidth } from "../../utils/constants"
import "../../utils/font-awesome"

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 ${rhythm(3 / 4)};
  @media (min-width: ${rhythm(contentWidth)}) {
    margin: 0 auto;
    width: ${rhythm(contentWidth)};
  }

  & > header {
    margin-top: ${rhythm(1 / 4)};
  }

  & > main {
    flex: 1;
    margin-top: ${rhythm(3 / 2)};
    margin-bottom: ${rhythm(1 / 4)};
  }

  & > footer {
    margin-top: ${rhythm(1 / 4)};
  }
`

const Layout: React.FC = ({ children }) => (
  <div css={layoutStyle}>
    <GlobalStyle />
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
)

export default Layout
