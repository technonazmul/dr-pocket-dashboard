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
                        <h4>Add Department</h4>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-block local-forms">
                        <label>Name <span class="login-danger">*</span></label>
                        <input
                          v-model="newDepartment.name"
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
                  <tr v-for="item in departments" :key="item._id">
                    <td>
                      {{ item.name }}
                      <div class="collapse" :id="'item' + item._id">
                        <div class="card card-body">
                          <input
                            v-model="item.name"
                            @blur="updateDepartment(item)"
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
                        :data-bs-target="'#item' + item._id"
                        aria-expanded="false"
                        :aria-controls="'item' + item._id"
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
      departments: [],
      isLoading: true,
      newDepartment: {
        name: "",
      },
    };
  },
  async mounted() {
    try {
      // Fetch all departments when the page loads
      const response = await axios.get(
        "http://localhost:5000/api/backend/departments"
      );
      this.departments = response.data;
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
          "http://localhost:5000/api/backend/department/add",
          this.newDepartment
        );

        this.departments.push(response.data); // Add the new department to the list
        this.newDepartment.name = ""; // Reset the input field
      } catch (error) {
        console.log({ message: error.message });
      }
    },
    // Update a department
    async updateDepartment(department) {
      await axios.put(
        `http://localhost:5000/api/backend/department/update/${department._id}`,
        {
          name: department.name,
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
