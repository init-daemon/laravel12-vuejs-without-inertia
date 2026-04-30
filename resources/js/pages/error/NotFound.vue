<template>
    <Error
        code="404"
        title="Not found"
        message="Oops! Unable to access this resource. It may be unavailable or may have been moved."
    >
        <template #icon>
            <FileQuestion class="h-12 w-12 text-muted-foreground" />
        </template>
    </Error>
</template>

<script setup>
import { FileQuestion } from 'lucide-vue-next'
</script>