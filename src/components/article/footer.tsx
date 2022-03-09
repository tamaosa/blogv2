import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import Ad from "../../components/ad"
import { ArticleList } from "../../components/article-list"
import { Mdx } from "../../types/mdx"
import { scale, rhythm } from "../../utils/typography"

type Props = {
  post: Mdx<"title" | "published" | "updated" | "tags">
  relatedPosts: Array<Mdx<"title" | "published" | "updated" | "tags">>
  prevPost: Mdx<"title">
  nextPost: Mdx<"title">
}

const relatedStyle = css`
  text-align: center;
  font-weight: bold;
  font-size: ${scale(1 / 4).fontSize};
  margin-bottom: ${rhythm(1 / 4)};
`

const prevNextStyle = css`
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li:nth-of-type(2n) {
    margin-left: auto;
  }
`

const ArticleFooter: React.FC<Props> = ({
  post,
  relatedPosts,
  prevPost,
  nextPost,
}) => {
  return (
    <footer>
      <Ad path={post.fields.slug} />
      {relatedPosts.length > 0 && (
        <div>
          <div css={relatedStyle}>
            <span>関連記事</span>
          </div>
          <ArticleList posts={relatedPosts} />
        </div>
      )}
      <div css={prevNextStyle}>
        <ul>
          <li>
            {prevPost && (
              <Link to={prevPost.fields.slug} rel="prev">
                ← {prevPost.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {nextPost && (
              <Link to={nextPost.fields.slug} rel="next">
                {nextPost.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default ArticleFooter
