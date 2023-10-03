<template>
  <div class="input-field" :class="{ 'checkbox-styles': type === 'checkbox' }">
    <label v-if="type !== 'checkbox'">{{ label }}</label>
    <input
      :value="value"
      @input="
        type === 'checkbox'
          ? $emit('input', !value)
          : $emit('input', $event.target.value)
      "
      :type="type"
      :required="type === 'checkbox' ? false : true"
    />
    <label v-if="type === 'checkbox'">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ["label", "value", "type"],
};
</script>

<style>
.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
.checkbox-styles {
  flex-direction: row;
}

.checkbox-styles label {
  margin-bottom: 0;
  margin-left: 1rem;
}

label {
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
}

input {
  padding: 1.5rem;
  border-radius: 0.6rem;
  border: 1px solid #313538;
  background-color: #151718;
  color: white;
  font-size: 1.4rem;
}
</style>
