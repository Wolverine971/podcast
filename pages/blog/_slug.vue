<template>
  <div>
    <v-card elevation="2">
      <v-card-title>{{ page.title }}</v-card-title>
      <v-card-subtitle>{{ page.description }}</v-card-subtitle>
      <v-divider />
      <v-card-text>
        <nuxt-content :document="page" />
      </v-card-text>
      <v-card-text>
        <Feedback :post="{ id: page.slug.replaceAll(' ', '-') }" :type="'blog'" />
      </v-card-text>
    </v-card>
    <blog-list class="margin-top" />
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  components: {
    BlogList: () => import('~/components/blogList.vue'),
    Feedback: () => import('~/components/shared/feedback.vue')
  },
  async asyncData ({ $content, params }) {
    const cleanUrl = params.slug ? `/blog/${params.slug.replaceAll('-', ' ')}` : 'index'
    const formattedUrl = `/blog/${params.slug}`

    const page = await $content(cleanUrl)
      .fetch()
      .catch((err) => {
        console.error('Page not found', err)
      })

    return {
      cleanUrl,
      page,
      formattedUrl
    }
  },
  data () {
    return {
      commentsLoading: false,
      comments: { comments: [], count: 0 }
    }
  },
  mounted () {
    this.getComments()
  },

  methods: {
    async getComments () {
      this.commentsLoading = true
      try {
        const resp = await this.$axios.get(
          `${endpoints.getComments}/${this.page.slug}`
        )
        if (resp && resp.data && resp.data.comments) {
          if (resp.data.comments.length) {
            this.params = { ...event }
            this.params.skip = 10
          }

          this.comments = resp.data
        }
      } catch (e) {
        console.log(e)
      }
      this.commentsLoading = false
    }
  },

  head () {
    return {
      titleTemplate: this.page.title,
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description
        },
        {
          property: 'og:url',
          content: `https://djandnicktalkaboutstuff.com${this.formattedUrl}`
        },
        {
          property: 'og:description',
          content: this.page.description
        },
        { property: 'og:title', content: this.page.title },
        {
          name: 'twitter:description',
          content: this.page.description
        },
        {
          name: 'twitter:title',
          content: this.page.title
        },
        {
          name: 'keywords',
          content: 'DJ, blog'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/post.png' },
        {
          rel: 'canonical',
          href: `https://djandnicktalkaboutstuff.com${this.formattedUrl}`
        }
      ]
    }
  }
}
</script>
