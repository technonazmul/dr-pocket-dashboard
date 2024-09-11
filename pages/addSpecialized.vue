<template>
  <div class="main-wrapper">
    <Header></Header>
    <div class="page-wrapper">
      <div class="content">
        <!-- Page Header -->

        <!-- /Page Header -->
        <div class="row">
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="create">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-heading">
                        <h4>Add Specialize</h4>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-block local-forms">
                        <label>Name <span class="login-danger">*</span></label>
                        <input
                          v-model="newSpeciality.name"
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
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-sm-9">
            <div v-if="isLoading">Loading...</div>
            <div class="table-responsive" v-else>
              <table
                class="table border-0 custom-table comman-table datatable mb-0"
              >
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="specility in specialties" :key="specility._id">
                    <td>
                      {{ specility.name }}
                      <div class="collapse" :id="'item' + specility._id">
                        <div class="card card-body">
                          <input
                            v-model="specility.name"
                            @blur="updateDepartment(specility)"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <button
                        class="custom-badge status-green me-3"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#item' + specility._id"
                        aria-expanded="false"
                        :aria-controls="'item' + specility._id"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      isLoading: true,
      newSpeciality: {
        name: "",
      },
    };
  },
  async mounted() {
    try {
      // Fetch all departments when the page loads
      const response = await axios.get(
        "http://localhost:5000/api/backend/specilities"
      );
      this.specialties = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false; // Set loading to false after data is loaded
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
  },
};
</script>

<style scoped>
/* Your CSS here */
</style>
