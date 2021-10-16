<template>
  <v-container>
    <!-- <hof-card :size="6" :value="pod" /> -->
    <iframe
      width="100%"
      height="500"
      src="https://www.youtube.com/embed/YpW_KMHXdl4"
      title="Leadership Podcast"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <v-row>
      

      <hof-card
        v-for="(video, i) in videos"
        :key="i"
        :size="3"
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
    layout: [
      4, 3, 2, 4, 2, 3, 3, 4, 3, 2, 3, 4, 2, 3, 2, 4, 2, 3, 3, 2, 4, 2, 3, 3, 4,
      3, 2,
    ],
    videos: [],
    pod: {
      title: 'Leadership Podcast',
      author: 'DJ and Nick',
      category: 'Genius',
      src: 'YpW_KMHXdl4',
    },
  }),
  created() {
    this.videos = videos
  },
}
</script>
