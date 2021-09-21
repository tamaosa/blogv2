import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Ad from "../components/ad"
import { Mdx } from "../types/mdx"
import { SiteMetadata } from "../types/site-metadata"
import { ArticleDate } from "../components/article/article-date"
import Tags from "../components/tags"
import { scale, rhythm } from "../utils/typography"
import { EntryItem, EntryItemType } from "../components/article/entry-item"

type Props = {
  data: {
    mdx: Mdx<"title" | "published" | "updated" | "tags">
    previous: Mdx<"title">
    next: Mdx<"title">
    allMdx: {
      nodes: Array<EntryItemType>
    }
    site: {
      siteMetadata: Pick<SiteMetadata, "repository">
    }
  }
}

const headerStyel = css`
  margin-bottom: ${rhythm(1)};
  div {
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

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.mdx
  const posts = data.allMdx.nodes
  const { previous, next } = data
  const { repository } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article itemScope itemType="http://schema.org/Article">
        <header css={headerStyel}>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <Tags tags={post.frontmatter?.tags} />
          <div>
            <ArticleDate
              published={post.frontmatter.published}
              updated={post.frontmatter?.updated}
            />
          </div>
        </header>
        <main css={mainStyle}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </main>
        <footer css={footerStyle}>
          <small>
            <a
              target="_blank"
              href={`${repository}/tree/master/content/entries${post.fields.slug}index.mdx`}
              rel="external noopener"
            >
              （GitHubで編集を提案）
            </a>
          </small>
        </footer>
      </article>
      <nav>
        <Ad path={post.fields.slug} />
        {posts.length > 0 && (
          <div>
            <div css={relatedStyle}>
              <span>関連記事</span>
            </div>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                return (
                  <li key={post.fields.slug}>
                    <EntryItem {...post} />
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
      fields {
        slug
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
        fields: { collection: { eq: "entries" } }
        frontmatter: { tags: { in: $tags } }
        id: { ne: $id }
      }
      limit: 5
    ) {
      nodes {
        ...EntryItems
      }
    }
    site {
      siteMetadata {
        repository
      }
    }
  }
`
