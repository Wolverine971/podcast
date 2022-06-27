export default async () => {
  const { $content } = require('@nuxt/content')
  const files = await $content({ deep: true })
    .only(['path', 'updatedAt'])
    .fetch()
  return files.map((file: any) => {
    return {
      url: file.path.replace(' ', '-'),
      lastmod: Date.parse(file.updatedAt)
    }
  })
}
