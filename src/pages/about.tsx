import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SiteMetadata } from "../types/site-metadata"

const AboutPage: React.FC = () => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: Pick<SiteMetadata, "siteUrl" | "social" | "repository">
    }
  }>(graphql`
    query AboutQuery {
      site {
        siteMetadata {
          siteUrl
          social {
            twitter
            github
          }
          repository
        }
      }
    }
  `)
  const { siteUrl, social, repository } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title="About" />
      <h1>About</h1>
      <h2>著者について</h2>
      <p>
        某メーカーの見習いソフトウェア開発者です。業務では開発製品のソフトウェアに関連することは全部やることになるらしい…
      </p>
      <h2>作ったものとか</h2>
      <h3>
        <a
          href={siteUrl}
          target="_blank"
          rel="external noopener"
          aria-label={`ブログ`}
        >
          このブログ
        </a>
      </h3>
      <p>
        このブログです。実は一度作り変えています。
        <a
          href={`https://github.com/gatsbyjs/gatsby-starter-blog`}
          target="_blank"
          rel="external noopener"
          aria-label={`gatsby-starter-blog`}
        >
          gatsby-starter-blog
        </a>
        をベースに作成しました。（われながら）ダークモードの配色が気に入っています。
      </p>
      <h3>
        <a
          href={`https://tidey.netlify.app/`}
          target="_blank"
          rel="external noopener"
          aria-label={`Tidey`}
        >
          Tidey
        </a>
      </h3>
      <p>
        （⚠️もう更新してない）タイドグラフを表示するだけのサイトです。ある程度は自分で作った？はじめてのサイトです。釣りが趣味なので作りました。
      </p>
      <h2>リンク</h2>
      <ul>
        <li>
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="external noopener"
            aria-label={`Twitterアカウント`}
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="external noopener"
            aria-label={`GitHubアカウント`}
          >
            GitHub
          </a>
        </li>
      </ul>
      <h2>お願い</h2>
      <p>
        「記事の内容が誤っている」「誤字がある」などなど当サイトへのご意見ご要望がありましたら
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="external noopener"
          aria-label={`Twitterアカウント`}
        >
          Twitter
        </a>
        などからお気軽にご連絡ください。とくに
        <a target="_blank" href={repository} rel="external noopener">
          GitHub
        </a>
        からPRをいただけると大変ありがたいです。
      </p>
    </Layout>
  )
}

export default AboutPage
