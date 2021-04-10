import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/react"

import { Mdx } from "../../types/mdx"
import { rhythm } from "../../utils/typography"
import { ArticleDate } from "./article-date"
import Tags from "../tags"

export type ArticleItemType = Pick<
  Mdx<"title" | "published" | "updated" | "tags">,
  "fields" | "frontmatter"
>

const titleStyle = css`
  a {
    color: var(--fg-title);
    text-decoration: none;
  }
`

const subTitleStyle = css`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 0 0 ${rhythm(1 / 8)} ${rhythm(1 / 2)};

  p {
    margin: 0 ${rhythm(1 / 4)} 0 0;
    padding: 0;
  }
`

export const ArticleItem: React.FC<ArticleItemType> = ({
  fields,
  frontmatter,
}) => {
  const title = frontmatter.title || fields.slug
  return (
    <article>
      <div css={titleStyle}>
        <h3>
          <Link to={fields.slug} aria-label="記事へのリンク">
            {title}
          </Link>
        </h3>
      </div>
      <div css={subTitleStyle}>
        <div>
          <p>
            <ArticleDate
              published={frontmatter.published}
              updated={frontmatter?.updated}
            />
          </p>
        </div>
        <div>
          <Tags tags={frontmatter?.tags} />
        </div>
      </div>
    </article>
  )
}

export const query = graphql`
  fragment ArticleItems on Mdx {
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
