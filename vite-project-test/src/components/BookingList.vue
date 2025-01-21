<script setup>
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import useBookings from '@/composables/useBookings';
import { onMounted } from 'vue';
import ErrorCard from './ErrorCard.vue';

const {bookings, loading, error, fetchBookings, cancelBookings} = useBookings();

onMounted(() => {
  fetchBookings();
});

</script>

<template>
    <template v-if="error">
        <ErrorCard :retry="fetchBookings">Could not fetch bookings</ErrorCard>
    </template>
    <template v-else>
        <section class="grid grid-cols-1 gap-4">
             <template v-if="!loading">
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
    </template>
</template>