<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <Card id="password">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Update your password securely
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
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-32" />
                        <Skeleton class="h-10 w-full" />
                    </div>
                </template>

                <template v-else>
                    <div class="space-y-2">
                        <Label for="current_password">Current Password</Label>
                        <Input
                            id="current_password"
                            v-model="formData.current_password"
                            type="password"
                            :disabled="isSubmitting"
                            :class="{
                                'border-red-500': getErrorsByKey(errors, 'current_password'),
                            }"
                        />
                        <p v-if="getErrorsByKey(errors, 'current_password')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'current_password') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password">New Password</Label>
                        <Input
                            id="password"
                            v-model="formData.password"
                            type="password"
                            :disabled="isSubmitting"
                            :class="{
                                'border-red-500': getErrorsByKey(errors, 'password'),
                            }"
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
                            :class="{
                                'border-red-500': getErrorsByKey(errors, 'password_confirmation'),
                            }"
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
                    @click="$router.back()"
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
})

const emit = defineEmits(['updated'])

const formData = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
})

const handleSubmit = () => {
    emit('updated', { ...formData.value });
}
</script>