import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import Bio from "../bio"

const bioStyle = css`
  display: flex;
  justify-content: center;
`

const copyrightStyle = css`
  text-align: right;
`

const Footer: React.FC = () => (
  <footer>
    <div css={bioStyle}>
      <Bio />
    </div>
    <div css={copyrightStyle}>
      <small>
        <Link to="/">About</Link> | © 2019 Tamaosa, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </small>
    </div>
  </footer>
)

export default Footer
