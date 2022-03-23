import React from "react"
import { render } from "@testing-library/react"
import Tags from "../tags"

describe("Tags", () => {
  it("snapshot test1", () => {
    const { asFragment } = render(<Tags />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("snapshot test2", () => {
    const { asFragment } = render(
      <Tags tags={["tag1", "tag2", "tag3", "tag4", "tag5"]} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("matching tag", () => {
    const { container } = render(
      <Tags tags={["tag1", "tag2", "tag3", "tag4", "tag5"]} />
    )
    expect(container).toHaveTextContent("#tag1#tag2#tag3#tag4#tag5")
  })

  it("testing links to tags", () => {
    const tags = ["tag1", "tag2", "tag3", "tag4", "tag5"]
    const { container } = render(<Tags tags={tags} />)
    for (let tag of tags) {
      expect(container.innerHTML).toMatch(
        `<a aria-label="タグへのリンク" href="/tags/${tag}/">#${tag}</a>`
      )
    }
  })
})
