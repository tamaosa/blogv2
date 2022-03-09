import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/react"

import ArticleHeader from "./header"
import ArticleFooter from "./footer"
import { Mdx } from "../../types/mdx"
import { SiteMetadata } from "../../types/site-metadata"
import { rhythm } from "../../utils/typography"

type Props = {
  post: Mdx<"title" | "published" | "updated" | "tags">
  relatedPosts: Array<Mdx<"title" | "published" | "updated" | "tags">>
  prevPost: Mdx<"title">
  nextPost: Mdx<"title">
}

const style = css`
  margin-bottom: ${rhythm(1)};
  div:last-child {
    text-align: right;
    margin-bottom: ${rhythm(1)};
    a {
      font-size: small;
    }
  }
`

const Article: React.FC<Props> = ({
  post,
  relatedPosts,
  prevPost,
  nextPost,
}) => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: Pick<SiteMetadata, "repository">
    }
  }>(graphql`
    query ArticleQuery {
      site {
        siteMetadata {
          repository
        }
      }
    }
  `)

  const { repository } = data.site.siteMetadata

  return (
    <article itemScope itemType="http://schema.org/Article">
      <ArticleHeader
        title={post.frontmatter.title}
        tags={post.frontmatter?.tags}
        published={post.frontmatter.published}
        updated={post.frontmatter?.updated}
      />
      <main css={style}>
        <MDXRenderer>{post.body}</MDXRenderer>
        <div>
          <a
            target="_blank"
            href={`${repository}/tree/master/content/entries${post.fields.slug}index.mdx`}
            rel="external noopener"
          >
            （GitHubで編集を提案）
          </a>
        </div>
      </main>
      <ArticleFooter
        post={post}
        relatedPosts={relatedPosts}
        prevPost={prevPost}
        nextPost={nextPost}
      />
    </article>
  )
}

export default Article
