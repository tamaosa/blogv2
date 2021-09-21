import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/react"

import { Mdx } from "../../types/mdx"
import { scale, rhythm } from "../../utils/typography"
import { ArticleDate } from "./article-date"
import Tags from "../tags"

export type EntryItemType = Pick<
  Mdx<"title" | "published" | "updated" | "tags">,
  "fields" | "frontmatter"
>

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
  margin: ${rhythm(1 / 4)} 0 ${rhythm(1 / 4)} ${rhythm(1 / 2)};
`

export const EntryItem: React.FC<EntryItemType> = ({ fields, frontmatter }) => {
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
  fragment EntryItems on Mdx {
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
