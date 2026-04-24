<template>
    <div class="min-h-screen flex flex-col">
        <div
            v-if="starting"
            class="flex flex-1 items-center justify-center bg-background"
        >
            <div class="flex flex-col items-center gap-4">
                <Loader2 class="h-8 w-8 animate-spin text-primary" />

                <p class="text-sm text-muted-foreground">
                    Starting...
                </p>
            </div>
        </div>

        <template
            v-else
        >
            <Header />
            <RouterView />
        </template>

        <Toaster
            position="top-right"
            closeButton="true"
            :theme="theme"
            richColors
        />
    </div>
</template>

<script setup>
import 'vue-sonner/style.css'

import { Loader2 } from 'lucide-vue-next'
import Header from './Header.vue'

const authStore = useAuthStore()
const starting = ref(true)
const { theme } = useTheme()

onMounted(async () => {
    await authStore.initAuth().finally(() => {
        starting.value = false
    })
})
</script>