import React from "react"

import { ArticleLink } from "./article-link"
import { Mdx } from "../types/mdx"

type Props = {
  posts: Array<Mdx<"title" | "published" | "updated" | "tags">>
}

export const ArticleList: React.FC<Props> = ({ posts }) => {
  return (
    <ol style={{ listStyle: `none` }}>
      {posts.map(post => {
        return (
          <li key={post.fields.slug}>
            <ArticleLink {...post} />
          </li>
        )
      })}
    </ol>
  )
}
