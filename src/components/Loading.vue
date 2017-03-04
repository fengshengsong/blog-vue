<template>
	<div id="loading" v-if="if_loading_show" :transition="loading_trans">
		<div class="loading-content">
			<div class="loading-item"></div>
			<div class="loading-item"></div>
			<div class="loading-item"></div>
			<div class="loading-item"></div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			if_loading_show:true,
			loading_trans:'fadeMove'
		}
	},
	transitions:{
		fadeMove:{
			enterClass:'fadeMove-enter',
			leaveClass:'fadeMove-leave'
		}
	},
	ready(){
		let that = this;
		setTimeout(function(){
			that.if_loading_show = false;
		},2000)
	}
}
</script>

<style>
#loading{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: #fff;
	z-index: 1000;
}
.loading-content{
	position: absolute;
	width: 200px;
	height: 100px;
	left: calc(50% - 100px);
	top: calc(50% - 100px);
	transform-style: preserve-3d;
	-webkit-transform-style:preserve-3d;
	animation: rotateLoading 3s linear infinite;
	transform: rotateZ(30deg);
	/*perspective: 100px;*/
	 /*-webkit-perspective:100px;*/
}
.loading-content:hover{
    -webkit-animation-play-state:paused;
    animation-play-state:paused;
}
.loading-item:nth-child(1){transform:rotateY(0);}
.loading-item:nth-child(2){transform:rotateY(45deg);}
.loading-item:nth-child(3){transform:rotateY(90deg);}
.loading-item:nth-child(4){transform:rotateY(135deg);}
.loading-item{
	position: absolute;
	width: 100px;
	height: 100px;
	background-color: rgba(255,255,255,.2);
	border-radius: 50%;
	box-shadow: 0 0 20px 20px rgba(0,0,0,.1) inset;
	/*backface-visibility: visible;*/
}
@keyframes rotateLoading{
	0%{transform: rotateY(0deg);}
	20%{transform: rotateY(72deg);}
	40%{transform: rotateY(144deg);}
	60%{transform: rotateY(216deg);}
	80%{transform: rotateY(288deg);}
	100%{transform: rotateY(360deg);}
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
