<script setup lang="ts">
import { type Ref, ref } from 'vue'
// import { cn } from '@/utils'
import {
  SidebarInset,
} from '@/components/ui/sidebar'
import { Check, ChevronsUpDown, Search, CalendarIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header.vue';

import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from '@/components/ui/combobox'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { DateRange } from 'reka-ui'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/utils'

const frameworks = [
  { value: 'Cha', label: 'Cha' },
  { value: 'Ally', label: 'Ally' }
]

const invoices = [
  {
    invoice: 'June 1, 2025',
    paymentStatus: '8:00 AM',
    totalAmount: '5:00 PM',
    paymentMethod: '5:00 PM',
  },
  {
    invoice: 'June 2, 2025',
    paymentStatus: '8:00 AM',
    totalAmount: '5:00 PM',
    paymentMethod: '5:00 PM',
  },
  {
    invoice: 'June 3, 2025',
    paymentStatus: '8:00 AM',
    totalAmount: '5:00 PM',
    paymentMethod: '5:00 PM',
  },
  {
    invoice: 'June 4, 2025',
    paymentStatus: '8:00 AM',
    totalAmount: '5:00 PM',
    paymentMethod: '5:00 PM',
  },
  {
    invoice: 'June 5, 2025',
    paymentStatus: '8:00 AM',
    totalAmount: '5:00 PM',
    paymentMethod: '5:00 PM',
  }
]

const value = ref<typeof frameworks[0]>()

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const valueDate = ref({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>
</script>

<template>
    <SidebarInset>
        <Header />

        <div class="flex flex-col gap-4 p-4">
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

        <div class="flex justify-end gap-2 p-4">
                <Popover>
                    <PopoverTrigger as-child>
                        <Button variant="outline" :class="cn(
                            'w-[280px] justify-start text-left font-normal',
                            !value && 'text-muted-foreground',
                        )">
                            <CalendarIcon class="mr-2 h-4 w-4" />
                            <template v-if="valueDate.start">
                                <template v-if="valueDate.end">
                                    {{ df.format(valueDate.start.toDate(getLocalTimeZone())) }} - {{
                                        df.format(valueDate.end.toDate(getLocalTimeZone())) }}
                                </template>

                                <template v-else>
                                    {{ df.format(valueDate.start.toDate(getLocalTimeZone())) }}
                                </template>
                            </template>
                            <template v-else>
                                Pick a date
                            </template>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0">
                        <RangeCalendar v-model="valueDate" initial-focus :number-of-months="2"
                            @update:start-value="(startDate) => valueDate.start = startDate" />
                    </PopoverContent>
                </Popover>
                <Button>Run Payroll</Button>
            </div>

        <div class="flex flex-col gap-4 p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Date
                        </TableHead>
                        <TableHead>Time In</TableHead>
                        <TableHead>Time Out</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                        <TableCell class="font-medium">
                            {{ invoice.invoice }}
                        </TableCell>
                        <TableCell>{{ invoice.paymentStatus }}</TableCell>
                        <TableCell>{{ invoice.paymentMethod }}</TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </SidebarInset>
</template>
