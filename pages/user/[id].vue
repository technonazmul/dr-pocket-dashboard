<template>
  <div class="main-wrapper">
    <Header></Header>

    <div class="page-wrapper">
      <div class="content">
        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="users.html">users </a>
                </li>
                <li class="breadcrumb-item">
                  <i class="feather-chevron-right"></i>
                </li>
                <li class="breadcrumb-item active">Add user</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="updateuser">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-heading">
                        <h4>Update User</h4>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-xl-4">
                      <div class="input-block local-forms">
                        <label>Name <span class="login-danger">*</span></label>
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
                        <label>Phone <span class="login-danger">*</span></label>
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
                          >Password <span class="login-danger">*</span></label
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

      responseMessage: "",
      form: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
    };
  },
  async asyncData({ params }) {},
  async mounted() {
    // Get the user ID from the route parameters
    this.userId = this.$route.params.id;

    // Fetch the user data based on the ID
    if (this.userId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/backend/user/${this.userId}`
        );
        this.form = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        toastr.warning("Something went wrong.!");
      }
    }

    // Fetch all departments when the page loads
    const getspecilities = await axios.get(
      "http://localhost:5000/api/backend/specilities"
    );
    this.specialties = getspecilities.data;

    const getdepartment = await axios.get(
      "http://localhost:5000/api/backend/departments"
    );
    this.departments = getdepartment.data;
  },
  methods: {
    // Add user
    // Update user
    async updateuser() {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/backend/user/${this.userId}`,
          this.form
        );

        toastr.success("Update Successfully!");
        this.form.password = "";
        // Optionally redirect or reset form
      } catch (error) {
        console.error("Error updating user:", error);
        toastr.warning("Something went wrong.!");
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
    edituser() {
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
