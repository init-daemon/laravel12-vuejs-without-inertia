<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Dashboard</h1>
            <div
                v-if="user"
                class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 max-w-md m-auto"
            >
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    User info
                </h2>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-500 dark:text-gray-400">Username :</span>
                        <span class="text-gray-800 dark:text-gray-200">{{ user.name }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500 dark:text-gray-400">Email :</span>
                        <span class="text-gray-800 dark:text-gray-200">{{ user.email }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500 dark:text-gray-400">Create at :</span>
                        <span class="text-gray-800 dark:text-gray-200">
                            {{ userCreatedAt }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';
import { useDateFormat } from '@vueuse/core'


const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userCreatedAt = useDateFormat(user.created_at, 'DD/MM/YYYY')
</script>