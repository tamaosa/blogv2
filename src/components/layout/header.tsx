import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { css, keyframes } from "@emotion/react"
import useDarkMode from "use-dark-mode"

import { rhythm, scale } from "../../utils/typography"

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

const shaking = keyframes`
    0% {transform: translate(0px, 0px)}
    75% {transform: translate(0px, 0px)}
    80% {transform: translate(0px, 2px)}
    85% {transform: translate(2px, 0px)}
    90% {transform: translate(0px, 2px)}
    95% {transform: translate(2px, 0px)}
    100% {transform: translate(0px, 0px)}
`

const buttonStyle = css`
  button {
    background: var(--bg);
    font-size: ${scale(1 / 2).fontSize};
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }

  button:hover {
    animation: ${shaking} 2s infinite;
  }
`

const Header: React.FC = () => {
  const darkMode = useDarkMode(false)

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
      <div css={buttonStyle}>
        <button onClick={darkMode.toggle}>
          {darkMode.value ? "🌛" : "🌞"}
        </button>
      </div>
    </header>
  )
}

export default Header
