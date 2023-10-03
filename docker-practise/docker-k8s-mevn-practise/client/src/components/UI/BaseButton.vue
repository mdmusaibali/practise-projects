<template>
  <button
    class="btn"
    @click="$emit('click')"
    :style="{ width: this.fullWidth ? '100%' : '' }"
    v-if="type === 'button'"
  >
    <slot></slot>
  </button>
  <router-link :to="to" v-else>
    <button
      class="btn"
      @click="$emit('click')"
      :style="{ width: this.fullWidth ? '100%' : '' }"
    >
      <slot></slot>
    </button>
  </router-link>
</template>

<script>
export default {
  props: {
    click: {
      type: Function,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
    to: {
      type: String,
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: #0954a5;
  padding: 1rem 1.4rem;
  border: none;
  border-radius: 0.6rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0a4481;
}
</style>
