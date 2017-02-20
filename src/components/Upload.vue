<template>
    <div id="upload" class="aaa-five-border yahei-font"  v-show="is_upload_show" :transition="upload_trans">           
        <validator name="uploadValidation">
  		    <form @submit.prevent="submit" novalidate name="uploadform">
                <h3>上传新的文章</h3>
                <div class="uploadTitle">
                    <label>标题</label>
                    <input autofocus class="uploadTitleInput" type="text" name="uploadTitle" 
                    v-model="essay.title" v-validate:title="['required']" 
                    placeholder="在此输入你的标题" :class="{validInput:isValidTitle,invalidInput:!isValidTitle}" />
                </div>
                <div class="uploadFile">
                    <label>文件</label>
                    <input class="uploadFileInput" type="file" @change="onFileChange" name="uploadFile" 
                    v-model="essay.filename" v-validate:filename="['required']" multiple="multiple" 
                    :class="{validInput:isValidFile,invalidInput:!isValidFile}" />
                </div>
                <div class="uploadType">
                    <label>分类</label>
                    <select class="uploadTypeSelect" name="uploadSelect" 
                    v-model="essay.type" v-validate:type="['required']">
                        <option v-for="type in types" :value="type.value" v-text="type.text" 
                        :selected="selected($index)"></option>
                    </select>
                </div>
                <div class="uploadBrief">
                    <label>简介</label>
                    <textarea class="uploadBriefText" name="uploadBrief" 
                    v-model="essay.brief" v-validate:brief="['required']"
                    :class="{validInput:isValidBrief,invalidInput:!isValidBrief}">
                    </textarea>
                </div>
  			    <div class="uploadOptions">
                    <input class="" type="submit" value="上传" />
                    <input class="" type="button" value="取消" @click="cancel" />
                </div>
  		    </form>
        </validator> 
    </div>
</template>

<script>
import { showMessage,hideMessage,hideUpload,removeBlured } from '../vuex/actions'
import { getUploadShow,getSHARES } from '../vuex/getters'

export default {
    vuex:{
        actions:{
            showMessage,
            hideMessage,
            hideUpload,
            removeBlured
        },
        getters:{
            is_upload_show:getUploadShow,
            SHARES:getSHARES
        }
    },
    watch:{
        getUploadShow(value){
            // 重置表单
            if(!value){
                this.$el.querySelector('form').reset()
            }
        }
    },
    ready(){
        if(!this.$uploadValidation.touched){
            this.isValidTitle = true
            this.isValidBrief = true
            this.isValidFile = true
        }
    },
  	data (){
        return {
            upload_trans:'uploadMove',
            isValidTitle:false,
            isValidBrief:false,
            isValidFile:false,
            types:[
                {text:'Problem',value:'problem'},
                {text:'Note',value:'note'},
                {text:'Affair',value:'affair'}
            ],
            essay:{
                title:'',
                filename:'',
                file:null,
                type:'',
                brief:''
            }
        }
    },
    methods:{
        submit () {
            this.isValidTitle = this.$uploadValidation.title.required ? false : true
            this.isValidFile = this.$uploadValidation.filename.required ? false : true
            this.isValidBrief = this.$uploadValidation.brief.required ? false : true
            if(this.$uploadValidation.valid){
                this.essay.file = document.querySelector('.uploadFileInput').files;
                let form = document.querySelector('form')
                // console.log(form);
                let formData = new FormData(form)
                // let formData = JSON.stringify(this.essay)
                this.$http.post(this.SHARES.PORT+'/addEssay',formData)
                .then((response)=>{
                    // this.cancel()
                    // this.showMessage(response.body)
                    console.log(response.body)
                }).catch((response)=>{
                    // this.showMessage('Error: '+response.status+' '+response.statusText)
                    this.showMessage(response)
                })
            }else{
                this.showMessage('请完整填写文章上传部分！')
            }
        },
        selected (index) {
            return index===0?1:0;
        },
        cancel () {
            this.hideUpload()
            this.removeBlured()
        },
        onFileChange(e){
            var files = e.target.files
            // console.log(files)
        }
    }
}
</script>

<style scoped>
@import url(/static/styles/initial.css);

.uploadMove-transition{
    transform: scale(100%);
}
/* .*-enter 定义进入的开始状态 */
.uploadMove-enter{
    transform: scale(0);
}
/* .*-leave 定义离开的结束状态 */
.uploadMove-leave{
    transform: scale(0);
}
form div{
    margin: 1em 0;
    width: 100%;
    box-sizing: border-box;
}
form label{
    margin: 0 1em;
    font-size: 1.1em;
}
form input{
    display: inline-block;
    border-radius: 5px;
    width: 80%;
    outline: none;
}
.validInput{
    border: 1px solid #AAA;
}
.invalidInput{
    border: 1px solid red;
}
#upload{
    transition: transform .5s ease;    
    position: fixed;
    background: white;
    width: 50%;
    height: auto;
    top: 5em;
    left: 25%;
    z-index: 1000;
}
#upload h3{
    text-align: center;
    width: 100%;
    padding: .5em 0;
    font-size: 1.3em;
}
.uploadTitleInput{
    position: relative;
    padding-left: .5em;
    font-size: 12px;
    height: 2em;
}
.uploadFileInput{
    padding-right: .5em;
}
.uploadTypeSelect {
    padding: .2em .3em;
    font-size: 1.1em;
    -webkit-appearance:none;
    outline: none;
}
.uploadBrief label{
    vertical-align: top;
}
.uploadBriefText{
    width: 80%;
    height: 10em;
    outline: none;
    resize:none;
    padding: .25em;
}
.uploadOptions {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.uploadOptions input{
    background: transparent;
    width: 5em;
    height: 2em;
    margin: 0 1em;
    outline: none;
    cursor: pointer;
}

</style>
