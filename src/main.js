import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from './router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import VueAnimatedList from 'vue-animated-list'

Vue.use(VueAnimatedList)
Vue.use(VueResource)
Vue.use(VueValidator)

// Vue.http.interceptors.push((request, next) => {
// 	next((response) => {
// 		return response
// 	});
// })

router.start(App,'app')

new Vue({
	el: 'body',
	components: { App }
})
