<template>
	<div id="blog">
		<navbar></navbar>
		<div id="blog-content">
			<router-view></router-view>			
		</div>
	</div>
</template>

<script>
import Navbar from './Navbar'

export default {
	components:{
		Navbar
	},
}
</script>

<style>
</style>