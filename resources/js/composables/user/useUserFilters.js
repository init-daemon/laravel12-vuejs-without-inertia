import { debouncedFn } from '@/lib/utils';
import { computed, watch } from 'vue';
import { DEFAULT_USER_SEARCHABLE_COLUMNS } from './userConst';


/**
 * @param {string[]} userSearchableColumns
 * @param {Ref<string>} userQuerySearch
 * @param {Ref<string>} userQuerySearchFinal
 * @param {Ref<number>} userCurrentPage
 */
export function useUserFilters({
	userSearchableColumns = DEFAULT_USER_SEARCHABLE_COLUMNS,
	userQuerySearch,
	userQuerySearchFinal,
	userCurrentPage,
}) {
    const userSearchFilter = computed(() => {
        const searchFilter = userSearchableColumns.map((col) => ({
			[col]: { $contains: userQuerySearchFinal.value || undefined },
		}));

		return searchFilter;
    })

	const userFilter = computed(() => {
		return ({
            $or: userSearchFilter.value
        })
	});

	const updateSearchFinal = debouncedFn((value) => {
        userQuerySearchFinal.value = value;
    })

	watch(userFilter, () => {
		userCurrentPage.value = 1;
	}, { deep: true });

	watch(userQuerySearch, (newVal) => {
		updateSearchFinal(newVal);
	});

	return { userFilter };
}