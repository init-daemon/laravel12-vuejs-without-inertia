<template>
    <Card class="mx-auto w-full max-w-md shadow-lg">
        <CardHeader class="flex flex-row items-center gap-4">
            <Avatar class="h-16 w-16">
                <AvatarFallback>
                    {{ initials }}
                </AvatarFallback>
            </Avatar>
            <div>
                <CardTitle class="text-xl">
                    {{ user.fullname }}
                </CardTitle>
                <CardDescription>
                    @{{ user.username || 'utilisateur' }}
                </CardDescription>
            </div>
        </CardHeader>

        <CardContent class="space-y-4">
            <div class="grid gap-3">
                <div class="flex items-center gap-2 text-sm">
                    <Mail class="h-4 w-4 text-muted-foreground" />
                    <span>{{ user.email || 'Non renseigné' }}</span>
                </div>

                <div class="flex items-center gap-2 text-sm">
                    <UserCircle class="h-4 w-4 text-muted-foreground" />
                    <Badge :variant="isAdmin ? 'default' : 'secondary'">
                        {{ userRole }}
                    </Badge>
                </div>
            </div>

            <div class="pt-2">
                <div class="flex gap-2 flex-row-reverse">
                    <RouterLink :to="{ name: 'profile.edit' }">
                        <Button variant="outline" size="sm" class="w-full gap-2">
                            <Pencil class="h-4 w-4" />
                            Edit
                        </Button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'profile.edit', hash: '#update-password' }">
                        <Button variant="outline" size="sm" class="w-full gap-2">
                            <Shield class="h-4 w-4" />
                            Password
                        </Button>
                    </RouterLink>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup>
import { Mail, UserCircle, Pencil, Shield } from 'lucide-vue-next'

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
})

const initials = computed(() => getInitials(props.user.fullname))

const isAdmin = computed(() => props.user.type === 'admin')
const userRole = computed(() => (isAdmin.value ? 'Admin' : 'User'))
</script>