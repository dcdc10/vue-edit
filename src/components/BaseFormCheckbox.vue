<template>
  <div class="formCheckbox" :class="[color]">
    <div
      class="formCheckbox_item"
      v-for="(option, index) in options"
      :key="index"
    >
      <input
        type="checkbox"
        :id="name + option.id"
        class="formCheckbox_input"
        :class="'js-formCheckbox_input-' + id"
        :name="name"
        :value="option.id"
        @change="updateValue"
        @blur="$emit('blur', $event)"
      />
      <label class="formCheckbox_label" :for="name + option.id">
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      values: [],
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
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
      type: [Array, String],
    },
  },
  methods: {
    updateValue: function (e) {
      if (e.target.checked) {
        this.values.push(e.target.value);
      } else {
        this.values = this.values.filter((v) => v != e.target.value);
      }
      this.values.sort(function (a, b) {
        return a - b;
      });
      this.$emit("input", this.values);
    },
  },
  mounted: function () {
    // 登録済みの値にチェックを入れておく処理
    if (this.registeredId) {
      this.registeredId.forEach((elem) => {
        this.values.push(elem);
      });

      const checks = document.querySelectorAll(
        ".js-formCheckbox_input-" + this.id
      );

      checks.forEach((elem) => {
        if (this.registeredId.find((element) => element == elem.value)) {
          elem.checked = true;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
