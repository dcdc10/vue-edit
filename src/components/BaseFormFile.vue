<template>
  <div class="formFile" :class="[unique]">
    <div class="formFile_unit" v-for="(file, index) in fileList" :key="index">
      <div class="formFile_textUnit">
        <p class="formFile_text">{{ file.fileName }}</p>
        <input
          class="formFile_input"
          type="file"
          ref="fileUp"
          :id="'companyImage-' + index"
          :name="name"
          accept="image/png, image/jpeg"
          v-on:change="updateImageDisplay(index, $event)"
        />
        <label class="formFile_label" :for="'companyImage-' + index">
          <span class="formFile_labelInner">参照</span>
        </label>
      </div>
      <div class="formFile_imgUnit">
        <img :src="file.src" :alt="file.alt" class="formFile_img" />
        <button
          type="button"
          class="formFile_imgButton"
          v-if="file.deleteButton"
          @click="deleteImage(index)"
        >
          消
        </button>
      </div>
    </div>
    <div class="formFile_button" v-if="plusButton">
      <button type="button" @click="addNewLine">＋ 行を追加</button>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      fileList: [],
    };
  },
  props: {
    id: {
      type: String,
    },
    fileData: {
      type: Array,
    },
    name: {
      type: String,
    },
    unique: {
      type: String,
    },
    plusButton: {
      type: Boolean,
    },
  },
  methods: {
    addNewLine: function () {
      const additionalNewLine = {
        value: "",
        fileName: "ファイルを参照してください",
        deleteButton: false,
        src: "",
        alt: "",
      };
      this.fileList.push(additionalNewLine);
    },
    updateImageDisplay: function (index, event) {
      const files = event.target.files;

      if (files.length === 0) {
        // ファイルが選択されたなかったときの処理

        const additional = {
          value: "",
          fileName: "ファイルを参照してください",
          deleteButton: false,
          src: "",
          alt: "",
        };
        this.fileList.splice(index, 1, additional);
      } else {
        // ファイルが選択された場合の処理

        // fileListのindex番目のfileNameを選択されたファイル名に変更

        const fileReader = new FileReader();
        const self = this;

        fileReader.onload = function () {
          const additional = {
            value: event.target.value,
            fileName: files[0].name,
            deleteButton: true,
            src: fileReader.result,
            alt: "",
          };
          self.fileList.splice(index, 1, additional);
        };
        fileReader.readAsDataURL(files[0]);
      }
      this.$emit("input", this.fileList);
    },
    deleteImage: function (index) {
      this.$refs.fileUp[index].value = "";
      this.fileList.splice(index, 1);

      if (!this.fileList.length) {
        this.fileList = [
          {
            value: "",
            fileName: "ファイルを参照してください",
            deleteButton: false,
            src: "",
            alt: "",
          },
        ];
      }
      this.$emit("input", this.fileList);
    },
  },
  mounted: function () {
    if (this.fileData) {
      const len = this.fileData.length;
      this.fileList = [...Array(len)].map(() => {
        return {
          value: "",
          fileName: "ファイルを参照してください",
          deleteButton: false,
          src: "",
          alt: "",
        };
      });
    } else {
      const initialLine = {
        value: "",
        fileName: "ファイルを参照してください",
        deleteButton: false,
        src: "",
        alt: "",
      };
      this.fileList.push(initialLine);
    }
  },
};
</script>

<style lang="scss" scoped>
.formFile {
  @media (min-width: 768px) {
  }
}
.formFile_unit {
  @media (min-width: 768px) {
  }
  & + & {
    margin-top: 10px;
  }
}
.formFile_textUnit {
  display: flex;
  justify-content: space-between;
  border: 1px solid #d1dbdd;
}
.formFile_text {
  color: #9bacad;
  font-size: 1.2rem;
  padding: 10px;
  @media (min-width: 768px) {
    font-size: 1.6rem;
    padding: 11px 20px;
  }
}
.formFile_input {
  display: none;
  // opacity: 0;
  @media (min-width: 768px) {
  }
}
.formFile_label {
  display: flex;
  flex-flow: column;
  justify-content: center;
  background: #d9e2e2;
  border-left: 1px solid #d1dbdd;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  padding: 12px 10px;
  min-width: 64px;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 1.4rem;
    min-width: 80px;
    transition: opacity 0.3s;
    &:hover,
    &:focus {
      opacity: 0.6;
    }
  }
}
.formFile_button {
  margin-top: 15px;
  @media (min-width: 768px) {
    margin-top: 20px;
  }
}
.formFile_imgUnit {
  position: relative;
  width: 48%;
  @media (min-width: 768px) {
    width: 30%;
  }
}
.formFile_img {
}
.formFile_imgButton {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #54c2cb;
  border-radius: 50%;
  border: 0;
  width: 48px;
  height: 48px;
  @media (min-width: 768px) {
  }
}
</style>

