import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/react"

import { scale } from "../../utils/typography"

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const titleStyle = css`
  a {
    color: var(--fg);
    text-decoration: none;
    font-weight: bold;
    font-size: ${scale(1 / 2).fontSize};
    line-height: ${scale(1 / 2).lineHeight};
  }
`

const Header: React.FC = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <header css={headerStyle}>
      <div css={titleStyle}>
        <Link to="/">{site.siteMetadata.title}</Link>
      </div>
      <div>Toggle</div>
    </header>
  )
}

export default Header
