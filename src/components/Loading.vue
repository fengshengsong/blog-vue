<template>
	<div id="loading" v-show="is_loading_show" :transition="loading_trans">
		<div class="loading-content">
			<div class="loading-item"></div>
			<div class="loading-item"></div>
			<div class="loading-item"></div>
			<div class="loading-item"></div>
		</div>
	</div>
</template>

<script>
import { getLoadingShow,getCurrentComponent } from '../vuex/getters'
import { setCurrentComponent } from '../vuex/actions'

export default {
	data(){
		return {
			loading_trans:'fadeMove'
		}
	},
	vuex:{
		getters:{
			is_loading_show:getLoadingShow,
			current_component:getCurrentComponent
		},
		actions:{
			setCurrentComponent
		}
	},
	ready(){
		let that = this;
		setTimeout(function(){
			that.setCurrentComponent('Wrapper');
		},1000);
	}
}
</script>

<style scoped lang="scss">
%absolutePos{
	position: absolute;
	top: 0;
	left: 0;
}
@mixin centerPos($width,$height){
	position:absolute;
	width:$width;
	height:$height;
	left:calc(50% - #{$width}/2);
	top:calc(50% - #{$height}/2);
}

#loading{
	@extend %absolutePos;
	width:100%;
	height:100%;
	background-color: rgba(255,255,255,1);
	z-index: 1000;
}
.loading-content{
	@include centerPos(200px,100px);
	top:calc(50% - 100px);
	transform-style: preserve-3d;
	animation: rotateLoading 3s linear infinite;
	&:hover{
		animation-play-state:paused;
	}
}
.loading-item{
	@extend %absolutePos;
	width: 100px;
	height: 100px;
	background-color: rgba(255,255,255,.2);
	border-radius: 50%;
	box-shadow: 0 0 20px 20px rgba(0,0,0,.1) inset;
	@for $i from 1 through 4 {
		&:nth-child(#{$i}){
			transform: rotateY(($i - 1)*45deg);
		}
	}
}
@keyframes rotateLoading{
	$n:5;
	$degStep:360deg/$n;
	$perStep:(1/$n)*100%;
	@for $i from 0 through $n {
		#{$i*$perStep}{
			transform: rotateY($i*$degStep)
		}
	}
}
.fadeMove-transition{
	transition: opacity 1s ease;
	opacity: 1;
}
.fadeMove-enter{
	opacity: 0;
}
.fadeMove-leave{
	opacity: 0;
}
</style>
