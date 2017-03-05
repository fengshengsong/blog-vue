<template>
	<div id="wrapper">
		<sidebar></sidebar>        
		<container></container>
		<message></message>
		<totop></totop>
	</div>
</template>

<script>
import Container from './Container'
import Message from './Message'
import Sidebar from './Sidebar'
import Totop from './Totop'
import { hideLoading } from '../vuex/actions'

export default {
	components:{
		Container,Message,Sidebar,Totop
	},
	vuex:{
		actions:{
			hideLoading
		}
	},
	ready(){
		let that = this;
		setTimeout(function(){
			that.hideLoading();
		},2000);
	}
}
</script>

<style>
</style>
