<template>
  <div id="app">
    <p class="logo">求人サイト hogehoge</p>
    <div class="edit">
      <div class="edit_inner">
        <h1 class="edit_title">マイページ</h1>
        <dl class="edit_list">
          <div class="edit_item">
            <dt class="edit_term">個人情報</dt>
            <dd class="edit_desc">
              <EditFieldPersonal
                :genders="genders"
                :birth-years="birthYears"
                :birth-months="birthMonths"
                :birth-days="birthDays"
                :hobbies="hobbies"
              />
            </dd>
          </div>
          <div class="edit_item">
            <dt class="edit_term">職務経歴</dt>
            <dd class="edit_desc">
              <EditFieldCareer
                :careers="careers"
                :career-years="careerYears"
                :employment-status-flgs="employmentStatusFlgs"
              />
            </dd>
          </div>
          <div class="edit_item">
            <dt class="edit_term">希望の業種</dt>
            <dd class="edit_desc">
              <EditFieldJob :jobs="jobs" />
            </dd>
          </div>
          <div class="edit_item">
            <dt class="edit_term">画像（png,jpg）</dt>
            <dd class="edit_desc">
              <EditFieldImage />
            </dd>
          </div>
        </dl>
        <p class="edit_note">前提</p>
        <ul class="edit_noteList">
          <li class="edit_noteItem">
            求人サイトに会員登録したユーザーが登録情報を編集する画面を想定
          </li>
          <li class="edit_noteItem">バックエンドはlaravelを想定</li>
          <li class="edit_noteItem">
            ユーザーが元々登録している情報はlaravelからpopsで渡すが、今回はベタ書きで対応
          </li>
          <li class="edit_noteItem">
            実際は「更新する」ボタンを押したときにaxiosでlaravelにpostするが今回は省略
          </li>
          <li class="edit_noteItem">
            laravelからvueに渡す登録済みデータも、「更新する」ボタンでvueからlaravelにpostするデータも、ラジオ、チェックボックス、セレクトボックスについては、valueは文字列ではなくidとする
          </li>
        </ul>
        <p class="edit_note">レビューしていただきたい箇所</p>
        <ul class="edit_noteList">
          <li class="edit_noteItem">Vue.js（HTMLとCSSはなし）</li>
          <li class="edit_noteItem">
            「個人情報」「職務経歴」の2つがレビューいただきたい第一優先。「画像」は時間がありそうだった場合。「希望の職種」は今回はレビュー対象外。
          </li>
        </ul>
        <p class="edit_note">どこに悩んでいるか</p>
        <ul class="edit_noteList">
          <li class="edit_noteItem">
            そもそも全体的な作りに問題はないか（動きは希望通りになっているけどコードのほうはどうか）
          </li>
          <li class="edit_noteItem">関数名の付け方</li>
          <li class="edit_noteItem">関数をどういう単位で分けるか</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import EditFieldPersonal from "./components/EditFieldPersonal.vue";
import EditFieldCareer from "./components/EditFieldCareer.vue";
import EditFieldJob from "./components/EditFieldJob.vue";
import EditFieldImage from "./components/EditFieldImage.vue";

export default {
  name: "App",
  components: {
    EditFieldCareer,
    EditFieldPersonal,
    EditFieldJob,
    EditFieldImage,
  },
  data: function () {
    return {
      isEditing: false,
      isTemporary: false,
      // 本来はlaravelから渡す性別の選択肢
      genders: [
        { id: 1, name: "男性" },
        { id: 2, name: "女性" },
        { id: 3, name: "その他" },
      ],
      // 本来はlaravelから渡す生年月日（年）の選択肢
      birthYears: [
        { id: 1, name: "1992" },
        { id: 2, name: "1993" },
        { id: 3, name: "1994" },
      ],
      // 本来はlaravelから渡す生年月日（月）の選択肢
      birthMonths: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "5" },
        { id: 6, name: "6" },
        { id: 7, name: "7" },
        { id: 8, name: "8" },
        { id: 9, name: "9" },
        { id: 10, name: "10" },
        { id: 11, name: "11" },
        { id: 12, name: "12" },
      ],
      // 本来はlaravelから渡す生年月日（日）の選択肢
      birthDays: [
        { id: 1, name: "20" },
        { id: 2, name: "21" },
        { id: 3, name: "22" },
        { id: 4, name: "23" },
      ],
      // 本来はlaravelから渡す趣味の選択肢
      hobbies: [
        { id: 1, name: "釣り" },
        { id: 2, name: "スポーツ" },
        { id: 3, name: "アニメ" },
        { id: 4, name: "映画" },
        { id: 5, name: "ゲーム" },
        { id: 6, name: "料理" },
      ],
      // 本来はlaravelから渡す開始年/終了年の選択肢
      careerYears: [
        { id: 1, name: "2010" },
        { id: 2, name: "2011" },
        { id: 3, name: "2012" },
        { id: 4, name: "2013" },
        { id: 5, name: "2014" },
        { id: 6, name: "2015" },
        { id: 7, name: "2017" },
      ],
      // 本来はlaravelから渡す「就業情報」の選択肢
      employmentStatusFlgs: [{ id: 1, name: "現在働いている" }],
      // 本来はlaravelから渡す業種の選択肢
      jobs: [
        { id: 1, name: "農林・水産" },
        { id: 2, name: "建設業" },
        { id: 3, name: "製造業" },
        { id: 4, name: "運輸・通信業" },
        { id: 5, name: "卸売・小売・飲食業" },
        { id: 6, name: "金融・保険業" },
        { id: 7, name: "サービス業" },
      ],
      // 本来はlaravelから渡す登録済みの職務経歴情報
      careers: [
        {
          companyName: "株式会社hoge",
          startYear: 1,
          endYear: 2,
          employmentStatus: [],
        },
        {
          companyName: "株式会社foo",
          startYear: 3,
          endYear: "",
          employmentStatus: [1],
        },
      ],
    };
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
.logo {
  text-align: left;
  padding-left: 20px;
}
.edit {
  margin-top: 30px;
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
.edit_note {
  font-size: 20px;
  text-align: left;
  margin-top: 30px;
}
.edit_noteList {
  text-align: left;
}
</style>
