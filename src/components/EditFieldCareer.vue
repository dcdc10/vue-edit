<template>
  <div class="editField">
    <!-- start 入力画面 -->
    <template v-for="(career, index) in initialData">
      <div class="editField_formWrapper" :key="index">
        <form
          :id="'form-jobCareer-' + index"
          class="editField_edit"
          v-if="career.isEditing"
        >
          <div class="editField_formInner">
            <div class="editField_item">
              <p>企業名</p>
              <BaseFormInput
                type="text"
                name="companyName"
                :id="'companyName-' + index"
                v-model.trim="career.temporary.companyName"
              />
            </div>
            <div class="editField_item">
              <p>期間</p>
              <div class="editFieldJobCareer_selectItem">
                <span class="editFieldJobCareer_label">開始年</span>
                <div class="editFieldJobCareer_selectYear">
                  <BaseFormSelect
                    :id="'startYear-' + index"
                    :registeredId="career.registeredId.startYear"
                    lead-label="選択"
                    name="startYear"
                    :options="careerYears"
                    v-on:input="setChangedIdArr($event, 'startYear', index)"
                  />
                </div>
                <span class="editFieldJobCareer_selectText">年</span>
              </div>
              <div class="editFieldJobCareer_selectItem">
                <span class="editFieldJobCareer_label">終了年</span>
                <div class="editFieldJobCareer_selectYear">
                  <BaseFormSelect
                    :id="'endYear-' + index"
                    :registeredId="career.registeredId.endYear"
                    lead-label="選択"
                    name="endYear"
                    :options="careerYears"
                    v-on:input="setChangedIdArr($event, 'endYear', index)"
                  />
                </div>
                <span class="editFieldJobCareer_selectText">年</span>
              </div>
              <div class="editFieldJobCareer_checkbox">
                <BaseFormCheckbox
                  id="employmentStatus"
                  name="employmentStatus"
                  :registeredId="career.registeredId.employmentStatus"
                  :options="employmentStatusFlgs"
                  v-on:input="
                    setChangedIdArr($event, 'employmentStatus', index)
                  "
                />
              </div>
            </div>
            <div class="editField_buttons">
              <button
                type="button"
                unique="editField_button editField_button-delete"
                @click="deleteForm(index)"
              >
                削除
              </button>
              <button
                type="button"
                class="editField_button editField_button-cancel"
                v-on:click="cancel(index)"
              >
                キャンセル
              </button>
              <button
                type="button"
                class="editField_button editField_button-update"
                v-on:click="update(index)"
              >
                更新する
              </button>
            </div>
          </div>
        </form>
        <!-- end 入力画面 -->
        <!-- start 完了画面 -->
        <div class="editField_complete" v-if="!career.isEditing">
          <div class="editField_completeInner">
            <dl class="editField_completeList">
              <div class="editField_completeItem">
                <dt class="editField_completeTerm">企業名：</dt>
                <dd class="editField_completeDesc">
                  {{ career.show.companyName }}
                </dd>
              </div>
              <div class="editField_completeItem">
                <dt class="editField_completeTerm">期間：</dt>
                <dd class="editField_completeDesc">
                  {{ career.show.startYear }}年〜{{
                    career.show.endYear
                  }}年<br />
                  {{ career.show.employmentStatus }}
                </dd>
              </div>
            </dl>
            <div>
              <button
                class="editField_button"
                type="button"
                @click="editArr(index)"
              >
                編集
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- end 完了画面 -->
    <div class="editField_plusButton">
      <button type="button" @click="addForm()">＋ 職務経歴を追加</button>
    </div>
  </div>
</template>

<script>
import EditMixin from "../mixins/edit";
import BaseFormCheckbox from "./BaseFormCheckbox.vue";
import BaseFormInput from "./BaseFormInput.vue";
import BaseFormSelect from "./BaseFormSelect.vue";

