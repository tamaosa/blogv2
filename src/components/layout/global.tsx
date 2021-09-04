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
        --prism-fg: ${lightTheme.prismText};
        --prism-bg: ${lightTheme.prismBackGround};
        --prism-fg-token1: ${lightTheme.prismTextToken1};
        --prism-fg-token2: ${lightTheme.prismTextToken2};
        --prism-fg-token3: ${lightTheme.prismTextToken3};
        --prism-fg-token4: ${lightTheme.prismTextToken4};
        --prism-fg-token5: ${lightTheme.prismTextToken5};
        --prism-fg-token6: ${lightTheme.prismTextToken6};
        --prism-fg-token7: ${lightTheme.prismTextToken7};
      }

      body.dark-mode {
        --bg: ${darkTheme.backGround};
        --fg: ${darkTheme.textNormal};
        --fg-title: ${darkTheme.textTitle};
        --fg-link: ${darkTheme.textLink};
        --prism-fg: ${darkTheme.prismText};
        --prism-bg: ${darkTheme.prismBackGround};
        --prism-fg-token1: ${darkTheme.prismTextToken1};
        --prism-fg-token2: ${darkTheme.prismTextToken2};
        --prism-fg-token3: ${darkTheme.prismTextToken3};
        --prism-fg-token4: ${darkTheme.prismTextToken4};
        --prism-fg-token5: ${darkTheme.prismTextToken5};
        --prism-fg-token6: ${darkTheme.prismTextToken6};
        --prism-fg-token7: ${darkTheme.prismTextToken7};
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
        background: hsla(0, 0%, 0%, 0.2);
        border: none;
        height: 1.5px;
      }
    `}
  />
)

export default GlobalStyle
