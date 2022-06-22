<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCounter } from "../stores/store";
import Background from "../components/Background.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Background,
  },
  data() {
    return {
      income: this.todaySales
    }
  },
  methods: {
    ...mapActions(useCounter, ["createChart", "fetchAllSales"]),

  },
  computed: {
    ...mapState(useCounter, ["chart", "sales", "todaySales", "todayExpense"]),
    rupiahConverter(value) {
    const formatter = new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
    })
        .format(value)
        .replace(/[IDR]/gi, "")
        .trimStart();
    return `Rp ${formatter}`;
    },
  },
  created() {
    this.fetchAllSales()
    this.createChart()
  }
};
</script>

<template>
  <div id="content">
    <!-- Begin Page Content -->
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0">Dashboard</h1>
        <a
          href="#"
          class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          ><i class="fas fa-download fa-sm text-white-50"></i> Button</a
        >
      </div>

      <!-- Content Row -->
      <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                  >
                    Today Income
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{todaySales}}
                  </div>
                </div>
                <div class="col-auto">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-success text-uppercase mb-1"
                  >
                    Today Expense
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{todayExpense}}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-info text-uppercase mb-1"
                  >
                    Most Sold
                  </div>
                  <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        Bloody Mary
                      </div>
                    </div>
                    <!-- <div class="col">
                      <div class="progress progress-sm mr-2">
                        <div
                          class="progress-bar bg-info"
                          role="progressbar"
                          style="width: 50%"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div> -->
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Requests Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                  >
                    Product Sold
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                </div>
                <div class="col-auto">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Row -->

      <div class="row">
        <!-- Area Chart -->
        <div class="col-xl-12 col-lg-7">
          <div class="card shadow mb-4">
            <!-- Card Header - Dropdown -->
            <div
              class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
            >
              <h6 class="m-0 font-weight-bold text-primary">
                Earnings Overview
              </h6>
            </div>
            <!-- Card Body -->
            <div class="card-body">
              <div class="chart-area">
                <img :src="chart">
              </div>
            </div>
          </div>
        </div>

        <!-- Pie Chart -->
      </div>
    </div>
  </div>

  <!-- Footer -->

</template>

<style scoped>
#content {
  background-color: #023047;
  width: auto;
  height: auto;
}
</style>
