import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import Bio from "../bio"
import { scale, rhythm } from "../../utils/typography"

const bioStyle = css`
  display: flex;
  justify-content: center;
`

const copyrightStyle = css`
  font-size: ${scale(-1 / 8).fontSize};
  margin-top: ${rhythm(1 / 2)};
  text-align: right;
  small {
    display: block;
    margin: 0;
  }
`

const Footer: React.FC = () => (
  <footer>
    <div css={bioStyle}>
      <Bio />
    </div>
    <div css={copyrightStyle}>
      <small>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </small>
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
        , © 2019
        {` `}
        <a href="https://www.tamaosa.com">tamaosa</a>
      </small>
    </div>
  </footer>
)

export default Footer
