<template>
  <iframe :src="url" title="Burn Pit Map" class="iframe"></iframe>
</template>

<script>
export default {
  data() {
    return {
      url: '',
    }
  },
  mounted() {
    this.url = `${process.env.MAP_URL}/map`
  },
  head() {
    return {
      titleTemplate: 'Burnpit Map',
      title: 'Burnpit Map',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Map of burnpit locations',
        },
        {
          property: 'og:url',
          content: 'https://djandnicktalkaboutstuff.com/map',
        },
        {
          property: 'og:description',
          content: 'Map of burnpit locations',
        },
        { property: 'og:title', content: 'Burnpit Map' },
        {
          name: 'twitter:description',
          content: 'Map of burnpit locations',
        },
        {
          name: 'twitter:title',
          content: 'Burnpit Map',
        },
        {
          name: 'keywords',
          content: 'burnpit, military, jon stewart, army, usmc, fire, polution',
        },
      ],
      link: [
        { rel: 'icon', hid: 'iconm', type: 'image/x-icon', href: '/fire.png' },
        {
          rel: 'canonical',
          href: 'https://djandnicktalkaboutstuff.com/map',
        },
      ],
    }
  },
}
</script>

<style>
.iframe {
  height: 90vh;
  width: -webkit-fill-available;
  width: -moz-available;
}
</style>