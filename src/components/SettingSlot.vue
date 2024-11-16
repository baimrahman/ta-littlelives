<script setup lang="ts">
import { useTimeSlots } from '@/stores/timeSlot';
import AddSessionPopUp from './AddSessionPopUp.vue';
import { onMounted, ref } from 'vue';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

const emit = defineEmits();
const addSlotShow = ref(false);

const slotStore = useTimeSlots();

const handleSave = (data: {
  startTime: string,
  duration: number,
  bookingSlot: number,
  videoCall: boolean
}) => {
  addSlotShow.value = false;
  emit('save', data);
};
const handleCancel = () => {
  addSlotShow.value = false;
};

const selectedDay = ref('Monday');

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const availableDays = ref([false, false, false, false, false, false, false]);

onMounted(() => {
  days.forEach((day, index) => {
    availableDays.value[index] = slotStore.timeSlotsByDay[day] ? true : false;
  });
});

const changeDay = (day: string) => {
  if (!slotStore.timeSlotsByDay[day]) {
    selectedDay.value = day;
    addSlotShow.value = true;
  }
};
</script>

<template>
  <div v-for="day in days" class="gap-6 mt-4 p-2 rounded-lg border-b">
    <div class="flex gap-2">
      <div class="space-x-4 w-1/3">
        <input v-model="availableDays[days.findIndex((v: string) => v === day)]" :disabled="availableDays[days.findIndex((v: string) => v === day)]" @change="changeDay(day)" type="checkbox" />
        <label>{{ day }}</label>
      </div>
      <div class="w-2/3">
        <div v-if="slotStore.timeSlotsByDay[day]" v-for="sess in slotStore.timeSlotsByDay[day]"
          class="w-full border-b mb-4 p-0.5">
          <div class="flex justify-between">
            <div class="flex gap-2 items-center">
              <select class="px-2 py-1 rounded-lg border" v-model="sess.startTime" name="start" id="start">
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
              </select>
              <p>-</p>
              <p>{{ sess.endTime() }}</p>
            </div>
            <div class="space-x-4">
              <button @click="slotStore.removeTimeSlot(sess.id)">Delete</button>
              <button @click="slotStore.dupTimeSlot(sess.id)">Copy</button>
              <button @click="addSlotShow = true; selectedDay = day">Add</button>
            </div>
          </div>
        </div>
        <div v-else>Unavailable</div>
      </div>
    </div>
  </div>
  <AddSessionPopUp :day="selectedDay" v-if="addSlotShow" @save="handleSave" @cancel="handleCancel" />
</template>
