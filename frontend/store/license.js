export const state = () => ({
	me: null,
	licenseList: [],
	filePaths: [],
});


export const mutations = {
	setLicense(state, payload) {
		console.log(payload);
	},
	loadLists(state, payload) {
		// console.log('payload ', payload);
		state.licenseList = payload;
	},
	concatFilePaths(state, payload) {
		state.filePaths = state.filePaths.concat(payload);
		console.log('state.filePaths ', state.filePaths);
  },
  removeFilePath(state, payload) {
    state.filePaths.splice(payload, 1);
  }
};

export const actions = {
	async createLicense({ commit, state }, payload) {
		try {
			console.log('state.filePaths ',state.filePaths);
			const res = await this.$axios.post(`/license`, {
				type: payload.type,
				quantity: payload.quantity,
				applyDt: payload.applyDt,
				issueDt: payload.issueDt,
				expireDt: payload.expireDt,
				status: payload.status,
				applicant: payload.applicant,
				licenseFile: state.filePaths[0],
			});
			commit('setLicense', res.data);
		} catch (err) {
			console.error(err);
		};
	},
	async loadLists({ commit }, payload) {
		try {
			// console.log('expireDt ',payload.expireDt);
			const res = await this.$axios.get(`/license`);
			commit('loadLists', res.data);
		} catch (err) {
			console.error(err);
		};
	},

	async uploadFiles({ commit }, payload) {
		try {
			const res = await this.$axios.post('http://localhost:3085/license/files', payload);
			commit('concatFilePaths', res.data);
		} catch (err) {
			console.error(err);
		};
	},


};