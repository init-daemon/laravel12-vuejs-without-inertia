import { ref } from 'vue';

export function useUserState() {
	const errors = ref();
	const users = ref({
		data: [],
		meta: {
            current_page: 1,
            per_page: 1
        },
	});
	const userCurrentPage = ref(1);
	const userPerPage = ref(25);
	const userQuerySearchFinal = ref('');
	const userQuerySearch = ref('');
	const usersLoading = ref(false);

	function handleUserCurrentPageChange(currentPage) {
		userCurrentPage.value = currentPage;
	}
    
	function handleUserPerPageChange(perPage) {
		userPerPage.value = perPage;
	}

	return {
		errors,
		users,
		usersLoading,
		userQuerySearch,
		userQuerySearchFinal,
		userCurrentPage,
		userPerPage,
		handleUserCurrentPageChange,
		handleUserPerPageChange,
	};
}