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
                    <form @submit.prevent="addDoctor">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-heading">
                            <h4>Doctor Details</h4>
                          </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-4">
                          <div class="input-block local-forms">
                            <label
                              >Full Name
                              <span class="login-danger">*</span></label
                            >
                            <input
                              class="form-control"
                              type="text"
                              v-model="form.name"
                              placeholder=""
                              required
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
                              required
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
                              >Specialty
                              <span class="login-danger">*</span></label
                            >
                            <select
                              class="form-control select"
                              v-model="form.specialization"
                              required
                            >
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
                        <div class="col-6">
                          <div class="input-block local-forms">
                            <label>Specialties In Text</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="form.specialty"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div class="col-6">
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

                        <div class="col-6">
                          <div class="input-block local-forms">
                            <label>Videos</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="form.videos"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div class="col-12 col-sm-12">
                          <div class="input-block local-forms">
                            <label>Biography</label>
                            <textarea
                              class="form-control"
                              rows="3"
                              v-model="form.biography"
                            ></textarea>
                          </div>
                        </div>

                        <div class="col-12 col-md-6 col-xl-6">
                          <div class="input-block local-forms">
                            <label>Experience</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="form.experience"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div class="col-12 col-md-6 col-xl-6">
                          <div class="input-block local-forms">
                            <label>Total Patients</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="form.patient"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div class="col-12 col-sm-12">
                          <div class="input-block local-forms">
                            <label
                              >Chamber Name & Address (If more than one chamber
                              then put all chamber details)</label
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
                            <br />

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
                                <button
                                  v-if="form.timeSlots[day].length > 1"
                                  type="button"
                                  @click="removeTimeSlot(day, index)"
                                  class="btn btn-outline-danger mt-1 mb-1"
                                >
                                  <i class="fa fa-minus" aria-hidden="true"></i>
                                </button>
                              </div>
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

                        <div class="col-6">
                          <div class="input-block local-forms">
                            <label for=""
                              >Upload Image
                              <span class="login-danger">*</span></label
                            >
                            <input
                              type="file"
                              @change="onFileChange"
                              class="form-control"
                              ,
                              ref="fileInput"
                              :key="fileInputKey"
                            />
                          </div>
                        </div>

                        <div class="col-6">
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
                              required
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

                    <th>Specialty</th>
                    <th>Qualifications</th>
                    <th>Designation And Department</th>
                    <th>Chamber Name Address</th>
                    <th>Visiting Hour</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in doctors" :key="item._id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.personalNumber }}</td>

                    <td>{{ item.specialty }}</td>
                    <td>{{ item.qualifications }}</td>
                    <td>{{ item.designationAndDepartment }}</td>
                    <td>{{ item.chamberNameAddress }}</td>
                    <td>{{ item.visitingHour }}</td>
                    <td>{{ item.status }}</td>

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

      doctors: [],
      isLoading: true, // New loading state
      responseMessage: "",
      form: {
        name: "",
        personalNumber: "",
        specialty: "",
        biography: "",
        experience: "",
        videos: "",
        patient: "",
        specialization: "",
        designationAndDepartment: "",
        qualifications: "",
        appointmentPhoneNumber: "",
        email: "",
        workplace: "",
        chamberNameAddress: "",
        visitingHour: "",
        password: "",
        image: null,

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
      fileInputKey: Date.now(),
    };
  },
  async mounted() {
    try {
      // Fetch doctors
      const doctors = await axios.get(
        "http://localhost:5000/api/backend/doctors"
      );
      this.doctors = doctors.data;

      // Fetch specialties
      const getspecilities = await axios.get(
        "http://localhost:5000/api/backend/specilities"
      );
      this.specialties = getspecilities.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false; // Set loading to false after data is loaded
    }
  },
  methods: {
    // Add doctor
    async addDoctor() {
      try {
        const formData = new FormData();

        // Append form fields to FormData
        formData.append("name", this.form.name);
        formData.append("personalNumber", this.form.personalNumber);
        formData.append("specialty", this.form.specialty);
        formData.append("biography", this.form.biography);
        formData.append("experience", this.form.experience);
        formData.append("videos", this.form.videos);
        formData.append("patient", this.form.patient);
        formData.append("specialization", this.form.specialization);

        formData.append(
          "designationAndDepartment",
          this.form.designationAndDepartment
        );
        formData.append("qualifications", this.form.qualifications);
        formData.append(
          "appointmentPhoneNumber",
          this.form.appointmentPhoneNumber
        );
        formData.append("email", this.form.email);
        formData.append("workplace", this.form.workplace);
        formData.append("chamberNameAddress", this.form.chamberNameAddress);
        formData.append("visitingHour", this.form.visitingHour);
        formData.append("password", this.form.password);
        // Append timeSlots as JSON string
        formData.append("timeSlots", JSON.stringify(this.form.timeSlots));

        formData.append("image", this.form.image);

        const response = await axios.post(
          "http://localhost:5000/api/backend/doctor/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.doctors.push(response.data);

        //this.resetForm();
      } catch (error) {
        console.error("Error adding doctor:", error);
        alert("There was an error adding the doctor.");
      }
    },
    cancelForm() {
      // Optionally implement form reset or navigation logic
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: "",
        personalNumber: "",
        qualifications: "",
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

    addTimeSlot(day) {
      this.form.timeSlots[day].push(""); // Add a new time slot for the selected day
    },
    removeTimeSlot(day, index) {
      if (this.form.timeSlots[day].length > 1) {
        this.form.timeSlots[day].splice(index, 1); // Remove the specific time slot for the selected day
      } else {
        alert("You must have at least one time slot.");
      }
    },

    // Add doctor file upload
    onFileChange(e) {
      this.form.image = e.target.files[0];
      console.log(this.form.image);
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
