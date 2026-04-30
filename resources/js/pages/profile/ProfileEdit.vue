<template>
    <div class="mx-auto flex w-full flex-col gap-10 px-4 py-8 sm:px-6 md:max-w-3xl lg:max-w-4xl">
        <UserForm
            v-model:user="userForm"
            :isSubmitting="isSubmitting"
            :errors="userErrors"
            @updated="updateProfile"
        />

        <Tabs default-value="new-password" id="update-password">
            <TabsList>
                <TabsTrigger value="new-password">
                    New password
                </TabsTrigger>
                <TabsTrigger value="forgot-password">
                    Forgot Password
                </TabsTrigger>
            </TabsList>
            <TabsContent value="new-password">
                <PasswordEditForm
                    :isSubmitting="isPasswordSubmitting"
                    :errors="passwordErrors"
                    :key="passwordChangedKey"
                    @updated="handleUpdatePassword"
                />
            </TabsContent>
            <TabsContent value="forgot-password">
                <ForgotPasswordForm
                    :isSubmitting="requestingForgotPassword"
                    :errors="requestForgotPasswordErrors"
                    @forgot="forgotPassword"
                />
            </TabsContent>
        </Tabs>
    </div>
</template>

<script setup>
const route = useRoute();

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { updateUser } = useUser()

const {
    requestForgotPasswordErrors,
    requestingForgotPassword,
    isPasswordSubmitting,
    passwordErrors,

    forgotPassword,
    updatePassword,

} = useAuth()

const userForm = ref({})
const isSubmitting = ref(false)
const userErrors = ref({})
const passwordChangedKey = ref(false);

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

const handleUpdatePassword = async (payload) => {
    await updatePassword(payload);

    passwordChangedKey.value++;
}

onMounted(async () => {
    scrollToHash(route.hash)
    
    if (user.value) {
        userForm.value = { ...user.value }
    }
})
</script>