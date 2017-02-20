import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'

Vue.use(VueRouter)
const router = new VueRouter({hashbang: false, history: true})

router.map({
    '/blog':{
        name:'blog',
        component: require('./components/Blog'),
        subRoutes:{
            '/':{
                name:'all',
                component: require('./components/contents/All')
            },
            '/all':{
                name:'all',
                component: require('./components/contents/All')
            },
            '/problem':{
                name: 'problem',
                component: require('./components/contents/Problem')     
            },
            '/problem/:index':{
                component: require('./components/contents/Template')     
            },
            '/note':{
                name: 'note',
                component: require('./components/contents/Note')
            },
            '/note/:index':{
                component: require('./components/contents/Template')
            },
            '/affair':{
                name: 'affair',
                component: require('./components/contents/Affair')
            },
            '/affair/:index':{
                component: require('./components/contents/Template')
            },
        }
    },
    '/tag':{
        name:'tag',
        component:require('./components/Tag')
    },
    '/search':{
        name:'search',
        component:require('./components/Search')
    },
    '/test':{
        name:'test',
        component:require('./components/Test')
    },
})

router.redirect({
    '*':"/blog"
})

export default router 