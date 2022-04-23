<template>
  <div class="feedbackcard">
    <div>
      <blockquote>{{ comment.text }}</blockquote>
      <p class="bottom-right">
        {{ showDate(comment.createdDate) }}
      </p>
    </div>
    <div class="flexRow">
      <div>
        <label :for="comment.id"> Response requested</label>
        <input
          :id="comment.id"
          v-model="comment.response"
          type="checkbox"
          label="Response Requested"
          onclick="return false;"
        >
        <p class="sub-title">
          {{ comment.email }}
        </p>
      </div>
      <div>
        <v-btn elevation="2" icon @click="showDelete = !showDelete">
          <v-icon color="red">
            mdi-delete
          </v-icon>
        </v-btn>
        <v-btn v-if="showDelete" @click="deleteComment">
          Confirm Delete
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'FeedBackCard',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      showDelete: false
    }
  },
  watch: {
    comment (val) {
      if (val) {
        this.showDelete = false
      }
    }
  },
  methods: {
    showDate (rawDate) {
      if (rawDate) {
        const date = new Date(rawDate)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      }
    },
    async deleteComment () {
      const resp = await this.$axios.delete(
        `${endpoints.feedback}/${this.comment.id}`
      )
      this.$emit('delete', this.comment.id)
      console.log(resp)
    }
  }
}
</script>

<style>
.feedbackcard {
  background: #f7f7f7;
  position: relative;
  width: 50%;
  border-radius: 2px;
  padding: 10px;
  margin: 10px;
}
.bottom-right {
  border: 1px solid #ebecb2;
  right: 0px;
  top: 0px;
  border-radius: 0px 5px 0px 5px;
  padding: 5px 15px;
  position: absolute;
  color: #58584c;
  z-index: 99;
  background-color: #fdfdde;
  font-size: 10px;
  font-weight: 600;
}
.sub-title {
  font-size: small;
}
.flexRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
