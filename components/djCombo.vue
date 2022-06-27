<template>
  <div>
    <input id="" v-model="searchText" type="text" name="">
    <div>
      <p v-for="(result,i) in searchResults" :key="i" @click="searchText = result.text">
        {{ result.text }}
      </p>
    </div>
  </div>
</template>

<script>
// import debounce from 'lodash.debounce'
// import { queryContent } from '@nuxt/content'
export default {
  name: 'DjCombo',
  props: {},
  data () {
    return {
      searchText: '',
      searchResults: []

    }
  },
  watch: {
    // async searchText (val) {
    //   if (val) {
    //     console.log(val)
    //     debugger
    //     // const articles = await queryContent('/').find()
    //     // console.log(articles)
    //     const testResults = [{ text: 'jump' }, { text: 'stump' }, { text: 'rump' }, { text: 'pump' }, { text: 'fump' }]
    //     this.searchResults = this.filterResults(testResults)
    //   }
    // }
  },
  methods: {
    filterResults (testResults) {
      return testResults
    }
  }

}
</script>

<style>

</style>
