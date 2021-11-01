<template>
  <v-app dark :class="$route.path.includes('about') ? 'city' : 'djFace'">
    <v-app-bar app color="white" flat>
      <v-tabs
        v-if="!$vuetify.breakpoint.mobile"
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="(link, i) in links"
          :key="i"
          :to="link.route"
          :disabled="nick"
        >
          {{ link.name }}
        </v-tab>
      </v-tabs>
      <v-menu transition="fab-transition" v-else>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-btn
            color="secondary"
            text
            v-bind="attrs"
            :class="{ 'x-small': $vuetify.breakpoint.mobile }"
            v-on="{ ...menu }"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.route"
            :disabled="nick"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="link.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
          icon: 'mdi-account-multiple',
        },
        {
          name: 'Favorites ',
          route: '/favorites',
          icon: 'mdi-star',
        },
        {
          name: 'Blog',
          route: '/blog',
          icon: 'mdi-post',
        },
        {
          name: 'About Me',
          route: '/about',
          icon: 'mdi-information',
        },
        {
          name: 'Burn Pit Map',
          route: '/map',
          icon: 'mdi-fire',
        },
      ],
      nick: false,
    }
  },
  beforeMount() {
    if (window && window.location) {
      this.nick = window.location.href.includes('nickanddj')
    }
  },
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
</style>