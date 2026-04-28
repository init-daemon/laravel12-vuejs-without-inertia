<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                    Update your personal information
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <template v-if="isFetching">
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-20" />
                        <Skeleton class="h-10 w-full" />
                    </div>
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-20" />
                        <Skeleton class="h-10 w-full" />
                    </div>
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-20" />
                        <Skeleton class="h-10 w-full" />
                    </div>
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-20" />
                        <Skeleton class="h-10 w-full" />
                    </div>
                </template>

                <template v-else>
                    <div class="space-y-2">
                        <Label for="firstname">First name</Label>
                        <Input
                            id="firstname"
                            v-model="formData.firstname"
                            type="text"
                            placeholder="John"
                            :disabled="isSubmitting"
                            :class="{
                                'border-red-500': getErrorsByKey(errors, 'firstname'),
                            }"
                        />
                        <p v-if="getErrorsByKey(errors, 'firstname')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'firstname') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="lastname">Last name</Label>
                        <Input
                            id="lastname"
                            v-model="formData.lastname"
                            type="text"
                            placeholder="Doe"
                            :disabled="isSubmitting"
                            :class="{
                                'border-red-500': getErrorsByKey(errors, 'lastname'),
                            }"
                        />
                        <p v-if="getErrorsByKey(errors, 'lastname')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'lastname') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="username">Username</Label>
                        <Input
                            id="username"
                            v-model="formData.username"
                            type="text"
                            placeholder="johndoe"
                            :disabled="isSubmitting"
                            :class="{
                                'border-red-500': getErrorsByKey(errors, 'username'),
                            }"
                        />
                        <p v-if="getErrorsByKey(errors, 'username')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'username') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            v-model="formData.email"
                            type="email"
                            placeholder="john@example.com"
                            :disabled="true"
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
                    Save changes
                </Button>
            </CardFooter>
        </Card>
    </form>
</template>

<script setup>
import { Loader2 } from 'lucide-vue-next'

const props = defineProps({
    user: {
        type: Object,
        required: true,
        default: () => ({}),
    },
    errors: {
        type: Object,
        required: false,
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

const formData = ref({})

const handleSubmit = () => {
    emit('updated', { ...formData.value })
}

watch(
    () => props.user,
    (newUser) => {
        formData.value = {
            firstname: newUser?.firstname ?? '',
            lastname: newUser?.lastname ?? '',
            username: newUser?.username ?? '',
            email: newUser?.email ?? '',
        }
    },
    { immediate: true }
)
</script>