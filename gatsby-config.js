module.exports = {
  siteMetadata: {
    title: `tamaosa.com`,
    author: {
      name: `tamaosa`,
      summary: `釣りと登山が好き。`,
    },
    description: `tamaosa's blog!`,
    siteUrl: `https://www.tamaosa.com`,
    social: {
      twitter: `_tamaosa`,
      github: `tamaosa`
    },
    repository: `https://github.com/tamaosa/blogv2`
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/entries`,
        name: `entries`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `scraps`,
        path: `${__dirname}/content/scraps`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              className: `anchor`,
              maintainCase: true,
              removeAccents: true,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              rel: "external noopener",
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          'gatsby-remark-numbered-footnotes',
        ],
        remarkPlugins: [
          require('remark-math'),
          require('remark-html-katex'),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.published,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___published] }
                  filter: {fields: {collection: {eq: "entries"}}}
                ) {
                  nodes {
                    excerpt(truncate: true)
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      published
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tamaosa.com`,
        short_name: `tamaosa`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#7ecef5`,
        display: `minimal-ui`,
        icon: `content/images/logo-1024.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true,
      },
    },
    `gatsby-plugin-use-dark-mode`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: 'Googlebot-Image', disallow: '/' }, { userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/tags/*`, `/scrap`, `/scraps/*`],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#7ecef5`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-plugin-preact`,
  ],
}
