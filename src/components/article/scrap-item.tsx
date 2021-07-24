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
  width: 120px;
  margin: ${rhythm(1 / 8)};
  padding: ${rhythm(1 / 8)};
  font-size: ${scale(-1 / 2).fontSize};
  background: hsla(0, 0%, 0%, 0.01);
  transition: all 0.2s;
  a {
    color: var(--fg);
    text-decoration: none;
  }
  h3 {
    margin: 0 0 ${rhythm(1 / 4)} 0;
    font-size: ${scale(0).fontSize};
  }
  p {
    margin: 0 0 ${rhythm(1 / 4)} 0;
  }
  &:hover {
    transform: scale(1.1, 1.1);
  }
`

export const ScrapItem: React.FC<ScrapItemType> = ({ fields, frontmatter }) => {
  const title = frontmatter.title || `/scraps${fields.slug}`
  return (
    <article css={scrapStyle}>
      <Link to={`/scraps${fields.slug}`} aria-label="記事へのリンク">
        <h3>{title}</h3>
        <p>
          <ArticleDate published={frontmatter.published} />
        </p>
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
