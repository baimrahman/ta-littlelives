<template>
    <div class="border rounded-lg p-1 space-x-2">
        <button v-for="label in labels" @click="select(label)" class="py-1 px-3 rounded-lg"
            :class="selected === label ? 'bg-green-400' : 'bg-gray-300'">{{ label.toUpperCase() }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const labels = ['setting', 'calendar']

const selected = ref<string | null>('calendar')
// make emit available to the template
const emit = defineEmits()

const select = (value: string) => {
    selected.value = value
    emit('select', value)
}
</script>