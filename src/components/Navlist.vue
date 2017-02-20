<template>
	<ul id="navlist" class="yahei-font">
        <li v-for="category in categories" :class="{'current-cate':(current_cate===$index)}" @click="cateClick($index)">
            <a v-link="{path:'/blog'+category.path}">{{category.name}}</a>
        </li> 
    </ul>
</template>

<script>
import { getSHARES,getCurrentRoute,getPreviewTrans } from '../vuex/getters'
import { setCurrentRoute,setPreviewTrans } from '../vuex/actions'

export default {
    vuex: {
        getters:{
            SHARES:getSHARES,
            current_route:getCurrentRoute,
            preview_trans:getPreviewTrans,
        },
        actions:{
            setCurrentRoute,
            setPreviewTrans,
        }
    },
    data(){
        return {
            current_cate:Number(window.localStorage.getItem('current_cate'))||0,
            categories:this.SHARES.categories,
            previous_route:0,
            trans_mode:0
        }
    },
    methods:{
        setCurrentCate(index){
            window.localStorage.setItem('current_cate',index)
            this.current_cate=index
        },
        cateClick(index){
            //注意顺序
            this.previous_route = this.current_route
            this.setCurrentRoute(index)
            this.trans_mode = this.current_route - this.previous_route > 0 ? 'rightMove' : 'leftMove'
            this.setPreviewTrans(this.trans_mode)
            this.setCurrentCate(index)
        }
    }
}
</script>

<style scoped>
#navlist{
    background: transparent;
}
#navlist li{
    display: inline-block;
}
#navlist a{
    display: inherit;
    color: black;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    width: 5em;
    height: 2em;
    line-height: 2em;
    transition: all .2s;
}
#navlist a:hover, .current-cate>a{
    text-decoration: none;
    background: #555; 
    color: white !important;
}
</style>