import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import { rhythm } from "../utils/typography"

type Props = {
  tags?: string[]
}

const tagsStyle = css`
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  margin: 0;

  li {
    margin: 0 ${rhythm(1 / 4)} 0 0;
  }

  a {
    color: var(--fg);
    border: solid 2px var(--fg);
    border-radius: 10px;
    padding: ${rhythm(1 / 8)};
    text-decoration: none;
  }

  a: hover {
    color: var(--bg);
    background: var(--fg-title);
    border: solid 2px var(--fg-title);
  }
`

const Tags: React.FunctionComponent<Props> = ({ tags }) => {
  return (
    <div>
      <ul css={tagsStyle}>
        {tags &&
          tags.map(tag => (
            <li key={tag}>
              <Link aria-label="タグへのリンク" to={`/tags/${tag}/`}>
                #{tag}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Tags
