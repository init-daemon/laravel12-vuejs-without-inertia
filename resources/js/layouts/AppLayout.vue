<template>
    <div class="h-screen flex flex-col">
        <div
            v-if="starting"
            class="flex flex-1 items-center justify-center bg-background"
        >
            <div class="flex flex-col items-center gap-4">
                <Loader2 class="h-8 w-8 animate-spin text-primary" />
                <p class="text-sm text-muted-foreground">Starting...</p>
            </div>
        </div>

        <template v-else>
            <div class="flex flex-1 min-h-0 w-screen overflow-hidden">

                <template v-if="isAuthenticated">

                    <div class="hidden md:block">
                        <Sidebar :collapsed="collapsed" />
                    </div>

                    <transition name="overlay-fade">
                        <div
                            v-if="mobileOpen"
                            class="md:hidden fixed inset-0 z-50"
                        >
                            <div
                                class="absolute inset-0 bg-black/50"
                                @click="closeMobileSidebar"
                            />

                            <transition name="sidebar-slide">
                                <div
                                    class="relative z-50 h-full w-64 bg-sidebar text-sidebar-foreground shadow-xl"
                                >
                                    <Sidebar :collapsed="false" />
                                </div>
                            </transition>
                        </div>
                    </transition>

                </template>

                <div class="flex flex-1 flex-col min-h-0 overflow-y-auto overflow-x-hidden">
                    <Header
                        :collapsed="collapsed"
                        :showSidebarToggle="isAuthenticated"
                        @toggle-sidebar="handleSidebarToggle"
                    />

                    <main class="flex-1">
                        <NotFound v-if="isResourceNotFound" />
                        <InternalServerError v-else-if="isInternalServerError" />
                        <RouterView v-else />
                    </main>
                </div>
            </div>
        </template>

        <Toaster
            position="top-right"
            :closeButton="true"
            :theme="theme"
            richColors
        />
    </div>
</template>

<script setup>
import 'vue-sonner/style.css'
import { ref, onMounted, watch } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Toaster } from 'vue-sonner'

import NotFound from '@/pages/error/NotFound.vue'
import InternalServerError from '@/pages/error/InternalServerError.vue'
import Header from './Header.vue'
import Sidebar from './app/Sidebar.vue'

const authStore = useAuthStore()
const appStore = useAppStore()

const { isAuthenticated } = storeToRefs(authStore)
const { theme, isResourceNotFound, isInternalServerError } = storeToRefs(appStore)

const starting = ref(true)

const collapsed = ref(false)
const mobileOpen = ref(false)

function toggleSidebar() {
    collapsed.value = !collapsed.value
}

function toggleMobileSidebar() {
    mobileOpen.value = !mobileOpen.value
}

function closeMobileSidebar() {
    mobileOpen.value = false
}

function handleSidebarToggle() {
    if (!isAuthenticated.value) return

    if (window.innerWidth < 768) {
        toggleMobileSidebar()
    } else {
        toggleSidebar()
    }
}

watch(mobileOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(async () => {
    await authStore.initAuth().finally(() => {
        starting.value = false
    })
})
</script>

<style>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
    transition: opacity 0.25s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
    opacity: 0;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
    transition: transform 0.3s ease;
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
    transform: translateX(-100%);
}
</style>