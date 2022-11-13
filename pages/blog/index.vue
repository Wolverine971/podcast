<template>
  <v-card style="padding: 10px">
    <h1>Blog Posts and Musings</h1>
    <!-- <dj-combo /> -->
    <ul>
      <li v-for="(post, index) in blogList" :key="`post-${index}`">
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
    <br>
    <h1>Military</h1>
    <ul>
      <li v-for="(post, index) in militaryList" :key="`post-${index}`">
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
    const blogList = await $content('blog').fetch()
    const militaryList = await $content('military').fetch()
    return {
      blogList,
      militaryList
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
          content: 'DJ blogs about stuff here'
        },
        {
          property: 'og:url',
          content: 'https://djandnicktalkaboutstuff.com/blog'
        },
        {
          property: 'og:description',
          content: 'DJ blogs about stuff here'
        },
        { property: 'og:title', content: "DJ's blog" },
        {
          name: 'twitter:description',
          content: 'DJ blogs about stuff here'
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
