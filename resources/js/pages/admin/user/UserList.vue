<template>
	<div class="p-6">
		<AppTable
			:data="users?.data"
			:total="users?.meta?.total"
			:currentPage="userCurrentPage"
			:perPage="userPerPage"
			:columns="userColumns"
			:loading="usersLoading"
			@update:currentPage="handleUserCurrentPageChange"
			@update:perPage="handleUserPerPageChange"
		>
			<template #filters>
				<Input
					class="max-w-sm"
					placeholder="Search..."
					v-model="userQuerySearch"
				/>
			</template>
		</AppTable>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Input } from '@/components/ui/input';
import AppTable from '@/components/data/AppTable.vue';
import { useUser } from '@/composables/user/useUser';
import { useUserTableColumns } from '@/components/crud/user/useUserTableColumns';

const {
	getUsers,
	handleUserCurrentPageChange,
	handleUserPerPageChange,
	userPerPage,
	userCurrentPage,
	users,
	usersLoading,
	userQuerySearch,
} = useUser();

const handleEdit = (user) => {
	console.log('Edited', user);
};
const handleDelete = (user) => {
	console.log('Deleted', user);
};

const { userColumns } = useUserTableColumns({
	onEdit: handleEdit,
	onDelete: handleDelete,
});

onMounted(async () => {
	await getUsers();
});
</script>