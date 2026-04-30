<template>
    <div class="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div class="mx-auto max-w-md text-center">
            <div class="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <FileQuestion class="h-12 w-12 text-muted-foreground" />
            </div>

            <h1 class="text-7xl font-extrabold tracking-tight text-primary">404</h1>

            <h2 class="mt-6 text-2xl font-semibold">Not found</h2>

            <p class="mt-3 text-muted-foreground">
                Oops! Unable to access this resource. It may be unavailable or may have been moved.
            </p>

            <div class="mt-8">
                <RouterLink to="/" @click="isNotFound = false">
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
import { FileQuestion, Home } from 'lucide-vue-next'

const appStore = useAppStore()
const { isNotFound } = storeToRefs(appStore)
</script>