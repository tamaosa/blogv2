import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"
import { Mdx } from "../types/mdx"

type Props = {
  data: {
    mdx: Mdx<"title" | "published" | "updated" | "tags">
    previous: Mdx<"title">
    next: Mdx<"title">
    allMdx: {
      nodes: Array<Mdx<"title" | "published" | "updated" | "tags">>
    }
  }
}

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.mdx
  const posts = data.allMdx.nodes
  const { previous, next } = data

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Article
        post={post}
        relatedPosts={posts}
        prevPost={previous}
        nextPost={next}
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $tags: [String]
  ) {
    mdx(id: { eq: $id }) {
      id
      excerpt(truncate: true, pruneLength: 160)
      body
      frontmatter {
        title
        published
        updated
        tags
      }
      fields {
        slug
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: {
        fields: { collection: { eq: "entries" } }
        frontmatter: { tags: { in: $tags } }
        id: { ne: $id }
      }
      limit: 5
    ) {
      nodes {
        ...ArticleLink
      }
    }
  }
`
