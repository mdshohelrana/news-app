import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Details from './views/Details.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requireLogin: false,
            },
            children: [

            ],
        },
        {
            path: '/details/:id',
            name: 'details',
            component: Details,
            meta: {
                requireLogin: false,
            },
            children: [

            ],
        }
    ],
})

export default router