export default {
  name: "EditBoxCareer",
  components: {
    BaseFormCheckbox,
    BaseFormInput,
    BaseFormSelect,
  },
  data: function () {
    return {
      initialData: [],
    };
  },
  props: {
    careers: {
      type: Array,
    },
    careerYears: {
      type: Array,
    },
    employmentStatusFlgs: {
      type: Array,
    },
  },
  methods: {
    update: function (index) {
      // それぞれの値を更新

      // 企業名
      this.updateTextArr("companyName", index);
      // 開始年
      this.updateNotTextArr(
        "careerYears",
        this.initialData[index].temporary.startYear,
        "startYear",
        index
      );
      // 終了年
      this.updateNotTextArr(
        "careerYears",
        this.initialData[index].temporary.endYear,
        "endYear",
        index
      );
      // 「現在働いている」
      this.updateNotTextArr(
        "employmentStatusFlgs",
        this.initialData[index].temporary.employmentStatus,
        "employmentStatus",
        index,
        "checkbox"
      );

      this.$set(this.initialData[index], "isEditing", false);
    },
    cancel: function (index) {
      this.$set(this.initialData[index], "isEditing", false);
      // 企業名
      this.$set(
        this.initialData[index].temporary,
        "companyName",
        this.initialData[index].show.companyName
      );
      // 開始年
      this.$set(
        this.initialData[index].temporary,
        "startYear",
        this.initialData[index].registeredId.startYear
      );
      // 終了年
      this.$set(
        this.initialData[index].temporary,
        "endYear",
        this.initialData[index].registeredId.endYear
      );
      //「現在働いている」
      this.$set(
        this.initialData[index].temporary,
        "employmentStatus",
        this.initialData[index].registeredId.employmentStatus
      );
    },
    addForm: function () {
      const template = {
        isEditing: true,
        // データ一時格納
        temporary: {
          companyName: "",
          startYear: "",
          endYear: "",
          employmentStatus: [],
        },
        // セレクト、ラジオ、チェックボックスの確定選択済みid格納
        registeredId: {
          startYear: "",
          endYear: "",
          employmentStatus: [],
        },
        // 画面表示
        show: {
          companyName: "",
          startYear: "",
          endYear: "",
          employmentStatus: "",
        },
      };
      this.initialData.push(template);
    },
    deleteForm: function (index) {
      this.initialData.splice(index, 1);
    },
  },
  mounted: function () {
    if (this.careers) {
      const len = this.careers.length;
      this.initialData = [...Array(len)].map(() => {
        return {
          isEditing: true,
          // データ一時格納
          temporary: {
            companyName: "",
            startYear: "",
            endYear: "",
            employmentStatus: [],
          },
          // セレクト、ラジオ、チェックボックスの確定選択済みid格納
          registeredId: {
            startYear: "",
            endYear: "",
            employmentStatus: [],
          },
          // 画面表示
          show: {
            companyName: "",
            startYear: "",
            endYear: "",
            employmentStatus: "",
          },
        };
      });
    } else {
      this.initialData = {
        isEditing: true,
        // データ一時格納
        temporary: {
          companyName: "",
          startYear: "",
          endYear: "",
          employmentStatus: [],
        },
        // セレクト、ラジオ、チェックボックスの確定選択済みid格納
        registeredId: {
          startYear: "",
          endYear: "",
          employmentStatus: [],
        },
        // 画面表示
        show: {
          companyName: "",
          startYear: "",
          endYear: "",
          employmentStatus: "",
        },
      };
    }

    // それぞれ初期値をセット
    this.careers.forEach((elem, index) => {
      this.setRegisteredTextArr(elem.companyName, "companyName", index);
      this.setRegisteredNotTextArr(
        "careerYears",
        elem.startYear,
        "startYear",
        index
      );
      this.setRegisteredNotTextArr(
        "careerYears",
        elem.endYear,
        "endYear",
        index
      );
      this.setRegisteredNotTextMultiArr(
        "employmentStatusFlgs",
        elem.employmentStatus,
        "employmentStatus",
        index
      );
    });
  },
  mixins: [EditMixin],
};
</script>

<style lang="scss" scoped>
.editField_formWrapper {
  & + & {
    border-top: 1px solid #adadad;
    margin-top: 30px;
    padding-top: 30px;
  }
}
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
    margin-left: 20px;
  }
}
.editField_plusButton {
  margin-top: 30px;
}
.editFieldJobCareer_selectItem {
  display: flex;
}
</style>
