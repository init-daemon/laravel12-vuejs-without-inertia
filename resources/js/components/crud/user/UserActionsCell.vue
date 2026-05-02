<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="h-8 w-8 p-0">
				<span class="sr-only">Open</span>
				<MoreHorizontal class="h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>
			<DropdownMenuItem @click="$emit('edit')">
				<UserCog class="mr-2 h-4 w-4" />
				Edit
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="$emit('delete')" class="text-destructive">
				<Trash2 class="mr-2 h-4 w-4" />
				Delete
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup>
import { MoreHorizontal, UserCog, Trash2 } from 'lucide-vue-next';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

defineEmits(['edit', 'delete']);
</script>