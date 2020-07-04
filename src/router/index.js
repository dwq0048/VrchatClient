import Vue from 'vue'
import VueRouter from 'vue-router'
import token from './before/token'
import board from './before/board'
import boradJson from '@/assets/board.json'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home'),
		beforeEnter: token({ auth : 0 })
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login'),
		beforeEnter: token()
	},
	{
		path: '/notice',
		name: 'Notice',
		component: () => import('@/views/Notice'),
		beforeEnter: token({ auth : 0 })
	},
	{
		path: '/notice/edit',
		name: 'NoticeEdit',
		component: () => import('@/views/Notice/edit'),
		beforeEnter: token({ auth : 1 })
	},
	{
		path: '/notice/post/:id',
		name: 'NoticePost',
		component: () => import('@/views/Notice/post'),
		beforeEnter: token({ auth : 0 })
	}
];

/*
boradJson.forEach((object) => {
	const target = object;
	const source = {
		beforeEnter: token
	}
	const data = board(Object.assign(target, source));
	for(let i=0; i<data.length; i++){
		routes.push(data[i]);
	}
})

console.log(routes);
*/

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
