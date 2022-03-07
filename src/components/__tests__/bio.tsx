import React from "react"
import { useStaticQuery } from "gatsby"
import { render } from "@testing-library/react"
import Bio from "../bio"

describe("Bio", () => {
  const name = "tamaosa"
  const summary = "summary"
  const twitter = "twitter"
  const github = "github"
  beforeAll(() => {
    ;(useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
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
    const { asFragment } = render(<Bio />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("matching name", () => {
    const { container } = render(<Bio />)
    expect(container).toHaveTextContent(name)
  })

  it("matching summary", () => {
    const { container } = render(<Bio />)
    expect(container).toHaveTextContent(summary)
  })

  it("testing link to github", () => {
    const { container } = render(<Bio />)
    expect(container.innerHTML).toMatch(
      `<a href="https://github.com/${github}" target="_blank" rel="external noopener" aria-label="GitHubアカウント">`
    )
  })

  it("testing link to twitter", () => {
    const { container } = render(<Bio />)
    expect(container.innerHTML).toMatch(
      `<a href="https://twitter.com/${twitter}" target="_blank" rel="external noopener" aria-label="Twitterアカウント">`
    )
  })
})
