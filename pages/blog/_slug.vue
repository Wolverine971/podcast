<template>
  <div>
    <blog-list />
    <v-card>
      <h1>{{ page.title }}</h1>
      <h2>{{ page.description }}</h2>
      <v-divider></v-divider>
      <nuxt-content :document="page" />
    </v-card>
  </div>
</template>

<script>
import BlogList from '~/components/blogList.vue'
export default {
  components: { BlogList },
  data () {
    return {
      // url: ''
    }
  },
  async asyncData({ $content, params, error }) {
    const url = params.slug ? `/blog/${params.slug}` : 'index'
    const page = await $content(url)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      url,
      page,
    }
  },

  head() {
    return {
      titleTemplate: this.page.title,
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description,
        },
        {
          property: 'og:url',
          content: `https://djandnicktalkaboutstuff.com${this.url}`,
        },
        {
          property: 'og:description',
          content: this.page.description,
        },
        { property: 'og:title', content: this.page.title },
        {
          name: 'twitter:description',
          content: this.page.description,
        },
        {
          name: 'twitter:title',
          content: this.page.title,
        },
        {
          name: 'keywords',
          content:
            'DJ, blog',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/post.png' },
        {
          rel: 'canonical',
          href: `https://djandnicktalkaboutstuff.com${this.url}`,
        },
      ],
    }
  },
}
</script>