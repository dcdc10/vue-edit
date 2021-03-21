<template>
  <div class="modalBox">
    <div class="modalBox_inner">
      <h2 class="modalBox_title">業種リスト</h2>
      <ul class="modalBox_list">
        <li class="modalBox_item" v-for="(job, index) in jobs" :key="index">
          <input
            :id="'job-' + job.id"
            class="modalBox_radio js-modalBox_radio-job"
            type="radio"
            name="job"
            :value="job.id"
            v-on:change="keepValue"
          />
          <label class="modalBox_label" :for="'job-' + job.id">
            {{ job.name }}
          </label>
        </li>
      </ul>
      <div class="modalBox_buttons">
        <button
          class="modalBox_button modalBox_button-close"
          v-on:click="close"
        >
          キャンセル
        </button>
        <button
          class="modalBox_button modalBox_button-ok"
          type="button"
          v-on:click="clickSelectButton"
        >
          選ぶ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from "../mixins/modal";
export default {
  data: function () {
    return {
      value: "",
    };
  },
  props: {
    jobs: {
      type: Array,
    },
    registeredId: {
      // type: Number,
    },
  },
  methods: {
    keepValue: function (e) {
      this.value = e.target.value;
    },
    clickSelectButton: function () {
      this.$emit("click-select-button", this.value);
      this.close();
    },
  },
  mounted: function () {
    // 登録済みの値をセット
    if (this.registeredId) {
      this.value = this.registeredId;
      const checks = document.querySelectorAll(".js-modalBox_radio-job");
      checks[this.registeredId - 1].checked = true;
    }
  },
  mixins: [ModalMixin],
};
</script>

 <style lang="scss" scoped>
li {
  list-style: none;
}
.modalBox_title {
  text-align: center;
}
.modalBox_item {
  & + & {
    margin-top: 10px;
  }
}
.modalBox_buttons {
  display: flex;
  justify-content: center;
}
.modalBox_button {
  appearance: none;
  border: 1px solid gray;
  min-width: 100px;
  cursor: pointer;
  & + & {
    margin-left: 10px;
  }
  &.modalBox_button-ok {
    background: yellow;
    font-size: 20px;
    &:hover,
    &:focus {
      background: gold;
    }
  }
}
</style>
