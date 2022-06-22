<template>
  <!-- TOPUP START -->

  <div
    class="container text-center page-heading align-items-center justify-content-center border border-dark border-4 rounded"
    style="width: 40%; background-color: white; margin-top: 40px"
  >
    <div
      class="container text-center page-heading align-items-center justify-content-center"
    >
      <div class="row" style="margin-top: 30px; margin-bottom: 30px">
        <div class="col-4">
          <label>TopUp</label>
        </div>
        <div class="col-4">
          <label>1000 Koin</label>
        </div>
        <div class="col-4">
          <button class="btn btn-dark" style="height: 35px">Xendit</button>
        </div>
        <div class="col-4">
          <label>TopUp</label>
        </div>
        <div class="col-4">
          <label>2000 Koin</label>
        </div>
        <div class="col-4">
          <button class="btn btn-dark" style="height: 35px">Xendit</button>
        </div>
      </div>
    </div>

    <!-- tes -->
  </div>
  <div
    class="container text-center page-heading align-items-center justify-content-center border border-dark border-4 rounded"
    style="width: 40%; background-color: white; margin-top: 40px"
  >
    <div
      class="container text-center page-heading align-items-center justify-content-center"
    >
      <div class="row" style="margin-top: 30px; margin-bottom: 30px">
        <div class="col-12">
          <h6>Or invite your friend with this link</h6>
        </div>
        <div class="col-12">
          <label style="color: blue">{{ userReferralLink }}</label>
          <button
            @click="clickCopyClipboard"
            style="margin-left: 10px; height: 30px; width: 30px"
            class="btn btn-primary align-items-center text-center justify-content-center"
          >
            ©
          </button>
        </div>
        <div class="col-12">
          <h6>or with QRCODE</h6>
        </div>
        <div class="col-12">
          <img style="height: 200px; width: 200px" :src="userQrCode" />
        </div>
      </div>
    </div>

    <!-- tes -->
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  methods: {
    ...mapActions(useMainStore, ["fetchReferralData"]),
    clickCopyClipboard: function () {
      // console.log("masok");
      // console.log(this.userReferralLink);
      var copyText = this.userReferralLink;
      // copyText.select();
      // copyText.setSelectionRange(0, 99999);
      //
      navigator.clipboard.writeText(copyText);

      Swal.fire("Link copied to clipboard");
    },
  },
  computed: {
    ...mapState(useMainStore, ["userReferralLink", "userQrCode"]),
  },
  created() {
    this.fetchReferralData();
  },
};
</script>
