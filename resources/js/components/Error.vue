<template>
    <div class="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div class="mx-auto max-w-md text-center">
            <div class="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-muted" v-if="$slots.icon">
                <slot name="icon"></slot>
            </div>

            <h1 class="text-7xl font-extrabold tracking-tight text-primary">{{ code }}</h1>

            <h2 class="mt-6 text-2xl font-semibold text-destructive">{{ title }}</h2>

            <p class="mt-3 text-muted-foreground">
                {{ message }}
            </p>

            <div class="mt-8">
                <RouterLink to="/" @click="goBack">
                    <Button size="lg" class="gap-2">
                        <Home class="h-4 w-4" />
                        Back
                    </Button>
                </RouterLink>
            </div>
        </div>
  </div>
</template>

<script setup>
import { Home } from 'lucide-vue-next'

const props = defineProps({
    code: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

const appStore = useAppStore()

const goBack = () => {
    appStore.resetError();
}
</script>