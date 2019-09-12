<template>
	<v-app>
		<nav>
			<v-toolbar dark color="indigo">
				<v-toolbar-title>
					<nuxt-link to="/community/license">BrityWorks</nuxt-link>
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn text nuxt to="/community/licenseform" :style="{ display: 'flex', alignItems: 'center' }">
						<div>About(라이센스)</div>
					</v-btn>
					<v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
						<div>Downloads(회원)</div>
					</v-btn>
					<v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
						<div>Developers</div>
					</v-btn>
					<v-btn text nuxt to="/community/license" :style="{ display: 'flex', alignItems: 'center' }">
						<div>Community(목록)</div>
					</v-btn>
					<v-btn text nuxt to="/dummy" :style="{ display: 'flex', alignItems: 'center' }">
						<div>Event&News</div>
					</v-btn>
					<v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
						<div>Support</div>
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>
		</nav>
		<v-row no-gutters>
			<v-col cols="12" xs="12" md="12">
				<nuxt />
			</v-col>
		</v-row>
	</v-app>		
</template>
<script>
import 'vuetify/dist/vuetify.min.css';
import LoginForm from '~/components/LoginForm';

export default {
	components: {
		LoginForm,
	},
	data() {
		return {
			hashtag: '',
		}
	},
	methods: {
		onSearchHashtag() {
			this.$router.push({
				path: `/hashtag/${encodeURIComponent(this.hashtag)}`,
			});
			this.hashtag = '';
		},
	},
};
</script>
<style scoped>
	a {
		display: inline-block;
		text-decoration: none;
		color: inherit;
	}

</style>