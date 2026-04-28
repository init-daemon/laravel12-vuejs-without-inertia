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
                    @click="appStore.toggleTheme"
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
                                        {{ getInitials(user.fullname) }}
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
                            <DropdownMenuItem @click="() => router.push({ name: 'profile' })">
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
import {
    Home,
    Sun,
    Moon,
    User,
    LogOut,
} from 'lucide-vue-next'

const router = useRouter()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore);

const appStore = useAppStore();
const { theme } = storeToRefs(appStore);


async function handleLogout() {
    await authStore.logout()
    
	router.push({ name: 'login' })
}
</script>