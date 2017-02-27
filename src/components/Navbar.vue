<template>
	<div id="navbar">
		<ul id="navlist">
			<li v-for="category in categories" @click="cateClick($index)"
			:class="{'current-cate':(current_cate===$index)}">
				<a v-link="{path:'/blog'+category.path}">{{category.name}}</a>
			</li> 
		</ul>
	</div>
</template>

<script>
import { getCurrentRoute,getPreviewTrans } from '../vuex/getters'
import { setCurrentRoute,setPreviewTrans } from '../vuex/actions'

export default {
	vuex: {
		getters:{
			current_route:getCurrentRoute,
			preview_trans:getPreviewTrans,
		},
		actions:{
			setCurrentRoute,
			setPreviewTrans,
		}
	},
	data(){
		return {
			navbar_trans:'navbarMove',
			current_cate:Number(window.localStorage.getItem('current_cate'))||0,
			categories:this.CONST.categories,
			previous_route:0,
			trans_mode:0
		}
	},
	methods:{
		setCurrentCate(index){
			window.localStorage.setItem('current_cate',index)
			this.current_cate=index
		},
		cateClick(index){
			//注意顺序
			this.previous_route = this.current_route
			this.setCurrentRoute(index)
			this.trans_mode = this.current_route - this.previous_route > 0 ? 'rightMove' : 'leftMove'
			this.setPreviewTrans(this.trans_mode)
			this.setCurrentCate(index)
		}
	}
}
</script>

<style scoped>
@media screen and (max-width: 1000px){
	#navbar{
		display: none;
	}
}
#navbar{
	width: 100%;
	height: 2em;
}
.navbarMove-transition {
	position: relative;
	transition: left .5s ease;
	left: 0;
	top: 0;
}
.navbarMove-enter {
	left: -100%;
}
.navbarMove-leave{
	top: -100%;
}

#navlist{
	background: transparent;
}
#navlist li{
	display: inline-block;
}
#navlist a{
	display: inherit;
	color: black;
	text-decoration: none;
	text-align: center;
	vertical-align: middle;
	width: 5em;
	height: 2em;
	line-height: 2em;
	transition: all .2s;
}
#navlist a:hover, .current-cate>a{
	text-decoration: none;
	background: #555; 
	color: white !important;
}
</style>
