<template>
  <div class="editField">
    <!-- start 編集画面 -->
    <div class="editField_edit" v-if="isEditing">
      <button
        class="editField_button editField_button-select"
        type="button"
        @click="open('modal-users')"
      >
        ユーザーを選ぶ
      </button>
      <modal name="modal-users">
        <ModalUsers
          :users="users"
          :registeredId="selectedId"
          @click-select-button="setSelectedName($event)"
        />
      </modal>
      <p class="editField_value">
        {{ selectedName }}
      </p>
      <div class="editField_buttons">
        <button
          type="button"
          class="editField_button editField_button-update"
          v-on:click="update"
        >
          更新する
        </button>
        <button
          type="button"
          class="editField_button editField_button-cancel"
          v-on:click="cancel"
        >
          キャンセル
        </button>
      </div>
    </div>
    <!-- end 編集画面 -->
    <!-- start 確認画面 -->
    <div class="editField_complete" v-if="!isEditing">
      <div class="editField_completeInner">
        <div class="editField_completeItem">登録済み：{{ show.user }}</div>
      </div>
      <div class="edit_button">
        <button type="button" v-on:click="edit">編集する</button>
      </div>
    </div>
    <!-- end 確認画面 -->
  </div>
</template>

<script>
import ModalUsers from "./ModalUsers.vue";

export default {
  name: "EditBoxModal",
  components: {
    ModalUsers,
  },
  data: function () {
    return {
      isEditing: false,
      isTemporary: false,
      users: [],
      // データ 一時格納
      temporary: {
        user: {
          id: "",
          name: "",
        },
      },
      registeredId: {
        user: "2",
      },
      show: {
        user: "Antonette",
      },
    };
  },
  computed: {
    selectedName: function () {
      return this.isTemporary
        ? this.temporary.user.name + "（仮）"
        : this.show.user + "（確定）";
    },
    selectedId: function () {
      return this.isTemporary ? this.temporary.user.id : this.registeredId.user;
    },
  },
  methods: {
    open: function (modalName) {
      this.$modal.push(modalName);
    },
    close: function () {
      this.$modal.pop();
    },
    edit: function () {
      this.isEditing = true;
    },
    update: function () {
      if (this.temporary.user.name && this.isTemporary) {
        this.show.user = this.temporary.user.name;
        this.registeredId.user = this.temporary.user.id;
      }
      this.isEditing = false;
      this.isTemporary = false;
    },
    cancel: function () {
      this.isEditing = false;
      this.isTemporary = false;
    },
    getNameFromId: function (options, id) {
      const targetObject = this[options].find((option) => {
        return option.id == id;
      });
      return targetObject.username;
    },
    // storeValue: function (value) {
    //   this.temporary.user.id = value;
    //   this.temporary.user.name = this.getNameFromId("users", value);
    // },
    setSelectedName: function (value) {
      this.temporary.user.id = value;
      this.temporary.user.name = this.getNameFromId("users", value);
      if (this.temporary.user.id) {
        this.isTemporary = true;
      }
    },
  },
  mounted: function () {
    const USERS_API = "https://jsonplaceholder.typicode.com/users";
    let self = this;

    async function callApi() {
      const res = await window.fetch(USERS_API);
      const users = await res.json();
      users.forEach((elem) => {
        self.users.push(elem);
      });
    }

    callApi();
  },
};
</script>

<style scoped lang="scss">
.editField_edit {
  box-shadow: 0 0 5px gray;
  border-radius: 10px;
  padding: 10px;
}
.editField_complete {
  display: flex;
  justify-content: space-between;
}
.editField_buttons {
  margin-top: 30px;
}
.editField_button {
  appearance: none;
  border: 1px solid gray;
  padding: 5px 10px;
  & + & {
    margin-left: 20px;
  }
  &.editField_button-select {
    background: #f7d5d5;
    border-radius: 20px;
  }
  &.editField_button-update {
    background: yellow;
    font-weight: bold;
    &:hover,
    &:focus {
      background: gold;
    }
  }
  &.editField_button-cancel {
  }
}
.editField_value {
  margin-top: 20px;
}
</style>
