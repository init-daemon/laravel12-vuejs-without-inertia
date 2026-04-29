<template>
    <div class="min-h-screen flex items-center justify-center bg-background p-4">
        <ResetPasswordForm
            class="w-full max-w-sm"
            :errors="errors"
            :isSubmitting="resettingPassword"
            :isSuccess="isSuccess"
            @reset="handleResetPassword"
            @cancel="handleCancel"
        />
    </div>
</template>
<script setup>

const toast = useToast();
const route = useRoute();
const router = useRouter();

const { resetPassword } = useAuth();
const resettingPassword = ref(false);

const errors = ref({});
const isSuccess = ref(false);

const handleResetPassword = async (payload) => {
    resettingPassword.value = true;
    errors.value = {}
    payload.token = route.params.token;
    payload.email = route.query.email;

    try {
        const response = await resetPassword(payload).finally(() => {
            resettingPassword.value = false;
        });

        toast.success({
            description: response.data.message
        })

        isSuccess.value = true;
    } catch (error) {
        errors.value = errorsFromResponse(error.response)

        const message = error.response.data?.message;

        if (message) {
            toast.error({
                description: message
            });
        }
    }
}

const handleCancel = () => {
    router.push('/')
}

</script>