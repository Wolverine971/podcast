<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-text>
          <div class="text-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/RqTBCe5VuhE"
              title="Pod Pod"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <hr class="my-3" />
          <p>You dont know until you try</p>
          <div class="text-xs-right">
            <em><small>&mdash; DJ Wayne</small></em>
          </div>
          <hr class="my-3" />
          <p>There is a podcast that is gonna be happening soon.</p>
          <p>The topics we are going to be covering are:</p>
          <ul>
            <li>Abortion</li>
            <li>TBD</li>
            <li></li>
          </ul>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <div class="text-center">
            <base-timer />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BaseTimer from '~/components/baseTimer.vue'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    BaseTimer
  },
  data: () => ({
    links: ['Dashboard', 'Messages', 'Profile', 'Updates'],
  }),
}
</script>
