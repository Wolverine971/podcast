<template>
  <v-card>
    <h1>My Blog Posts</h1>
    <ul>
      <li v-for="(post, index) in blogList" :key="`post-${index}`">
        <h2>
          <nuxt-link :to="post.path"> {{ post.title }} </nuxt-link>
        </h2>
        <p v-if="post.description">{{ post.description }}</p>
        <nuxt-content v-else :document="{ body: post.excerpt }" />
      </li>
    </ul>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const blogList = await $content('blog').fetch()
    return {
      blogList,
    }
  },
  head() {
    return {
      titleTemplate: "DJ's blog",
      title: "DJ's blog",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'DJ blogs about stuff here',
        },
        {
          property: 'og:url',
          content: `https://djandnicktalkaboutstuff.com/blog`,
        },
        {
          property: 'og:description',
          content: 'DJ blogs about stuff here',
        },
        { property: 'og:title', content: "DJ's blog" },
        {
          name: 'twitter:description',
          content: 'DJ blogs about stuff here',
        },
        {
          name: 'twitter:title',
          content: "DJ's blog",
        },
        {
          name: 'keywords',
          content: 'DJ, blog',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/post.png' },
        {
          rel: 'canonical',
          href: `https://djandnicktalkaboutstuff.com/blog`,
        },
      ],
    }
  },
}
</script>

<style></style>