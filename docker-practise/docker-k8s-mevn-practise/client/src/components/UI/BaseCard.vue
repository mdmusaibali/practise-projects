<template>
  <div class="base-card" :style="{ width: this.width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["width"],
};
</script>

<style scoped>
.base-card {
  background-color: #151718;
  border: 1px solid #313538;
  border-radius: 0.6rem;
  padding: 2.5rem;
}
</style>
