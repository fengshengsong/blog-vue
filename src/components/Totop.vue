<template>
    <div id="totop" :class="{'totop-in':is_totop_in,'totop-out':!is_totop_in}" @click="backToTop">
        <span><i class="fa fa-arrow-circle-up"></i></span>
    </div>
</template>

<script>
import { getTotopIn } from '../vuex/getters'

export default{
	vuex:{
		getters:{
			is_totop_in:getTotopIn
		},
	},
	data(){
		return{
		}
	},
	methods:{
		backToTop(){
			(function smoothScroll(){  
    			var current_scroll_top = document.documentElement.scrollTop || document.body.scrollTop;  
    			if (current_scroll_top > 0) {  
         			window.requestAnimationFrame(smoothScroll);  
         			window.scrollTo(0,current_scroll_top-(current_scroll_top/10));  
    			}  
			})();
		}
	}
}		
</script>

<style scoped>
@media screen and (max-width: 1000px){
	#totop{
		display: none;
	}
}
#totop{
	position: fixed;
	right: 2em;
	font-size: 2em;
	transition: all .5s;
	cursor: pointer;
}
.totop-out{
	bottom: -3em;
}
.totop-in{
	bottom: 3em;
}
</style>
