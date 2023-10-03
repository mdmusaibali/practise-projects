<template>
  <div>
    <ul v-if="passwordsList" class="passwords-list">
      <li v-for="password in passwordsList">
        For: {{ password.for }} Value: {{ password.value }}
      </li>
    </ul>
    <div class="addPass">
      <base-button @click="addPassword">Add new password</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      passwords: [],
    };
  },
  computed: {
    passwordsList() {
      return this.$store.getters.passwords;
    },
  },
  watch: {
    passwordsList(value) {
      console.log("PASS", value);
    },
  },
  mounted() {
    this.$store.dispatch("getPasswords");
    console.log("PASS", this.passwordsList);
  },
  methods: {
    addPassword() {
      const forX = prompt("For: ");
      const value = prompt("Value: ");
      if (forX === "" || value === "") return;
      this.$store.dispatch("addPassword", { for: forX, value });
    },
  },
};
</script>

<style>
.passwords-list {
  margin: 0 auto;
  max-width: 50rem;
  margin-top: 4rem;
}
.addPass{
    display: flex;
    justify-content: center;
    margin-top: 4rem;
}
</style>
