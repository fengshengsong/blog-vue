<template>
	<div id="notes">
		<previews :essays="note_essays"></previews>
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
	props:[
		'essays'
	],
	data(){
		return{
			note_essays:[],
		}
	},
	ready(){
		if(!this.essays_cache.length){
			let url = this.CONST.PORT + '/getEssays'
			this.$http.get(url).then((response)=>{
				let data = response.body
				this.setEssaysCache(data)
			},(response)=>{
				this.showMessage('ERROR: ' + response.status + ' ' + response.statusText)
			}).then((response)=>{
				let type = this.$route.name || 'affair'
				let type_essays = this.essays_cache.filter((value,index)=>{
					if(value.type == type){
						return value
					}
				})
				this.$set('note_essays',type_essays)
			})
		}else{
			let type = this.$route.name || 'affair'
			let type_essays = this.essays_cache.filter((value,index)=>{
				if(value.type == type){
					return value
				}
			})
			this.$set('note_essays',type_essays)
		}	
	},
}
</script>

<style>

</style>