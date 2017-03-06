<template>
	<div class="templ" v-html="essay"></div>
</template>

<script>
	import { showMessage } from '../vuex/actions'

	export default {
		vuex: {
			actions:{
				showMessage
			},
		},
		data(){
			return {
				essay:''
			}
		},
		ready(){
			this.getEssay(this.$route.params.index);
		},
		methods: {
			getEssay(index){ 
				this.$http.get(this.CONST.PORT+'/getEssay?index='+index).then((response)=>{
					this.$set('essay',response.body);
				},(response)=>{
					this.showMessage('读取文章出现了点问题，请刷新一下试试。');
				})
			}
		}
	}
</script>

<style lang="scss">
.templ {
	width: 90%;
	margin: 0 auto;
	h1 {
		color: #222;
		padding: 1em 0; 
		font-size: 2em;
		font-weight: bold;
		border-bottom: 5px solid #222;
	}
	h2 {
		padding: 1em 0;
		font-size: 1.8em;
		color: #222;
	}
	h3 {
		padding-top: .5em;
		color: #333;
		font-size: 1.4em;
	}
	h4 {
		padding-top: 1em;
		color: #444;
		font-size: 1.2em;
	}
	p {
		padding: 1em 0;
	}
	pre {
		padding: 1em;
		background: #E8E8E8;
		border-radius: 3px;
		max-height: 800px;
		max-width: 800px;
	}
	pre code {
		font-family: consolas, Menlo, "PingFang SC", "Microsoft YaHei", monospace;
	}
	blockquote {
		margin: 1em .5em;
		background: #f0f0f0;
		border-left: 5px solid #222;
		p {
			padding: .5em 1em;
		}
	}
	ul {
		list-style: none;
	}
}
</style>