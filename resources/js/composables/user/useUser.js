import api from '@/services/api';
import { watch } from 'vue';
import { useUserState } from './useUserState';
import { useUserFilters } from './useUserFilters';
import { useUserApi } from './useUserApi';
import { USER_BASE_COLUMNS } from './userConst';

export function useUser({ apiClient = api } = {}) {
	const state = useUserState();

	const { userFilter } = useUserFilters({
		userQuerySearch: state.userQuerySearch,
		userQuerySearchFinal: state.userQuerySearchFinal,
		userCurrentPage: state.userCurrentPage,
	});

	const apiService = useUserApi({ apiClient });

	async function getUsers(params = {}) {
		state.usersLoading.value = true;

        const response = await apiService.getUsers({
            current_page: state.userCurrentPage.value,
            per_page: state.userPerPage.value,
            filters: userFilter.value,
            ...params,
        }).finally(() => {
            state.usersLoading.value = false;
        });
        
        state.users.value = response.data;

        return response;
	}

	async function getUser(id) {
		const response = await apiService.getUser(id);

		return response;
	}

	async function updateUser(id, payload) {
		state.errors.value = null;

		try {
			const response = await apiService.updateUser(id, payload);

			return response;
		} catch (error) {
			state.errors.value = error.response?.data?.errors || error;
            
			return false;
		}
	}

    watch(
		[
			state.userQuerySearchFinal,
			state.userCurrentPage,
			state.userPerPage,
			userFilter,
		],
		() => {
			getUsers().catch(() => {});
		},
		{ deep: false, immediate: false }
	);

	return {
		// vars
		errors: state.errors,
		users: state.users,
		usersLoading: state.usersLoading,
		userQuerySearch: state.userQuerySearch,
		userCurrentPage: state.userCurrentPage,
		userPerPage: state.userPerPage,
		userBaseColumns: USER_BASE_COLUMNS,

		// computed
		userFilter,

		// methods
		getUser,
		getUsers,
		updateUser,
		handleUserCurrentPageChange: state.handleUserCurrentPageChange,
		handleUserPerPageChange: state.handleUserPerPageChange,
	};
}