import Vue from 'vue'
import VueRouter from 'vue-router'
import Http from './componentes/Http.vue'
import ApiRestFull from './componentes/ApiRestFull.vue'
Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        /* { path: '/', component: Binding }, */
        { path: '/', redirect: '/apirestfull' },
        { path: '/apirestfull', component: ApiRestFull },
        { path: '/http', component: Http }
    ]
})