import React from "react"
import { css } from "@emotion/react"

import { rhythm } from "../../utils/typography"

const format = (d: Date) => {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

const dateStyel = css`
  display: inline-block;
  margin-right: ${rhythm(1 / 4)};
`

type Props = {
  published: string
  updated?: string
}

export const ArticleDate: React.FC<Props> = ({ published, updated }) => {
  const p = format(new Date(published))
  const u = updated ? format(new Date(updated)) : undefined
  return (
    <>
      <span css={dateStyel}>
        <time>{p}</time> 公開
      </span>
      {u && (
        <span css={dateStyel}>
          {" "}
          <time>{u}</time> 更新
        </span>
      )}
    </>
  )
}
