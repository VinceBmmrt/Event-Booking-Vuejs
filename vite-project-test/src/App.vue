<script setup>
import BookingItem from '@/components/BookingItem.vue';
import EventList from '@/components/EventList.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import { onMounted, ref } from 'vue';

const bookings = ref([]);
const bookingsLoading = ref(false);

const handleRegistration = async (event) => {
  if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('you are already registered for this event');
    return;
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  };

  bookings.value.push(newBooking);

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed',
      }),
    });
    if (response.ok) {
      const index = bookings.value.findIndex((booking) => booking.id === newBooking.id);
      bookings.value[index] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (error) {
    console.log(error);
    bookings.value = findBookingById(newBooking.id);
  }
};

onMounted(() => {
  fetchBookings();
});

const fetchBookings = async () => {
  bookingsLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } finally {
    bookingsLoading.value = false;
  }
};

const cancelBookings = async (bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  } catch (error) {
    console.log(error);
    bookings.value.splice(index, 0, originalBooking);
  }
};

const findBookingById = async (id) => {
  bookings.value.findIndex((booking) => booking.id === id);
};
</script>

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <EventList @register="handleRegistration($event)" />
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!bookingsLoading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @canceled="cancelBookings(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 4" :key="i" />
      </template>
    </section>
  </main>
</template>
