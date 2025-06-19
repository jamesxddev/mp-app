<script setup lang="ts">
import { ref } from 'vue'
// import { cn } from '@/utils'
import {
  SidebarInset,
} from '@/components/ui/sidebar'
import { Check, ChevronsUpDown, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header.vue';

import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from '@/components/ui/combobox'

const frameworks = [
  { value: 'Cha', label: 'Cha' },
  { value: 'Ally', label: 'Ally' }
]

const value = ref<typeof frameworks[0]>()
</script>

<template>
    <SidebarInset>
        <Header />

        <div class="flex flex-1 flex-col gap-4 p-4">
            <div>
                <Combobox v-model="value" by="label">
                    <ComboboxAnchor as-child>
                        <ComboboxTrigger as-child>
                            <Button variant="outline" class="justify-between">
                                {{ value?.label ?? 'Select User' }}

                                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </ComboboxTrigger>
                    </ComboboxAnchor>

                    <ComboboxList>
                        <div class="relative w-full max-w-sm items-center">
                            <ComboboxInput class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
                                placeholder="Select User" />
                            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                                <Search class="size-4 text-muted-foreground" />
                            </span>
                        </div>

                        <ComboboxEmpty>
                            No framework found.
                        </ComboboxEmpty>

                        <ComboboxGroup>
                            <ComboboxItem v-for="framework in frameworks" :key="framework.value" :value="framework">
                                {{ framework.label }}

                                <ComboboxItemIndicator>
                                    <!-- <Check :class="cn('ml-auto h-4 w-4')" /> -->
                                </ComboboxItemIndicator>
                            </ComboboxItem>
                        </ComboboxGroup>
                    </ComboboxList>
                </Combobox>
            </div>
        </div>
    </SidebarInset>
</template>
