<template>
	<div id="headerarea">
		<div class="head-title" v-text="head_title"></div>
		<div class="head-nav-btn" @click="toggleHeadnav" v-text="head_txt"></div>
		<div class="head-nav" v-show="is_headnav_show" transition="expand">
			<ul class="head-menus">
				<li v-for="menu in menus" class="head-menu" 
				:class="{'current-menu':(current_menu==$index)}" @click="menuClick(menu.event,$index)">
				<a href="javascript:;"><i class="iconfont" v-html="menu.iconfont"></i>{{menu.name}}</a>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			is_headnav_show:false,
			head_title:'小银的博客',
			menus:[],
			current_menu:Number(window.localStorage.getItem('current_menu'))||0,
		}
	},
	ready(){
		let menus = [
			{name:'博客',iconfont:'&#xe61e;',event:'blog'},
			{name:'标签',iconfont:'&#xe6f9;',event:'tag'},
			{name:'测试',iconfont:'&#xe616;',event:'test'},
			{name:'搜索',iconfont:'&#xe615;',event:'search'},
		]
		this.$set('menus',menus)
	},
	computed:{
		head_txt(){
			return this.is_headnav_show ? '上' : '下'
		}
	},
	methods:{
		menuClick(event,index){
			this.$route.router.go({path:'/'+event})
			this.setCurrentMenu(index)
		},
		setCurrentMenu(index){
			window.localStorage.setItem('current_menu',index)
			this.current_menu=index
		},
		toggleHeadnav(){
			this.is_headnav_show = !this.is_headnav_show
		}
	},
}
</script>

<style>
@media screen and (max-width: 1000px){
	#headerarea{
		display: block !important;
	}
}
#headerarea{
	display: none;
	width: 100%;
	background-color: #333;
}
#headerarea a:hover{
	text-decoration: none;
}
.head-title{
	width: 100%;
	color: white;
	padding: 1em 0;
	font-size: 1.5em;
	text-align: center;
}
.head-nav-btn{
	position: absolute;
	color: white;
	font-size: 1.1em;
	text-align: center;
	padding: .5em;
	right: 1em;
	top: 1em;
	background-color: gray;
}
.head-nav{
	/*display: none;*/
	transition: all 1s;
	background-color: #333;
}
.head-menu{
	padding: 1em;
	position: relative;
}
.head-menu a{
	color: white;
}
.iconfont{
	margin-right: 1em;
	color: white;
}
.current-menu::after{
	content: " ";
	position: absolute;
	top: 50%;
	margin-top: -3px;
	right: 15px;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background-color:white;
	opacity: .6;
}
.expand-transition {
	position: relative;
	transition: all 1s ease;
	height: 14em;
	opacity: 1;
	top: 0;
}
.expand-enter, .expand-leave {
	height: 0;
	/*top: -100px;*/

	opacity: 0;
}
</style>
