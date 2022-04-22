<template>
  <div>
    <password-protect :type="'admin'" />
    <h1>Admin</h1>
    <div v-if="isAuthenticated">
      <div v-for="(entry, j) in feedback" :key="j">
        <h1>{{ entry.blog.title }}</h1>
        <p>{{ entry.blog.description }}</p>
        <div v-for="(comment, i) in entry.feedback" :key="i">
          <FeedBackCard :comment="comment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Admin',
  components: {
    FeedBackCard: () => import('../components/shared/feedbackCard.vue')
  },

  data: () => {
    return {
      blogs: [],
      feedback: []
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.authenticated
    }
  },
  watch: {
    async isAuthenticated (val) {
      if (val && this.blogs.length === 0) {
        this.blogs = await this.$content('blog').sortBy('title').fetch()
        const feedbackPromises = []
        this.blogs.forEach(async (blog) => {
          const title = blog.slug.split(' ').join('-')
          console.log(title)
          feedbackPromises.push({
            blog,
            feedback: (await this.$axios.get(`${endpoints.feedback}/${title}`).then((resp) => { return resp.data })).feedback
          })
        })
        Promise.all(feedbackPromises)
        this.feedback = feedbackPromises
      }
    }
  },
  mounted () {
    // this.isAuthenticated(true)

  },
  methods: {

  }
}
</script>

<style>
</style>
