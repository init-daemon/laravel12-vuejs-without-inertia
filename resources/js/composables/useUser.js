import api from '@/services/api';

const URL = 'users';
export const useUser = () => {
    const errors = ref();

    const getUser = async (id) => {
        const response = await api.get(`/${URL}/${id}`);

        return response;
    }

    const updateUser = async (id, payload) => {
        errors.value = null;

        try {
            const response = await api.patch(`/${URL}/${id}`, payload);

            return response;
        } catch (error) {
            console.log(error)

            errors.value = errorsFromResponse(error.response);

            return false;
        }
    }
    
    return {
        errors,

        getUser,
        updateUser,
    }

}