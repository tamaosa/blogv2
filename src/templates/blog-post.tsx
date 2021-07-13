import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Mdx } from "../types/mdx"
import { ArticleDate } from "../components/article/article-date"
import Tags from "../components/tags"
import { rhythm } from "../utils/typography"
import {
  ArticleItem,
  ArticleItemType,
} from "../components/article/article-item"

type Props = {
  data: {
    mdx: Mdx<"title" | "published" | "updated" | "tags">
    previous: Mdx<"title">
    next: Mdx<"title">
    allMdx: {
      nodes: Array<ArticleItemType>
    }
  }
}

const headerStyel = css`
  margin-bottom: ${rhythm(1)};
  p {
    text-align: right;
  }
`

const mainStyle = css`
  margin-bottom: ${rhythm(1)};
`

const footerStyle = css`
  text-align: right;
  margin-bottom: ${rhythm(1)};
  hr {
    margin-top: ${rhythm(1)};
  }
`

const relatedStyle = css`
  h2 {
    color: var(--fg);
    text-align: center;
  }
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

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.mdx
  const posts = data.allMdx.nodes
  const { previous, next } = data

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article itemScope itemType="http://schema.org/Article">
        <header css={headerStyel}>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <Tags tags={post.frontmatter?.tags} />
          <p>
            <ArticleDate
              published={post.frontmatter.published}
              updated={post.frontmatter?.updated}
            />
          </p>
        </header>
        <main css={mainStyle}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </main>
        <footer css={footerStyle}>
          <small>
            <a
              target="_blank"
              href={`https://github.com/tamaosa/blogv2/discussions`}
              rel="external noopener"
            >
              （GitHubでディスカッションを開始）
            </a>
          </small>
          <hr />
        </footer>
      </article>
      <nav>
        {posts.length > 0 && (
          <div css={relatedStyle}>
            <h2>関連記事</h2>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                return (
                  <li key={post.fields.slug}>
                    <ArticleItem {...post} />
                  </li>
                )
              })}
            </ol>
          </div>
        )}
        <div css={prevNextStyle}>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $tags: [String]
  ) {
    mdx(id: { eq: $id }) {
      id
      excerpt(truncate: true, pruneLength: 160)
      body
      frontmatter {
        title
        published
        updated
        tags
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: {
        frontmatter: { noindex: { ne: true }, tags: { in: $tags } }
        id: { ne: $id }
      }
      limit: 5
    ) {
      nodes {
        ...ArticleItems
      }
    }
  }
`
