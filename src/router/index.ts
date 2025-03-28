import useUserStore from '@/store/user';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            title: '主页',
            keepAlive: true,
            avoidAuth: true,
            navTransparent: true,
        },
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/design',
        name: 'Design',
        meta: {
            title: '设计界面',
            keepAlive: true,
        },
        component: () => import('@/views/design/index.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.avoidAuth) {
        return next();
    } else if (userStore.username) {
        return next();
    }
    return next('/home');
});

export default router;
