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
        <Feedback
          :post="{ id: page.slug.replaceAll(' ', '-') }"
          :type="'blog'"
        />
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
    Feedback: () => import('~/components/shared/feedback.vue'),
  },
  async asyncData({ $content, params }) {
    const cleanUrl = params.slug
      ? `/military/${params.slug.replaceAll('-', ' ')}`
      : 'index'
    const formattedUrl = `/military/${params.slug}`

    const page = await $content(cleanUrl)
      .fetch()
      .catch((err) => {
        console.error('Page not found', err)
      })

    return {
      cleanUrl,
      page,
      formattedUrl,
    }
  },
  data() {
    return {
      commentsLoading: false,
      comments: { comments: [], count: 0 },
    }
  },
  mounted() {
    this.getComments()
  },

  methods: {
    async getComments() {
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
    },
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: this.page.title,
      url: `https://djandnicktalkaboutstuff.com${this.formattedUrl}`,
      description: this.page.description,
      publisher: {
        '@type': 'Person',
        name: 'DJ Wayne',
      },
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
          content: `https://djandnicktalkaboutstuff.com${this.formattedUrl}`,
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
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/post.png' },
        {
          rel: 'canonical',
          href: `https://djandnicktalkaboutstuff.com${this.formattedUrl}`,
        },
      ],
    }
  },
}
</script>
<style>
blockquote {
  border: 1px solid #abceed;
  right: 0px;
  top: 0px;
  border-radius: 0px 5px 0px 5px;
  padding: 5px 15px;
  color: #abceed;
  z-index: 99;
  margin: 10px;
}
h1,
h2,
h3,
h4,
h5 {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.nuxt-content a {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  color: aquamarine;
}
.icon.icon-link {
  background-image: url('~assets/svg/pound-box.svg');
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 1em;
  height: 1em;
  background-size: 1em 1em;
}
</style>
