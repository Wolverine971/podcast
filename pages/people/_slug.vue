<template>
  <v-card elevation="2">
    <v-card-title>{{ page.title }}</v-card-title>
    <v-card-subtitle>{{ page.description }}</v-card-subtitle>
    <div style="margin: 0 10px 10px 10px;">
      <v-tooltip v-if="page.wikipedia" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            outlined
            small
            @click="goTo(page.wikipedia)"
            v-on="on"
          >
            <v-icon> mdi-wikipedia </v-icon>
          </v-btn>
        </template>
        Wikipedia
      </v-tooltip>

      <v-tooltip v-if="page.twitter" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            outlined
            small
            @click="goTo(page.twitter)"
            v-on="on"
          >
            <v-icon> mdi-twitter </v-icon>
          </v-btn>
        </template>
        Twitter
      </v-tooltip>

      <v-tooltip v-if="page.personalSite" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            outlined
            small
            @click="goTo(page.personalSite)"
            v-on="on"
          >
            <v-icon> mdi-post </v-icon>
          </v-btn>
        </template>
        Personal Site
      </v-tooltip>
    </div>

    <!-- description: Smart guy, with great ideas and wisdom.
meta points:
wikipedia: https://en.wikipedia.org/wiki/Naval_Ravikant
twitter: https://twitter.com/naval?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor
personalSite: https://nav.al/ -->

    <v-divider />
    <v-card-text>
      <nuxt-content :document="page" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {
    // BlogList: () => import('~/components/blogList.vue'),
    // Feedback: () => import('~/components/shared/feedback.vue')
  },
  async asyncData ({ $content, params }) {
    const cleanUrl = `/people/${params.slug.replaceAll('-', ' ')}`
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
    return {}
  },
  mounted () {},

  methods: {
    goTo (url) {
      window.open(url, '_blank')
    }
  },
  jsonld () {
    const pages = []
    if (this.page.wikipedia) {
      pages.push(this.page.wikipedia)
    }
    if (this.page.twitter) {
      pages.push(this.page.twitter)
    }
    if (this.page.personalSite) {
      pages.push(this.page.personalSite)
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: this.page.title,
      url: `https://djandnicktalkaboutstuff.com${this.formattedUrl}`,
      description: this.page.description,
      sameAs: [
        ...pages
      ],
      publisher: {
        '@type': 'Person',
        name: 'DJ Wayne'
      }
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

<style>
blockquote {
  border: 1px solid #ebecb2;
  right: 0px;
  top: 0px;
  border-radius: 0px 5px 0px 5px;
  padding: 5px 15px;
  color: #58584c;
  z-index: 99;
  margin: 10px
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
