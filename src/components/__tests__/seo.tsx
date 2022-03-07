import React from "react"
import { useStaticQuery } from "gatsby"
import { render } from "@testing-library/react"
import Helmet from "react-helmet"
import SEO from "../seo"

describe("SEO", () => {
  const siteTitle = "siteTitle"
  const siteDescription = "sitedescription"
  const siteUrl = "siteUrl"
  const twitter = "twitter"
  beforeAll(() => {
    ;(useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
          title: siteTitle,
          siteUrl: siteUrl,
          description: siteDescription,
          social: {
            twitter: twitter,
          },
        },
      },
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("testing without argument", () => {
    render(<SEO />)
    const helmet = Helmet.peek()
    expect(helmet.htmlAttributes).toEqual({ lang: "ja" })
    expect(helmet.title).toBe(siteTitle)
    expect(helmet.metaTags).toContainEqual({
      content: siteDescription,
      name: "description",
    })
    expect(helmet.metaTags).toContainEqual({
      content: siteTitle,
      property: "og:title",
    })
    expect(helmet.metaTags).toContainEqual({
      content: siteDescription,
      property: "og:description",
    })
    expect(helmet.metaTags).toContainEqual({
      content: "website",
      property: "og:type",
    })
    expect(helmet.metaTags).toContainEqual({
      content: `${siteUrl}/logo-512.png`,
      property: "og:image",
    })
    expect(helmet.metaTags).toContainEqual({
      content: "summary",
      name: "twitter:card",
    })
    expect(helmet.metaTags).toContainEqual({
      content: twitter,
      name: "twitter:creator",
    })
    expect(helmet.metaTags).toContainEqual({
      content: siteTitle,
      name: "twitter:title",
    })
    expect(helmet.metaTags).toContainEqual({
      content: siteDescription,
      name: "twitter:description",
    })
  })

  it("testing with lang", () => {
    render(<SEO lang="en" />)
    const helmet = Helmet.peek()
    expect(helmet.htmlAttributes).toEqual({ lang: "en" })
  })

  it("testing with title", () => {
    const postTitle = "postTitle"
    const expectedTitle = `${postTitle} - ${siteTitle}`
    render(<SEO title={postTitle} />)
    const helmet = Helmet.peek()
    expect(helmet.title).toBe(expectedTitle)
    expect(helmet.metaTags).toContainEqual({
      content: expectedTitle,
      property: "og:title",
    })
    expect(helmet.metaTags).toContainEqual({
      content: "article",
      property: "og:type",
    })
    expect(helmet.metaTags).toContainEqual({
      content: expectedTitle,
      name: "twitter:title",
    })
  })

  it("testing with description", () => {
    const postDescription = "postDescription"
    render(<SEO description={postDescription} />)
    const helmet = Helmet.peek()
    expect(helmet.metaTags).toContainEqual({
      content: postDescription,
      name: "description",
    })
    expect(helmet.metaTags).toContainEqual({
      content: postDescription,
      property: "og:description",
    })
    expect(helmet.metaTags).toContainEqual({
      content: postDescription,
      name: "twitter:description",
    })
  })

  it("testing with meta", () => {
    const meta = [{ content: "hoge", name: "keywords" }]
    render(<SEO meta={meta} />)
    const helmet = Helmet.peek()
    expect(helmet.metaTags).toContainEqual(meta[0])
  })

  it("testing with noindex", () => {
    render(<SEO noindex={true} />)
    const helmet = Helmet.peek()
    expect(helmet.metaTags).toContainEqual({
      content: "noindex,follow",
      name: "robots",
    })
  })
})
