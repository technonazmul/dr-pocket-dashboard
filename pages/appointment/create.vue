<template>
  <div class="main-wrapper">
    <Header></Header>
    <div class="page-wrapper">
      <div class="content">
        <!-- Page Header -->

        <!-- /Page Header -->
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="searchDoctors">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-heading">
                        <h4>Search Doctor By Name</h4>
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

          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="searchDoctors">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-heading">
                        <h4>Search Doctor By Specilization</h4>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-block local-forms">
                        <label
                          >Specialty <span class="login-danger">*</span></label
                        >
                        <select
                          class="form-control select"
                          v-model="search.specialization"
                        >
                          <option>Select</option>
                          <option
                            v-for="item in specialties"
                            :key="item._id"
                            :value="item._id"
                          >
                            {{ item.name }}
                          </option>
                        </select>
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
        {{ doctors }}
        <div class="row">
          <div class="col-3" v-for="doctor in doctors" :key="doctor._id">
            <div class="card">
              <i
                class="fas fa-user-md mt-5"
                style="font-size: 100px; margin: 0 auto"
              ></i>
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
      doctors: [],
      searched: false,
      newSpeciality: {
        name: "",
      },
    };
  },
  async mounted() {
    // Fetch all departments when the page loads
    const response = await axios.get(
      "http://localhost:5000/api/backend/specilities"
    );
    this.specialties = response.data;
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
