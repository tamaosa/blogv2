import React from "react"
import { Link, graphql } from "gatsby"

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
      <SEO title="Noindex Pages" noindex={true} />
      <h1>Noindex Pages</h1>
      <p>公開されないかわいそうな記事たちが集まってくる場所</p>
      <ul>
        {posts.map(post => {
          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug} aria-label="記事へのリンク">
                {post.frontmatter.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { frontmatter: { noindex: { eq: true } } }
    ) {
      nodes {
        ...ArticleItems
      }
    }
  }
`
