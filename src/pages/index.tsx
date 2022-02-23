import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ArticleLink, ArticleLinkType } from "../components/article-link"

type Props = {
  data: {
    allMdx: {
      nodes: Array<ArticleLinkType>
    }
  }
}

const Home: React.FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="All posts" />
      <h1>Home</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return (
            <li key={post.fields.slug}>
              <ArticleLink {...post} />
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { fields: { collection: { eq: "entries" } } }
    ) {
      nodes {
        ...EntryItems
      }
    }
  }
`
