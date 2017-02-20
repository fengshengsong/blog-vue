<template>
	<div id='content'>
		<router-view></router-view>
	</div>
</template>

<script>
import { getContentShow } from '../vuex/getters'
import { showFooterarea } from '../vuex/actions'

export default {
	vuex:{
		getters:{
			is_content_show:getContentShow
		},
		actions:{
			showFooterarea
		}
	},
	transitions:{
		contentMove:{
			afterEnter(){
			}
		}
	},
	data(){
		return {
			content_trans:'contentMove',
		}
	}
}
</script>

<style scoped>
#content{
	width: 100%;
	box-sizing: border-box;
	padding: 1em 1em 10em;
}
.contentMove-transition {
	position: relative;
	transition: opacity .1s ease;
	opacity: 1;
}
.contentMove-enter {
	opacity: 0;
}
</style>
