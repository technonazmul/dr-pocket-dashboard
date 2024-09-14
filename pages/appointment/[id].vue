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
                  <button class="btn btn-outline-primary">Select User</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 class="ms-5 mt-5">Select Appointment Time</h5>
      <div class="ms-5" v-for="(slots, day) in doctor.timeSlots" :key="day">
        <span>{{ day }}:</span>
        <div>
          <a
            href="#"
            :class="[
              'btn',
              'btn-outline-primary',
              'm-3',
              { active: activeSlot === `slot-${day}-${index}` },
            ]"
            v-for="(slot, index) in slots"
            :key="index"
            @click.prevent="handleSlotClick(day, index)"
            >{{ slot }}</a
          >
        </div>
      </div>
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
      search: {
        phone: "",
      },
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

    try {
      // Fetch doctors
      const users = await axios.get("http://localhost:5000/api/backend/users");
      this.users = users.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    handleSlotClick(day, index) {
      // Create a unique identifier for each slot
      this.activeSlot = `slot-${day}-${index}`;
      console.log(day, index, this.$route.params.id);
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
  },
};
</script>
