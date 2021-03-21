<template>
  <div class="editField">
    <!-- start 入力画面 -->
    <form class="editField_edit" v-if="isEditing">
      <div class="editField_formInner">
        <div class="editField_item">
          <p>名前</p>
          <BaseFormInput
            type="text"
            name="name"
            id="name"
            placeholder="姓"
            v-model.trim="temporary.name"
          />
        </div>
        <div class="editField_item">
          <p>フリガナ</p>
          <BaseFormInput
            type="text"
            name="kana"
            id="kana"
            placeholder="セイ"
            v-model.trim="temporary.kana"
          />
        </div>
        <div class="editField_item">
          <p>性別</p>
          <BaseFormRadio
            id="gender"
            unique="formRadio-editPersonal"
            :registeredId="registeredId.gender"
            name="gender"
            :options="genders"
            v-on:input="setChangedId($event, 'gender')"
          />
        </div>
        <div class="editField_item">
          <p>生年月日</p>
          <div class="editFieldPersonal_birthWrapper">
            <div class="editFieldPersonal_birthItem">
              <div
                class="editFieldPersonal_birthInput editFieldPersonal_birthInput-year"
              >
                <BaseFormSelect
                  id="birthYear"
                  :registeredId="registeredId.birthYear"
                  lead-label="選択"
                  name="birthYear"
                  :options="birthYears"
                  v-on:input="setChangedId($event, 'birthYear')"
                />
              </div>
              <span class="editFieldPersonal_birthText">年</span>
            </div>
            <div class="editFieldPersonal_birthItem">
              <div
                class="editFieldPersonal_birthInput editFieldPersonal_birthInput-month"
              >
                <BaseFormSelect
                  id="birthMonth"
                  :registeredId="registeredId.birthMonth"
                  lead-label="選択"
                  name="birthMonth"
                  :options="birthMonths"
                  v-on:input="setChangedId($event, 'birthMonth')"
                />
              </div>
              <span class="editFieldPersonal_birthText">月</span>
            </div>
            <div class="editFieldPersonal_birthItem">
              <div
                class="editFieldPersonal_birthInput editFieldPersonal_birthInput-day"
              >
                <BaseFormSelect
                  id="birthDay"
                  :registeredId="registeredId.birthDay"
                  lead-label="選択"
                  name="birthDay"
                  :options="birthDays"
                  v-on:input="setChangedId($event, 'birthDay')"
                />
              </div>
              <span class="editFieldPersonal_birthText">日</span>
            </div>
          </div>
        </div>
        <div class="editField_item">
          <p>趣味</p>
          <BaseFormCheckbox
            id="hobby"
            :registeredId="registeredId.hobby"
            name="hobby"
            :options="hobbies"
            v-on:input="setChangedId($event, 'hobby')"
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
            <dt class="editField_completeTerm">名前：</dt>
            <dd class="editField_completeDesc">
              {{ show.name }}
            </dd>
          </div>
          <div class="editField_completeItem">
            <dt class="editField_completeTerm">フリガナ：</dt>
            <dd class="editField_completeDesc">
              {{ show.kana }}
            </dd>
          </div>
          <div class="editField_completeItem">
            <dt class="editField_completeTerm">性別：</dt>
            <dd class="editField_completeDesc">
              {{ show.gender }}
            </dd>
          </div>
          <div class="editField_completeItem">
            <dt class="editField_completeTerm">生年月日：</dt>
            <dd class="editField_completeDesc">
              {{ show.birthYear }}年 {{ show.birthMonth }}月
              {{ show.birthDay }}日
            </dd>
          </div>
          <div class="editField_completeItem">
            <dt class="editField_completeTerm">趣味：</dt>
            <dd class="editField_completeDesc">
              {{ show.hobby }}
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
import BaseFormCheckbox from "./BaseFormCheckbox.vue";
import BaseFormInput from "./BaseFormInput.vue";
import BaseFormRadio from "./BaseFormRadio.vue";
import BaseFormSelect from "./BaseFormSelect.vue";

export default {
  name: "EditBoxPersonal",
  components: {
    BaseFormCheckbox,
    BaseFormInput,
    BaseFormRadio,
    BaseFormSelect,
  },
  data: function () {
    return {
      isEditing: true,
      // データ一時格納
      temporary: {
        name: "",
        kana: "",
        gender: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        hobby: "",
      },
      // セレクト、ラジオ、チェックボックスの選択済みid格納
      registeredId: {
        gender: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        hobby: "",
      },
      // 画面表示
      show: {
        name: "",
        kana: "",
        gender: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
        hobby: "",
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
      this.updateText("name");
      this.updateText("kana");
      this.updateNotText("genders", this.temporary.gender, "gender");
      this.updateNotText("birthYears", this.temporary.birthYear, "birthYear");
      this.updateNotText(
        "birthMonths",
        this.temporary.birthMonth,
        "birthMonth"
      );
      this.updateNotText("birthDays", this.temporary.birthDay, "birthDay");
      this.updateNotText("hobbies", this.temporary.hobby, "hobby");

      this.isEditing = false;
    },
    cancel: function () {
      this.isEditing = false;
      this.temporary.name = this.show.name;
      this.temporary.kana = this.show.kana;
      this.temporary.gender = this.registeredId.gender;
      this.temporary.birthYear = this.registeredId.birthYear;
      this.temporary.birthMonth = this.registeredId.birthMonth;
      this.temporary.birthDay = this.registeredId.birthDay;
      this.temporary.hobby = this.registeredId.hobby;
    },
  },
  mounted: function () {
    // それぞれ初期値をセット
    this.setRegisteredText("田中太郎", "name");
    this.setRegisteredText("タナカタロウ", "kana");
    this.setRegisteredNotText("genders", 1, "gender");
    this.setRegisteredNotText("birthYears", 2, "birthYear");
    this.setRegisteredNotText("birthMonths", 3, "birthMonth");
    this.setRegisteredNotText("birthDays", 1, "birthDay");
    this.setRegisteredNotTextMulti("hobbies", [2, 3], "hobby");
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
