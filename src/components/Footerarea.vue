<template>
    <div id="footerarea" :transition="footer_trans">
   		<p>
   			版权是我的
   			<a href="" @click.stop.prevent="onThumb"><i class="fa fa-thumbs-o-up left-thumb"></i></a>
   			fengshengsong
   			<a href="" @click.stop.prevent="onThumb"><i class="fa fa-thumbs-o-up right-thumb"></i></a>
   			{{new Date().getFullYear()}}
   		</p>
    </div>
</template>

<script>
export default {
	data(){
		return {
			footer_trans:'footerMove'
		}
	},
	methods:{
		onThumb(event){
			let target = event.target
			let node = target.nodeName==='I' ? target.parentNode : target
			node.innerHTML += "<div class='ha'>+1s</div>"
			setTimeout(function(){
				$(".ha").remove()
			},1000)
		}
	}
}
</script>

<style>
@keyframes haup
{
	from {top: 0em;}
	to {top: -1em;}
}
@media screen and (max-width: 1000px){
    #footerarea{

    }
}
#footerarea{
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    opacity: .8;
    padding: 1em 0;
    margin-top: 1em;
}
#footerarea a{
	position: relative;
}
.ha{
	position: absolute;
	font-size: .7em;
	top: -1em;
	right: 0;
	animation: haup .5s;
}
.right-thumb{
	transform: rotateY(180deg);
}
</style>
