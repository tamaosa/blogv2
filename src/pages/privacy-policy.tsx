import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SiteMetadata } from "../types/site-metadata"

const PrivacyPolicyPage: React.FC = () => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: Pick<SiteMetadata, "social">
    }
  }>(graphql`
    query PrivacyPolicyQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title="Privacy Policy" />
      <h1>Privacy Policy</h1>
      <h2>アクセス解析ツールについて</h2>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
        <a
          href={
            "https://marketingplatform.google.com/about/analytics/terms/jp/"
          }
          target="_blank"
          rel="external noopener"
        >
          Googleアナリティクス利用規約
        </a>
        をご覧ください。
      </p>
      <h2>広告の配信について</h2>
      <p>
        当サイトでは、第三者配信の広告サービス「Google広告」を利用予定です（現在申請中）。広告配信事業者は、当サイトやその他サイトへのアクセス情報に基づいてユーザーに適切な広告（パーソナライズ広告）を表示するためにCookieを使用する可能性があります。
      </p>
      <p>
        Google広告に関する詳細およびCookieを無効にする設定に関しては
        <a
          href={"https://policies.google.com/technologies/ads?hl=ja"}
          target="_blank"
          rel="external noopener"
        >
          広告– ポリシーと規約 – Google
        </a>
        をご覧ください。
      </p>
      <h2>免責事項</h2>
      <p>
        当サイトからのリンク等で移動したサイトで提供される情報、サービス等については一切の責任を負いません。
      </p>
      <p>
        当サイトのコンテンツは正確性や安全性を保証するものではありません。できる限り正確な情報を提供するように努めてはいますが、著者の勉強不足から中には誤った情報も含まれる可能性があることご容赦ください。
        また、掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      </p>
      <h2>お問い合わせ</h2>
      <p>
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="external noopener"
          aria-label={`Twitterアカウント`}
        >
          Twitter
        </a>
        などからご気軽にご連絡ください。
      </p>
    </Layout>
  )
}

export default PrivacyPolicyPage
