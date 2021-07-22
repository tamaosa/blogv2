import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  ArticleItem,
  ArticleItemType,
} from "../components/article/article-item"

type Props = {
  data: {
    allMdx: {
      nodes: Array<ArticleItemType>
    }
  }
}

const BlogIndex: React.FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="All posts" />
      <h1>Home</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return (
            <li key={post.fields.slug}>
              <ArticleItem {...post} />
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
        ...ArticleItems
      }
    }
  }
`
