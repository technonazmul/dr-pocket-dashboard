<template>
  <div class="main-wrapper">
    <Header></Header>
    <div class="page-wrapper">
      <div class="content">
        <!-- Page Header -->
        <div class="alert alert-primary" role="alert">
          Selected Doctor: {{ doctor.name }}
          <br />
          Select Day Time:
          {{ doctor.timeSlots }}
        </div>

        {{ doctor }}

        <!-- /Page Header -->
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="searchDoctors">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-heading">
                        <h4>Search User By Phone Number Or Name</h4>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-block local-forms">
                        <label>Name <span class="login-danger">*</span></label>
                        <input
                          v-model="search.name"
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
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-3" v-for="doctor in doctors" :key="doctor._id">
            <div class="card">
              <img
                src="https://i.postimg.cc/65PjHcbm/doctor.jpg"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{{ doctor.name }}</h5>
                <p class="card-text">
                  {{ doctor.qualifications }}
                  {{ doctor.designationAndDepartment }}
                </p>
                <nuxt-link
                  :to="`./${doctor._id}`"
                  class="btn btn-outline-primary"
                >
                  Get an appointment
                </nuxt-link>
              </div>
            </div>
          </div>
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
      specialties: [],
      search: {
        name: "",
        specialization: "",
        location: "",
      },
      doctor: [],
      searched: false,
      newSpeciality: {
        name: "",
      },
    };
  },
  async mounted() {
    // Get the doctor ID from the route parameters
    this.doctorId = this.$route.params.id;

    // Fetch the doctor data based on the ID
    if (this.doctorId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/backend/doctor/${this.doctorId}`
        );
        this.doctor = response.data;
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        toastr.warning("Something went wrong.!");
      }
    }
  },
  methods: {
    // Create a new departments
    async create() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/backend/specialization/add",
          this.newSpeciality
        );

        this.specialties.push(response.data); // Add the new department to the list
        this.newSpeciality.name = ""; // Reset the input field
      } catch (error) {
        console.log({ message: error.message });
      }
    },
    // Update a department
    async updateDepartment(specility) {
      await axios.put(
        `http://localhost:5000/api/backend/speciality/update/${specility._id}`,
        {
          name: specility.name,
        }
      );
      toastr.success("Update Successfully!");
    },

    async searchDoctors() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/c/doctor/find",
          {
            params: this.search,
          }
        );
        this.doctors = response.data;
        this.searched = true;
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Your CSS here */
</style>
