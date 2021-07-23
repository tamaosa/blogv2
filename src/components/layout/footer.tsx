import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import Bio from "../bio"
import { rhythm } from "../../utils/typography"

const bioStyle = css`
  display: flex;
  justify-content: center;
`

const copyrightStyle = css`
  margin-top: ${rhythm(1 / 2)};
  text-align: right;
`

const Footer: React.FC = () => (
  <footer>
    <div css={bioStyle}>
      <Bio />
    </div>
    <div css={copyrightStyle}>
      <small>
        Built with
        {` `}
        <a
          target="_blank"
          href="https://www.gatsbyjs.com"
          rel="external noopener"
        >
          Gatsby
        </a>
        , © 2019 Tamaosa
      </small>
    </div>
  </footer>
)

export default Footer
