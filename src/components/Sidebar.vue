<template>
  	<div id="sidebar" class="yahei-font" v-if="is_sidebar_show"
  	:class="{'sidebar-in':is_sidebar_in,'sidebar-out':!is_sidebar_in}">
		<div class="info-panel">
			<img class="info-panel-selfie" :src="selfie" />
  			<p class="info-panel-intro" v-text="intro"></p>
  			<div class="info-panel-contact flex-row">
  				<a href="https://github.com/fengshengsong" target="_blank"><i class="fa fa-github"></i></a>
  			</div>
		</div>
		<div class="admin-panel sidebar-panel" v-if="is_admin" :transition="admin_trans">
			<input class="upload-btn sidebar-btn-one yahei-font" type="button" :value="upload_btn_val" @click="upload"/>
		</div>
		<div class="visitor-panel sidebar-panel" v-if="is_visitor" :transition="visitor_trans">
			<input class="getfun-btn sidebar-btn-one yahei-font" type="button" :value="getfun_btn_val" @click="getFun"/>
		</div>
		<div class="login-panel sidebar-panel" v-if="is_login_show" :transition="login_trans">
			<form @submit.prevent.stop="submit">
				<input autofocus class="login-password yahei-font" type="password" v-model="login_data.password">
				<div class="login-btns flex-row">
					<input class="login-btn yahei-font" type="submit" value="Go">
					<input class="login-btn yahei-font" type="button" value="No" @click="cancelLogin">
				</div>
			</form>
		</div>
		<div class="menu-panel">
			<ul class="menu flex-column yahei-font">
				<li v-for="menu in menus" class="menu-item" 
				:class="{'current-menu':(current_menu==$index)}" @click.prevent.stop="menuClick(menu.event,$index)">
					<a href="####"><i class="iconfont" v-html="menu.iconfont"></i>{{menu.name}}</a>
				</li>
			</ul>
		</div>
		<div class="arrow-panel" @click="toggleSidebar"
		:class="{'in-sidebar':is_sidebar_in,'arrow-circle':is_arrow_circle}">
			<i class="iconfont arrow-icon" >&#xe60f;</i>
		</div>
  	</div>
</template>

<script>
import { showUpload,showMessage,showTotop,addBlured,loginAsAdmin,loginAsVisitor } from '../vuex/actions'
import { getSHARES,getIsAdmin,getIsVisitor,getSidebarShow } from '../vuex/getters'

export default {
	vuex:{
		getters:{
			SHARES:getSHARES,
			is_admin:getIsAdmin,
			is_visitor:getIsVisitor,
			is_sidebar_show:getSidebarShow,
		},
		actions:{
			showUpload,
			showMessage,
			showTotop,
			addBlured,
			loginAsAdmin,
			loginAsVisitor,
		}
	},
	data(){
		return {
			menus:this.SHARES.menus,
			selfie:'/static/images/selfie_6.jpg',
			intro:'fengshengsong',
			upload_btn_val:'上传文章',
			getfun_btn_val:'GET SOME FUN',
			login_data:{
				password:''
			},
			is_user:'',
			is_sidebar_in:true,
			is_login_show:true,
			login_wrong_num:1,
			admin_trans:'fadeSwitch',
			visitor_trans:'rightSwitch',
			login_trans:'leftSwitch',
			is_arrow_circle:false,
			is_item_active:false,
			current_menu:Number(window.localStorage.getItem('current_menu'))||0,
		}
	},
	watch:{
		is_sidebar_show(newVal,oldVal){
			this.circleArrow()
			this.showTotop()
		}
	},
	transitions:{
		leftSwitch:{
			afterLeave(el){
				if(this.is_user == 'admin'){
					this.loginAsAdmin()
				}else{
					this.loginAsVisitor()
				}
			}
		}
	},
	ready(){
		this.isAdminSave()
	},
	methods:{
		toggleSidebar(){
			this.is_sidebar_in=!this.is_sidebar_in
		},
		upload(){
			this.addBlured()
			this.showUpload()
		},
		submit(){
			let login_data = JSON.stringify(this.login_data)
			this.$http.post(this.SHARES.PORT+'/login',login_data).then((response)=>{
				if(response.body){
					this.hideLogin()
					this.is_user = 'admin'
					window.sessionStorage.setItem('admin','yeah')
				}else{
					if(this.login_wrong_num > 4){
						this.showMessage('不对了'+this.login_wrong_num+'次。刷新一下试试。')
						this.cancelLogin()
					}else{
						this.showMessage('不对了'+(this.login_wrong_num++)+'次')
					}
				}
			}).catch((response)=>{
				this.showMessage('Error: '+response.status+' '+response.statusText)
			})
		},
		getFun(){
			this.showMessage(this.SHARES.joke)
		},
		cancelLogin(){
			this.hideLogin()
			this.is_user = 'visitor'
		},
		hideLogin(){
			this.is_login_show = false
		},
		isAdminSave(){
			if(window.sessionStorage.getItem('admin') === 'yeah'){
				this.is_login_show = false
				this.loginAsAdmin()
			}
		},
		circleArrow(){
			this.is_arrow_circle = true
		},
		menuClick(event,index){
			this.$route.router.go({path:'/'+event})
			this.setCurrentMenu(index)
		},
		setCurrentMenu(index){
			window.localStorage.setItem('current_menu',index)
            this.current_menu=index
		}
	}
}
</script>

