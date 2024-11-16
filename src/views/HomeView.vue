<script setup lang="ts">
import ButtonSelector from '@/components/ButtonSelector.vue';
import SettingSlot from '@/components/SettingSlot.vue';
import AddSessionPopUp from '@/components/AddSessionPopUp.vue';
import { ref } from 'vue';
</script>

<template>
  <main class="w-full space-y-4">
    <ButtonSelector />
    <div class="border rounded-lg p-4">
      <h1>Availability</h1>
      <p>Set your weekly recurring schedule</p>
      <SettingSlot />
    </div>
  </main>
</template>
