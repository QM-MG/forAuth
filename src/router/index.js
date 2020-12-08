import Vue from 'vue';
import Router from 'vue-router';
const bigDataTable1 = () => import(/* webpackChunkName: "bigDataTable1" */ '@/views/bigDataTable/bigDataTable1')
const bigDataTable2 = () => import(/* webpackChunkName: "bigDataTable2" */ '@/views/bigDataTable/bigDataTable2')
const bigDataTable3 = () => import(/* webpackChunkName: "bigDataTable3" */ '@/views/bigDataTable/bigDataTable3')
const bigDataTable6 = () => import(/* webpackChunkName: "bigDataTable6" */ '@/views/bigDataTable/bigDataTable6')
const about = () => import(/* webpackChunkName: "bigDataTable6" */ '@/views2/About')
const bigtree = () => import(/* webpackChunkName: "bigtree" */ '@/views/bigTree')
const overflow = () => import(/* webpackChunkName: "overflow" */ '@/views/overflow/index')
const resizable = () => import(/* webpackChunkName: "resizable" */ '@/views/resizable')
const tabs = () => import(/* webpackChunkName: "resizable" */ '@/views/tabs')
const page1 = () => import(/* webpackChunkName: "bigDataTable6" */ '@/views/page1')


Vue.use(Router);

export default new Router({
    routes: [
      { path: '/bigDataTable1', component: bigDataTable1 },
      { path: '/bigDataTable2', component: bigDataTable2 },
      { path: '/bigDataTable3', component: bigDataTable3 },
      { path: '/bigDataTable6', component: bigDataTable6 },
      { path: '/about', component: about },
      { path: '/bigtree', component: bigtree },
      { path: '/overflow', component: overflow },
      { path: '/resizable', component: resizable },
      { path: '/tabs', component: tabs },
      { path: '/page1', component: page1 }
    ]
});
