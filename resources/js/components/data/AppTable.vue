<template>
    <div class="flex flex-col">
        <div class="flex items-center py-4 gap-4 flex-wrap md:flex-row flex-col justify-end">
            <div class="flex-1">
                <slot name="filters" />
            </div>

            <div class="flex items-center justify-end flex-row flex-wrap gap-2">
                <div class="flex items-center gap-2">
                    <Select
                        :model-value="perPage"
                        @update:model-value="onPerPageChange"
                    >
                        <SelectTrigger class="w-fit gap-2">
                            <span class="text-sm">Per page</span> <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem
                                v-for="size in perPageOptions"
                                :key="size"
                                :value="size"
                            >
                                {{ size }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" class="ml-auto">
                            Columns <ChevronDown class="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            v-for="column in table.getAllColumns().filter(c => c.getCanHide())"
                            :key="column.id"
                            class="capitalize"
                            :model-value="column.getIsVisible()"
                            @update:model-value="column.toggleVisibility(!!$event)"
                        >
                            {{ column.columnDef.header || column.id }}
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div class="rounded-md border relative">
            <div class="overflow-auto">
                <Table class="">
                    <TableHeader>
                        <TableRow
                            v-for="headerGroup in table.getHeaderGroups()"
                            :key="headerGroup.id"
                        >
                            <TableHead
                                v-for="header in headerGroup.headers"
                                :key="header.id"
                            >
                                <FlexRender
                                    v-if="!header.isPlaceholder"
                                    :render="header.column.columnDef.header"
                                    :props="header.getContext()"
                                />
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <template v-if="data.length > 0">
                            <TableRow
                                v-for="row in table.getRowModel().rows"
                                :key="row.id"
                            >
                                <TableCell
                                    v-for="cell in row.getVisibleCells()"
                                    :key="cell.id"
                                >
                                    <FlexRender
                                        :render="cell.column.columnDef.cell"
                                        :props="cell.getContext()"
                                    />
                                </TableCell>
                            </TableRow>
                        </template>

                        <template v-else>
                            <TableRow>
                                <TableCell
                                    :colspan="columns.length"
                                    class="h-24 text-center"
                                >
                                    No data.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <div
                v-if="loading"
                class="absolute inset-0 bg-white/70 dark:bg-black/70 flex items-center justify-center z-10"
            >
                <div class="flex flex-col items-center gap-2">
                    <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span class="text-sm text-muted-foreground">
                        Loading...
                    </span>
                </div>
            </div>
        </div>

        <div class="bg-background">
            <div class="flex items-center justify-end gap-4 py-4 flex-wrap px-2">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            :disabled="currentPage <= 1"
                            @click="previousPage"
                        >
                            Prev
                        </Button>

                        <span class="mx-2 text-sm">
                            Page {{ currentPage }} / {{ totalPages }}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            :disabled="currentPage >= totalPages"
                            @click="nextPage"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const props = defineProps({
    data: {
        type: Array, default: () => []
    },
    total: {
        type: Number,
        default: 0
    },
    currentPage: {
        type: Number,
        default: 1
    },
    perPage: {
        type: Number,
        default: 10
    },
    columns: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    perPageOptions: {
        type: Array,
        default: () => [2, 10, 25, 50, 100, 250],
    }
})

const emit = defineEmits(['update:currentPage', 'update:perPage']);

const reactiveData = computed(() => {
    return props.data;
})

const table = useVueTable({
    data: reactiveData,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
})

const totalPages = computed(() => {
    return Math.ceil(props.total / props.perPage) || 1;
})

const previousPage = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
    }
}

const nextPage = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1);
    }
}

const onPerPageChange = (value) => {
    emit('update:perPage', value);
    emit('update:currentPage', 1);
}
</script>