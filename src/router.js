import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({hashbang: false, history: true})

router.map({
    '/blog':{
        name:'blog',
        component: function(resolve){
            require(['./components/Blog'],resolve)
        },
        subRoutes:{
            '/':{
                name:'all',
                component: function(resolve){
                    require(['./components/All'],resolve)
                }
            },
            '/problem':{
                name: 'problem',
                component: function(resolve){
                    require(['./components/Problem'],resolve)
                }     
            },
            '/problem/:index':{
                component: function(resolve){
                    require(['./components/Template'],resolve)
                }     
            },
            '/note':{
                name: 'note',
                component: function(resolve){
                    require(['./components/Note'],resolve)
                }
            },
            '/note/:index':{
                component: function(resolve){
                    require(['./components/Template'],resolve)
                }
            },
            '/affair':{
                name: 'affair',
                component: function(resolve){
                    require(['./components/Affair'],resolve)
                }
            },
            '/affair/:index':{
                component: function(resolve){
                    require(['./components/Template'],resolve)
                }
            },
        }
    },
    '/tag':{
        name:'tag',
        component: function(resolve){
            require(['./components/Tag'],resolve)
        }
    },
    '/search':{
        name:'search',
        component: function(resolve){
            require(['./components/Search'],resolve)
        }
    },
    '/test':{
        name:'test',
        component: function(resolve){
            require(['./components/Test'],resolve)
        }
    },
})

router.redirect({
    '*':"/blog"
})

export default router 