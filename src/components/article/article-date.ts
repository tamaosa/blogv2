const format = (d: Date) => {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export const articleDate = (published: string, updated?: string) => {
  const p = format(new Date(published))
  const u = updated ? format(new Date(updated)) : undefined
  return u ? `${p} 公開 / ${u} 更新` : `${p} 公開`
}