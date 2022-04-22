<template>
  <div class="feedbackcard">
    <blockquote>{{ comment.text }}</blockquote>
    <p class="bottom-right">
      {{ showDate(comment.createdDate) }}
    </p>
    <label :for="comment.id"> Response requested</label>
    <input :id="comment.id" v-model="comment.response" type="checkbox" label="Response Requested" onclick="return false;">
    <p class="sub-title">
      {{ comment.email }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'FeedBackCard',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    showDate (rawDate) {
      if (rawDate) {
        const date = new Date(rawDate)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      }
    }
  }

}
</script>

<style>
.feedbackcard{
  background: #f7f7f7;
  position: relative;
  width: 50%;
  border-radius: 2px;
  padding: 10px;
  margin: 10px;
}
.bottom-right{
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
.sub-title{
  font-size: small;
}

</style>
