import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ArticleList } from "../components/article-list"
import { Mdx } from "../types/mdx"

type Props = {
  data: {
    allMdx: {
      nodes: Array<Mdx<"title" | "published" | "updated" | "tags">>
    }
  }
}

const Home: React.FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="All posts" />
      <h1>Home</h1>
      <ArticleList posts={posts} />
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
        ...ArticleLink
      }
    }
  }
`
