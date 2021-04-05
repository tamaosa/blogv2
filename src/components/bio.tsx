import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { css } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { rhythm, scale } from "../utils/typography"
import { SiteMetadata } from "../types/site-metadata"

const BioStyle = css`
  display: flex;
  flex-flow: row nowrap;
`

const avatorStyle = css`
  margin: 0 ${rhythm(1 / 2)} 0 0;
`

const authorStyle = css`
  margin: 0;
  & > a {
    display: inline-block;
    color: var(--fg);
    width: ${rhythm(3 / 4)};
    margin-left: ${rhythm(1 / 4)};
  }
  & > p {
    margin: 0;
    font-size: ${scale(-1 / 8).fontSize};
    line-height: ${scale(-1 / 8).lineHeight};
  }
`

const Bio: React.FC = () => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: Pick<SiteMetadata, "author" | "social">
    }
  }>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <div css={BioStyle}>
      <div css={avatorStyle}>
        <StaticImage
          layout="fixed"
          src="../../content/images/avator.png"
          width={72}
          height={72}
          quality={95}
          alt="プロフィール画像"
          style={{
            margin: 0,
            padding: 0,
            minWidth: 50,
            borderRadius: "50%",
          }}
        />
      </div>
      <div css={authorStyle}>
        <strong>{author.name}</strong>

        <a
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="external noopener"
          aria-label={`GitHubアカウント`}
        >
          <FontAwesomeIcon icon={["fab", "github"]} />
        </a>
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="external noopener"
          aria-label={`Twitterアカウント`}
        >
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </a>
        <p>{author.summary}</p>
      </div>
    </div>
  )
}

export default Bio
