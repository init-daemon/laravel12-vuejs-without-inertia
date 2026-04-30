<template>
    <Error
        code="500"
        title="Internal Server Error"
        message="Oops! Something went wrong on our end. Please try again later."
    >
        <template #icon>
            <ServerCrash class="h-12 w-12 text-muted-foreground" />
        </template>
    </Error>
</template>

<script setup>
import { ServerCrash } from 'lucide-vue-next'
</script>