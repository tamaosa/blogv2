import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import { SiteMetadata } from "../types/site-metadata"

type Props = {
  description?: string
  lang?: string
  meta?: any[]
  title?: string
  noindex?: boolean
}

const SEO: React.FC<Props> = ({
  description,
  lang = "ja",
  meta = [],
  title,
  noindex = false,
}) => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: Pick<
        SiteMetadata,
        "title" | "siteUrl" | "description" | "social"
      >
    }
  }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title
    ? `${title} - ${site.siteMetadata.title}`
    : site.siteMetadata.title
  const metaType = title ? `article` : `website`
  const metaNoindex = noindex
    ? [
        {
          name: `robots`,
          content: `noindex,follow`,
        },
      ]
    : []

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      link={[
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/logo-512.png",
        },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: metaType,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteUrl}/logo-512.png`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(metaNoindex, meta)}
    />
  )
}

export default SEO
