<template>
  <v-app dark :class="$route.path.includes('about') ? 'city' : ''">
    <Toolbar />
    <v-main>
      <v-container class="container">
        <nuxt />
      </v-container>
      <Background v-if="showFace" />
    </v-main>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-btn class="face-btn" @click="showFace = !showFace">
        {{ showFace ? 'Hide Face' : 'See Face' }}
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {
    Toolbar: () => import('../components/toolbar.vue'),
    Background: () => import('../components/background.vue')
  },
  data: () => {
    return {
      showFace: false
    }
  }
}
</script>
<style scoped>
.city {
  background-image: url('/optimizedBackground.svg');
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
.djFace {
  background-image: url('/optimizedFace.svg');
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
.container {
  max-width: 1085px;
}
.face-btn{
  margin: 10px;
  margin-left: auto
}
</style>
