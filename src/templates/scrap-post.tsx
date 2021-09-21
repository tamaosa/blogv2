import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Mdx } from "../types/mdx"
import { ArticleDate } from "../components/article/article-date"
import { rhythm } from "../utils/typography"

type Props = {
  data: {
    mdx: Mdx<"title" | "published">
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
  hr {
    margin-top: ${rhythm(1)};
  }
`

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.mdx

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        noindex={true}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header css={headerStyel}>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div>
            <ArticleDate published={post.frontmatter.published} />
          </div>
        </header>
        <main css={mainStyle}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </main>
        <footer css={footerStyle}></footer>
      </article>
      <nav>
        <small>
          <Link to="/scrap">←scrap</Link>
        </small>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ScrapPostBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(truncate: true, pruneLength: 160)
      body
      frontmatter {
        title
        published
      }
    }
  }
`
