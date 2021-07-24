import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { EntryItem, EntryItemType } from "../components/article/entry-item"

type Props = {
  data: {
    allMdx: {
      nodes: Array<EntryItemType>
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
      <SEO title={tag} />
      <h1>
        #{tag}({count})
      </h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return (
            <li key={post.fields.slug}>
              <EntryItem {...post} />
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TagPost

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/entries/" }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      nodes {
        ...EntryItems
      }
    }
  }
`
