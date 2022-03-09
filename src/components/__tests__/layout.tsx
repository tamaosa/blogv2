import React from "react"
import { useStaticQuery } from "gatsby"
import { render, fireEvent } from "@testing-library/react"
import Layout from "../layout"

describe("Layout", () => {
  const siteTitle = "siteTitle"
  const name = "tamaosa"
  const summary = "summary"
  const twitter = "twitter"
  const github = "github"
  beforeAll(() => {
    ;(useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
          title: siteTitle,
          author: {
            name: name,
            summary: summary,
          },
          social: {
            twitter: twitter,
            github: github,
          },
        },
      },
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("snapshot test", () => {
    const { asFragment } = render(<Layout />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("testing link to home", () => {
    const { container } = render(<Layout />)
    expect(container.innerHTML).toMatch(`<a href="/">${siteTitle}</a>`)
  })

  it("testing onclick light/dark button", () => {
    const { container, getByText } = render(<Layout />)
    expect(container).toHaveTextContent("🌞")
    fireEvent.click(getByText("🌞"))
    expect(container).toHaveTextContent("🌛")
    fireEvent.click(getByText("🌛"))
    expect(container).toHaveTextContent("🌞")
  })

  it("testing link to privacy policy", () => {
    const { container } = render(<Layout />)
    expect(container.innerHTML).toMatch(
      `<a href="/privacy-policy">Privacy Policy</a>`
    )
  })

  it("testing copyright", () => {
    const { container } = render(<Layout />)
    expect(container).toHaveTextContent("© 2019 tamaosa")
  })
})
