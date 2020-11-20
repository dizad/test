//imports
    import login from './pages/login.vue';
    import users from './pages/users.vue';
    import quote from './pages/quote.vue';

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
            path: '/quote/:id',
            name: 'quote',
            component: quote,
            props: true
        },{
            path: "*",
            name: 'default',
            redirect: "/login"
        }
    ];