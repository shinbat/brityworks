export const state = () => ({
	me: null,
	licenseList: [],
});


export const mutations = {
	setLicense(state, payload) {
		console.log(payload);
	},
	loadLists(state, payload) {
		// console.log('payload ', payload);
		state.licenseList = payload;
	},
};

export const actions = {
	async createLicense({ commit }, payload) {
		try {
			// console.log('expireDt ',payload.expireDt);
			const res = await this.$axios.post(`/license`, {
				type: payload.type,
				quantity: payload.quantity,
				applyDt: payload.applyDt,
				issueDt: payload.issueDt,
				expireDt: payload.expireDt,
				status: payload.status,
				applicant: payload.applicant,
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

};