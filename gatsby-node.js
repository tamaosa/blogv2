const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const tagPost = path.resolve(`./src/templates/tag-post.tsx`)
  const scrapPost = path.resolve(`./src/templates/scrap-post.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        blogs: allMdx(
          sort: { fields: [frontmatter___published], order: DESC }
          filter: {fields: {collection: {eq: "entries"}}}
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
        tags: allMdx(filter: {fields: {collection: {eq: "entries"}}}) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
        scraps: allMdx(
          sort: { fields: [frontmatter___published], order: DESC }
          filter: {fields: {collection: {eq: "scraps"}}}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.blogs.nodes
  const tags = result.data.tags.group
  const scraps = result.data.scraps.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const nextPostId = index === 0 ? null : posts[index - 1].id
      const previousPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          tags: post.frontmatter.tags,
        },
      })
    })
  }

  if (tags.length > 0) {
    tags.forEach((tag) => {
      createPage({
        path: `/tags/${tag.fieldValue}/`,
        component: tagPost,
        context: {
          tag: tag.fieldValue,
          count: tag.totalCount,
        },
      })
    })
  }

  if (scraps.length > 0) {
    scraps.forEach((post) => {
      createPage({
        path: post.fields.slug,
        component: scrapPost,
        context: {
          id: post.id,
        },
      })
    })
  }

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const filePath = createFilePath({ node, getNode })
    const instanceName = getNode(node.parent).sourceInstanceName

    createNodeField({
      name: `slug`,
      node,
      value: instanceName === "scraps" ? `/scraps${filePath}` : filePath,
    })

    createNodeField({
      name: `collection`,
      node,
      value: instanceName,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "Mdx" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      title: String
      author: Author
      description: String
      siteUrl: String
      social: Social
      repository: String
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      github: String
    }

    type Mdx implements Node {
      id: String
      body: String
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      published: Date @dateformat
      updated: Date @dateformat
      tags: [String]
    }

    type Fields {
      slug: String
    }
  `)
}
