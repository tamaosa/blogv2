import React from "react"
import { css } from "@emotion/react"

import { ArticleDate } from "../../components/article-date"
import Tags from "../../components/tags"
import { Frontmatter } from "../../types/mdx"
import { rhythm } from "../../utils/typography"

const style = css`
  margin-bottom: ${rhythm(1)};
  div {
    text-align: right;
    margin-top: ${rhythm(1 / 2)};
  }
`

const ArticleHeader: React.FC<Frontmatter> = ({
  title,
  tags,
  published,
  updated,
}) => {
  return (
    <div css={style}>
      <h1 itemProp="headline">{title}</h1>
      <Tags tags={tags} />
      <div>
        <ArticleDate published={published} updated={updated} />
      </div>
    </div>
  )
}

export default ArticleHeader
