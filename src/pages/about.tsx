import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage: React.FC = ({}) => {
  return (
    <Layout>
      <SEO title="about" />
      <h1>About</h1>
      <h2>著者について</h2>
      <p>
        某メーカーの見習いソフトウェア開発者です。業務では開発製品のソフトウェアに関連することは全部やることになるらしい…学生時代は数値計算の勉強をしていました。
      </p>
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
      <h2>免責事項</h2>
      <p>
        当サイトからのリンク等で移動したサイトで提供される情報、サービス等については一切の責任を負いません。
      </p>
      <p>
        当サイトのコンテンツは正確性や安全性を保証するものではありません。できる限り正確な情報を提供するように努めてはいますが、著者の勉強不足から中には誤った情報も含まれる可能性があることご容赦ください。
        また、掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      </p>
      <h2>お願い</h2>
      <p>
        「記事の内容が誤っている。」「誤字がある。」などなど、当サイトへのご意見やご要望がありましたら
        <a
          target="_blank"
          href={`https://github.com/tamaosa/blogv2`}
          rel="external noopener"
        >
          GitHub
        </a>
        などからご気軽にご連絡ください。
      </p>
    </Layout>
  )
}

export default NotFoundPage
