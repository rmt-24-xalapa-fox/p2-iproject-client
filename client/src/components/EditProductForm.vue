<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCounter } from "../stores/store";

export default {
  name: "EditProduct",
  data() {
    return {
      editProductData: {
        name: "",
        description: "",
        price: 0,
        CategoryId: 0,
      },
    };
  },
  props: ["categories"],
  computed: {
    ...mapWritableState(useCounter, ["imageFile", "products"]),
  },
  methods: {
    ...mapActions(useCounter, ["createImgURL", "editProduct"]),
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
    <form>
      <div class="form-group row">
        <label for="name" class="col-6 col-form-label">Product Name</label>
        <div class="col-6">
          <input
            id="name"
            name="name"
            type="text"
            class="form-control"
            required="required"
            v-model="editProductData.name"
            :placeholder="products.name"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-6 col-form-label"
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
            :placeholder="products.description"
            v-model="editProductData.description"
          ></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label for="imgUrl" class="col-6 col-form-label">Upload Image</label>
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
          <span id="imgUrlHelpBlock" class="form-text text-muted"
            >Image ratio 1:1</span
          >
        </div>
      </div>
      <div class="form-group row">
        <label for="price" class="col-6 col-form-label">Price</label>
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
              :placeholder="products.price"
              v-model="editProductData.price"
            />
            <div class="input-group-append">
              <div class="input-group-text">,00</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="CategoryId" class="col-6 col-form-label">Category</label>
        <div class="col-6">
          <select
            id="CategoryId"
            name="CategoryId"
            class="custom-select"
            :required="true"
            v-model="editProductData.CategoryId"
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
      <div class="form-group row">
        <div class="offset-6 col-6">
          <button
            name="submit"
            type="submit"
            class="btn btn-primary"
            @click.prevent="editProduct(editProductData)"
          >
            Edit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.col-form-label {
  color: white;
}
</style>
