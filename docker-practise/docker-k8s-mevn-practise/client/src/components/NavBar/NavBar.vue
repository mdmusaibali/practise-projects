<template>
  <nav>
    <div></div>
    <base-button>Sign Up</base-button>
  </nav>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 7vh;
  background-color: #151718;
  border-bottom: 1px solid #313538;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}
</style>
