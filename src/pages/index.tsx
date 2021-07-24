import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { EntryItem, EntryItemType } from "../components/article/entry-item"

type Props = {
  data: {
    allMdx: {
      nodes: Array<EntryItemType>
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
              <EntryItem {...post} />
            </li>
          )
        })}
      </ol>
      <small
        css={css`
          margin: 0;
          float: right;
        `}
      >
        <Link to="/scrap">scrap→</Link>
      </small>
    </Layout>
  )
}

export default BlogIndex

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
