import React from "react"
import { render } from "@testing-library/react"
import Ad from "../ad"

describe("Ad", () => {
  it("snapshot test", () => {
    const { asFragment } = render(<Ad />)
    expect(asFragment()).toMatchSnapshot()
  })
})
