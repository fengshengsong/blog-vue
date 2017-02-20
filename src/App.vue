<template>
    <div id="app" :class="{'blured':is_blured}">
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
import { getBlured } from './vuex/getters'

export default {
    store,
    vuex:{
        getters:{
            is_blured:getBlured
        }
    },
    components: {
        Container,Message,Sidebar,Totop
    },
    ready(){
    },
}
</script>

<style>
@import '/static/styles/initial.css'

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
