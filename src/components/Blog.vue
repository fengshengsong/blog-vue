<template>
	<div id="blog">
		<navbar></navbar>
		<content></content>
	</div>
</template>

<script>
import Navbar from './Navbar'
import Content from './Content'

export default {
	components:{
		Navbar,Content
	},
	ready(){
		// this.$route.router.go({path:'/blog/all'})
	}
}
</script>

<style>
#blog{

}
</style>