import UserList from "@/pages/admin/user/UserList.vue";

export default  [
    {
        path: '/admin/users',
        name: 'admin.users',
        component: UserList,
        meta: {
            requiresAuth: true,
            requireAdmin: true,
        },
    },
];
