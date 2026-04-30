<template>
    <div class="min-h-screen flex items-center justify-center bg-background p-4">
        <Card class="w-full max-w-sm">
            <CardHeader>
                <CardTitle class="text-center">Register</CardTitle>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleRegister" class="space-y-4">
                    <div class="space-y-2">
                        <Label for="firstname">First name</Label>
                        <Input
                            id="firstname"
                            v-model="form.firstname"
                            type="text"
                            placeholder="John"
                            :disabled="loading"
                        />
                        <p v-if="getErrorsByKey(errors, 'firstname')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'firstname') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="lastname">Last name</Label>
                        <Input
                            id="lastname"
                            v-model="form.lastname"
                            type="text"
                            placeholder="Doe"
                            :disabled="loading"
                        />
                        <p v-if="getErrorsByKey(errors, 'lastname')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'lastname') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="john@example.com"
                            :disabled="loading"
                        />
                        <p v-if="getErrorsByKey(errors, 'email')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'email') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="••••••••"
                            :disabled="loading"
                        />
                        <p v-if="getErrorsByKey(errors, 'password')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'password') }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            placeholder="••••••••"
                            :disabled="loading"
                        />
                        <p v-if="getErrorsByKey(errors, 'password_confirmation')" class="text-sm text-red-500">
                            {{ getErrorsByKey(errors, 'password_confirmation') }}
                        </p>
                    </div>

                    <Button type="submit" class="w-full" :disabled="loading">
                        <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
                        {{ loading ? 'Loading...' : 'Register' }}
                    </Button>

                    <div class="flex justify-center">
                        <RouterLink :to="{ name: 'login' }" class="text-sm text-muted-foreground hover:underline">
                            Already have an account? Sign in
                        </RouterLink>
                    </div>
                </form>

                <div v-if="error" class="mt-4 text-sm text-destructive text-center">
                    {{ error }}
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup>
import { Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
    firstname: 'jojo',
    lastname: 'jojo',
    email: 'jojotest1@app.com',
    password: 'password',
    password_confirmation: 'password'
})

const loading = ref(false)
const error = ref('')
const errors = ref({})

const handleRegister = async () => {
    loading.value = true
    error.value = ''
    errors.value = {}

    try {
        const response = await authStore.register(form.value)
        console.log(response)
        toast.success({ description: response.data?.message })
        
        router.push({ name: 'login' })
    } catch (err) {
        errors.value = errorsFromResponse(err.response);
    } finally {
        loading.value = false
    }
}
</script>