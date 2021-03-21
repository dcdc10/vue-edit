export default {
	data: function () {
		return {
			modal_state: false,
		};
	},
	methods: {
		open: function (modalName) {
			this.$modal.push(modalName);
		},
		close: function () {
			this.$modal.pop();
		},
		opened: function () {
			this.modal_state = true;
		},
		closed: function () {
			this.modal_state = false;
		},
	},
}
