<template>
  	<div class="templ yahei-font" v-html="essay"></div>
</template>

<script>
import { showMessage } from '../../vuex/actions'
import { getSHARES } from '../../vuex/getters'

export default {
    vuex: {
        actions:{
            showMessage
        },
        getters: {
            SHARES: getSHARES
        }
    },
    data () {
        return {
            essay:''
        }
    },
    ready () {
        this.getEssay(this.$route.params.index)
    },
    methods: {
        getEssay (index) { 
            this.$http.get(this.SHARES.PORT+'/getEssay?index='+index).then((response)=>{
                this.$set('essay',response.body)
            },(response)=>{
                this.showMessage('获取文章错误！')
            })
        }
    }
}
</script>

<style>
.templ {
  width: 92%;
  margin: auto;
  font-size: 110%;
}
.templ h1 {
  font-size: 180%;
  color: #555;
  height: 2em;
  line-height: 2em;
  margin-bottom: .9em;
  font-weight: bold;
  border-bottom: 5px solid #3B5998;
}
.templ h2 {
  text-indent: .5em;
  margin: 1em 0;
  font-size: 160%;
  color: #000;
}
.templ h3 {
  text-indent: 1em;
  color: #3B5998;
  font-size: 140%;
}
.templ h4 {
  text-indent: 1em;
  color: #3B5998;
  font-size: 120%;
}
.templ h5 {
  text-indent: 1em;
  color: #3B5998;
  font-size: 100%;
}
.templ h6 {
  text-indent: 1em;
  color: #3B5998;
  font-size: 80%;
}
.templ p {
  margin: 1em 0;
  line-height: 1.7;
}
.templ p code {
  background: #f5f5f5;
  padding: .1em .5em;
  border-radius: .3em;
  font-family:'微软雅黑','黑体';
}
.templ blockquote {
  width: 90%;
  padding: 0.3em 0.9em;
  background: #eee;
  border-left: 5px solid rgb(255, 128, 0);
  margin: 2em 0;
  margin: inherit;
}
.templ blockquote p {
  margin: 1em 0;
}
.templ pre {
  width: 90%;
  max-height: 600px;
  background: #f5f5f5;
  padding: 1.4em;
  overflow-x: auto;
  margin: inherit;
  font-family:'微软雅黑','黑体';
  border-radius: 5px;
}
.templ pre code{
    font-family: consolas, Menlo, "PingFang SC", "Microsoft YaHei", monospace;
}
.templ ul {
  margin-left: 2em;
  padding: 0.9em;
}
</style>