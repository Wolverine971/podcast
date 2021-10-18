<template>
  <v-card color="">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">Favorites</h1>
    </v-card-title>

    <v-tabs v-model="selectedTab" background-color="transparent" color="" grow>
      <v-tab v-for="(tab, i) in tabs" :key="i">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="selectedTab">
        <v-tab-item>
        <h1>Favorite Books</h1>
        <v-list dense>
          <v-list-item
            v-for="(book, i) in books"
            :key="i + 'i'"
            @click="goTo(book.url)"
          >
            <v-list-item-content>
              <v-list-item-title> {{ book.name }}</v-list-item-title>
              <v-list-item-subtitle>
                Author: {{ book.name }}
              </v-list-item-subtitle>
              {{ book.description }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
      <v-tab-item>
          <h1>Youtube Videos</h1>
        <section id="feed">
          <hof-feed>
            <slot />
          </hof-feed>
        </section>
      </v-tab-item>
      <v-tab-item>
        <h1>Interesting People</h1>
        <v-list dense>
          <v-list-item
            v-for="(person, i) in peopleILike"
            :key="i + 'i'"
            @click="goTo(person.url)"
          >
            <v-list-item-content>
              <v-list-item-title> {{ person.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
      
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  name: 'Favorites',
  data: () => ({
    tabs: ['Books', 'Youtube Videos', 'People'],
    selectedTab: null,
    peopleILike: [
      {
        name: 'Naval Ravikant',
        url: 'https://www.youtube.com/channel/UCh_dVD10YuSghle8g6yjePg',
      },
      { name: 'Tim Ferris', url: 'https://tim.blog/' },
      {
        name: 'Peter Thiel',
        url: 'https://www.youtube.com/watch?v=nM9f0W2KD5s',
      },
      {
        name: 'Eric Weinstein',
        url: 'https://www.youtube.com/channel/UCR85PW_B_7_Aisx5vNS7Gjw',
      },
      { name: 'Elon Musk', url: 'https://en.wikipedia.org/wiki/Elon_Musk' },
      {
        name: 'Nassim Taleb',
        url: 'https://en.wikipedia.org/wiki/Nassim_Nicholas_Taleb',
      },
      { name: 'Robert Greene', url: 'https://powerseductionandwar.com/' },
      {
        name: 'Peter Zeihan',
        url: 'https://www.youtube.com/watch?v=_-1MquvFmUA',
      },
      { name: 'James Altucher', url: 'https://jamesaltucher.com/' },
      { name: 'Josh Waitzkin', url: 'https://www.joshwaitzkin.com/' },
      {
        name: 'Ed Calderon',
        url: 'https://www.youtube.com/watch?v=9l20tu7O0OY',
      },
    ],
    books: [
      {
        name: 'Zero To One',
        author: 'Peter Thiel and Black Masters',
        description: 'How to start a startup',
        url: 'https://www.youtube.com/watch?v=nOQc6DopiKQ',
      },
      {
        name: 'Skip the Line',
        author: 'James Altucher',
        description: 'Suprising advice for reaching your goals',
        url: 'https://www.youtube.com/watch?v=Duruzbllf6Q',
      },
      {
        name: 'Skin in the Game',
        author: 'Nassim Taleb',
        description: 'Hidden asymmetries in daily Life',
        url: 'https://www.youtube.com/watch?v=chKZ5BVxTfY',
      },
    ],
    articles: [],
    random: [
      {
        type: 'playlist',
        name: "Dark Techno / Industrial / Cyberpunk Mix 'Revenge ll' | Dark Electro'",
        url: 'https://www.youtube.com/watch?v=b9fUdJdlExU',
      },
      {
        type: 'video',
        name: 'Georges St Pierre reveals his secret weapon he used to beat fighters',
        url: 'https://www.youtube.com/watch?v=seIMSzBBxqI',
      },
      {
        type: 'tool',
        name: 'Obsidian- note taking app',
        url: 'https://obsidian.md/',
      },
    ],
    podcasts: [{ name: 'The All-In Podcast' }],
  }),
  components: {
    Feed: () => import('@/components/hofFeed'),
  },
  methods: {
    goTo(url) {
      window.open(url, '_blank')
    },
  },
}
</script>
