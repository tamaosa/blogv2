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
        ...EntryItems
      }
    }
  }
`
