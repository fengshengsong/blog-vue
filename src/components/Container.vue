<template>
    <div id="container" class="flex-column">
        <headerarea></headerarea>
        <mainbody></mainbody>
        <footerarea></footerarea>
        <upload></upload>
    </div>
</template>

<script>
import Headerarea from './Headerarea'
import Mainbody from './Mainbody'
import Upload from './Upload'
import Footerarea from './Footerarea'

import { getSHARES } from '../vuex/getters'
import { toggleHeaderarea,toggleTotop } from '../vuex/actions'

export default {
    components: {
        Headerarea, Mainbody, Upload, Footerarea
    },
    vuex:{
        getters:{
            SHARES:getSHARES,
        },
        actions:{
            toggleHeaderarea,
            toggleTotop,
        }
    },
    data(){
        return{
            scroll_top:0
        }
    },
    ready(){        
        let that = this
        window.onscroll = ()=> {
            that.scroll_top = document.body.scrollTop        
        }
    },
    watch:{
        scroll_top:'scrollTopChange'
    },
    methods:{
        scrollTopChange(newVal,oldVal){
            this.toggleHeaderarea(newVal)
            this.toggleTotop(newVal)
        }
    }
}
</script>

<style scoped>
#container {
    position: absolute;
    width: 70vw;
    min-height: 100%;
    box-sizing: border-box;
    margin-left: 15vw; 
    overflow-x: hidden;
}
</style>
