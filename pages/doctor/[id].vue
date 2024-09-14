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
                  <a href="doctors.html">Doctors </a>
                </li>
                <li class="breadcrumb-item">
                  <i class="feather-chevron-right"></i>
                </li>
                <li class="breadcrumb-item active">Add Doctor</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="updateDoctor">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-heading">
                        <h4>Doctor Edit</h4>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-xl-4">
                      <div class="input-block local-forms">
                        <label
                          >Full Name <span class="login-danger">*</span></label
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
                          >Doctor's Personal Number
                          <span class="login-danger">*</span></label
                        >
                        <input
                          class="form-control"
                          type="text"
                          v-model="form.personalNumber"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-xl-4">
                      <div class="input-block local-forms">
                        <label
                          >Qualifications
                          <span class="login-danger">*</span></label
                        >
                        <input
                          class="form-control"
                          type="text"
                          v-model="form.qualifications"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="input-block local-forms">
                        <label
                          >Department <span class="login-danger">*</span></label
                        >
                        <select
                          class="form-control select"
                          v-model="form.department"
                        >
                          <option>Select</option>
                          <option
                            v-for="item in departments"
                            :key="item._id"
                            :value="item._id"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="input-block local-forms">
                        <label
                          >Specialty <span class="login-danger">*</span></label
                        >
                        <select
                          class="form-control select"
                          v-model="form.specialization"
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
                    <div class="col-12 col-md-6 col-xl-6">
                      <div class="input-block local-forms">
                        <label>Specialty</label>
                        <input
                          class="form-control"
                          type="text"
                          v-model="form.specialty"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-xl-6">
                      <div class="input-block local-forms">
                        <label>Designation & Department</label>
                        <input
                          class="form-control"
                          type="text"
                          v-model="form.designationAndDepartment"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="col-12 col-sm-12">
                      <div class="input-block local-forms">
                        <label
                          >Chamber Name & Address (If more than one chamber then
                          put all chamber details)</label
                        >
                        <textarea
                          class="form-control"
                          rows="3"
                          v-model="form.chamberNameAddress"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-12 col-sm-12">
                      <div class="input-block local-forms">
                        <label>Visiting Hour (Time & Date)</label>
                        <textarea
                          class="form-control"
                          rows="3"
                          v-model="form.visitingHour"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <h4>Available Time Slots:</h4>

                        <!-- Loop through each day and display time slots -->
                        <div
                          class="col-3 mb-5"
                          v-for="(slots, day) in form.timeSlots"
                          :key="day"
                        >
                          <h5>{{ day }}</h5>
                          <div
                            v-for="(slot, index) in slots"
                            :key="index"
                            class="time-slot-item"
                          >
                            <input
                              type="text"
                              v-model="form.timeSlots[day][index]"
                              placeholder="e.g., 10:00 AM - 11:00 AM"
                              class="form-control mb-2"
                            />
                            <!-- Remove button for time slots -->
                            <button
                              v-if="form.timeSlots[day].length > 1"
                              type="button"
                              @click="removeTimeSlot(day, index)"
                              class="btn btn-outline-danger mt-1 mb-1"
                            >
                              <i class="fa fa-minus" aria-hidden="true"></i>
                            </button>
                          </div>
                          <!-- Add button for new time slots -->
                          <button
                            type="button"
                            @click="addTimeSlot(day)"
                            class="btn btn-outline-primary mt-1"
                          >
                            Add Another Time Slot for {{ day }}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
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
                          Submit
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
        personalNumber: "",
        specialty: "",
        specialization: "",
        department: "",
        designationAndDepartment: "",
        qualifications: "",
        appointmentPhoneNumber: "",
        email: "",
        workplace: "",
        chamberNameAddress: "",
        visitingHour: "",
        password: "",
        timeSlots: {
          Saturday: [""],
          Sunday: [""],
          Monday: [""],
          Tuesday: [""],
          Wednesday: [""],
          Thursday: [""],
          Friday: [""],
        },
      },
    };
  },
  async asyncData({ params }) {},
  async mounted() {
    // Get the doctor ID from the route parameters
    this.doctorId = this.$route.params.id;

    // Fetch the doctor data based on the ID
    if (this.doctorId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/backend/doctor/${this.doctorId}`
        );
        this.form = response.data;
      } catch (error) {
        console.error("Error fetching doctor data:", error);
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
    // Add doctor
    // Update doctor
    async updateDoctor() {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/backend/doctor/${this.doctorId}`,
          this.form
        );

        toastr.success("Update Successfully!");
        // Optionally redirect or reset form
      } catch (error) {
        console.error("Error updating doctor:", error);
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

    // Show collapseable
    editDoctor() {
      document.getElementById("collapseExample").show(); // Add a new time slot input field
    },
    // remove time slot

    // Add a new time slot for a specific day
    addTimeSlot(day) {
      this.form.timeSlots[day].push(""); // Add a new empty slot for the selected day
    },

    // Remove a time slot for a specific day
    removeTimeSlot(day, index) {
      if (this.form.timeSlots[day].length > 1) {
        this.form.timeSlots[day].splice(index, 1); // Remove the slot at the specified index
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
