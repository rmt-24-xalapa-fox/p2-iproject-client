<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCounter } from "../stores/store";

export default {
  name: "ProductForm",
  data() {
    return {
      newProduct: {
        name: "",
        description: "",
        price: 0,
        CategoryId: 0,
      },
    };
  },
  props: ["products", "categories"],
  computed: {
    ...mapWritableState(useCounter, ["imageFile"]),
  },
  methods: {
    ...mapActions(useCounter, ["createImgURL", "addProduct"]),
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      const reader = new FileReader();

      this.createImgURL(files[0]);
    },
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="createImgURL(this.image)">
      <div class="row">
        <div class="col-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label" style="color: white"
              >Product Name</label
            >
            <div class="col-6">
              <input
                id="name"
                name="name"
                type="text"
                class="form-control"
                required="required"
                v-model="newProduct.name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label
              for="description"
              class="col-4 col-form-label"
              style="color: white"
              >Description</label
            >
            <div class="col-6">
              <textarea
                id="description"
                name="description"
                cols="40"
                rows="5"
                required="required"
                class="form-control"
                v-model="newProduct.description"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group row">
            <label
              for="imgUrl"
              class="col-4 col-form-label"
              style="color: white"
              >Upload Image</label
            >
            <div class="col-6">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fa fa-camera-retro"></i>
                  </div>
                </div>
                <input
                  id="imgUrl"
                  name="imgUrl"
                  type="file"
                  aria-describedby="imgUrlHelpBlock"
                  required="required"
                  class="form-control"
                  @change="onFileChange"
                />
              </div>
              <span
                id="imgUrlHelpBlock"
                class="form-text text-muted"
                style="color: white"
                >Image ratio 1:1</span
              >
            </div>
          </div>
          <div class="form-group row">
            <label for="price" class="col-4 col-form-label" style="color: white"
              >Price</label
            >
            <div class="col-6">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Rp.</div>
                </div>
                <input
                  id="price"
                  name="price"
                  type="text"
                  class="form-control"
                  required="required"
                  v-model="newProduct.price"
                />
                <div class="input-group-append">
                  <div class="input-group-text">,00</div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label
              for="CategoryId"
              class="col-4 col-form-label"
              style="color: white"
              >Category</label
            >
            <div class="col-6">
              <select
                id="CategoryId"
                name="CategoryId"
                class="custom-select"
                required="required"
                v-model="newProduct.CategoryId"
              >
                <option
                  :value="category.id"
                  v-for="category in categories"
                  :key="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-11">
          <button
            name="submit"
            type="button"
            class="btn btn-primary float-right"
            @click.prevent="addProduct(newProduct)"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
