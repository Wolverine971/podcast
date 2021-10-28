<template>
  <iframe :src="url" title="Burn Pit Map" class="iframe"></iframe>
</template>

<script>
export default {
    data(){
        return {
            url: ''
        }
    },
    mounted() {
        this.url = `${process.env.MAP_URL}/map`
    }

}
</script>

<style>
.iframe{
    height:90vh;
    width: -webkit-fill-available;
    width: -moz-available;

}
</style>