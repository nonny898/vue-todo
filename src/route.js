import Router from 'vue-router';
import firebase from "firebase";

const router = new Router( {
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            name: 'Todo',
            component: () => import('./components/Todo'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./components/Login'),
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('./components/Register')
            
        }
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    if (requiresAuth && !currentUser) next('/login');
    else if (!requiresAuth && currentUser) next('/');
    else next();
  }
)

export default router;