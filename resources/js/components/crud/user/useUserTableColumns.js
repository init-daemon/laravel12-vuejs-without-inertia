import { h } from 'vue';
import { USER_BASE_COLUMNS } from '@/composables/user/userConst';
import UserActionsCell from './UserActionsCell.vue';

export function useUserTableColumns({ onEdit, onDelete } = {}) {
	const actionsColumn = {
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const user = row.original;
			return h(UserActionsCell, {
				onEdit: () => onEdit?.(user),
				onDelete: () => onDelete?.(user),
			});
		},
	};

	const userColumns = [...USER_BASE_COLUMNS, actionsColumn];
	
    return { userColumns };
}