<template>
    <UserProfile
        class="mt-10"
        :user="user"
    />
</template>
<script setup>
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>