<script>
export default {
  async asyncData({ $content }) {
    const blogList = await $content('blog').fetch()
    return {
      blogList,
    }
  },
}
</script>

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

<style></style>