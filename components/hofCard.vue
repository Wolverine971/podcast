<template>
  <v-col
    cols="12"
    :md="size"
  >
    <v-card
      :height="value.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
      href="#!"
    >
      <v-img
        :src="value.src ? `https://img.youtube.com/vi/${value.src}/maxresdefault.jpg` : ''"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-row
          v-if="!value.prominent"
          class="fill-height text-right ma-0"
        >
          <v-col cols="12">
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              small
              @click.stop=""
            >
              {{ value.category }}
            </v-chip>

            <h3 class="title font-weight-bold mb-2 twhite">
              {{ value.title }}
            </h3>

            <div class="caption twhite">
              {{ value.author }}<br>
            </div>
          </v-col>

          <v-col align-self="end">
            <v-btn small outlined link :href="`https://www.youtube.com/watch?v=${value.src}`" class="text-uppercase ma-0 twhite">
              Go To Video
            </v-btn>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'HofCard',

  props: {
    size: {
      type: Number,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
.twhite {
    color: whitesmoke !important;
}
.bwhite{
    background-color: whitesmoke;
}
</style>
