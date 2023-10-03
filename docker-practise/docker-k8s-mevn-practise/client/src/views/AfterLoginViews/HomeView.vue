<template>
  <div>
    <header>
      <nav>
        <div>
          <h2 v-if="user && user.username">Welcome, {{ user.username }}</h2>
        </div>
        <base-button @click="logout"> Logout </base-button>
      </nav>
    </header>
    <password-list v-if="isLoggedIn"></password-list>
  </div>
</template>

<script>
import BaseButton from "../../components/UI/BaseButton.vue";
import PasswordList from "./../../components/Passwords/PasswordList.vue";
export default {
  components: { BaseButton, PasswordList },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUser");
  },
  watch: {
    isLoggedIn(newValue, oldValue) {
      if (!newValue) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    async logout() {
      console.log("TEST");
      this.$store.commit("logout");
    },
  },
};
</script>
<style></style>
