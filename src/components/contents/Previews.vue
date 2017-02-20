<template>
	<div id="previews" class="yahei-font">
		<div class="preview" v-for="essay in type_essays" :transition="preview_trans" stagger="50"> 
  			<h3>
  				<a href="" class="preview-title-a" @click.stop.prevent="getEssay(essay.type,essay.index)" v-cloak>
  					{{essay.title}}
				</a>
			</h3>
  			<p class="preview-info">
  				<span class="preview-info-date" v-cloak>发表于{{essay.year}}-{{essay.month}}-{{essay.day}}</span>
  				<span :class="{'typeShow':is_type_show}">&nbsp;|&nbsp;&nbsp;分类于<a href="" class="preview-info-type" 
  				@click.stop.prevent="getTypeEssays(essay.type)" v-cloak>{{essay_types.get(essay.type)}}</a></span>
			</p>
  			<p class="preview-brief" v-text="essay.brief"></p>
  		</div>
	</div>
</template>

<script>
import { showMessage,setCurrentRoute,setPreviewTrans,setEssaysCache } from '../../vuex/actions'
import { getSHARES,getCurrentRoute,getPreviewTrans,getEssaysCache } from '../../vuex/getters'

const BRIEF_LENGTH = 50

export default {
	props:[
		'keyy'
	],
	vuex:{
		actions:{
            showMessage,
            setCurrentRoute,
            setPreviewTrans,
            setEssaysCache
        },
		getters: {
			SHARES: getSHARES,
			current_route:getCurrentRoute,
			preview_trans:getPreviewTrans,
			essays_cache:getEssaysCache
		}
	},
	data(){
		return {
			essays:[],
			is_type_show:false,
			essay_types:[],
			first_catogory:'',
		}
	},
	transitions:{
		leftMove:{
			enterClass:'leftMove-enter',
			leaveClass:'leftMove-leave',
		},
		rightMove:{
			enterClass:'rightMove-enter',
			leaveClass:'rightMove-leave'
		},
	},
	ready(){
		let url = this.SHARES.PORT + '/getEssays'

		this.$set('first_catogory',this.SHARES.categories[0].name.toLowerCase())
		this.$set('is_type_show',(this.$route.name === this.first_catogory) ? false : true)
		this.$set('essay_types',this.SHARES.essay_types)

		if(this.essays_cache.length){
			this.$set('essays',this.essays_cache)
		}else{
			this.SHARES.getEssays.call(this,url,this.successCb,this.errorCb)
		}
	},
	computed:{
		type_essays(){
			let type = this.$route.name
			let type_essays = (type === this.first_catogory) ? this.essays : this.essays.filter((value,index)=>{
				if(value.type == type){
					return value
				}
			})
			return type_essays
		}
	},
	methods:{
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
		}
	}
}
</script>

<style scoped>
#previews{
}
.preview {
  	width: 95%;
  	margin: 0 auto;
  	padding: 1em .5em;
  	border-bottom: 1px solid #DDD;
}
.preview:hover{
	background: #EEE;
}
.preview:first-child{
	padding-top: 0;
	border-top: 1px solid #DDD;
}
.preview:last-child{
}
.preview h3{
	font-size: 24px;
	padding: .5em 0;
}
.preview-title-a{
	transition: margin-left 0.5s;
	color: #222;
}
.preview-title-a:hover{
	text-decoration: none;
	display: block;
	margin-left: 10px;
}
.preview-info{
	font-size: .9em;
}
.preview-info-type{
	display: inline-block;
	transition: transform .5s;
}
.preview-info-type:hover{
	text-decoration: none;
	background: #f5f5f5;
	transform: translateY(-1px);
}
.preview-brief{
	font-size: 1.1em;
	color: #333;
	padding: .5em 0;
}
.typeShow{
	display: none;
}

.leftMove-transition {
	position: relative;
	transition: left .5s ease;
	left: 0;
}
.leftMove-enter {
	left: -100%;
}
.leftMove-leave {
}

.rightMove-transition {
	position: relative;
	transition: right .5s ease;
	right: 0;
}
.rightMove-enter {
	right: -100%;
}
.rightMove-leave {
}

[v-cloak]{
    display:none;
}
</style>
