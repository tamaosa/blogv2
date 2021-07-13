import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Mdx } from "../types/mdx"
import { rhythm } from "../utils/typography"

type Props = {
  data: {
    mdx: Mdx<"title" | "published" | "updated">
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

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.mdx

  return (
    <Layout>
      <SEO title={post.frontmatter.title} noindex={true} />
      <article itemScope itemType="http://schema.org/Article">
        <header css={headerStyel}>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
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
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
