<template>
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 items-center justify-between px-4 m-auto">
            <router-link to="/" class="flex items-center gap-2 font-semibold">
                <Home class="h-5 w-5" />
                <span class="hidden sm:inline-block">MyApp</span>
            </router-link>

            <div class="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    @click="toggleTheme"
                    aria-label="Basculer le thème"
                >
                    <Sun v-if="theme === 'dark'" class="h-5 w-5" />
                    <Moon v-else class="h-5 w-5" />
                </Button>

                <template v-if="authStore.isAuthenticated && user">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                                <Avatar>
                                    <AvatarImage :src="user.avatar" :alt="user.name" />
                                    <AvatarFallback>
                                        {{ getInitials(user.name) }}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56" align="end">
                            <DropdownMenuLabel>
                                <div class="flex flex-col space-y-1">
                                    <p class="text-sm font-medium leading-none">{{ user.name }}</p>
                                    <p class="text-xs leading-none text-muted-foreground">{{ user.email }}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="() => console.log('profile')">
                                <User class="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="handleLogout" class="text-destructive">
                                <LogOut class="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </template>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useTheme } from '@/composables/useAppearance'
import {
    Home,
    Sun,
    Moon,
    User,
    LogOut,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { storeToRefs } from 'pinia'

const router = useRouter()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore);

const { theme, toggleTheme } = useTheme();


function getInitials(name) {
    if (!name) return ''

    const names = name.trim().split(' ')
    if (names.length === 1) return names[0].charAt(0).toUpperCase()

    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
}

async function handleLogout() {
    await authStore.logout()
    
	router.push({ name: 'login' })
}
</script>