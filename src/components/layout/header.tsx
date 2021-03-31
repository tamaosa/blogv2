import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/react"

const Header: React.FC = () => {
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
    <header className="global-header">
      <h1 className="main-heading">
        <Link to="/">{site.siteMetadata.title}</Link>
      </h1>
    </header>
  )
}

export default Header
