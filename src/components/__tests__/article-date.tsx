import React from "react"
import { render } from "@testing-library/react"
import { ArticleDate } from "../article-date"

describe("ArticleDate", () => {
  it("snapshot test1", () => {
    const { asFragment } = render(<ArticleDate published="2022-01-01" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("snapshot test2", () => {
    const { asFragment } = render(
      <ArticleDate published="2022-01-01" updated="2022-12-31" />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("matching publication date", () => {
    const { container } = render(<ArticleDate published="2022-01-01" />)
    expect(container).toHaveTextContent("2022年1月1日 公開")
  })

  it("matching update date", () => {
    const { container } = render(
      <ArticleDate published="2022-01-01" updated="2022-12-31" />
    )
    expect(container).toHaveTextContent("2022年12月31日 更新")
  })
})
