//imports
    import login from './pages/login.vue';
    import properties from './pages/properties.vue';
    import dashboard from './pages/dashboard.vue';
    import scheduling from './pages/scheduling.vue';

//define routes
    export default [,{
            name: 'login',
            path: '/login',
            component: login
        },{
            name: 'properties',
            path: '/properties/:id/:prop',
            component: properties
        },{
            name: 'dashboard',
            path: '/dashboard/:id',
            component: dashboard
        },{
            name: 'scheduling',
            path: "/scheduling/:id",
            component: scheduling
        },{
            name: 'default',
            path: "*",
            redirect: "/login"
        }
    ];