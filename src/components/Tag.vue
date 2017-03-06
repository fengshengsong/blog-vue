<template>
	<div id="tag">
		<div class="tag-items">
			<div v-for="tag of tags" :class="getTagClass($index)" :style="getTagStyle(tag.weight)" 
			@click="searchTag(tag.key,$index)">
			{{tag.key}}
			</div>
		</div>
		<div class="tag-results">
			<previews :essays="tag_essays"></previews>
		</div>
	</div>
</template>

<script>
	import Previews from './Previews'
	import { getEssaysCache } from '../vuex/getters'
	import { setEssaysCache,showMessage } from '../vuex/actions'

	export default {
		components:{
			Previews
		},
		vuex:{
			getters:{
				essays_cache:getEssaysCache
			},
			actions:{
				showMessage,
				setEssaysCache
			}
		},
		data(){
			return{
				is_current_tag:false,
				// tag出现频率权重数组
				weights:[],
				// 权重的最小公倍数
				maxWeight:0,
				tags:[
					{key:'JavaScript',weight:44},
					{key:'DOM',weight:10},
					{key:'vue',weight:33},
					{key:'ajax',weight:24},
					{key:'异步',weight:22},
				],
				tag_essays:[],
			}
		},
		ready(){
			// 设置最小公倍数
			let that = this;
			this.tags.map(function(value,index){
				that.weights.push(value.weight);
			});
			this.maxWeight = this.UTILS.getLCM(this.weights);
			// 获取文章并缓存
			if(!this.essays_cache.length){
				let url = this.CONST.PORT + '/getEssays';
				this.$http.get(url).then((response)=>{
					let data = response.body;
					this.setEssaysCache(data);
				},(response)=>{
					this.showMessage('ERROR: ' + response.status + ' ' + response.statusText);
				})
			}
		},
		methods:{
			getTagClass(index){
				return {
					'tag-item':true,
					'current-tag':this.is_current_tag === index
				}
			},
			// 根据权重设置顺序
			getTagStyle(weight){
				let tagStyle = {
					order:this.maxWeight/weight
				};
				return tagStyle;
			},
			searchTag(key,index){
				this.is_current_tag = index;
				let tag_essays = this.essays_cache.filter(function(value,index){
					let title = value.title;
					let brief = value.brief;
					return (title.indexOf(key)>-1 || brief.indexOf(key)>-1) 
						? true : false;
				})
				this.$set('tag_essays',tag_essays);
			},
		}
	}
</script>

<style>
	#tag{
		width: 100%;
		height: 100%;
	}
	.tag-items{
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
	.tag-item:hover,.current-tag{
		color: #f7f7f7;
		background-color: #333;
	}
	.tag-results{
		padding: 0 1em;
	}
</style>
