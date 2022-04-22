<template>
  <v-card
    v-if="componentComment && componentComment.text"
    :id="componentComment.id"
    :class="'shadow'"
    @mouseover="showCookies = true"
  >
    <v-card-title>
      <v-avatar
        elevation="2"
        outlined
        raised
        large

        color="offWhite"
      >
      <!-- :class="`class${componentComment.author.enneagramId}`" -->
        <!-- {{ componentComment.author.enneagramId }} -->
      </v-avatar>
      <cookie-comment
        :text="componentComment.text"
        :likes="componentComment.likes"
        :parent-id="componentComment.id"
        :show-cookies="showCookies"
        @commentUpdated="$emit('commentUpdated', $event)"
      />
    </v-card-title>
    <interact
      v-if="interact"
      :post="componentComment"
      :type="'comment'"
      @emitComment="newComment($event)"
      @likeChange="likeChange"
    />

    <v-expansion-panels
      v-if="componentComment.comments.count"
      v-model="panels"
      popout
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ componentComment.comments }} Comments
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <comments
            v-if="componentComment.comments.comments"
            :comments="componentComment.comments"
            :parent-id="componentComment.id"
            :display-count="false"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Comment',
  components: {
    Interact: () => import('./interact'),
    CookieComment: () => import('./cookieComment'),
    comments: () => import('./comments.vue')
  },
  props: {
    comment: {
      type: Object,
      required: true,
      default: null
    },
    interact: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data: () => ({
    componentComment: null,
    panels: [],
    showCookies: false
  }),
  watch: {
    async comment (comment) {
      console.log(comment)
      this.componentComment = comment
      this.panels = []
      if (comment.text) {
      } else {
        const resp = await this.$axios.get(
          `${endpoints.getComment}/${this.componentComment.id}`
        )
        this.componentComment = Object.assign({}, resp.data)
      }
    }
  },
  async mounted () {
    if (!this.comment.text) {
      console.log(this.comment)
      const resp = await this.$axios.get(
        `${endpoints.getComment}/${this.comment.id}`
      )
      if (resp && resp.data) {
        this.componentComment = Object.assign({}, resp.data)
      } else {
        this.$store.dispatch('toastError', 'Must Login to See Comments', 6000)
      }
    } else {
      this.componentComment = this.comment
    }
  },
  methods: {
    async checkComments () {
      if (this.componentComment.comments && !this.componentComment.comments.text) {
        const resp = await this.$axios.get(
          `${endpoints.getComment}/${this.componentComment.id}`
        )
        this.componentComment = Object.assign({}, resp.data)
      }
    },
    newComment (event) {
      let newComments
      if (this.componentComment.comments && this.componentComment.comments.text) {
        newComments = [event, ...this.componentComment.comments.text]
      } else {
        newComments = [event]
      }

      this.componentComment = Object.assign({}, this.componentComment, {
        comments: Object.assign(
          {},
          this.componentComment.comments,
          {
            comments: newComments
          },
          {
            count: (this.componentComment.comments.count += 1)
          }
        )
      })
    },
    likeChange (event) {
      this.componentComment.likes = event
    }
  }
}
</script>

<style>
</style>
