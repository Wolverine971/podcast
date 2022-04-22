<template>
  <div>
    <v-card-actions class="btn-group">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            small
            class="margin-right"
            color="secondary"
            v-bind="attrs"
            @click="expandFeedback"
            v-on="on"
          >
            <v-icon> mdi-comment-outline </v-icon>
            Send Anonymous Feedback
          </v-btn>
        </template>
        Send Anonymous Feedback
      </v-tooltip>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="feedbackIsExpanded" class="margin-top">
        <v-textarea
          ref="newFeedback"
          v-model="feedback"
          type="text"
          filled
          placeholder="Send Feedback"
          outlined
          rows="1"
          auto-grow
          hide-details
          class="pad-bot margin-left"
          maxlength="1000"
          counter
        />
        <v-checkbox
          v-model="wantResponse"
          :label="`Do you want me to respond?`"
        />
        <v-tooltip v-if="wantResponse" top>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="emailAddress"
              type="email"
              label="Email (optional) if you want me to respond"
              :rules="emailRules"
              autocomplete="email"
              outlined
              hide-details
              v-bind="attrs"
              v-on="on"
            />
          </template>
          The email you want me send my response to
        </v-tooltip>
        <v-btn
          v-if="feedback"
          class="margin-bot margin-top"
          small
          outlined
          @click="submitFeedback"
        >
          Submit Feedback
        </v-btn>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'FeedBack',
  components: {
    // googleSignOn: () => import('../googleSignOn.vue')
  },
  props: {
    post: {
      type: Object,
      required: true,
      default: null
    },
    type: {
      type: String,
      required: true,
      default: null
    }
  },
  data () {
    return {
      feedback: '',
      isLiked: false,
      likes: [],
      subscribers: [],
      isSubscribed: false,
      feedbackIsExpanded: false,
      email: '',
      wantResponse: false,
      emailAddress: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail not valid'
      ]
    }
  },
  watch: {
    post (post) {
      if (post) {
        this.parsePost(post)
      }
    }
  },
  mounted () {
    this.parsePost(this.post)
  },
  methods: {
    async like () {
      // if (this.user) {
      try {
        const isLiked = !this.isLiked
        let resp
        let newLikes

        isLiked
          ? (newLikes = [...this.likes, this.user.id])
          : (newLikes = this.likes.filter(l => l !== this.user.id))

        this.likes = newLikes
        this.$emit('likeChange', this.likes)
        if (this.type === 'question') {
          resp = await this.$axios.get(
            `${endpoints.likeQuestion}/${this.post.id}/${
              isLiked ? 'add' : 'remove'
            }`
          )
          if (resp && resp.data) {
            this.post.likes = [...newLikes]
            this.$store.commit('updateAllQuestions', this.post)
          }
        } else if (this.type === 'comment') {
          resp = await this.$axios.get(
            `${endpoints.likeComment}/${this.post.id}/${
              isLiked ? 'add' : 'remove'
            }/${this.user.enneagramId}`
          )
        } else if (this.type === 'content') {
          resp = await this.$axios.get(
            `${endpoints.likeBlog}/${this.post.id}/${
              isLiked ? 'add' : 'remove'
            }/${this.user.enneagramId}`
          )
        } else if (this.type === 'blog') {
          resp = await this.$axios.get(
            `${endpoints.likeBlog}/${this.post.id}/${
              isLiked ? 'add' : 'remove'
            }/${this.user.enneagramId}`
          )
        } else {
          resp = await this.$axios.get(
            `${endpoints.likeThread}/${this.post.id}/${
              isLiked ? 'add' : 'remove'
            }/${this.user.enneagramId}`
          )
        }
        if (resp && resp.data) {
          if (isLiked) {
            this.$store.dispatch('toastSuccess', 'Liked Comment')
          } else {
            this.$store.dispatch('toastSuccess', 'Unliked Comment')
          }
        } else {
          this.$store.dispatch('toastError', 'Like Failed')
        }
      } catch (error) {
        this.$store.dispatch('toastError', 'Like Failed')
      }
      // } else {
      //   this.$store.dispatch('toastError', 'Must Login')
      // }
    },
    async submitFeedback () {
      const resp = await this.$axios.post(
        `${endpoints.feedback}`,
        {
          email: this.emailAddress,
          postId: this.post.id,
          text: this.feedback,
          response: this.wantResponse
        }
      )
      if (resp) {
        this.$store.dispatch('toastSuccess', 'Feedback Submitted')
        this.clear()
      } else {
        this.$store.dispatch('toastError', 'Failed To Submit Feedback')
      }
    },
    clear () {
      this.emailAddress = ''
      this.feedback = ''
      this.wantResponse = false
    },
    async subscribe () {
      // if (this.user) {
      try {
        const isSubscribed = !this.isSubscribed
        let newSubscribers = []

        const resp = await this.$axios.get(
          `${endpoints.subQuestion}/${this.post.id}/${
            isSubscribed ? 'add' : 'remove'
          }`
        )
        if (resp && resp.data) {
          if (isSubscribed) {
            newSubscribers = [...this.subscribers, this.user.id]
            this.$store.dispatch('toastSuccess', 'Subscibed')
          } else {
            newSubscribers = this.subscribers.filter(l => l !== this.user.id)
            this.$store.dispatch('toastSuccess', 'Unsubscibed')
          }
          this.post.subscribers = [...newSubscribers]
          this.subscribers = newSubscribers
          this.$store.commit('updateAllQuestions', this.post)
          this.$store.commit('setRefreshDashboard', true)
        } else {
          this.$store.dispatch('toastError', 'Failed To Subscribe')
        }
      } catch (error) {
        this.$store.dispatch('toastError', 'Question Like Failed')
      }
      // } else {
      //   this.$store.dispatch('toastError', 'Must Login')
      // }
    },
    expandFeedback () {
      // if (this.user) {
      this.feedbackIsExpanded = true
      this.$refs.newFeedback.focus()
      // } else {
      //   this.$store.dispatch('toastError', 'Must Login')
      // }
    },
    parsePost (post) {
      this.likes = post.likes && post.likes.length ? [...post.likes] : []
      // if (this.type === 'question' && this.user) {
      //   this.commentIsExpanded = !post.commenterIds[this.user.id]
      //   this.subscribers = [...post.subscribers]
      // }
    }
  }
}
</script>

<style>
.btn-group {
  display: flex;
  margin-top: 5px;
}
.margin-right {
  margin-right: 10px;
}
.peep-btn {
  width: 60px;
}
.margin-top {
  margin-top: 10px;
}
.margin-bot {
  margin-bottom: 10px;
}
.pad-bot {
  padding-bottom: 10px;
}
</style>
