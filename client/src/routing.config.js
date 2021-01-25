//imports
    import login from './pages/login.vue';
    import users from './pages/users.vue';
    import invoice from './pages/invoice.vue';

//define routes
    export default [{
            path: '/login',
            name: 'login',
            component: login
        },{
            path: '/users',
            name: 'users',
            component: users
        },{
            path: '/invoice/:id',
            name: 'invoice',
            component: invoice,
            props: true
        },{
            path: "*",
            name: 'default',
            redirect: "/login"
        }
    ];