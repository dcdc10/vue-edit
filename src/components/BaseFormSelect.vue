<template>
  <div class="formSelect" :class="[unique, color]">
    <select
      :id="id"
      class="formSelect_select"
      :name="name"
      v-on:change="$emit('input', $event.target.value)"
      v-on:blur="$emit('blur', $event)"
    >
      <option hidden value="">
        {{ leadLabel }}
      </option>
      <option v-for="(option, key) in options" :key="key" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
    },
    color: {
      type: String,
    },
    unique: {
      type: String,
    },
    id: {
      type: String,
    },
    registeredId: {
      type: [Number, String],
    },
    leadLabel: {
      type: String,
    },
  },
  mounted: function () {
    // 登録済みの値をselectedにしておく処理
    if (this.registeredId) {
      const options = document.getElementById(this.id).options;
      options[this.registeredId].selected = true;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
