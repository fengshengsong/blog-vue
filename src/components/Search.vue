<template>
	<div id="search">
		<div class="search-input-panel">
			<div class="search-input-wrapper">
				<input autofocus class="search-input" type="text" name="search" 
					v-model="search_key" @keyup.enter="searchEssays(search_key)">
				<div class="search-icon" @click.stop.prevent="searchEssays(search_key)">
					<i class="iconfont">&#xe631;</i>
				</div>					
			</div>
		</div>
		<div class="search-result-panel">
			<div class="search-result-none" v-show="is_none_result" v-text="none_res_text"></div>
			<ul v-show="!is_none_result">
				<li v-for="essay in search_essays">
  					<a href="javascript:;" @click.stop.prevent="getEssay(essay.type,essay.index)" 
  					class="text-underline-two" v-cloak>
  						{{essay.title}}
					</a>
					<span class="">&nbsp;|&nbsp;&nbsp;分类于
						<a  href="javascript:;" @click.stop.prevent="getTypeEssays(essay.type)" 
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

import { getSHARES,getCurrentRoute,getPreviewTrans,getEssaysCache,getSearchKeyCache } from '../vuex/getters'
import { showMessage,setEssaysCache,setSearchKeyCache } from '../vuex/actions'

export default{
	vuex:{
		getters:{
			SHARES:getSHARES,
			essays_cache:getEssaysCache,
			search_key_cache:getSearchKeyCache,
		},
		actions:{
			showMessage,
			setEssaysCache,
			setSearchKeyCache,
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

		let url = this.SHARES.PORT + '/getEssays'

		this.$set('essay_types',this.SHARES.essay_types)

		if(this.essays_cache.length){
			this.$set('essays',this.essays_cache)
		}else{
			this.SHARES.getEssays.call(this,url,this.successCb,this.errorCb)
		}
	},
	computed:{
		key_essays(){
			return this.essays.filter(function(value,index){
				return value
			})
		},
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
		successCb(){
			let response = Array.from(arguments)[0]
			this.$set('essays',response.body)
			if(!this.essays_cache.length){
				this.setEssaysCache(response.body)				
			}
		},
		errorCb(){
			let response = Array.from(arguments)[0]
			this.showMessage('ERROR: ' + response.status + ' ' + response.statusText)
		},
		getEssay(type,index){
			this.SHARES.getEssay.call(this,type,index)
		},
		getTypeEssays(type){
			this.SHARES.getTypeEssays.call(this,type)
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
	/*background-color: pink;*/
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
	/*background-color: blue;*/
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