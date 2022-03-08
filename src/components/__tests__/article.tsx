import React from "react"
import { useStaticQuery } from "gatsby"
import { render, screen } from "@testing-library/react"
import Article from "../article"

describe("Article", () => {
  const post = (slug: string) => {
    return {
      id: "id",
      excerpt: "excerpt",
      body: "body",
      frontmatter: {
        title: "title",
        published: "2022-01-01",
        updated: "2022-12-31",
        tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
      },
      fields: {
        slug: slug,
      },
    }
  }

  const repository = "repository"

  beforeAll(() => {
    ;(useStaticQuery as jest.Mock).mockReturnValue({
      site: {
        siteMetadata: {
          repository: repository,
        },
      },
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("snapshot test", () => {
    const { asFragment } = render(
      <Article
        post={post("/slug1/")}
        relatedPosts={[post("/slug2/")]}
        prevPost={post("/slug3/")}
        nextPost={post("/slug4/")}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("testing title", () => {
    const { container } = render(
      <Article
        post={post("/slug1/")}
        relatedPosts={[post("/slug2/")]}
        prevPost={post("/slug3/")}
        nextPost={post("/slug4/")}
      />
    )
    expect(container.innerHTML).toMatch(`<h1 itemprop="headline">title</h1>`)
  })

  it("testing link to github", () => {
    const { container } = render(
      <Article
        post={post("/slug1/")}
        relatedPosts={[post("/slug2/")]}
        prevPost={post("/slug3/")}
        nextPost={post("/slug4/")}
      />
    )
    expect(container.innerHTML).toMatch(
      `<a target="_blank" href="repository/tree/master/content/entries/slug1/index.mdx" rel="external noopener">（GitHubで編集を提案）</a>`
    )
  })

  it("testing no related post", () => {
    const { container } = render(
      <Article
        post={post("/slug1/")}
        relatedPosts={[]}
        prevPost={post("/slug2/")}
        nextPost={post("/slug3/")}
      />
    )
    expect(container).not.toHaveTextContent("関連記事")
    const posts = screen.queryAllByTestId("article-link")
    expect(posts.length).toEqual(0)
  })

  it("testing related post", () => {
    const { container } = render(
      <Article
        post={post("/slug1/")}
        relatedPosts={[post("/slug2/"), post("/slug3/"), post("/slug4/")]}
        prevPost={post("/slug5/")}
        nextPost={post("/slug6/")}
      />
    )
    expect(container).toHaveTextContent("関連記事")
    const posts = screen.queryAllByTestId("article-link")
    expect(posts.length).toEqual(3)
  })

  it("testing link to prevPost", () => {
    const { container } = render(
      <Article
        post={post("/slug1/")}
        relatedPosts={[post("/slug2/")]}
        prevPost={post("/slug3/")}
        nextPost={post("/slug4/")}
      />
    )
    expect(container.innerHTML).toMatch(
      `<a rel="prev" href="/slug3/">← title</a>`
    )
  })

  it("testing link to nextPost", () => {
    const { container } = render(
      <Article
        post={post("/slug1/")}
        relatedPosts={[post("/slug2/")]}
        prevPost={post("/slug3/")}
        nextPost={post("/slug4/")}
      />
    )
    expect(container.innerHTML).toMatch(
      `<a rel="next" href="/slug4/">title →</a>`
    )
  })
})
