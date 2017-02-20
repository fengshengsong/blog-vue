<template>
    <div id="headerarea" class="yahei-font" v-if="is_headerarea_show" :transition="header_trans">
<!--         <div class="headerarea-simple" 
        :class="{'headerarea-simple-hide':!is_simple_headerarea_show,'headerarea-simple-show':is_simple_headerarea_show}">
            <span class="headerarea-hide-btn" @click="hideSimpleHeaderarea">
                <i class="iconfont headerarea-hide-icon" >&#xe607;</i>
            </span>
        </div> -->
    </div>
</template>

<script>
import { getSimpleHeaderareaShow,getHeaderareaShow } from '../vuex/getters'
import { hideSimpleHeaderarea,showHeaderarea,showMainbody } from '../vuex/actions'

export default {
    vuex:{
        getters:{
            is_simple_headerarea_show:getSimpleHeaderareaShow,
            is_headerarea_show:getHeaderareaShow,
        },
        actions:{
            hideSimpleHeaderarea,
            showHeaderarea,
            showMainbody,
        }
    },
    transitions:{
        headerMove:{
            afterEnter(el){
                this.showMainbody()
            }
        }
    },
    data(){
        return {
            header_trans:'headerMove',
        }
    },
    ready(){
        let that =this
        setTimeout(function(){
            that.showHeaderarea()
        },10)
    },
    methods:{
    }
}
</script>

<style>
#headerarea{
    width: 70vw;
    background: white;
}
#headerarea a:hover{
    text-decoration: none;
}
.headerarea-simple{
    position: relative;
    height: 2em;
    background: #333;
    width: 70vw;
    position: fixed;
    left: 15vw;
    transition: all .5s;
    z-index: 999;
}
.headerarea-simple-hide{
    top: -2em;
}
.headerarea-simple-show{
    top: 0;
}
.headerarea-hide-btn{
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 2em;
    cursor: pointer;
}
.headerarea-hide-icon{
    font-size: 1.5em;
    color: gray;
    position: absolute;
    right: .2em;
    top: .1em;
    transition: color .5s;
}
.headerarea-hide-icon:hover{
    color: white;
}
.headerMove-transition {
    position: relative;
    transition: all .5s ease;
    top: 0;
    opacity: 1;
}
.headerMove-enter {
    top: -100px;
    opacity: 0;
}
.headerMove-leave {
}
</style>
