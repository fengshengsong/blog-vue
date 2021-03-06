//放置状态变更函数
export default {
	SET_CURRENT_COMPONENT(state,component='Loading'){
		state.current_component = component
	},
	SHOW_MESSAGE(state,message='No Message!'){
		state.message = message
		state.is_message_show = true
	},
	HIDE_MESSAGE(state){
		state.is_message_show = false
	},
	SHOW_UPLOAD(state){
		state.is_upload_show = true
	},
	HIDE_UPLOAD(state){
		state.is_upload_show = false
	},
	LOGIN_AS_ADMIN(state){
		state.is_admin = true
	},
	LOGIN_AS_VISITOR(state){
		state.is_visitor = true
	},
	TOGGLE_HEADERAREA(state,value){
		if(state.is_headerarea_in){
			state.is_simple_headerarea_show = (value>=98) ? true : false
		}
		if(value < 10){
			state.is_headerarea_in = true
		}
	},
	HIDE_SIMPLE_HEADERAREA(state){
		state.is_simple_headerarea_show = false
		state.is_headerarea_in = false
	},
	SET_CURRENT_ROUTE(state,route){
		state.current_route = route
	},
	SET_PREVIEW_TRANS(state,trans){
		state.preview_trans = trans
	},
	SHOW_HEADERAREA(state){
		state.is_headerarea_show = true
	},
	SHOW_MAINBODY(state){
		state.is_mainbody_show = true
	},
	SHOW_CONTENT(state){
		state.is_content_show = true
	},
	SHOW_NAVBAR(state){
		state.is_navbar_show = true
	},
	HIDE_NAVBAR(state){
		state.is_navbar_show = false
	},
	SHOW_FOOTERAREA(state){
		state.is_footerarea_show = true
	},
	SHOW_SIDEBAR(state){
		state.is_sidebar_show = true
	},
	SHOW_TOTOP(state){
		state.is_totop_show = true
	},
	TOGGLE_TOTOP(state,value){
		state.is_totop_in = (value>=50) ? true : false
	},
	SET_ESSAYS_CACHE(state,array){
		state.essays_cache = array
	},
	SET_SEARCH_KEY_CACHE(state,cache){
		state.search_key_cache = cache
	},
	HIDE_LOADING(state){
		state.is_loading_show = false
	}
}