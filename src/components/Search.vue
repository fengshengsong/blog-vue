<template>
	<div id="search">
		<div class="search-input-panel">
			<div class="search-input-wrapper">
				<input autofocus class="search-input" type="text" name="search" 
					v-model="search_key" @keyup.enter="searchEssays(search_key)">
				<div class="search-icon" @click="searchEssays(search_key)">
					<i class="iconfont">&#xe631;</i>
				</div>					
			</div>
		</div>
		<div class="search-result-panel">
			<div class="search-result-none" v-show="is_none_result" v-text="none_res_text"></div>
			<ul v-show="!is_none_result">
				<li v-for="essay in search_essays">
  					<a href="javascript:;" @click.prevent="getEssay(essay.type,essay.index)" 
  					class="text-underline-two" v-cloak>
  						{{essay.title}}
					</a>
					<span class="">&nbsp;|&nbsp;&nbsp;分类于
						<a  href="javascript:;" @click.prevent="getTypeEssays(essay.type)" 
						class="move-left" v-cloak>
							{{essay_types.get(essay.type)}}
						</a>
					</span>					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getEssaysCache } from '../vuex/getters'
import { setEssaysCache,showMessage } from '../vuex/actions'

export default{
	vuex:{
		getters:{
			essays_cache:getEssaysCache,
		},
		actions:{
			showMessage,
			setEssaysCache,
		}
	},
	data(){
		return{
			is_none_result:false,
			none_res_text:'未搜索到符合要求的内容',
			search_key:'',
			essays:[],
			search_essays:[],
			essay_types:[]
		}
	},
	ready(){
		let url = this.CONST.PORT + '/getEssays'
		this.getEssays(url)
		let essay_types = new Map([['problem','问题'],['note','读书'],['affair','日常']])
		this.$set('essay_types',essay_types)
	},
	methods:{
		searchEssays(key){
			let trim_key = String.trim(key)
			if(trim_key === ''){
				return
			}
			let search_essays = this.essays.filter(function(value,index){
				if(value.title.toString().toLowerCase().indexOf(trim_key) > -1){
					return value
				}
			})
			if(!search_essays.length){
				this.is_none_result = true
			}else{
				this.is_none_result = false
				this.$set('search_essays',search_essays)
			}
		},
		getEssays(url){
			if(!this.essays_cache.length){
				this.$http.get(url).then((response)=>{
					let data = response.body
					this.$set('essays',data)
					this.setEssaysCache(data)				
				},(response)=>{
					this.showMessage('ERROR: ' + response.status + ' ' + response.statusText)
				})
			}else{
				this.$set('essays',this.essays_cache)
			}
		},
		getTypeEssays(type){
			this.$route.router.go({path:'/blog/'+type})
		},
		getEssay(type,index) {
			this.$route.router.go({path:'/blog/'+type+'/'+index})
		},
	}
}
</script>

<style>
#search{
	font-family:'微软雅黑','黑体';
    font-size: 14px;
}
.search-input-panel{
	padding: 3em 4em;
	position: relative;
}
.search-input-wrapper{
	position: relative;
	text-align: center;
	color: black;
	border: none;
	border: 1px solid #333;
	border-radius: 5px;
}
.search-input{
	font-size: 1.5em;
	width: 100%;
	outline: none;
	border: none;
	border-radius: 5px;
	padding: .5em;
	box-sizing: border-box;
}
.search-icon{
	position: absolute;
	right: .5em;
	top: .5em;
	cursor: pointer;
}
.search-icon i{
	font-size: 2em;
	color: black;
}
.search-result-panel{
	padding: 1em 4em;
}
.search-result-panel ul{
}
.search-result-panel li{
	padding: .5em 1em;
	margin: .5em;
	font-size: 1.3em;
}
.search-result-panel a{
	position: relative;
}
.search-result-panel a:hover{
	text-decoration: none;
}
.move-left{
	left: 0;
	transition: left .2s;
}
.move-left:hover{
	left: .2em;
}
.text-underline-one{

}
.text-underline-one:after{
    content: "";
    position: absolute;
    left: 50%;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: gray;
    transition: all .3s;
}
.text-underline-one:hover:after{
    width: 100%;
    left: 0;
    right: 0;
}

.text-underline-two:after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background: lightgray;
    transition: all .3s;
    transform: scaleX(0);
}
.text-underline-two:hover:after{
	transform: scaleX(1);
}


.search-result-none{
	text-align: center;
	font-size: 1.3em;
	width: 100%;
	padding-top: 5em;
}
</style>