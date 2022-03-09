import React from "react"
import { render, screen } from "@testing-library/react"
import { ArticleList } from "../article-list"

describe("ArticleList", () => {
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

  it("snapshot test1", () => {
    const { asFragment } = render(<ArticleList posts={[]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("snapshot test2", () => {
    const { asFragment } = render(
      <ArticleList
        posts={[post("/slug1/"), post("/slug2/"), post("/slug3/")]}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("testing no elements", () => {
    render(<ArticleList posts={[]} />)
    const posts = screen.queryAllByTestId("article-link")
    expect(posts.length).toEqual(0)
  })

  it("testing number of elements", () => {
    render(
      <ArticleList
        posts={[post("/slug1/"), post("/slug2/"), post("/slug3/")]}
      />
    )
    const posts = screen.queryAllByTestId("article-link")
    expect(posts.length).toEqual(3)
  })
})
