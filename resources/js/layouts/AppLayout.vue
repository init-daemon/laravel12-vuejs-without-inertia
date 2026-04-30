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
            <NotFound v-if="isResourceNotFound"/>
            <InternalServerError v-else-if="isInternalServerError" />
            <RouterView v-else />
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
import { Toaster } from 'vue-sonner'
import NotFound from '@/pages/error/NotFound.vue'
import InternalServerError from '@/pages/error/InternalServerError.vue'
import Header from './Header.vue'

const authStore = useAuthStore()
const starting = ref(true)

const appStore = useAppStore();
const { theme, isResourceNotFound, isInternalServerError } = storeToRefs(appStore);

onMounted(async () => {
    await authStore.initAuth().finally(() => {
        starting.value = false
    })
})
</script>