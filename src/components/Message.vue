<template>
    <div id="message" class="" v-show="isMessageShow" :transition="messageTranstion"
    @mouseover="messageMouseover" @mouseout="messageMouseout">
        <h3>消息</h3>
        <p v-text="message"></p>
        <span @click="closeMessage"><i class="fa fa-times"></i></span>
    </div>
</template>

<script>
import { getMessage,getMessageShow } from '../vuex/getters'
import { showMessage,hideMessage } from '../vuex/actions'

const MESSAGE_TIME = 1000
const MESSAGE_NUMBER = 3

var messageTimeout = 0

export default{
    vuex:{
        actions:{
            showMessage,
            hideMessage
        },
        getters: {
            message:getMessage,
            isMessageShow:getMessageShow
        }
    },
    data(){
        return {
            messageTranstion: 'updown'
        }
    },
    ready(){
    },
    watch:{
        isMessageShow(){
            if(this.isMessageShow){
                messageTimeout = setTimeout(this.closeMessage,MESSAGE_TIME*Math.round(this.message.length/MESSAGE_NUMBER))
            }else{
                clearTimeout(messageTimeout)
            }
        }
    },
    methods:{
        messageMouseover(){
            clearTimeout(messageTimeout)
        },
        messageMouseout(){
            if(this.isMessageShow){
                messageTimeout = setTimeout(this.closeMessage,MESSAGE_TIME*Math.round(this.message.length/MESSAGE_NUMBER))
            }
        },
        closeMessage(){
            this.hideMessage()
        }
    }
}
</script>

<style scoped>
@media screen and (max-width: 1000px){
    #message{
        display: none;
    }
}
#message{
    background: white;
    position: fixed;
    padding: 0 1em;
    right: 1em;
    width: 20em;
    opacity: .8;
    z-index: 1000;
}
#message:hover{
    opacity: 1;
    border-color: #DDD; 
}
#message h3{
    height: 2em;
    line-height: 2em;
    font-size: 1.1em;
    border-bottom: 1px solid #AAA; 
}
#message p{
    padding: .5em 0;
    font-size: .9em;
}
#message i{
    position: absolute;
    top: .5em;
    right: 1em;
    width: 1em;
    height: 1em;
    font-size: 1em;
}
.updown-transition{
    transition: all .5s ease;
    bottom: .5em;
}
.updown-enter{
    bottom: -10em;
}
.updown-leave{
    bottom: -10em;
}
</style>
