export default {
	methods: {
		/**
		 * 登録済みのテキストデータ（input,textarea）を初期セットします。
		 * @param {String || Null} data laravelから受け取った該当データ
		 * @param {String} key show,temporaryオブジェクトの該当のキー
		 */
		setRegisteredText: function (data, key) {
			if (data) {
				// 登録済みの値を表示
				this.temporary[key] = data;
				this.show[key] = this.temporary[key];

				this.isEditing = false;
			}
		},
		/**
		 * 登録済みのテキストデータ（input,textarea）を初期セットします。
		 * @param {String || Null} data laravelから受け取った該当データ
		 * @param {String} key show,temporaryオブジェクトの該当のキー
		 * @param {Number} index 添字
		 */
		setRegisteredTextArr: function (data, key, index) {
			if (data) {
				// 登録済みの値を表示
				this.$set(this.initialData[index].temporary, key, data);
				this.$set(this.initialData[index].show, key, data);

				this.$set(this.initialData[index], 'isEditing', false);
			}
		},
		/**
		 * 登録済みのテキスト以外のデータ（select,radio）を初期セットします。
		 * @param {Array}  options laravelから渡される項目
		 * @param {Number} id
		 * @param {String} key show,registeredIdオブジェクトの該当のキー
		 */
		setRegisteredNotText: function (options, id, key) {
			if (id) {
				this.show[key] = this.getNameById(options, id);
				this.registeredId[key] = id;

				this.isEditing = false;
			}
		},
		/**
		 * 登録済みのテキスト以外のデータ（select,radio）を初期セットします。
		 * @param {Array}  options laravelから渡される項目
		 * @param {Number} id
		 * @param {String} key show,registeredIdオブジェクトの該当のキー
		 * @param {Number} index 添字
		 */
		setRegisteredNotTextArr: function (options, id, key, index) {
			if (id) {
				const gotName = this.getNameById(options, id);
				this.$set(this.initialData[index].show, key, gotName);
				this.$set(this.initialData[index].registeredId, key, id);

				this.$set(this.initialData[index], 'isEditing', false);
			}
		},
		/**
		 * 登録済みのテキスト以外のデータ（checkbox）を初期セットします。
		 * @param {Array}  options laravelから渡される項目
		 * @param {Array}  ids
		 * @param {String} key show,registeredIdオブジェクトの該当のキー
		 */
		setRegisteredNotTextMulti: function (options, ids, key) {
			if (ids) {
				this.temporary[key] = ids;
				this.show[key] = this.getNamesByIds(options, ids);
				this.registeredId[key] = ids;

				this.isEditing = false;
			}
		},
		/**
		 * 登録済みのテキスト以外のデータ（checkbox）を初期セットします。
		 * @param {Array}  options laravelから渡される項目
		 * @param {Array}  ids
		 * @param {String} key show,registeredIdオブジェクトの該当のキー
		 * @param {Number} index 添字
		 */
		setRegisteredNotTextMultiArr: function (options, ids, key, index) {
			if (ids[0]) {
				this.$set(this.initialData[index].temporary, key, ids);
				const gotNames = this.getNamesByIds(options, ids);
				this.$set(this.initialData[index].show, key, gotNames);
				this.$set(this.initialData[index].registeredId, key, ids);

				this.$set(this.initialData[index], 'isEditing', false);
			}
		},
		/**
		 * 更新ボタンを押したときにテキストデータを一時格納から確定へ移します。
		 * @param {String} key show,temporaryオブジェクトの該当のキー
		 */
		updateText: function (key) {
			if (this.temporary[key]) {
				this.show[key] = this.temporary[key];
			}
		},
		/**
		 * 更新ボタンを押したときにテキストデータを一時格納から確定へ移します。
		 * @param {String} key show,temporaryオブジェクトの該当のキー
		 * @param {Number} index 添字
		 */
		updateTextArr: function (key, index) {
			if (this.initialData[index].temporary[key]) {
				this.$set(this.initialData[index].show, key, this.initialData[index].temporary[key]);
			}
		},
		/**
		 * 更新ボタンを押したときにテキスト以外データを一時格納から確定へ移します。
		 * @param {Array}  options laravelから渡される項目
		 * @param {Number} id
		 * @param {String} key show,registeredId,temporaryオブジェクトの該当のキー
		 */
		updateNotText: function (options, id, key) {
			if (this.temporary[key]) {
				this.registeredId[key] = this.temporary[key];

				// チェックボックスの場合とそうでない場合
				if (Array.isArray(id)) {
					const gotName = this.getNamesByIds(options, id);
					this.show[key] = gotName;
				} else {
					const gotNames = this.getNameById(options, id);
					this.show[key] = gotNames;
				}
			}
		},
		/**
		 * 更新ボタンを押したときにテキスト以外データを一時格納から確定へ移します。
		 * @param {Array}  options laravelから渡される項目
		 * @param {Number} id
		 * @param {String} key show,registeredId,temporaryオブジェクトの該当のキー
		 * @param {Number} index 添字
		 */
		updateNotTextArr: function (options, id, key, index) {
			if (this.initialData[index].temporary[key]) {
				this.$set(this.initialData[index].registeredId, key, this.initialData[index].temporary[key]);

				// チェックボックスの場合とそうでない場合
				if (Array.isArray(id)) {
					const gotNames = this.getNamesByIds(options, id);
					this.$set(this.initialData[index].show, key, gotNames);
				} else {
					const gotName = this.getNameById(options, id);
					this.$set(this.initialData[index].show, key, gotName);
				}
			}
		},
		/**
		 * idをもとに紐づくnameを取得します。
		 * @param  {Array}  options laravelから渡される項目
		 * @param  {Number} id
		 * @return {String} idに紐づくname
		 */
		getNameById: function (options, id) {
			const targetObject = this[options].find((option) => {
				return option.id == id;
			});
			return targetObject.name
		},
		/**
		 * 配列のidsをもとに紐づくそれぞれのnameを取得します。
		 * @param  {Array} options laravelから渡される項目
		 * @param  {Array} ids
		 * @return {Array} それぞれのidに紐づくname
		 */
		getNamesByIds: function (options, ids) {
			let targetNames = []

			ids.forEach(elem => {
				const targetObject = this[options].find((option) => {
					return option.id == elem;
				});
				targetNames.push(targetObject.name)
			});
			return targetNames.join(', ')
		},
		/**
		 * EditField（単数）で使用します。
		 */
		edit: function () {
			this.isEditing = true;
		},
		/**
		 * EditField（複数）で使用します。
		 */
		editArr: function (index) {
			this.$set(this.initialData[index], 'isEditing', true);
		},
		/**
		 * EditField（単数）で使用します。
		 * @param {String} value 子コンポーネントから渡されたid
		 * @param {String} key temporaryオブジェクトの該当のキー
		 */
		setChangedId: function (value, key) {
			this.temporary[key] = value;
		},
		/**
		 * EditField（複数）で使用します。
		 * @param {String} value 子コンポーネントから渡されたid
		 * @param {String} key temporaryオブジェクトの該当のキー
		 */
		setChangedIdArr: function (value, key, index) {
			this.$set(this.initialData[index].temporary, key, value);
		},
		/**
		 * EditField（単数）のモーダルを持つ要素で使用します。
		 * @param {String || Array} value emitされた値
		 * @param {String} item dataで定義している変数
		 * @param {Array} options laravelから渡される項目
		 */
		setSelectedName: function (value, item, options) {
			this.temporary[item].id = value;

			if (Array.isArray(value)) {
				this.temporary[item].name = this.getNamesByIds(
					options,
					value
				);
			} else {
				this.temporary[item].name = this.getNameById(options, value);
			}

			if (this.temporary[item].id) {
				this.isTemporary[item] = true;
			}
		},
		/**
		 * EditField（複数）のモーダルを持つ要素で使用します。
		 * @param {String || Array} value emitされた値
		 * @param {String} item dataで定義している変数
		 * @param {Array} options laravelから渡される項目
		 * @param {Number} index 添字
		 */
		setSelectedNameArr: function (value, item, options, index) {

			this.$set(this.initialData[index].temporary[item], 'id', value);

			if (Array.isArray(value)) {
				const gotNames = this.getNamesByIds(options, value)
				this.$set(this.initialData[index].temporary[item], 'name', gotNames);
			} else {
				const gotName = this.getNameById(options, value)

				this.$set(this.initialData[index].temporary[item], 'name', gotName);
			}

			if (this.initialData[index].temporary[item].id) {
				this.$set(this.initialData[index].isTemporary, item, true);
			}
		},
	},
};
