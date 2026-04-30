<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <Card id="password">
            <template v-if="isSuccess">
                <CardContent class="pt-6">
                    <Alert variant="success">
                        <CheckCircle2Icon class="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription class="flex flex-col gap-4">
                            <p>Your password has been updated successfully.</p>
                            <Button type="button" variant="outline" @click="canceled">
                                Back
                            </Button>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </template>

            <template v-else>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        Reset your password securely.
                    </CardDescription>
                </CardHeader>

                <CardContent class="space-y-4">
                    <template v-if="isFetching">
                        <div class="space-y-2">
                            <Skeleton class="h-4 w-32" />
                            <Skeleton class="h-10 w-full" />
                        </div>
                        <div class="space-y-2">
                            <Skeleton class="h-4 w-32" />
                            <Skeleton class="h-10 w-full" />
                        </div>
                    </template>

                    <template v-else>
                        <div class="space-y-2">
                            <Label for="password">New Password</Label>
                            <Input
                                id="password"
                                v-model="formData.password"
                                type="password"
                                :disabled="isSubmitting"
                                :class="{ 'border-red-500': getErrorsByKey(errors, 'password') }"
                            />
                            <p v-if="getErrorsByKey(errors, 'password')" class="text-sm text-red-500">
                                {{ getErrorsByKey(errors, 'password') }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                v-model="formData.password_confirmation"
                                type="password"
                                :disabled="isSubmitting"
                                :class="{ 'border-red-500': getErrorsByKey(errors, 'password_confirmation') }"
                            />
                            <p v-if="getErrorsByKey(errors, 'password_confirmation')" class="text-sm text-red-500">
                                {{ getErrorsByKey(errors, 'password_confirmation') }}
                            </p>
                        </div>
                    </template>
                </CardContent>

                <CardFooter class="flex flex-col-reverse sm:flex-row justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        :disabled="isSubmitting || isFetching"
                        @click="canceled"
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
                        Update Password
                    </Button>
                </CardFooter>
            </template>
        </Card>
    </form>
</template>

<script setup>
import { Loader2 } from 'lucide-vue-next'

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
        default: false
    }
})

const emit = defineEmits(['reset','cancel'])

const formData = ref({
    password: '',
    password_confirmation: '',
});

const canceled = () => {
    emit('cancel');
}

const handleSubmit = () => {
    emit('reset', { ...formData.value });
}
</script>