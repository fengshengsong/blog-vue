<template>
	<div id="app">
		<sidebar></sidebar>        
		<container></container>
		<message></message>
		<totop></totop>
	</div>
</template>

<script>
import Container from './components/Container'
import Message from './components/Message'
import Sidebar from './components/Sidebar'
import Totop from './components/Totop'
import store from './vuex/store'

export default {
	store,
	components:{
		Container,Message,Sidebar,Totop
	},
	ready(){
	},
}
</script>

<style>
	/*reset*/
	body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { 
		margin:0; 
		padding:0; 
	}
	body { 
		color:#555; 
		font-size:14px; 
		font-family: Verdana, Arial, Helvetica, sans-serif; 
	}
	html, body {
		overflow: visible;
		box-sizing: border-box;
	}
	td,th,caption { 
		font-size:14px; 
	}
	h1, h2, h3, h4, h5, h6 { 
		font-weight:normal; 
		font-size:100%; 
	}
	address, caption, cite, code, dfn, em, strong, th, var { 
		font-style:normal; 
		font-weight:normal;
	}
	a { 
		color:#555; 
		text-decoration:none; 
	}
	a:hover { 
		text-decoration:underline; 
	}
	img { 
		border:none; 
	}
	ol,ul,li { 
		/*list-style:none; */
	}
	input, textarea, select, button { 
		font:14px Verdana,Helvetica,Arial,sans-serif; 
	}
	table { 
		border-collapse:collapse; 
	}
	/*reset*/

	.clearfix:after {
		content: "."; 
		display: block; 
		height:0; 
		clear:both; 
		visibility: hidden;
	}
	.clearfix { 
		*zoom:1; 
	}

	.flex-row{
		display: flex;
		flex-flow: row nowrap;  
		justify-content:flex-start;
		align-items:flex-start;
	}
	.flex-column{
		display: flex;
		flex-flow: column nowrap;  
		justify-content:flex-start;
		align-items:flex-start;
	}

	.blured::before{
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: gray;
		opacity: .7;
		filter: blur(1px);
		z-index:1000;
	}

	@font-face {
		font-family: 'iconfont';  /* project id 196071 */
		src: url('//at.alicdn.com/t/font_stjupacekr68yqfr.eot');
		src: url('//at.alicdn.com/t/font_stjupacekr68yqfr.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_stjupacekr68yqfr.woff') format('woff'),
		url('//at.alicdn.com/t/font_stjupacekr68yqfr.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_stjupacekr68yqfr.svg#iconfont') format('svg');
	}
	.iconfont{
		font-family:"iconfont";
		font-size:16px;
		font-style:normal;
	}


	html,body {
		background: #f5f7f9;
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		font-size: 14px;
	}
	#app{
		width: 100%;
		height: 100%;
		min-height: 100%;
	}
</style>
