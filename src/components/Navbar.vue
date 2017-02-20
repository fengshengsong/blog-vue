<template>
  	<div id="navbar">
    	<navlist></navlist>
  	</div>
</template>

<script>
import Navlist from './Navlist'
import { getNavbarShow } from '../vuex/getters'
import { showContent } from '../vuex/actions'

export default {
    components:{
      	Navlist
    },
    vuex:{
        getters:{
        	is_navbar_show:getNavbarShow
        },
        actions:{
        	showContent
        }
    },
    data(){
    	return{
    		navbar_trans:'navbarMove'
    	}
    },
    transitions:{
    	navbarMove:{
            enter(){
                this.showContent()
            },
    	}
    }
}
</script>

<style scoped>
#navbar{
	width: 100%;
	height: 2em;
}
.navbarMove-transition {
	position: relative;
	transition: left .5s ease;
	left: 0;
    top: 0;
}
.navbarMove-enter {
	left: -100%;
}
.navbarMove-leave{
    top: -100%;
}
</style>
