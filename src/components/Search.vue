<template>
	<div id="search">
		<div class="search-input-panel">
			<div class="search-input-wrapper">
				<input autofocus class="search-input" type="text" name="search" 
					v-model="search_key" @keyup.enter="keySearch(search_key)" />
				<div class="search-icon" @click="keySearch(search_key)">
					<i class="iconfont">&#xe631;</i>
				</div>					
			</div>
		</div>
		<div class="search-result-panel">
			<div class="search-result-none" v-show="is_none_result" v-text="none_res_text"></div>
			<previews :essays="search_essays" v-show="!is_none_result"></previews>
		</div>
	</div>
</template>

<script>
import { getEssaysCache } from '../vuex/getters'
import { setEssaysCache,showMessage } from '../vuex/actions'
import Previews from './Previews'

export default{
	components:{
		Previews
	},
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
			search_essays:[],
		}
	},
	ready(){
		let url = this.CONST.PORT + '/getEssays';
		if(!this.essays_cache.length){
			this.$http.get(url).then((response)=>{
				let data = response.body;
				this.setEssaysCache(data);
			},(response)=>{
				this.showMessage('ERROR: ' + response.status + ' ' + response.statusText);
			})
		}	
	},
	methods:{
		keySearch(key){
			let trim_key = String.trim(key);
			if(trim_key === '') return;
			let search_essays = this.essays_cache.filter(function(value,index){
				return value.title.toString().toLowerCase().indexOf(trim_key) > -1 ? true : false;
			});
			this.is_none_result = search_essays.length ? false : true;
			this.$set('search_essays',search_essays)
		}
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
.search-result-none{
	text-align: center;
	font-size: 1.3em;
	width: 100%;
	padding-top: 5em;
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
</style>