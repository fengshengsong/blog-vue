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
                component: require('./components/All')
            },
            '/problem':{
                name: 'problem',
                component: require('./components/Problem')     
            },
            '/problem/:index':{
                component: require('./components/Template')     
            },
            '/note':{
                name: 'note',
                component: require('./components/Note')
            },
            '/note/:index':{
                component: require('./components/Template')
            },
            '/affair':{
                name: 'affair',
                component: require('./components/Affair')
            },
            '/affair/:index':{
                component: require('./components/Template')
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