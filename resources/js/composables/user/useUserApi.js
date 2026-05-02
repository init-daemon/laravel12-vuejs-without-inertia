export const URL = 'users';

export function useUserApi({ apiClient }) {
	async function getUsers(params = {}) {
		return apiClient.get(URL, { params });
	}

	async function getUser(id) {
		return apiClient.get(`/${URL}/${id}`);
	}

	async function updateUser(id, payload) {
		return apiClient.patch(`/${URL}/${id}`, payload);
	}

	return { getUsers, getUser, updateUser };
}