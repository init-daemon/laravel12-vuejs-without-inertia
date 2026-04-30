export const useAuth = () => {
    const authStore = useAuthStore();
    const toast = useToast()


    const requestForgotPasswordErrors = ref({})
    const requestingForgotPassword = ref(false)
    const isPasswordSubmitting = ref(false)
    const passwordErrors = ref({})

    const forgotPassword = async ({ email }) => {
        requestingForgotPassword.value = true;
        requestForgotPasswordErrors.value = {}

        try {
            const response = await api.post("/forgot-password", { email });

            toast.success({
                description: response.data.message,
            })
            
            return response;
        } catch (error) {
            requestForgotPasswordErrors.value = errorsFromResponse(error.response);

            toast.error({
                description: 'Failed to request forgot password.',
            });

            return false;
        } finally {
            requestingForgotPassword.value = false;
        }
    }

    const updatePassword = async (payload) => {
        isPasswordSubmitting.value = true
        passwordErrors.value = {}

        try {
            const response = await authStore.updatePassword(payload)
            
            toast.success({
                description: response?.data?.message
            });
            
            return response;
        } catch (errors) {
            console.log(errors);
            passwordErrors.value = errorsFromResponse(errors.response);

            return false;
        } finally {
            isPasswordSubmitting.value = false
        }
    }

    const resetPassword = async (payload) => {
        const response = await api.post('/reset-password', payload);

        return response;
    }

    return {
        requestForgotPasswordErrors,
        requestingForgotPassword,
        isPasswordSubmitting,
        passwordErrors,

        forgotPassword,
        resetPassword,
        updatePassword,
    }
}