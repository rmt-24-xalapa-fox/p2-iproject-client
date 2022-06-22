<template>
  <div class="container">
    <div class="card">
      <div class="container-fliud">
        <div class="wrapper row">
          <div class="preview col-md-6">
            <div class="preview-pic tab-content">
              <div class="tab-pane active" id="pic-1">
                <img :src="detailCard.imgUrl1" />
              </div>
              <div class="tab-pane" id="pic-2">
                <img :src="detailCard.imgUrl2" />
              </div>
              <div class="tab-pane" id="pic-3">
                <img :src="detailCard.imgUrl3" />
              </div>
              <div class="tab-pane" id="pic-4">
                <img :src="detailCard.Team.imgUrl" />
              </div>
            </div>
            <ul class="preview-thumbnail nav nav-tabs">
              <li class="active">
                <a data-target="#pic-1" data-toggle="tab"
                  ><img :src="detailCard.imgUrl1"
                /></a>
              </li>
              <li>
                <a data-target="#pic-2" data-toggle="tab"
                  ><img :src="detailCard.imgUrl2"
                /></a>
              </li>
              <li>
                <a data-target="#pic-3" data-toggle="tab"
                  ><img :src="detailCard.imgUrl3"
                /></a>
              </li>
              <li>
                <a data-target="#pic-4" data-toggle="tab"
                  ><img :src="detailCard.Team ? detailCard.Team.imgUrl : ''"
                /></a>
              </li>
            </ul>
          </div>
          <div class="details col-md-6">
            <h3 class="product-title">{{ detailCard.name }}</h3>
            <div class="rating">
              <span class="review-no">{{ detailCard.year }}</span>
            </div>
            <p class="product-description">
              {{ detailCard.description }}
            </p>

            <div class="row mt-3">
              <div class="col-6">
                <h4 class="price">nominee:</h4>
              </div>
              <div class="col-6">
                <h5 class="price">
                  <span>{{ detailCard.Category.name }}</span>
                </h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h4 class="price">Team:</h4>
              </div>
              <div class="col-6">
                <h5 class="price">
                  <span>{{ detailCard.Team.name }}</span>
                </h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h4 class="price">current price:</h4>
              </div>
              <div class="col-6">
                <h4 class="price">
                  <span>{{ formatRupiah(detailCard.price) }}</span>
                </h4>
              </div>
            </div>
            <button
              v-if="!infor"
              @click.prevent="funcAdd(detailCard.id)"
              class="btn btn-primary mt-3"
            >
              Add to Cart
            </button>
            <p v-if="infor" style="color: red; font-weight: 600">Sold</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useProductStore } from "../stores/product";
export default {
  name: `DetailPage`,
  data() {
    return {
      infor: false,
    };
  },
  computed: {
    ...mapState(useProductStore, ["detailCard"]),
  },
  methods: {
    ...mapActions(useProductStore, ["getProductId", "addToList"]),
    formatRupiah(num) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(num);
    },
    splitData() {
      if (this.detailCard.Users.length < 1) {
        return (this.infor = false);
      } else if (this.detailCard.Users[0].CardUser.status == `unpaid`) {
        return (this.infor = false);
      }
      this.infor = true;
    },
    async funcGet(id) {
      try {
        await this.getProductId(id);
        this.splitData();
      } catch (err) {
        // console.log(err);
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      }
    },
    async funcAdd(id) {
      try {
        await this.addToList(id);
        console.log(`success`);
        this.$swal.fire({
          icon: "success",
          title: `Success - 200`,
          text: `Success Add data`,
          timer: 1000,
        });
      } catch (err) {
        // console.log(err);
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      }
    },
  },
  created() {
    this.funcGet(this.$route.params.id);
    console.log(this.detailCard);
  },
};
</script>

<style>
img {
  max-width: 100%;
}

.preview {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
@media screen and (max-width: 996px) {
  .preview {
    margin-bottom: 20px;
  }
}

.preview-pic {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.preview-thumbnail.nav-tabs {
  border: none;
  margin-top: 15px;
}
.preview-thumbnail.nav-tabs li {
  width: 18%;
  margin-right: 2.5%;
}
.preview-thumbnail.nav-tabs li img {
  max-width: 100%;
  display: block;
}
.preview-thumbnail.nav-tabs li a {
  padding: 0;
  margin: 0;
}
.preview-thumbnail.nav-tabs li:last-of-type {
  margin-right: 0;
}

.tab-content {
  overflow: hidden;
}
.tab-content img {
  width: 65%;
  -webkit-animation-name: opacity;
  animation-name: opacity;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

.card {
  margin-top: 50px;
  background: #eee;
  padding: 3em;
  line-height: 1.5em;
}

@media screen and (min-width: 997px) {
  .wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
}

.details {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.colors {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.product-title,
.price,
.sizes,
.colors {
  text-transform: UPPERCASE;
  font-weight: bold;
}

.checked,
.price span {
  color: #01082e;
}

.product-title,
.rating,
.product-description,
.price,
.vote,
.sizes {
  margin-bottom: 15px;
}

.product-title {
  margin-top: 0;
}

.size {
  margin-right: 10px;
}
.size:first-of-type {
  margin-left: 40px;
}

.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  height: 2em;
  width: 2em;
  border-radius: 2px;
}
.color:first-of-type {
  margin-left: 20px;
}

.tooltip-inner {
  padding: 1.3em;
}

@-webkit-keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
