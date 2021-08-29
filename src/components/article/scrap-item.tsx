import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/react"

import { Mdx } from "../../types/mdx"
import { rhythm, scale } from "../../utils/typography"
import { ArticleDate } from "./article-date"

export type ScrapItemType = Pick<
  Mdx<"title" | "published">,
  "fields" | "frontmatter"
>

const scrapStyle = css`
  max-width: 40%;
  margin: ${rhythm(1 / 8)};
  padding: ${rhythm(1 / 8)};
  border: 2.5px solid hsla(0, 0%, 0%, 0.2);
  border-radius: 5px;
  transition: all 0.2s;
  a {
    color: var(--fg);
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.03, 1.03);
  }
`

const titleStyle = css`
  color: var(--fg-title);
  margin: 0 0 ${rhythm(1 / 8)} 0;
  font-weight: bold;
  line-height: 1;
`

const dateStyle = css`
  margin: 0;
  font-size: ${scale(-1 / 2).fontSize};
`

export const ScrapItem: React.FC<ScrapItemType> = ({ fields, frontmatter }) => {
  const title = frontmatter.title || fields.slug
  return (
    <article css={scrapStyle}>
      <Link to={fields.slug} aria-label="記事へのリンク">
        <div css={titleStyle}>{title}</div>
        <div css={dateStyle}>
          <ArticleDate published={frontmatter.published} />
        </div>
      </Link>
    </article>
  )
}

export const query = graphql`
  fragment ScrapItems on Mdx {
    fields {
      slug
    }
    frontmatter {
      published
      title
    }
  }
`
