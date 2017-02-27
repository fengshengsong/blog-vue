<template>
	<div id="previews">
		<div class="preview" v-for="essay of essays" :transition="preview_trans" stagger="50"> 
			<h3>
				<a href="javascript:;" class="preview-title-a" @click="getEssay(essay.type,essay.index)" v-cloak>
					{{essay.title}}
				</a>
			</h3>
			<p class="preview-info">
				<span class="preview-info-date" v-cloak>发表于{{essay.year}}-{{essay.month}}-{{essay.day}}</span>
				<span :class="{'typeShow':is_type_show}">&nbsp;|&nbsp;&nbsp;分类于<a href="" class="preview-info-type" 
				@click="getTypeEssays(essay.type)" v-cloak>{{essay_types.get(essay.type)}}</a></span>
			</p>
			<p class="preview-brief" v-text="essay.brief"></p>
		</div>
	</div>
</template>

<script>
import { showMessage,setCurrentRoute,setPreviewTrans } from '../vuex/actions'
import { getCurrentRoute,getPreviewTrans } from '../vuex/getters'

const BRIEF_LENGTH = 50

export default {
	vuex:{
		actions:{
			showMessage,
			setCurrentRoute,
			setPreviewTrans,
		},
		getters: {
			current_route:getCurrentRoute,
			preview_trans:getPreviewTrans,
		}
	},
	props:[
		'essays'
	],
	data(){
		return {
			is_type_show:false,
			essay_types:[],
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
		tans:{
			enterClass:'tans-enter',
			leaveClass:'tans-leave',
		},
	},
	ready(){
		let essay_types = new Map([['problem','问题'],['note','读书'],['affair','日常']])
		this.$set('is_type_show',(this.$route.name === 'all') ? false : true)
		this.$set('essay_types',essay_types)
	},
	methods:{
		getTypeEssays(type){
			this.$route.router.go({path:'/blog/'+type})
		},
		getEssay(type,index) {
			this.$route.router.go({path:'/blog/'+type+'/'+index})
		},
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
		display: none;
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
		display: none;
	}

	[v-cloak]{
		display:none;
	}
</style>
