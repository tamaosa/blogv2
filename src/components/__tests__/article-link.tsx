import React from "react"
import { render } from "@testing-library/react"
import { ArticleLink } from "../article-link"

describe("ArticleLink", () => {
  it("snapshot test1", () => {
    const { asFragment } = render(
      <ArticleLink slug="/slug" title="tile" published="2022-01-01" />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("snapshot test2", () => {
    const { asFragment } = render(
      <ArticleLink
        slug="/slug"
        title="tile"
        published="2022-01-01"
        updated="2022-12-31"
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("snapshot test3", () => {
    const { asFragment } = render(
      <ArticleLink
        slug="/slug"
        title="tile"
        published="2022-01-01"
        updated="2022-12-31"
        tags={["tag1", "tag2", "tag3", "tag4", "tag5"]}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("matching title", () => {
    const { container } = render(
      <ArticleLink slug="/slug" title="tile" published="2022-01-01" />
    )
    expect(container).toHaveTextContent("tile")
  })

  it("matching publication date", () => {
    const { container } = render(
      <ArticleLink slug="/slug" title="tile" published="2022-01-01" />
    )
    expect(container).toHaveTextContent("2022年1月1日 公開")
  })

  it("matching update date", () => {
    const { container } = render(
      <ArticleLink
        slug="/slug"
        title="tile"
        published="2022-01-01"
        updated="2022-12-31"
      />
    )
    expect(container).toHaveTextContent("2022年12月31日 更新")
  })

  it("matching tags", () => {
    const { container } = render(
      <ArticleLink
        slug="/slug"
        title="tile"
        published="2022-01-01"
        updated="2022-12-31"
        tags={["tag1", "tag2", "tag3", "tag4", "tag5"]}
      />
    )
    expect(container).toHaveTextContent("#tag1#tag2#tag3#tag4#tag5")
  })

  it("testing link to a article", () => {
    const slug = "/slug"
    const title = "title"
    const { container } = render(
      <ArticleLink slug={slug} title={title} published="2022-01-01" />
    )
    expect(container.innerHTML).toMatch(
      `<a aria-label="記事へのリンク" href="${slug}">${title}</a>`
    )
  })

  it("testing links to tags", () => {
    const tags = ["tag1", "tag2", "tag3", "tag4", "tag5"]
    const { container } = render(
      <ArticleLink
        slug="/slug"
        title="tile"
        published="2022-01-01"
        updated="2022-12-31"
        tags={tags}
      />
    )
    for (let tag of tags) {
      expect(container.innerHTML).toMatch(
        `<a aria-label="タグへのリンク" href="/tags/${tag}/">#${tag}</a>`
      )
    }
  })
})
