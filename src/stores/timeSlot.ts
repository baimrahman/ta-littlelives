import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { computed } from "vue";

export enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export interface ITimeSlot {
  day: Days;
  startTime: string;
  duration: number;
  bookingSlots: number;
  videoCall: boolean;
}

export class TimeSlot {
  id: number;
  day: Days;
  startTime: string;
  duration: number;
  bookingSlots: number;
  videoCall: boolean;

  constructor({
    day,
    startTime,
    duration,
    bookingSlots,
    videoCall,
  }: ITimeSlot) {
    this.id = Math.floor(Math.random() * 1000);
    this.day = day;
    this.startTime = startTime;
    this.duration = duration;
    this.bookingSlots = bookingSlots;
    this.videoCall = videoCall;
  }

  public endTime() {
    const [hours, minutes] = this.startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + Number(this.duration);
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    // add zero if hour is less than 10
    const formattedHours = newHours < 10 ? `0${newHours}` : newHours;
    // add zero if minute is less than 10
    const formattedMinutes = newMinutes < 10 ? `0${newMinutes}` : newMinutes;
    return `${formattedHours}:${formattedMinutes}`;
  }
}

export const useTimeSlots = defineStore("timeslot", () => {
  // fetch local storage
  const timeSlots = ref<TimeSlot[]>([]);

  onMounted(() => {
    const storedTimeSlots = localStorage.getItem("timeSlots");
    if (storedTimeSlots) {
      timeSlots.value = JSON.parse(storedTimeSlots).map(
        (timeSlot: ITimeSlot) => new TimeSlot(timeSlot)
      );
    }
  });

  // change timeslot to { "monday": [timeslot1, timeslot2], "tuesday": [timeslot3] } computed
  const timeSlotsByDay = computed(() => {
    return timeSlots.value.reduce((acc, timeSlot) => {
      if (!acc[timeSlot.day]) {
        acc[timeSlot.day] = [];
      }
      acc[timeSlot.day].push(timeSlot);
      return acc;
    }, {} as Record<Days, TimeSlot[]>);
  });

  // update local storage
  function updateLocalStorage() {
    localStorage.setItem("timeSlots", JSON.stringify(timeSlots.value));
  }

  // add time slot
  function addTimeSlot(timeSlot: ITimeSlot) {
    timeSlots.value.push(new TimeSlot(timeSlot));
    updateLocalStorage();
  }

  // add time slot
  function dupTimeSlot(index: number) {
    const timeSlot = timeSlots.value.find((timeSlot) => timeSlot.id === index);
    timeSlots.value.push(new TimeSlot({
        day: timeSlot!.day,
        startTime: timeSlot!.startTime,
        duration: timeSlot!.duration,
        bookingSlots: timeSlot!.bookingSlots,
        videoCall: timeSlot!.videoCall,
    }));
    updateLocalStorage();
  }

  function removeTimeSlot(index: number) {
    // find the time slot by id
    const timeSlot = timeSlots.value.find((timeSlot) => timeSlot.id === index);
    if (!timeSlot) return;
    // remove the time slot
    timeSlots.value = timeSlots.value.filter(
      (timeSlot) => timeSlot.id !== index
    );
    updateLocalStorage();
  }

  return { timeSlots, timeSlotsByDay, addTimeSlot, dupTimeSlot, removeTimeSlot };
});
