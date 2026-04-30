<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <Card id="forgot-password">
            <template v-if="isSuccess">
                <CardContent class="pt-6">
                    <Alert variant="success">
                        <CheckCircle2Icon class="h-4 w-4" />
                        <AlertTitle>Check your email</AlertTitle>
                        <AlertDescription class="flex flex-col gap-4">
                            <p>
                                If an account exists for this email, a password reset link has been sent.
                                Please check your inbox (and spam folder).
                            </p>
                            <Button type="button" variant="outline" @click="goBack">
                                Back
                            </Button>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </template>
            <template v-else>
                <CardHeader>
                    <CardTitle>Forgot password</CardTitle>
                    <CardDescription>
                        Click on "Send Reset Link" to send the password reset link.
                    </CardDescription>
                </CardHeader>

                <CardContent class="space-y-4" v-if="showEmailInput">

                    <template v-if="isFetching">
                        <div class="space-y-2">
                            <Skeleton class="h-4 w-24" />
                            <Skeleton class="h-10 w-full" />
                        </div>
                    </template>

                    <template v-else>
                        <div class="space-y-2">
                            <Label for="email">Email address</Label>
                            <Input
                                id="email"
                                v-model="formData.email"
                                placeholder="example@domain.com"
                                :disabled="isSubmitting"
                                :class="{
                                    'border-red-500': getErrorsByKey(errors, 'email'),
                                }"
                            />
                            <p v-if="getErrorsByKey(errors, 'email')" class="text-sm text-red-500">
                                {{ getErrorsByKey(errors, 'email') }}
                            </p>
                        </div>
                    </template>
                </CardContent>

                <CardFooter class="flex flex-col-reverse sm:flex-row justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        :disabled="isSubmitting || isFetching"
                        @click="handleCancel"
                        class="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        :disabled="isSubmitting || isFetching"
                        class="w-full sm:w-auto"
                    >
                        <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
                        Send reset link
                    </Button>
                </CardFooter>
            </template>
        </Card>
    </form>
</template>

<script setup>
import { Loader2, CheckCircle2Icon} from 'lucide-vue-next'

const router = useRouter();

const props = defineProps({
    errors: {
        type: Object,
        default: () => ({}),
    },
    isSubmitting: {
        type: Boolean,
        default: false,
    },
    isFetching: {
        type: Boolean,
        default: false,
    },
    isSuccess: {
        type: Boolean,
        default: false,
    },
})

const authStore = useAuthStore();
const { isAuthenticated, user } = storeToRefs(authStore);

const emit = defineEmits(['forgot', 'cancel'])

const formData = ref({
    email: user.value?.email || '',
})

const showEmailInput = computed(() => {
    return !isAuthenticated.value || !user.value?.email;
});

const handleSubmit = () => {
    emit('forgot', { ...formData.value })
}

const handleCancel = () => {
    formData.value.email = ''
    
    emit('cancel')
}

const goBack = () => {
    router.push('/');
}
</script>