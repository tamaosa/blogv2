import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ScrapItem, ScrapItemType } from "../components/article/scrap-item"

type Props = {
  data: {
    allMdx: {
      nodes: Array<ScrapItemType>
    }
  }
}

const ScrapIndexStyle = css`
  display: flex;
  flex-flow: row wrap;
`

const ScrapIndex: React.FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="Scrap" noindex={true} />
      <h1>Scrap</h1>
      <div css={ScrapIndexStyle}>
        {posts.map(post => {
          return <ScrapItem {...post} key={`/scraps${post.fields.slug}`} />
        })}
      </div>
    </Layout>
  )
}

export default ScrapIndex

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { fileAbsolutePath: { regex: "/scraps/" } }
    ) {
      nodes {
        ...ScrapItems
      }
    }
  }
`
