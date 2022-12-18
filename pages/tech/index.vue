<template>
  <v-card style="padding: 10px">
    <h1>Tech</h1>
    <ul>
      <li v-for="(post, index) in techList" :key="`post-${index}`">
        <h2>
          <nuxt-link :to="post.path.replaceAll(' ', '-')">
            {{ post.title }}
          </nuxt-link>
        </h2>
        <p v-if="post.description">
          {{ post.description }}
        </p>
        <nuxt-content v-else :document="{ body: post.excerpt }" />
      </li>
    </ul>
  </v-card>
</template>

<script>
export default {
  components: {
    // DjCombo: () => import('~/components/djCombo.vue')
  },
  async asyncData ({ $content }) {
    const techList = await $content('tech').fetch()
    return {
      techList
    }
  },
  head () {
    return {
      titleTemplate: "DJ's blog",
      title: "DJ's blog",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'DJ blogs about tech here'
        },
        {
          property: 'og:url',
          content: 'https://djandnicktalkaboutstuff.com/blog'
        },
        {
          property: 'og:description',
          content: 'DJ blogs about tech here'
        },
        { property: 'og:title', content: "DJ's blog" },
        {
          name: 'twitter:description',
          content: 'DJ blogs about tech here'
        },
        {
          name: 'twitter:title',
          content: "DJ's blog"
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/post.png' },
        {
          rel: 'canonical',
          href: 'https://djandnicktalkaboutstuff.com/blog'
        }
      ]
    }
  }
}
</script>

<style></style>
