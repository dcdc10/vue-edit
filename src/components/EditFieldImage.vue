<template>
  <div class="editField">
    <!-- start 入力画面 -->
    <form class="editField_edit" v-if="isEditing">
      <div class="editField_formInner">
        <div class="editField_item">
          <BaseFormFile
            name="image"
            plusButton
            v-on:input="setChangedId($event)"
          />
        </div>
        <div class="editField_buttons">
          <button
            type="button"
            class="editField_button editField_button-cancel"
            v-on:click="cancel"
          >
            キャンセル
          </button>
          <button
            type="button"
            class="editField_button editField_button-update"
            v-on:click="update"
          >
            更新する
          </button>
        </div>
      </div>
    </form>
    <!-- end 入力画面 -->
    <!-- start 完了画面 -->
    <div class="editField_complete" v-if="!isEditing">
      <div class="editField_completeInner">
        <dl class="editField_completeList">
          <div class="editField_completeItem">
            <dt class="editField_completeTerm">画像：</dt>
            <dd class="editField_completeDesc">
              <span v-for="(image, index) in show.image" :key="index">
                <img :src="image.src" alt="" />
              </span>
            </dd>
          </div>
        </dl>
        <div>
          <button class="editField_button" type="button" @click="edit">
            編集
          </button>
        </div>
      </div>
    </div>
    <!-- end 完了画面 -->
  </div>
</template>
<script>
import Mixin from "../mixins/edit";
import BaseFormFile from "./BaseFormFile.vue";

export default {
  name: "EditBoxPersonal",
  components: {
    BaseFormFile,
  },
  data: function () {
    return {
      isEditing: true,
      // データ一時格納
      temporary: {
        image: "",
      },
      // セレクト、ラジオ、チェックボックスの選択済みid格納
      registeredId: {
        // image: "",
      },
      // 画面表示
      show: {
        image: "",
      },
    };
  },
  props: {
    genders: {
      type: Array,
    },
    birthYears: {
      type: Array,
    },
    birthMonths: {
      type: Array,
    },
    birthDays: {
      type: Array,
    },
    hobbies: {
      type: Array,
    },
  },
  computed: {},
  methods: {
    update: function () {
      // それぞれの値を更新
      if (this.temporary.image) {
        // this.registeredId.image = this.temporary[key];
        this.show.image = this.temporary.image;
      }

      this.isEditing = false;
    },
    cancel: function () {
      this.isEditing = false;
      // this.temporary.hobby = this.registeredId.hobby;
    },
    setChangedId: function (value) {
      console.log("そのまんま", value);
      value.forEach((elem) => {
        console.log(elem.fileName);
      });
      const newArray = value.filter((file) => file.value !== "");
      this.temporary.image = newArray;
      console.log("空を削除したあと", this.temporary.image);
    },
  },
  mounted: function () {
    // 初期値をセット
  },
  mixins: [Mixin],
};
</script>

<style lang="scss" scoped>
.editField_edit {
  box-shadow: 0 0 5px gray;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
}
.editField_item {
  & + & {
    margin-top: 30px;
  }
}
.editField_complete {
  text-align: left;
}
.editField_completeInner {
  display: flex;
  justify-content: space-between;
}
.editField_completeItem {
  display: flex;
}
.editField_completeList {
  width: 80%;
}
.editField_completeTerm {
  flex: 1;
}
.editField_completeDesc {
  flex: 3;
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
.editFieldPersonal_birthWrapper {
  display: flex;
}
.editFieldPersonal_birthItem {
  display: flex;
}
</style>
