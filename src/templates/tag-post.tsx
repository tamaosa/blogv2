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
  pageContext: {
    tag: string
    count: string
  }
}

const TagPost: React.FC<Props> = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes
  const { tag, count } = pageContext

  return (
    <Layout>
      <SEO title={tag} noindex={true} />
      <h1>
        #{tag}({count})
      </h1>
      <ArticleList posts={posts} />
    </Layout>
  )
}

export default TagPost

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: {
        fields: { collection: { eq: "entries" } }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      nodes {
        ...ArticleLink
      }
    }
  }
`
