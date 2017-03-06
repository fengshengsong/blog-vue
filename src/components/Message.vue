<template>
	<div id="message" v-show="isMessageShow" :transition="message_trans"
		@mouseover="messageMouseover" @mouseout="messageMouseout">
		<h3>消息</h3>
		<p v-text="message"></p>
		<span @click="closeMessage"><i class="fa fa-times"></i></span>
	</div>
</template>

<script>
	import { getMessage,getMessageShow } from '../vuex/getters'
	import { showMessage,hideMessage } from '../vuex/actions'

	const MESSAGE_TIME = 1000;
	const MESSAGE_NUMBER = 5;

	var messageTimeout = null;

	export default{
		vuex:{
			actions:{
				showMessage,
				hideMessage
			},
			getters: {
				message:getMessage,
				isMessageShow:getMessageShow
			}
		},
		data(){
			return {
				message_trans: 'messageMove'
			}
		},
		watch:{
			isMessageShow(){
				if(this.isMessageShow){
					messageTimeout = setTimeout(this.closeMessage,
						MESSAGE_TIME*Math.round(this.message.length/MESSAGE_NUMBER));
				}else{
					clearTimeout(messageTimeout);
				}
			}
		},
		methods:{
			messageMouseover(){
				clearTimeout(messageTimeout);
			},
			messageMouseout(){
				if(this.isMessageShow){
					messageTimeout = setTimeout(this.closeMessage,
						MESSAGE_TIME*Math.round(this.message.length/MESSAGE_NUMBER));
				}
			},
			closeMessage(){
				this.hideMessage();
			}
		}
	}
</script>

<style lang="scss">
	@media screen and (max-width: 1000px){
		#message{
			display: none;
		}
	}
	#message{
		z-index: 999;
		background: rgba(255,255,255,.8);
		position: fixed;
		padding: 0 1em;
		right: 1em;
		width: 20em;
		border: 1px solid #555;
		border-radius:2px;
		&:hover{
			background-color:rgba(255,255,255,1);
		};
		h3{
			height: 2em;
			line-height: 2em;
			font-size: 1.1em;
			border-bottom: 1px solid #AAA; 
		}
		p{
			padding: .5em 0;
			font-size: .9em;
		}
		i{
			position: absolute;
			top: .5em;
			right: 1em;
			width: 1em;
			height: 1em;
			font-size: 1em;
		}
	}
	.messageMove-transition{
		transition: all .5s ease;
		bottom: .5em;
	}
	.messageMove-enter{
		bottom: -10em;
	}
	.messageMove-leave{
		bottom: -10em;
	}
</style>
