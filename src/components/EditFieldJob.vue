<template>
  <div class="editField">
    <!-- start 編集画面 -->
    <div class="editField_edit" v-if="isEditing">
      <button
        class="editField_button editField_button-select"
        type="button"
        @click="open('modal-jobs')"
      >
        業種を選ぶ
      </button>
      <modal name="modal-jobs">
        <ModalJobs
          :jobs="jobs"
          :registeredId="selectedId('job')"
          @click-select-button="setSelectedName($event, 'job', 'jobs')"
        />
      </modal>
      <p class="editField_value">
        {{ selectedName("job") }}
      </p>
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
    <!-- end 編集画面 -->
    <!-- start 確認画面 -->
    <div class="editField_complete" v-if="!isEditing">
      <div class="editField_completeInner">
        <div class="editField_completeItem">{{ show.job }}</div>
      </div>
      <div>
        <button class="editField_button" type="button" v-on:click="edit">
          編集
        </button>
      </div>
    </div>
    <!-- end 確認画面 -->
  </div>
</template>

<script>
import EditMixin from "../mixins/edit";
import ModalMixin from "../mixins/modal";
import ModalJobs from "./ModalJobs.vue";

export default {
  name: "EditBoxModal",
  components: {
    ModalJobs,
  },
  data: function () {
    return {
      isEditing: false,
      isTemporary: {
        job: false,
      },
      // データ 一時格納
      temporary: {
        job: {
          id: "",
          name: "",
        },
      },
      registeredId: {
        job: "",
      },
      show: {
        job: "",
      },
    };
  },
  props: {
    jobs: {
      type: Array,
    },
  },
  computed: {
    selectedName: function () {
      return function (item) {
        return this.isTemporary[item]
          ? this.temporary[item].name + "（仮）"
          : this.show[item] + "（確定）";
      };
    },
    selectedId: function () {
      return function (item) {
        return this.isTemporary[item]
          ? this.temporary[item].id
          : this.registeredId[item];
      };
    },
  },
  methods: {
    update: function () {
      if (this.temporary.job.name && this.isTemporary.job) {
        this.show.job = this.temporary.job.name;
        this.registeredId.job = this.temporary.job.id;
      }
      Object.keys(this.isTemporary).forEach((key) => {
        this.isTemporary[key] = false;
      });
      this.isEditing = false;
    },
    cancel: function () {
      this.isEditing = false;
      Object.keys(this.isTemporary).forEach((key) => {
        this.isTemporary[key] = false;
      });
    },
  },
  mounted: function () {
    // 初期値をセット
    this.setRegisteredNotText("jobs", 2, "job");
  },
  mixins: [EditMixin, ModalMixin],
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
