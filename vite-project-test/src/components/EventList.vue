<script setup>
import EventCard from '@/components/EventCard.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import SectionCard from '@/components/SectionCard.vue';
import { onMounted, ref } from 'vue';
import ButtonCustom from './ButtonCustom.vue';

defineEmits(['register']);

const events = ref([]);
const loading = ref(false);
const error = ref(null);
const fetchEvents = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
    error.value = null;
  }
};

onMounted(() => {
  fetchEvents();
});
</script>

<template>
  <template v-if="error">
    <SectionCard>
      <div class="space-y-4 items-center flex flex-col">
        <div class="text-red-500">Could not load events at the moment please try again</div>

        <ButtonCustom @click="fetchEvents">Retry Now</ButtonCustom>
      </div>
    </SectionCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <template v-if="!loading">
        <template v-if="events.length">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :when="event.date"
            :description="event.description"
            @register="$emit('register', event)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">There is no event to display</div>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>
