//放置初始状态
import SHARES from '../static/javascripts/SHARES.js'

export default {	
	is_admin:false,
	is_visitor:false,
	
	message:'',
	
	SHARES,
	current_route:0,
	preview_trans:'leftMove',

	is_headerarea_in:true,
	is_headerarea_show:false,
	is_simple_headerarea_show:false,
	is_mainbody_show:false,
	is_navbar_show:true,
	is_content_show:true,
	is_footerarea_show:false,
	is_sidebar_show:false,
	is_totop_in:false,
	is_totop_show:false,
	is_message_show:false,
	is_upload_show:false,

	essays_cache:[],

	search_key_cache:'',
}