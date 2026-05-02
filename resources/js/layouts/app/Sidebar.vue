<template>
    <aside
        :class="[
            'h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-hidden',
            collapsed ? 'w-16' : 'w-64'
        ]"
    >
        <div class="h-14 flex items-center px-4 border-b border-sidebar-border cursor-pointer hover:opacity-75 transition-all" @click="() => $router.push('/')">
            <div class="flex items-center gap-2 overflow-hidden">
                <div class="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <LayoutDashboard class="size-4" />
                </div>

                <span v-if="!collapsed" class="font-semibold truncate">
                    MyApp
                </span>
            </div>
        </div>

        <nav class="flex-1 p-2 space-y-1 overflow-y-auto">
            <template
                v-for="(item, i) in menuItems"
                :key="i"
            >
                <RouterLink
                    v-if="!!item.show"
                    :to="item.url"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-sidebar-accent"
                >
                    <component :is="item.icon" class="size-4" />
                    <span v-if="!collapsed">{{ item.title }}</span>
                </RouterLink>
            </template>
        </nav>
    </aside>
</template>

<script setup>
import { Users2, LayoutDashboard } from 'lucide-vue-next'

defineProps({
    collapsed: Boolean,
})

const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore)

const menuItems = computed(() => [
    {
        title: 'Users',
        url: '/admin/users',
        icon: Users2,
        show: isAdmin.value,
    },
])
</script>