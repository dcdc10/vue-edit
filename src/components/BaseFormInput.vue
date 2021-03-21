<template>
  <div class="formInput" :class="[unique]">
    <input
      :type="type"
      :id="id"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
    name: {
      type: String,
    },
    unique: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

