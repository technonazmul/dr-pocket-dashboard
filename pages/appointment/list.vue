<template>
  <Header></Header>
  <div class="page-wrapper">
    <div class="content">
      <!-- Page Header -->
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="appointments.html">Appointment </a>
              </li>
              <li class="breadcrumb-item">
                <i class="feather-chevron-right"></i>
              </li>
              <li class="breadcrumb-item active">Appointment List</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /Page Header -->

      <div class="row">
        <div class="col-sm-12">
          <div class="card card-table show-entire">
            <div class="card-body">
              <!-- Table Header -->
              <div class="page-table-header mb-2">
                <div class="row align-items-center">
                  <div class="col">
                    <div class="doctor-table-blk">
                      <h3>Appointment</h3>
                      <div class="doctor-search-blk">
                        <div class="top-nav-search table-search-blk">
                          <form>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Search here"
                            />
                            <a class="btn"
                              ><img
                                src="/assets/img/icons/search-normal.svg"
                                alt=""
                            /></a>
                          </form>
                        </div>
                        <div class="add-group">
                          <a
                            href="add-appointment.html"
                            class="btn btn-primary add-pluss ms-2"
                            ><img src="/assets/img/icons/plus.svg" alt=""
                          /></a>
                          <a
                            href="javascript:;"
                            class="btn btn-primary doctor-refresh ms-2"
                            ><img src="/assets/img/icons/re-fresh.svg" alt=""
                          /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto text-end float-end ms-auto download-grp">
                    <a href="javascript:;" class="me-2"
                      ><img src="/assets/img/icons/pdf-icon-01.svg" alt=""
                    /></a>
                    <a href="javascript:;" class="me-2"
                      ><img src="/assets/img/icons/pdf-icon-02.svg" alt=""
                    /></a>
                    <a href="javascript:;" class="me-2"
                      ><img src="/assets/img/icons/pdf-icon-03.svg" alt=""
                    /></a>
                    <a href="javascript:;"
                      ><img src="/assets/img/icons/pdf-icon-04.svg" alt=""
                    /></a>
                  </div>
                </div>
              </div>
              <!-- /Table Header -->

              <div class="table-responsive">
                <table
                  class="table border-0 custom-table comman-table datatable mb-0"
                >
                  <thead>
                    <tr>
                      <th>
                        <div class="form-check check-tables">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value="something"
                          />
                        </div>
                      </th>
                      <th>Name</th>
                      <th>Consulting Doctor</th>
                      <th>Mobile</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Payment</th>
                      <th>Meeting Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in bookedList" :key="item._id">
                      <td>
                        <div class="form-check check-tables">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value="something"
                          />
                        </div>
                      </td>
                      <td class="profile-image">
                        <a href="profile.html"> {{ item.userId.name }}</a>
                      </td>
                      <td>{{ item.doctorId.name }}</td>

                      <td>
                        <a href="javascript:;">{{ item.userId.phone }}</a>
                      </td>

                      <td>{{ item.date }}</td>
                      <td>{{ item.slot }}</td>
                      <td>
                        <div class="row">
                          <div
                            class="col"
                            :style="{
                              color:
                                item.paymentStatus === 'paid'
                                  ? 'green'
                                  : 'chocolate',
                            }"
                          >
                            {{ item.paymentStatus }}
                          </div>
                          <div class="col">
                            <div
                              class="dropdown dropdown-action"
                              style="width: 30px"
                            >
                              <a
                                href="#"
                                class="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                ><i class="fa fa-ellipsis-v"></i
                              ></a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  v-if="item.paymentStatus == 'pending'"
                                  @click.prevent="
                                    changePaymentStatus(
                                      item._id,
                                      item.paymentStatus
                                    )
                                  "
                                >
                                  Mark as Paid</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  v-else
                                  @click.prevent="
                                    changePaymentStatus(
                                      item._id,
                                      item.paymentStatus
                                    )
                                  "
                                >
                                  Mark as Pending</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>Link</td>
                      <td class="text-end">
                        <div class="dropdown dropdown-action">
                          <a
                            href="#"
                            class="action-icon dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            ><i class="fa fa-ellipsis-v"></i
                          ></a>
                          <div class="dropdown-menu dropdown-menu-end">
                            <a
                              class="dropdown-item"
                              href="edit-appointment.html"
                              ><i class="fa-solid fa-pen-to-square m-r-5"></i>
                              Edit</a
                            >
                            <a
                              class="dropdown-item"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_patient"
                              ><i class="fa fa-trash-alt m-r-5"></i> Delete</a
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
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
      bookedList: [],
    };
  },
  async mounted() {
    const response = await axios.get(
      "http://localhost:5000/api/backend/booked-list"
    );
    this.bookedList = response.data;
  },
  methods: {
    async fetchBookedList() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/backend/booked-list"
        );
        this.bookedList = response.data;
      } catch (error) {
        console.error("Error fetching booked list:", error);
      }
    },

    async changePaymentStatus(id) {
      console.log("clicked..", id);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/backend/booking/changepaystatus/" + id
        );
        console.log("success");
        await this.fetchBookedList();
      } catch (error) {}
    },
  },
};
</script>
