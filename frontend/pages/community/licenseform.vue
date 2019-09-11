<template>
	<v-container v-if="!me">
		<v-card>
			<v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
				<v-container>
					<v-select
						:items="types"
						v-model="type"
						label="구분"
						:rules="typeRules"
						required
					></v-select>
					<v-text-field
						v-model="quantity"
						label="수량"
						type="quantity"
						:rules="quantityRules"
						required
					/>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="applyDt"
              label="신청일자"
              @blur="date = parseDate(applyDt)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="issueDt"
              label="발급일자"
              @blur="date2 = parseDate(issueDt)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu3"
          v-model="menu3"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="expireDt"
              label="만료일자"
              @blur="date3 = parseDate(expireDt)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date3" no-title @input="menu3 = false"></v-date-picker>
        </v-menu>

					<v-select
						:items="status"
						v-model="status"
						label="상태"
						:rule="statusRules"
						required
					></v-select>
					<v-text-field
						v-model="applicant"
						:rules="applicantRules"
						label="신청자"
						required
					/>
					<input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
					<v-btn type="button" @click="onClickImageUpload">라이센스파일</v-btn>
					<v-divider style="margin: 20px"></v-divider>
					<v-btn type="submit" dark color="indigo" >저장</v-btn>
					<v-btn nuxt to="/community/license">목록</v-btn>
				</v-container>
			</v-form>
		</v-card>
	</v-container>
	<v-container v-else>
		<v-card>
			<v-container>
				{{me.nickname}}님 로그인되었습니다,
				<v-btn @click="onLogOut">로그아웃</v-btn>
				<v-row>
					<v-col cols="4">{{me.Followings.length}} 팔로잉</v-col>
					<v-col cols="4">{{me.Followers.length}} 팔로워</v-col>
					<v-col cols="4">{{me.Posts.length}} 게시글</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-container>
</template>
<script>


export default {


	data()	{
		return {
			types: ['디자이너', 'Bot'],
			status: ['정상', '만료'],

     	date: null,
     	date2: null,
     	date3: null,
      dateFormatted: null,
      dateFormatted2: null,
      expireDt: null,
      menu1: false,
      menu2: false,
      menu3: false,
 	
			valid: false,
			email: '',
			password: '',
			typeRules:  [
				v => !!v || '구분은 필수입니다',
			],
			quantityRules:  [
				v => !!v || '수량은 필수입니다',
			],
			statusRules:  [
				v => !!v || '상태는 필수입니다',
			],
			applicantRules:  [
				v => !!v || '신청자는 필수입니다',
			],
			emailRules: [
				v => !!v || '이메일은 필수입니다',
				v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다',
			],
			passwordRules: [
				v => !!v || '비밀번호는 필수입니다',
			],
		};
	},
	
	computed: {
		me() {
			return this.$store.state.users.me;
		},
    computedDateFormatted () {
      return this.formatDate(this.date);
    },		
	},	
	watch: {
		date (val) {
			this.applyDt = this.formatDate(this.date);
     },
		date2 (val) {
			this.issueDt = this.formatDate(this.date2);
     },
		date3 (val) {
			this.expireDt = this.formatDate(this.date3);
     },
  },
	methods: {
      formatDate (date) {
        if (!date) return null;
        const [year, month, day] = date.split('-');
        return `${year}.${month}.${day}`;
      },
      parseDate (date) {
        if (!date) return null;
        const [year, month, day] = date.split('.');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
			},

			onClickImageUpload() {
				this.$refs.imageInput.click();
			},
			onChangeImages(e) {
				console.log(e.target.files);
				const imageFormData = new FormData();
				[].forEach.call(e.target.files, (f) => {
					imageFormData.append('image', f);	// { image: [fiel1, file2] }
				});
				this.$store.dispatch('posts/uploadImages', imageFormData);
			},
			onRemoveImage(index) {
				this.$store.commit('posts/removeImagePath', index);
			},			
			
		onSubmitForm() {
			console.log(this.expireDt);
			if (this.$refs.form.validate()) {
				this.$store.dispatch('license/createLicense', {
					type: this.type,
					quantity: this.quantity,
					applyDt: this.applyDt,
					issueDt: this.issueDt,
					expireDt: this.expireDt,
					status: this.status,
					applicant: this.applicant,
				})
					.then(() => {
						// this.$router.push({
						// 	path: '/',
						// });
					})
					.catch(() => {
						alert('라이센스등록 실패');
					});
			};			 
		},
		onLogOut() {
			this.$store.dispatch('users/logOut');
		}
	},
}
</script>
<style scoped>

</style>