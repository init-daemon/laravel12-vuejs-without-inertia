<template>
    <div class="min-h-screen flex items-center justify-center bg-background p-4">
        <ForgotPasswordForm
            :isSubmitting="requestingForgotPassword"
            :errors="requestForgotPasswordErrors"
            :isSuccess="isSuccess"
            @forgot="handleForgotPassword"
            @cancel="handleCancel"
        />
    </div>
</template>

<script setup>
const router = useRouter();
const {
    requestForgotPasswordErrors,
    requestingForgotPassword,

    forgotPassword,
} = useAuth()

const isSuccess = ref(false);

const handleForgotPassword = async (payload) => {
    const response = await forgotPassword(payload);
    
    isSuccess.value = !!response;
}

const handleCancel = () => {
    router.push('/');
}
</script>