import { ref } from 'vue';

const bookings = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchBookings = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('http://localhost:3001/bookings');
      bookings.value = await response.json();
    } catch (e) {
        error.value = e;
    } finally {
        loading.value = false;
    }
  };

  const findBookingById = async (id) => {
    bookings.value.findIndex((booking) => booking.id === id);
  };

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

export default function useBookings(){

    return {
        bookings,
        loading,
        error,
        fetchBookings,
        handleRegistration,
        cancelBookings
    };
}