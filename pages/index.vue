<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title v-show="nick">
          NICK AND DJ TALK ABOUT STUFF DOT COM!
        </v-card-title>
        <v-card-text>
          <div v-show="nick" class="text-center">
            <iframe
              width="100%"
              height="700vw"
              class="iframe-placeholder"
              src="https://www.youtube.com/embed/ccS5crpR9dQ"
              title="Pod Pod"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <div v-show="!nick" class="text-center">
            <iframe
              width="100%"
              height="700vw"
              class="iframe-placeholder"
              src="https://www.youtube.com/embed/RqTBCe5VuhE"
              title="Pod Pod"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <hr class="my-3">
          <div v-show="nick">
            <q>Up up and away!</q>
            <cite>&mdash; Nick</cite>
          </div>
          <div v-show="!nick">
            <q>You dont know until you try</q>
            <cite>&mdash; DJ</cite>
          </div>
          <hr class="my-3">
          <h1>Podcast</h1>
          <p>The topics we are going to be covering are:</p>
          <ul>
            <li>Leadership</li>
            <li>Abortion</li>
            <li>TBD</li>
            <li />
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    links: ['Dashboard', 'Messages', 'Profile', 'Updates'],
    nick: false
  }),

  beforeMount () {
    if (window && window.location) {
      this.nick = window.location.href.includes('nickanddj')
    }
  },
  jsonld () {
    const pages = [this.nick ? 'https://djandnicktalkaboutstuff.com' : 'https://nickanddjtalkaboutstuff.com/']
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'DJ and Nick Podcast',
      url: this.nick ? 'https://nickanddjtalkaboutstuff.com/' : 'https://djandnicktalkaboutstuff.com',
      description: 'DJ and Nick talk about stuff on a podcast',
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
      titleTemplate: "DJ and Nick's - podcast",
      title: 'podcast',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'DJ and Nick talk about stuff on a podcast'
        },
        { property: 'og:url', content: 'https://djandnicktalkaboutstuff.com' },
        {
          property: 'og:description',
          content: 'DJ and Nick talk about stuff on a podcast'
        },
        { property: 'og:title', content: 'dj and nick podcast' },
        {
          name: 'twitter:description',
          content: 'DJ and Nick talk about stuff on a podcast'
        },
        {
          name: 'twitter:title',
          content: 'DJ and Nick talk about stuff on a podcast'
        }
      ],
      link: [
        { rel: 'icon', hid: 'iconh', type: 'image/x-icon', href: '/account-multiple.png' },
        {
          rel: 'canonical',
          href: 'https://djandnicktalkaboutstuff.com'
        }
      ]
    }
  }
}
</script>
<style scoped>
.iframe-placeholder {
  background: url('/loading2.svg');
  background-repeat: no-repeat;
}
</style>