<style scoped>
#sidebar{
	position: fixed;
	width: 15vw; 
	height: 100%;
  	box-sizing: border-box;
	transition: left .5s,opacity .5s;
	z-index: 999;
	background-image: url(/static/images/sidebar_bg2.jpg);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
}
#sidebar a:hover{
	text-decoration: none;
}
.sidebar-in{
	left: 0;
}
.sidebar-out{
	left: -15vw;
}

.menu-panel{
	margin: 1em;
}
.menu{
	box-sizing: border-box;
    list-style: none;
    align-items: flex-start;
    cursor: pointer;
}
.menu-item{
    position: relative;
    box-sizing: border-box;
    left: 0;
    width: 100%;
    padding: .25em 0;
    border-radius: 1px;
    background: rgba(255,255,255,.5);
    border: 1px solid transparent;
	transition: left .5s, background 1s;
}
.menu-item:hover{
	left: .5em;
	background: rgba(255,255,255,.8);
}
.menu-item i{
	margin:  0 .5em 0 1em;
}
.current-menu::after{
	content: " ";
    position: absolute;
    top: 50%;
    margin-top: -3px;
    right: 15px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #222;
    opacity: .6;
}
/*.menu-item::before{
    content: '[';
    position: absolute;
    transform: translateX(15px);
    opacity: 0;
    left: -10px;
    transition: all .3s;
}
.menu-item::after{
    content: ']';
    position: absolute;
    transform: translateX(-15px);
    opacity: 0;
    right: -10px;
    transition: all .3s;
}
.menu-item:hover::before{
    content: '[';
    position: absolute;
    transform: translateX(5px);
    opacity: 1;
    transition: all .3s;
}
.menu-item:hover::after{
    content: ']';
    position: absolute;
    transform: translateX(-5px);
    opacity: 1;
    transition: all .3s;
}*/
.info-panel{
	margin: 0 1em;
	padding: 2em 0 0;
	color: #333;
}
.info-panel-selfie{
	display: block;
	width: 5em;
	height: 5em;
	margin: 0 auto;
	border-radius: .1em;
}
.info-panel-intro{
	text-align: center;
	padding: 1em 0 0;
}
.info-panel-contact{
	padding: .5em 0 1em;
	justify-content: center;
}
.info-panel-contact a{
	color: white;
}
.info-panel-contact i{
	font-size: 1.5em;
	color: #333;
}
.sidebar-panel{
	position: relative;
	margin: 0 1em;
	border-top: 1px solid white;
	border-bottom: 1px solid white;
}
.sidebar-btn-one{
	background: white;
	opacity: .5;
	width: 100%;
	padding: .5em;
	border: 1px solid white;
	margin: 1em auto;
	outline: none;
 	cursor: pointer;
 	transition: opacity .2s;
}
.sidebar-btn-one:hover{
	opacity: .6;
}
.login-panel{
	padding: 1em 0;
}
.login-password{
	width: 100%;
	outline: none;
	border: 1px solid white;
	border-radius: 2px;
	height: 1.5em;
	text-indent: 5px;
	opacity: .5;
	transition: opacity .5s;
}
.login-password:focus{
	opacity: .9;
}
.login-btns{
	justify-content: center;
	width: 100%;
	padding-top: 1em; 
}
.login-btn{
	background: rgba(255,255,255,.5);
	position: relative;
	top: 0;
	color: black;
	border: 1px solid transparent;
	width: 50%;
	box-sizing: border-box;
	border-radius: 2px;
	outline: none;
	padding: .3em;
	cursor: pointer;
	transition: top .2s;
}
.login-btn:hover{
	top: -.2em;
}

.arrow-panel{
	position: fixed;
	left: 2em;
	bottom: 2em;
	width: 2em;
	height: 2em;
	padding: 0;
	border: none;
	border-radius: 50%;
	transition: transform .5s, color .5s;
	cursor: pointer;
}
.arrow-icon{
	font-size: 2em;	
}
.in-sidebar{
	transform: rotate(180deg);
	color: white;
	opacity: .5;
}
.arrow-circle{
	animation-name: arrowCircle;
	animation-duration: 2s;
	animation-timing-function: ease;
}
@keyframes arrowCircle{
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(720deg);
	}
}




.fadeSwitch-transition{
  	transition: opacity .5s ease;
}
.fadeSwitch-enter{
  	opacity: 0;
}
.fadeSwitch-leave{
  	opacity: 0;
}
.leftSwitch-transition{
	left: 0;
  	transition: left .5s ease;
}
.leftSwitch-enter{
  	left: -100%;
}
.leftSwitch-leave{
	left: -100%;
}
.rightSwitch-transition{
	left: 0;
  	transition: left .5s ease;
}
.rightSwitch-enter{
  	left: -100%;
}
.rightSwitch-leave{
	left: - 100%;
}
</style>
