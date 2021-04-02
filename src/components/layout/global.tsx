import React from "react"
import { Global, css } from "@emotion/react"

import { lightTheme, darkTheme } from "../../utils/constants"
import { rhythm } from "../../utils/typography"

const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      body {
        --bg: ${lightTheme.backGround};
        --fg: ${lightTheme.textNormal};
        --fg-title: ${lightTheme.textTitle};
        --fg-link: ${lightTheme.textLink};

        background-color: var(--bg);
        color: var(--fg);
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
    `}
  />
)

export default GlobalStyle