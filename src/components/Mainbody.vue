<template>
	<div id="mainbody">
		<router-view :transition="routerview_trans" transition-mode="out-in"></router-view>
	</div>  
</template>

<script>
	export default {
		data(){
			return {
				routerview_trans:'routerviewMove'
			}
		},
	}
</script>

<style>
	#mainbody{
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		padding: 0 0 5em 0;
	}
	.routerviewMove-transition {
		position: relative;
		transition: opacity .1s ease;
		opacity: 1;
	}
	.routerviewMove-enter {
		opacity: 0;
	}
	.routerviewMove-leave{
		opacity: 0;
	}
</style>
