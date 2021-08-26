<template>
  <div class="loader" :class="classes ? classes : ''">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only d-none">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    classes: String
  }
}
</script>

<style lang="scss" scoped>
.loader {
  height: inherit;
  justify-content: center;
  display: flex;
  align-items: center;
  min-height: inherit;
}
</style>
