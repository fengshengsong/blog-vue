<template>
	<div id="test">
		<div v-for="item of items">
			{{item}}
		</div>
	</div>
</template>

<script>

export default {
	filters:{
		rev:function(value){
			return value.split('').reverse().join('')
		},
	},
	data(){
		return {
			items:['a','b','c'],
		}
	},
	methods:{
		even(items){
			return ['1','2','3']
		},
	},
	computed:{
		someItems(){
			let items = this.items
			items.push('d')
			return items
		}
	},
	ready(){

	},

}
</script>

<style>
#test{
}
</style>
