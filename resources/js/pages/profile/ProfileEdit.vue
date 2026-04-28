<template>
    <div class="mx-auto flex w-full flex-col gap-10 px-4 py-8 sm:px-6 md:max-w-3xl lg:max-w-4xl">
        <UserForm
            v-model:user="userForm"
            :isSubmitting="isSubmitting"
            :errors="userErrors"
            @updated="updateProfile"
        />
        <PasswordEditForm
            id="update-password"
            :isSubmitting="isPasswordSubmitting"
            :errors="passwordErrors"
            @updated="updatePassword"
        />
    </div>
</template>

<script setup>
const route = useRoute();

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { updateUser } = useUser()

const userForm = ref({})
const isSubmitting = ref(false)
const userErrors = ref({})

const isPasswordSubmitting = ref(false)
const passwordErrors = ref({})

const toast = useToast()

const updateProfile = async (formData) => {
    isSubmitting.value = true
    userErrors.value = {}

    try {
        const result = await updateUser(user.value.id, formData)
        toast.success(result.data?.message || 'Profile updated successfully')
        authStore.user = { ...authStore.user, ...formData }
    } catch (error) {
        if (error.response?.status === 422) {
            userErrors.value = error.response.data.errors
        } else {
            toast.error('Failed to update profile')
        }
    } finally {
        isSubmitting.value = false
    }
}

const updatePassword = async (payload) => {
    isPasswordSubmitting.value = true
    passwordErrors.value = {}

    try {
        const response = await authStore.updatePassword(payload)
        console.log(response.data)
        
        toast.success({
            description: response.data.message
        })
    } catch (errors) {
        passwordErrors.value = errorsFromResponse(errors.response);
    } finally {
        isPasswordSubmitting.value = false
    }
}


onMounted(async () => {
    scrollToHash(route.hash)
    
    if (user.value) {
        userForm.value = { ...user.value }
    }
})
</script>