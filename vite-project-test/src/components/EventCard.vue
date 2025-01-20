  <script setup>
  import ButtonCustom from "@/components/ButtonCustom.vue";
import SectionCard from "./SectionCard.vue";
  defineProps({
    title: String,
    when: String,
    description: String
  });
  defineEmits(['register']);
  </script>
  
<template>
    <SectionCard>
      <template #header>{{ title }}</template>
      {{ when }}
      <template #footer>
        <div class="space-y-4">
            <p>{{ description }}</p>
            <div class="flex justify-end">
                <ButtonCustom @click="$emit('register')">
                Register
                </ButtonCustom>
            </div>
        </div>
      </template>
     
    </SectionCard>
  </template>
  