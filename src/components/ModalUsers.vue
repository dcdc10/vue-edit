<template>
  <div class="modalBox">
    <div class="modalBox_inner">
      <h2 class="modalBox_title">ユーザーリスト</h2>
      <ul class="modalBox_list">
        <li class="modalBox_item" v-for="(user, index) in users" :key="index">
          <input
            :id="'user-' + user.id"
            class="modalBox_radio js-modalBox_radio-user"
            type="radio"
            name="user"
            :value="user.id"
            v-on:change="keepValue"
          />
          <label class="modalBox_label" :for="'user-' + user.id">
            {{ user.username }}
          </label>
        </li>
      </ul>
      <div class="modalBox_buttons">
        <button
          class="modalBox_button modalBox_button-ok"
          type="button"
          v-on:click="clickSelectButton"
        >
          選ぶ
        </button>
        <button
          class="modalBox_button modalBox_button-close"
          v-on:click="close"
        >
          キャンセル
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      value: "",
    };
  },
  props: {
    users: {
      type: Array,
    },
    registeredId: {
      // type: Number,
    },
  },
  methods: {
    close: function () {
      this.$modal.pop();
    },
    keepValue: function (e) {
      this.value = e.target.value;
      console.log("this.value", this.value);
    },
    clickSelectButton: function () {
      this.$emit("click-select-button", this.value);
      this.close();
    },
  },
  mounted: function () {
    window.hoge = "aa";
    alert("hey");
    // 登録済みの値をセット
    if (this.registeredId) {
      this.value = this.registeredId;
      const checks = document.querySelectorAll(".js-modalBox_radio-user");
      checks[this.registeredId - 1].checked = true;
    }
  },
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
