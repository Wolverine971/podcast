<template>
  <v-app dark :class="$route.path.includes('about') ? 'city' : 'djFace'">
    <v-app-bar app color="white" flat>
      <div v-if="$axios.defaults.baseURL.includes('nickanddj')"></div>
      <v-tabs centered class="ml-n9" color="grey darken-1" v-else>
        <v-tab v-for="(link, i) in links" :key="i" :to="link.route">
          {{ link.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      
      title: 'Vuetify.js',
      links: [
        {
          name: 'Home',
          route: '/',
        },
        {
          name: 'Favorites ',
          route: '/favorites',
        },
        {
          name: 'Blog',
          route: '/blog',
        },
        {
          name: 'About',
          route: '/about',
        },
      ],
    }
  },
}
</script>
<style scoped>
.city {
  background-image: url('/background.svg');
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
.djFace {
  background-image: url('/djFace.svg');
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
</style>