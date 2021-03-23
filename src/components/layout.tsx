import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="global-wrapper" data-is-root-path={true}>
      <header className="global-header">
        <h1 className="main-heading">
          <Link to="/">{site.siteMetadata.title}</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
