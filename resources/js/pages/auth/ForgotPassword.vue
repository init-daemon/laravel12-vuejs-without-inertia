<template>
    <div class="min-h-screen flex items-center justify-center bg-background p-4">
        <ForgotPasswordForm
            :isSubmitting="requestingForgotPassword"
            :errors="requestForgotPasswordErrors"
            @forgot="forgotPassword"
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

const handleCancel = () => {
    router.push('/');
}
</script>