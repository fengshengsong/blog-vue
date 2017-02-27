<template>
    <div id="mainbody" :transition="mainbody_trans">
        <router-view :transition="rv_trans" transition-mode="out-in"></router-view>
    </div>  
</template>

<script>
export default {
    data(){
        return {
            mainbody_trans:'mainbodyMove',
            rv_trans:'rvMove'
        }
    },
}
</script>

<style scoped>
#mainbody{
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    padding: 0 0 5em 0;
}
.rvMove-transition {
  position: relative;
  transition: opacity .1s ease;
  opacity: 1;
}
.rvMove-enter {
  opacity: 0;
}
.rvMove-leave{
  opacity: 0;
}
</style>
