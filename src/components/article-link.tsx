import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/react"

import { ArticleDate } from "./article-date"
import Tags from "./tags"
import { scale, rhythm } from "../utils/typography"

type Props = {
  slug: string
  title: string
  published: string
  updated?: string
  tags?: string[]
}

const titleStyle = css`
  font-size: ${scale(3 / 8).fontSize};
  font-weight: bold;
  line-height: 1;
  a {
    color: var(--fg-title);
    text-decoration: none;
  }
`

const subTitleStyle = css`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  font-size: ${scale(-1 / 4).fontSize};
  margin: ${rhythm(1 / 4)} 0 ${rhythm(1 / 2)} 0;
`

export const ArticleLink: React.FC<Props> = ({
  slug,
  title,
  published,
  updated,
  tags,
}) => {
  return (
    <article>
      <div css={titleStyle}>
        <Link to={slug} aria-label="記事へのリンク">
          {title}
        </Link>
      </div>
      <div css={subTitleStyle}>
        <div>
          <ArticleDate published={published} updated={updated} />
        </div>
        <div>
          <Tags tags={tags} />
        </div>
      </div>
    </article>
  )
}

export const query = graphql`
  fragment ArticleLink on Mdx {
    fields {
      slug
    }
    frontmatter {
      title
      published
      updated
      tags
    }
  }
`
