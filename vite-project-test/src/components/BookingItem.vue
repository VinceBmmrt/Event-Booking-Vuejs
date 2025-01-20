<script setup>
import ButtonCustom from '@/components/ButtonCustom.vue';
import { Check, LoaderCircle } from 'lucide-vue-next';
import { computed } from 'vue';
import SectionCard from './SectionCard.vue';

const props = defineProps({
  title: String,
  status: String,
});
const pending = computed(() => props.status === 'pending');
defineEmits(['canceled']);
const icon = computed(() => (pending.value ? LoaderCircle : Check));
</script>

<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ title }}</div>
        <div>
          <component :is="icon" :class="{ 'animate-spin': pending }" />
        </div>
      </div>

      <ButtonCustom variant="danger" @click="$emit('canceled')">Cancel</ButtonCustom>
    </div>
  </SectionCard>
</template>
