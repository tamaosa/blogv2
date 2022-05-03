const React = require("react")
const plugin = jest.requireActual("gatsby-plugin-image")
const mock = ({ className, ...props }) =>
  React.createElement("img", {
    ...props,
    className: className,
  })

module.exports = {
  ...plugin,
  GatsbyImage: jest.fn().mockImplementation(mock),
  StaticImage: jest.fn().mockImplementation(mock),
}
