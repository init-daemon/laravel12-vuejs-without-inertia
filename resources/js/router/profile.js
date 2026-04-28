import ProfileEdit from '@/pages/profile/ProfileEdit.vue';
import ProfileShow from '@/pages/profile/ProfileShow.vue';

export default  [
    {
        path: '/profile',
        name: 'profile',
        component: ProfileShow,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/profile/edit',
        name: 'profile.edit',
        component: ProfileEdit,
    }
];
