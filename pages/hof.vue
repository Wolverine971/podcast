<template>
  <section id="feed">
    <hof-feed>
      <slot />
    </hof-feed>
  </section>
</template>

<script>
  export default {
    name: 'hof',

    components: {
      Feed: () => import('@/components/hofFeed'),
    },
  }
</script>