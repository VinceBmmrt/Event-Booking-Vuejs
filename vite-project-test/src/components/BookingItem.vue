  <script setup>
  import ButtonCustom from "@/components/ButtonCustom.vue";
import SectionCard from "./SectionCard.vue";

defineProps({
  title : String,
})
  </script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div> {{title}}</div>
      <ButtonCustom variant="danger">Cancel</ButtonCustom>
    </div>
  </SectionCard>
  </template>
  