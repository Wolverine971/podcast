<template>
  <div>
    <blog-list />
    <h1>{{ page.title }}</h1>
    <h2>{{ page.description }}</h2>
    <v-divider></v-divider>
    <nuxt-content :document="page"/>
  </div>
</template>

<script>
import BlogList from '~/components/blogList.vue'
export default {
  components: {BlogList},
  async asyncData({ $content, params, error }) {
    const slug = params.slug ? `/blog/${params.slug}` : "index";
    const page = await $content(slug)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: "Page not found" });
      });

    return {
      page
    };
  }
};
</script>