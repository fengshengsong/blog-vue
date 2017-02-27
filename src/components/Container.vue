<template>
    <div id="container">
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

import { toggleTotop } from '../vuex/actions'

export default {
    components: {
        Headerarea, Mainbody, Upload, Footerarea
    },
    vuex:{
        actions:{
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
            this.toggleTotop(newVal)
        }
    }
}
</script>

<style scoped>
@media screen and (max-width: 1000px){
    #container{
        width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
}
#container {
    position: absolute;
    width: 70vw;
    min-height: 100%;
    box-sizing: border-box;
    margin-left: 15vw; 
    overflow-x: hidden;

    display: flex;
    flex-flow: column nowrap;  
    justify-content:flex-start;
    align-items:flex-start;
}
</style>
