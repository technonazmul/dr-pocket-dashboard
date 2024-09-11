<template>
  <div class="main-wrapper">
    <Header></Header>
    <div class="page-wrapper">
      <div class="content">
        <!-- /Page Header -->
        <div class="row">
          <p>
            <a
              class="btn btn-primary"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Add New
            </a>
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-body">
                    <form @submit.prevent="addUser">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-heading">
                            <h4>New User</h4>
                          </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-4">
                          <div class="input-block local-forms">
                            <label
                              >Name <span class="login-danger">*</span></label
                            >
                            <input
                              class="form-control"
                              type="text"
                              v-model="form.name"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-4">
                          <div class="input-block local-forms">
                            <label
                              >Phone <span class="login-danger">*</span></label
                            >
                            <input
                              class="form-control"
                              type="text"
                              v-model="form.phone"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div class="col-4">
                          <div class="input-block local-forms">
                            <label
                              >Password
                              <span class="login-danger">*</span></label
                            >
                            <input
                              class="form-control"
                              type="password"
                              v-model="form.password"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="doctor-submit text-end">
                            <button
                              type="submit"
                              class="btn btn-primary submit-form me-2"
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary cancel-form"
                              @click="cancelForm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12">
            <div v-if="isLoading">Loading...</div>
            <div class="table-responsive" v-else>
              <table
                class="table border-0 custom-table comman-table datatable mb-0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Personal Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in users" :key="item._id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.phone }}</td>
                    <td>
                      <nuxt-link
                        :to="`./${item._id}`"
                        class="btn btn-outline-primary"
                      >
                        Edit
                      </nuxt-link>
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
      departments: [],
      users: [],
      isLoading: true, // New loading state
      responseMessage: "",
      form: {
        name: "",
        phone: "",
        password: "",
      },
    };
  },
  async mounted() {
    try {
      // Fetch doctors
      const users = await axios.get("http://localhost:5000/api/backend/users");
      this.users = users.data;

      // Fetch specialties
      const getspecilities = await axios.get(
        "http://localhost:5000/api/backend/specilities"
      );
      this.specialties = getspecilities.data;

      // Fetch departments
      const getdepartment = await axios.get(
        "http://localhost:5000/api/backend/departments"
      );
      this.departments = getdepartment.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false; // Set loading to false after data is loaded
    }
  },
  methods: {
    // Add doctor
    async addUser() {
      try {
        console.log(this.form);
        const response = await axios.post(
          "http://localhost:5000/api/backend/user/register",
          this.form
        );
        this.users.push(response.data);
        toastr.success("Added Successfully!");
        // Optionally reset the form
        this.resetForm();
      } catch (error) {
        console.error("Error adding:", error);
        alert("There was an error adding the user.");
      }
    },
    cancelForm() {
      // Optionally implement form reset or navigation logic
      this.resetForm();
    },
    resetForm() {
      this.form = {
        fullName: "",
        personalNumber: "",
        qualifications: "",
        departmentId: "",
        specialtyId: "",
        specialty: "",
        designation: "",
        chamberDetails: "",
        visitingHours: "",
        password: "",
      };
    },
    // Time slot
    addTimeSlot() {
      this.form.timeSlots.push(""); // Add a new time slot input field
    },
    // Show collapseable
    editDoctor() {
      document.getElementById("collapseExample").show(); // Add a new time slot input field
    },
    // remove time slot
    // Remove time slot input field
    removeTimeSlot(index) {
      if (this.form.timeSlots.length > 1) {
        this.form.timeSlots.splice(index, 1); // Remove the slot at the specified index
      } else {
        alert("You must have at least one time slot.");
      }
    },
  },
};
</script>

<style scoped>
.time-slot-item {
  display: flex;
  align-items: center;
}

.time-slot-item button {
  margin-left: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
}

.time-slot-item button:hover {
  background-color: darkred;
}
</style>
