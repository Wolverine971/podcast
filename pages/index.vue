<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title v-if="$axios.defaults.baseURL.includes('nickanddj')">
          NICK AND DJ TALK ABOUT STUFF DOT COM!
        </v-card-title>
        <v-card-text>
          <div class="text-center" v-if="$axios.defaults.baseURL.includes('nickanddj')">
            <iframe
              width="100%"
              height="700vw"
              class="iframe-placeholder"
              src="https://www.youtube.com/embed/ccS5crpR9dQ"
              title="Pod Pod"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            </div>
          <div class="text-center" v-else>
            <iframe
              width="100%"
              height="700vw"
              class="iframe-placeholder"
              src="https://www.youtube.com/embed/RqTBCe5VuhE"
              title="Pod Pod"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <hr class="my-3" />
          <div v-if="$axios.defaults.baseURL.includes('nickanddj')">
            <q>Up up and away!</q>
              <cite>&mdash; Nick</cite>

          </div>
          <div v-else>
            <q>You dont know until you try</q>
              <cite>&mdash; DJ</cite>
          </div>
          <hr class="my-3" />
          <h1>Podcast</h1>
          <p>The topics we are going to be covering are:</p>
          <ul>
            <li>Leadership</li>
            <li>Abortion</li>
            <li>TBD</li>
            <li></li>
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
  }),
}
</script>
<style scoped>
.iframe-placeholder {
  background: url('/loading2.svg');
  background-repeat: no-repeat;
}
</style>