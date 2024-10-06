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
                        <h4>Banner</h4>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-block local-forms">
                        <label
                          >Priority Number
                          <span class="login-danger">*</span></label
                        >
                        <input
                          v-model="newSpeciality.priority"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="input-block local-forms">
                        <label>Upload Image</label>
                        <input
                          type="file"
                          @change="onFileChange"
                          class="form-control"
                          ref="fileInput"
                          :key="fileInputKey"
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
                    <th>Image</th>
                    <th>Priority Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="banner in banners" :key="banner._id">
                    <td>
                      <img
                        :src="`http://localhost:5000/uploads/${banner.image}`"
                        alt=""
                        width="200"
                        v-if="banner.image && !banner.newImage"
                      />
                      <img
                        v-else="banner.newImage"
                        :src="getImagePreviewUrl(banner.newImage)"
                        alt="Selected Image Preview"
                        width="200"
                        class="mt-2"
                      />
                    </td>
                    <td>
                      {{ banner.priority }}
                      <div class="collapse" :id="'item' + banner._id">
                        <div class="card card-body">
                          <form @submit.prevent="update(banner)">
                            <input
                              v-model="banner.priority"
                              class="form-control"
                            />

                            Select New Image
                            <input
                              type="file"
                              @change="onUpdateFileChange($event, banner)"
                              class="form-control"
                              ref="fileInput"
                            />
                            <input
                              type="submit"
                              value="Update"
                              class="btn btn-primary submit-form mt-2"
                            />
                          </form>
                        </div>
                      </div>
                    </td>

                    <td>
                      <button
                        class="custom-badge status-green me-3"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#item' + banner._id"
                        aria-expanded="false"
                        :aria-controls="'item' + banner._id"
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-outline-danger"
                        @click.prevent="confirmDelete(banner._id)"
                        :disabled="deletingBannerId === banner._id"
                      >
                        <span v-if="deletingBannerId === banner._id"
                          >Deleting...</span
                        >
                        <span v-else>Delete</span>
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
      banners: [],
      isLoading: true,
      deletingBannerId: null,
      fileInputKey: Date.now(), // Unique key for the file input
      newSpeciality: {
        priority: "",
        image: null,
      },
    };
  },
  async mounted() {
    try {
      // Fetch all departments when the page loads
      const response = await axios.get(
        "http://localhost:5000/api/backend/banners"
      );
      this.banners = response.data;
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
        const formData = new FormData();
        formData.append("priority", this.newSpeciality.priority);
        formData.append("image", this.newSpeciality.image);

        const response = await axios.post(
          "http://localhost:5000/api/backend/banner/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.banners.push(response.data);
        this.newSpeciality.priority = "";
        this.newSpeciality.image = null;
        // Clear the file input manually
        this.fileInputKey = Date.now(); // Reset the file input by updating the key
        toastr.success("Added Successfully!");
      } catch (error) {
        console.log({ message: error.message });
      }
    },
    // Update a department

    // Update a specialization, including the image
    async update(specility) {
      console.log("testing");
      try {
        const formData = new FormData();
        formData.append("priority", specility.priority);
        if (specility.newImage) {
          formData.append("image", specility.newImage); // Attach new image if present
        }
        console.log("FormData being sent:", formData.get("image"));
        await axios.post(
          `http://localhost:5000/api/backend/banner/update/${specility._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toastr.success("Update Successfully!");
      } catch (error) {
        console.log({ message: error.message });
      }
    },

    // Confirmation before deletion
    async confirmDelete(id) {
      const confirmed = window.confirm("Are you sure want to delete this?");
      if (confirmed) {
        this.delete(id);
      }
    },

    // Delete specility
    async delete(id) {
      this.deletingBannerId = id; // Disable the button for the speciality being deleted
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/backend/banner/delete/${id}`
        );

        // Remove the deleted speciality from the list in the UI
        this.banners = this.banners.filter((specility) => specility._id !== id);
        toastr.success("Deleted SuccessFully.");
      } catch (error) {
        console.log("Error deleting speciality", error);
        toastr.error("Failed to delete.");
      } finally {
        this.deletingBannerId = null;
      }
    },

    // Handle file input change
    onFileChange(e) {
      this.newSpeciality.image = e.target.files[0];
    },
    onUpdateFileChange(event, specility) {
      specility.newImage = event.target.files[0];
    },
    // Get image preview for update
    getImagePreviewUrl(file) {
      if (file) {
        return URL.createObjectURL(file); // Create a URL for the selected file
      }
      return ""; // Return an empty string if no file is selected
    },
  },
};
</script>

<style scoped>
/* Your CSS here */
</style>
