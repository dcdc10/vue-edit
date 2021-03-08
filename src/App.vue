<template>
  <div id="app">
    <div class="edit">
      <div class="edit_inner">
        <h1 class="edit_title">設定画面</h1>
        <dl class="edit_list">
          <div class="edit_item">
            <dt class="edit_term">ユーザー選択</dt>
            <dd class="edit_desc">
              <EditBox />
            </dd>
          </div>
          <div class="edit_item">
            <dt class="edit_term">未定</dt>
            <dd class="edit_desc">未定</dd>
          </div>
          <div class="edit_item">
            <dt class="edit_term">未定</dt>
            <dd class="edit_desc">未定</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import EditBox from "./components/EditBox.vue";

export default {
  name: "App",
  components: {
    EditBox,
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 30px 0;
}
.edit {
}
.edit_inner {
  padding: 0 20px;
  max-width: 1040px;
  margin: 0 auto;
}
.edit_title {
  font-size: 30px;
}
.edit_list {
  margin-top: 50px;
}
.edit_item {
  display: flex;
  border-top: 1px solid #adadad;
  &:last-child {
    border-bottom: 1px solid #adadad;
  }
}
.edit_term {
  background: #e3ffea;
  flex: 1;
  text-align: left;
  padding: 20px;
}
.edit_desc {
  flex: 3;
  padding: 20px;
}
</style>
