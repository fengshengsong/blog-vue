<template>
	<div id="all">
		<previews :essays="all_essays"></previews>
	</div>
</template>

<script>
import Previews from './Previews'
import { getEssaysCache } from '../vuex/getters'
import { setEssaysCache } from '../vuex/actions'

export default {
	components:{
		Previews
	},
	vuex:{
		getters:{
			essays_cache:getEssaysCache
		},
		actions:{
			setEssaysCache
		}
	},
	data(){
		return{
			all_essays:[],
		}
	},
	ready(){
		if(!this.essays_cache.length){
			let url = this.CONST.PORT + '/getEssays'
			this.$http.get(url).then((response)=>{
				let data = response.body
				this.setEssaysCache(data)
				this.$set('all_essays',data)
			},(response)=>{
				this.showMessage('ERROR: ' + response.status + ' ' + response.statusText)
			})
		}else{
			this.$set('all_essays',this.essays_cache)
		}
	},
}
</script>

<style>

</style>