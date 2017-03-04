import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from './router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import VueAnimatedList from 'vue-animated-list'
import GIN from './static/javascripts/GIN'

Vue.use(VueAnimatedList)
Vue.use(VueResource)
Vue.use(VueValidator)
Vue.use(GIN)

router.start(App,'app')

new Vue({
	el: 'body',
	components: { App }
})
