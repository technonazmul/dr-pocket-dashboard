<template>
  <div class="main-wrapper">
    <Header></Header>
    <div class="page-wrapper">
      <div class="ms-5 mt-5">
        <div class="row">
          <div class="col-2">
            Selected Doctor: <br />
            <div class="card">
              <i
                class="fas fa-user-md mt-5"
                style="font-size: 100px; margin: 0 auto"
              ></i>
              <div class="card-body">
                <h5 class="card-title">{{ doctor.name }}</h5>
                <p class="card-text">
                  {{ doctor.qualifications }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-2">
            <form @submit.prevent="searchUser">
              <div class="row">
                <div class="col-12">
                  <div class="form-heading">
                    <h4>Search User By Phone</h4>
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-block local-forms">
                    <input
                      v-model="search.phone"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>

                <div class="col-12">
                  <div class="doctor-submit text-start">
                    <button
                      type="submit"
                      class="btn btn-primary submit-form me-2"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div
            class="col-2"
            v-for="singleUser in searchedUsers"
            :key="singleUser._id"
          >
            <div class="card">
              <i
                class="fa-solid fa-user mt-3"
                style="font-size: 50px; margin: 0 auto"
              ></i>
              <div class="card-body text-center mb-3">
                <h5 class="card-title">{{ singleUser.name }}</h5>
                <p class="card-text">
                  {{ singleUser.phone }}
                  <br />
                  <button
                    :class="{
                      'btn btn-outline-primary':
                        selectedUserId !== singleUser._id,
                      'btn btn-primary': selectedUserId === singleUser._id,
                    }"
                    @click.prevent="selelctUser(singleUser._id)"
                  >
                    <span v-if="selectedUserId === singleUser._id">
                      User Selected <i class="fa-solid fa-check"></i>
                    </span>
                    <span v-else> Select User </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedUserId">
        <h5 class="ms-5 mt-5">Select Appointment Time</h5>
        <div class="ms-5" v-for="(slots, day) in nextThreeDaysSlots" :key="day">
          <span>{{ day }}:</span>
          <div>
            <a
              href="#"
              :class="[
                'btn',
                'm-3',
                {
                  'btn-outline-primary': !slot.isBooked,
                  'btn-secondary': slot.isBooked,
                  'disabled-slot': slot.isBooked,
                  active: activeSlot === `slot-${day}-${slot.slot}`,
                },
              ]"
              v-for="(slot, index) in slots"
              :key="index"
              @click.prevent="!slot.isBooked && handleSlotClick(day, slot.slot)"
              :disabled="slot.isBooked"
            >
              {{ slot.slot }}
            </a>
          </div>
        </div>
      </div>

      <button
        class="btn btn-primary form-control m-5"
        @click.prevent="submitBookingInfo()"
        v-if="selectedUserId && doctor._id && activeSlot"
      >
        Book
      </button>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import axios from "axios";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },

  data() {
    return {
      doctor: "",
      users: "",
      searchedUsers: "",
      nextDayDate: "",
      selectedSlot: "",
      bookedSlots: [],
      search: {
        phone: "",
      },
      selectedUserId: null,
      activeSlot: null, // To keep track of the active slot
      timeSlots: {
        Saturday: [""],
        Sunday: [""],
        Monday: [""],
        Tuesday: [""],
        Wednesday: [""],
        Thursday: [""],
        Friday: [""],
      },
    };
  },
  async mounted() {
    // Get the doctor data based on the ID.
    this.doctorId = this.$route.params.id;

    // Fetch the doctor data based on ID
    if (this.doctorId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/backend/doctor/${this.doctorId}`
        );
        this.doctor = response.data;
      } catch (error) {
        console.error("Error getting doctor data", error);
        alert("Something went wrong.");
      }
    }

    // Fetch booked slots for the doctor (for today and future dates)
    try {
      const bookedSlotsResponse = await axios.get(
        `http://localhost:5000/api/backend/booked-slots/${this.doctorId}`
      );
      this.bookedSlots = bookedSlotsResponse.data;
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }

    try {
      // Fetch users
      const users = await axios.get("http://localhost:5000/api/backend/users");
      this.users = users.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  computed: {
    nextThreeDaysSlots() {
      if (!this.doctor || !this.doctor.timeSlots) {
        return {}; // Return an empty object if timeSlots is not yet defined
      }

      const today = new Date();
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let nextThreeDays = {};

      for (let i = 0; i <= 3; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const dayName = daysOfWeek[nextDay.getDay()];
        if (this.doctor.timeSlots[dayName]) {
          nextThreeDays[dayName] = this.doctor.timeSlots[dayName]
            .filter((slot) => !this.isPastSlot(slot, nextDay))
            .map((slot) => ({
              slot,
              isBooked: this.isSlotBooked(slot, nextDay), // Mark if slot is booked
            }));
        }
      }

      return nextThreeDays;
    },
  },

  methods: {
    handleSlotClick(day, slot) {
      // Create a unique identifier for each slot
      this.activeSlot = `slot-${day}-${slot}`;
      this.nextDayDate = this.getNextDayDate(day);
      this.selectedSlot = slot;

      console.log(
        this.nextDayDate,
        day,
        this.selectedSlot,
        this.$route.params.id,
        this.selectedUserId
      );
    },
    async searchUser() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/backend/usersearch/",
          {
            params: this.search,
          }
        );
        this.searchedUsers = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    isPastSlot(slot, date) {
      const [startTime] = slot.split("-");
      const slotTime = this.convertTo24HourFormat(startTime);
      const now = new Date();

      // Check if it's the current day and the slot has passed
      if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        return now >= slotTime;
      }

      return false; // For future days, we don't filter out any slots
    },
    convertTo24HourFormat(time) {
      const [hoursMinutes, modifier] = time.split(/(AM|PM)/);
      let [hours, minutes] = hoursMinutes.split(":");
      if (modifier === "PM" && hours !== "12") {
        hours = parseInt(hours) + 12;
      }
      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }
      const date = new Date();
      date.setHours(hours, minutes);
      return date;
    },
    selelctUser(userId) {
      this.selectedUserId = userId;
    },
    async submitBookingInfo() {
      if (!this.activeSlot || !this.selectedUserId || !this.doctor._id) {
        alert("Please select all the required fields.");
        return;
      }
      const bookingData = {
        date: this.nextDayDate, // The next occurrence of the selected day
        slot: this.selectedSlot, // The selected time slot (e.g., 10:00AM-10:20AM)
        doctorId: this.$route.params.id, // The ID of the doctor
        userId: this.selectedUserId, // The ID of the selected user
      };

      try {
        // Send the booking request via axios
        const response = await axios.post(
          "http://localhost:5000/api/backend/book/",
          bookingData
        );

        console.log("Booking successful:", response.data);
        alert("Booking successful!");
      } catch (error) {
        console.error("Error submitting booking info:", error);
        alert("Failed to submit booking.");
      }
    },
    getNextDayDate(selectedDay) {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const today = new Date();
      const currentDayIndex = today.getDay(); // Current day of the week (0-6)
      const selectedDayIndex = daysOfWeek.indexOf(selectedDay); // Index of the selected day (0-6)

      // Calculate how many days until the next occurrence of the selected day
      const dayDifference =
        selectedDayIndex >= currentDayIndex
          ? selectedDayIndex - currentDayIndex
          : 7 - (currentDayIndex - selectedDayIndex);

      // Get the next occurrence date
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + dayDifference);

      return nextDay.toLocaleDateString(); // Returns the date in a readable format (you can customize it)
    },

    isSlotBooked(slot, date) {
      const formattedDate = date.toLocaleDateString();
      return this.bookedSlots.some(
        (bookedSlot) =>
          bookedSlot.slot === slot && bookedSlot.date === formattedDate
      );
    },
  },
};
</script>

<style scoped>
/* Style for disabled slots */
.disabled-slot {
  pointer-events: none; /* Disable clicking */
  cursor: not-allowed; /* Change cursor to not-allowed */
  opacity: 0.5; /* Optional: lower opacity to indicate disabled */
  background-color: rgb(
    124,
    120,
    120
  ); /* Optional: change background to indicate disabled */
}
</style>
