//imports
    import login from './pages/login.vue';
    import properties from './pages/properties.vue';
    import dashboard from './pages/dashboard.vue';
    import scheduling from './pages/scheduling.vue';
    import settings from './pages/settings.vue';
    import tracking from './pages/tracking.vue';

//define routes
    export default [,{
            name: 'login',
            path: '/login',
            component: login
        },{
            name: 'settings',
            path: "/settings/:prop/:id",
            component: settings
        },{
            name: 'properties',
            path: '/properties/:prop/:id',
            component: properties
        },{
            name: 'tracking',
            path: '/tracking/:id',
            component: tracking
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