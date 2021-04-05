export type Frontmatter = {
  title: string
  published: string
  updated?: string
  tags?: string[]
}

export type Mdx<Keys extends keyof Frontmatter> = {
  id: string
  excerpt: string
  body: string
  frontmatter: Pick<Frontmatter, Keys>
  fields: {
    slug: string
  }
}

