<template>
	<div id="tag">
		<div class="tag-container">
			<div class="tag-item" :class="{'tag-active':(tag_active===$index)}" v-for="tag of tags" 
			:style="setTagSyle(tag.weight)" @click="searchTagContent(tag.key,$index)">
				{{tag.key}}
			</div>
		</div>
		<div class="tag-content">
		</div>  
	</template>

	<script>
		export default {
			data(){
				return{
					tag_active:null,
					weights:[],
					maxWeight:null,
					tags:[
						{key:'ES6',weight:36},
						{key:'node',weight:44},
						{key:'DOM',weight:20},
						{key:'webpack',weight:12},
						{key:'vue',weight:33},
						{key:'vuex',weight:6},
						{key:'css',weight:21},
						{key:'html',weight:16},
						{key:'react',weight:17},
						{key:'javascript',weight:55},
						{key:'mongodb',weight:15},
						{key:'mongoose',weight:12},
						{key:'SEO',weight:6},
						{key:'lodash',weight:4},
						{key:'angular',weight:2},
						{key:'weex',weight:4},
						{key:'alibaba',weight:3},
						{key:'tencent',weight:11},
					],
				}
			},
			ready(){
				let that = this;
				this.tags.map(function(value,index){
					that.weights.push(value.weight);
				});
				this.maxWeight = this.getLCM(this.weights);
			},
			methods:{
				//获得最大公约数
				getLCM(arr){
					function getBig(a,b){
						if(a < b){
							var temp = a;
							a = b;
							b = temp;
						}
						if(b == 0){
							return a;
						}
						return getBig(b,a%b);
					}
					return arr.reduce(function(a,b){
						return a*b/getBig(a,b);
					},1);
				},
				setTagSyle(weight){
					let tagStyle = {
						order:this.maxWeight/weight
					}
					return tagStyle
				},
				searchTagContent(key,index){
					console.log(key)
					this.tag_active = index
				},
			}
		}
	</script>

	<style>
		#tag{
			width: 100%;
			height: 100%;
		}
		.tag-container{
			padding: 1em;
			width: 100%;
			display: flex;
			flex-flow: row;
			flex-wrap: wrap;
			align-items: center;
		}
		.tag-item{
			text-align: center;
			font-size: 1.1em;
			margin: .25em .2em;
			padding: .5em 1em;
			border: 1px solid #d2d2d2;
			border-radius: 3px;
			background-color: #f7f7f7;
			transition: all .2s;
			cursor: pointer;
		}
		.tag-item:hover,.tag-active{
			color: #f7f7f7;
			background-color: #333;
		}
	</style>
