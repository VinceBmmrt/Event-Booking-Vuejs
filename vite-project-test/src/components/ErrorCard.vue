<script setup>
import SectionCard from '@/components/SectionCard.vue';
import ButtonCustom from './ButtonCustom.vue';

defineProps({
    retry: {
        type : Function,
        required : false
    }
})

</script>


<template>
  <SectionCard>
      <div class="space-y-4 items-center flex flex-col">
        <div class="text-red-500">
            <slot></slot>
        </div>
        <ButtonCustom @click="retry" v-if="retry">Retry Now</ButtonCustom>
      </div>
    </SectionCard>
</template>