import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Mdx } from "../types/mdx"

type Props = {
  data: {
    allMdx: {
      nodes: Array<
        Pick<
          Mdx<"title" | "published" | "updated" | "tags">,
          "fields" | "frontmatter"
        >
      >
    }
  }
}

const BlogIndex: React.FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <h2>
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <small>{post.frontmatter.published}</small>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___published], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          published(formatString: "YYYY/MM/DD")
          title
        }
      }
    }
  }
`
