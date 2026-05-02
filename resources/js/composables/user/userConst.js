import { h } from 'vue';

export const USER_BASE_COLUMNS = [
	{
		accessorKey: 'firstname',
		header: 'First name',
		cell: ({ row }) => h('div', {}, row.getValue('firstname')),
	},
	{
		accessorKey: 'lastname',
		header: 'Last name',
		cell: ({ row }) => h('div', {}, row.getValue('lastname')),
	},
	{
		accessorKey: 'username',
		header: 'User name',
		cell: ({ row }) => h('div', {
            class: 'lowercase'
        }, row.getValue('username')),
	},
    {
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => h('div', {
            class: 'lowercase'
        }, row.getValue('email')),
	},
	{
		accessorKey: 'type',
		header: 'Type',
		cell: ({ row }) => {
			const type = row.getValue('type') || 'user';
			const badgeClass = type === 'admin'
				? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
				: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			return h('span', {
                class: `px-2 py-1 rounded-full text-xs ${badgeClass}`
            }, type);
		},
	},
	{
		accessorKey: 'is_email_verified',
		header: 'Status',
		cell: ({ row }) => {
			const status = !!row.getValue('is_email_verified');
			const badgeClass = status
				? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
				: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
			return h('span', {
                class: `px-2 py-1 rounded-full text-xs ${badgeClass}`
            }, status ? 'Active' : 'Not active');
		},
	},
];


export const DEFAULT_USER_SEARCHABLE_COLUMNS = ['firstname', 'lastname', 'username', 'email'];