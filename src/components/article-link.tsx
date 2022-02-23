import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/react"

import { ArticleDate } from "./article-date"
import Tags from "./tags"
import { Mdx } from "../types/mdx"
import { scale, rhythm } from "../utils/typography"

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

export const ArticleLink: React.FC<
  Mdx<"title" | "published" | "updated" | "tags">
> = ({ fields, frontmatter }) => {
  const title = frontmatter.title || fields.slug
  return (
    <article>
      <div css={titleStyle}>
        <Link to={fields.slug} aria-label="記事へのリンク">
          {title}
        </Link>
      </div>
      <div css={subTitleStyle}>
        <div>
          <ArticleDate
            published={frontmatter.published}
            updated={frontmatter?.updated}
          />
        </div>
        <div>
          <Tags tags={frontmatter?.tags} />
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
      published
      updated
      title
      tags
    }
  }
`
