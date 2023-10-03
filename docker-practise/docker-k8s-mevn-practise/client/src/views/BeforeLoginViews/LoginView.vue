<template>
  <div>
    <header>
      <nav>
        <div></div>
        <base-button type="link" to="/sign-up"> SignUp </base-button>
      </nav>
    </header>
    <div class="form-container">
      <base-card width="35rem">
        <form @submit.prevent>
          <input-field
            label="Username"
            v-model="username"
            type="text"
          ></input-field>
          <input-field
            label="Password"
            v-model="password"
            type="password"
            :type="this.passwordShown ? 'text' : 'password'"
          ></input-field>
          <input-field
            label="Show Password"
            v-model="passwordShown"
            type="checkbox"
          ></input-field>
          <base-button @click="submitHandler" fullWidth>Login</base-button>
        </form>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseCard from "./../../components/UI/BaseCard.vue";
import InputField from "../../components/UI/InputField.vue";
import BaseButton from "../../components/UI/BaseButton.vue";
import { getSession } from "./../../utils/auth";
export default {
  components: {
    BaseCard,
    InputField,
    BaseButton,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isFormDataValid() {
      return this.username !== "" && this.password !== "";
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push("/home");
    }
    const tokenFromLocalStorage = getSession();
    console.log(
      "TOKEN FROm LOCAL STORAGE",
      typeof tokenFromLocalStorage === "string"
    );
    if (tokenFromLocalStorage && typeof tokenFromLocalStorage === "string") {
      console.log("SESSION FOUND");
      this.$store.commit("login", {
        token: tokenFromLocalStorage,
      });
    }
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue) {
        this.$router.push("/home");
      }
    },
  },
  data() {
    return {
      username: "",
      password: "",
      passwordShown: false,
    };
  },
  methods: {
    submitHandler() {
      if (!this.isFormDataValid) return;
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style>
.form-container {
  height: 93vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
