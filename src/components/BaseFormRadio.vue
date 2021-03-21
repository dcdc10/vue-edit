<template>
  <div class="formRadio" :class="[unique, color, column]">
    <div class="formRadio_item" v-for="(option, key) in options" :key="key">
      <input
        :id="id + -option.id"
        class="formRadio_input"
        :class="'js-formRadio_input-' + id"
        type="radio"
        :name="name"
        :value="option.id"
        v-on:change="$emit('input', $event.target.value)"
      />
      <label class="formRadio_label" :for="id + -option.id">
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    column: {
      type: String,
    },
    unique: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
    },
    registeredId: {
      type: [Number, String],
    },
  },
  mounted: function () {
    // 登録済みの値にチェックを入れておく処理
    if (this.registeredId) {
      const checks = document.querySelectorAll(
        ".js-formRadio_input-" + this.id
      );

      checks.forEach((elem) => {
        if (this.registeredId == elem.value) {
          elem.checked = true;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
