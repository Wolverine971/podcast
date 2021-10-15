<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>

      <hof-card
        v-for="(video, i) in videos"
        :key="i"
        :size="layout[i]"
        :value="video"
      />
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import videos from '@/data/videos.json'

export default {
  name: 'hofFeed',

  components: {
    hofCard: () => import('@/components/hofCard'),
  },

  data: () => ({
    layout: [4, 3, 2, 4, 2, 3, 3, 4, 3, 2, 3, 4, 2, 3, 2, 4, 2, 3, 3, 2, 4, 2, 3, 3, 4, 3, 2],
    page: 1,
    videos: [],
  }),
  created() {
    this.videos = videos
  },

  watch: {
    page() {
      window.scrollTo(0, 0)
    },
  },
}
</script>
