<template>
  <v-expansion-panels v-click-outside="clickOutside" v-model="expanded">
    <v-expansion-panel>
      <v-expansion-panel-header> Blog List</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list dense>
          <div v-for="(item, i) in blogs" :key="i" class="hover">
          <v-list-item router  :to="item.path">
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.description"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-arrow-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          </div>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: 'BlogList',
  data: () => ({
    blogs: [],
    expanded: false
  }),

  async mounted() {
    this.blogs = await this.$content('blog').sortBy('title').fetch()
    console.log(this.blogs)
  },
  methods: {
    clickOutside(){
      console.log('clickOutside')
      this.expanded = false
    }
  }
}
</script>
<style scoped>
.hover :hover{
  background:#efebeb;
}
</style>