import React from "react"
import { Global, css } from "@emotion/react"

import { lightTheme, darkTheme } from "../../utils/constants"
import { rhythm } from "../../utils/typography"

const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      body {
        background-color: var(--bg);
        color: var(--fg);
      }

      body.light-mode {
        --bg: ${lightTheme.backGround};
        --fg: ${lightTheme.textNormal};
        --fg-title: ${lightTheme.textTitle};
        --fg-link: ${lightTheme.textLink};
      }

      body.dark-mode {
        --bg: ${darkTheme.backGround};
        --fg: ${darkTheme.textNormal};
        --fg-title: ${darkTheme.textTitle};
        --fg-link: ${darkTheme.textLink};
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--fg-title);
      }

      a {
        color: var(--fg-link);
      }

      blockquote {
        padding-left: ${rhythm(1 / 2)};
        border-left: ${rhythm(1 / 8)} solid var(--fg-title);
      }

      .anchor {
        fill: var(--fg);
        margin-right: ${rhythm(1 / 8)};
      }

      hr {
        background: hsla(0,0%,0%,0.2);
        border: none;
        height: 1.5px;
      }
    `}
  />
)

export default GlobalStyle
