<template>
  <v-app-bar app flat>
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
    <v-menu v-else transition="fab-transition">
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
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      links: [
        {
          name: 'Home',
          route: '/',
          icon: 'mdi-account-multiple'
        },
        {
          name: 'Favorites ',
          route: '/favorites',
          icon: 'mdi-star'
        },
        {
          name: 'Blog',
          route: '/blog',
          icon: 'mdi-post'
        },
        {
          name: 'About Me',
          route: '/about',
          icon: 'mdi-information'
        },
        {
          name: 'Burn Pit Map',
          route: '/map',
          icon: 'mdi-fire'
        }
      ],
      nick: false
    }
  },
  beforeMount () {
    if (window && window.location) {
      this.nick = window.location.href.includes('nickanddj')
    }
  }
}
</script>
<style scoped>

</style>
