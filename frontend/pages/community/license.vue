<template>
	<v-container>
		<v-card style="padding: 10px">
			<v-subheader>License Management</v-subheader>
			<v-data-table
				:headers="headers"
				:items="licenseList"
				:items-per-page="5"
				class="elevation-1"
			></v-data-table>
		</v-card>
	</v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: '구분',
            align: 'center',
            value: 'type',
          },
          { text: '수량', value: 'quantity' },
          { text: '신청일자', value: 'applyDt' },
          { text: '발급일자', value: 'issueDt' },
          { text: '만료일자', value: 'expireDt' },
          { text: '상태', value: 'status' },
          { text: '신청자', value: 'applicant' },
          { text: '라이센스파일', sortable: false, align: 'left', value: 'licenseFile' },
        ],
      }
		},
		computed: {
			licenseList() {
				return this.$store.state.license.licenseList;
			},
		},
		fetch({ store }) {
			return store.dispatch('license/loadLists');
		},		
  }
</script>