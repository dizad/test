//imports
    import toDo from './toDo.vue';
    import tasks from './tasks.vue';

//define routes
    export default [
        {
            path: '/toDo',
            name: 'toDo',
            component: toDo
        },{
           path: '/tasks/:id',
           name: 'tasks',
           component: tasks,
           props: true
       }, {
            path: "*",
            name: 'default',
            redirect: "/toDo"
        }
    ];