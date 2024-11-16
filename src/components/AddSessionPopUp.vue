<template>
    <div class="h-screen w-full bg-black bg-opacity-50 flex items-center justify-center fixed z-10 top-0 left-0">
        <div class="bg-white p-4 rounded-lg w-full max-w-md">
            <p class="font-bold text-lg">Add Slot</p>
            <p class="mt-2">Input Time:</p>
            <select class="px-2 py-1 rounded-lg border" v-model="data.startTime" name="start" id="start">
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
            </select>
            <!-- select input duration 15,30,45,60 min -->
            <p class="mt-2">Input Duration:</p>
            <div class="flex gap-2">
                <select v-model="data.duration" class="border px-2 py-1 rounded-lg w-full" name="duration"
                    id="duration">
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                </select>
                <p>min</p>
            </div>
            <p class="mt-2">No of Booking/Session:</p>
            <!-- input number -->
            <input v-model="data.bookingSlot" class="border px-2 py-1 rounded-lg w-full" type="number" name="capacity"
                id="capacity" />
            <!-- Check box allow video call -->
            <div class="flex gap-2 mt-2">
                <input v-model="data.videoCall" class="border" type="checkbox" name="video" id="video" />
                <label for="video">Allow Video Call</label>
            </div>
            <div class="flex justify-end gap-2 mt-2">
                <button @click="save" class="py-1 px-3 rounded-lg bg-green-300">Save</button>
                <button @click="cancel" class="py-1 px-3 rounded-lg bg-red-300">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTimeSlots, Days } from '@/stores/timeSlot';
import { ref } from 'vue';

const emit = defineEmits();

const slotStore = useTimeSlots();

const props = defineProps<{
    day: Days
}>();

const data = ref<{
    startTime: string,
    duration: number,
    bookingSlot: number,
    videoCall: boolean
}>({
    startTime: '09:00',
    duration: 30,
    bookingSlot: 0,
    videoCall: false,
});

const save = () => {
    console.log(data.value);
    slotStore.addTimeSlot({
        day: props.day,
        startTime: data.value.startTime,
        duration: data.value.duration,
        bookingSlots: data.value.bookingSlot,
        videoCall: data.value.videoCall,
    });
    emit('save', data);
};
const cancel = () => {
    emit('cancel');
};
</script>