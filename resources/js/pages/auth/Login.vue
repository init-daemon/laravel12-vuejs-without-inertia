<template>
    <div class="min-h-screen flex items-center justify-center bg-background p-4">
        <Card class="w-full max-w-sm">
            <CardHeader>
                <CardTitle class="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            v-model="credentials.email"
                            type="email"
                            placeholder="exemple@email.com"
                            :disabled="loading"
                            autocomplete="email"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            v-model="credentials.password"
                            type="password"
                            placeholder="••••••••"
                            :disabled="loading"
                            autocomplete="current-password"
                        />
                    </div>

                        <Button type="submit" class="w-full" :disabled="loading">
                        <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
                        {{ loading ? 'Connexion...' : 'Se connecter' }}
                    </Button>
                </form>

                <div v-if="error" class="mt-4 text-sm text-destructive text-center">
                    {{ error }}
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from '@/composables/useToast'
import { Loader2 } from 'lucide-vue-next'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const credentials = ref({
    email: 'test@example.com',
    password: 'password',
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
    loading.value = true
    error.value = ''

    try {
        await authStore.login({
            email: credentials.value.email,
            password: credentials.value.password,
        })
        router.push({ name: 'dashboard' })
    } catch (err) {
        const message =
            err.response?.data?.message || 'Error.'
        error.value = message
        toast.error({ description: message })
    } finally {
        loading.value = false
    }
}
</script>