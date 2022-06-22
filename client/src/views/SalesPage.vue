<script>
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";
import Table from "../components/Table.vue"
import Buttons from "../components/Buttons.vue"
import Form from "../components/Form.vue"

export default {
    name: "Sales",
    components: {
        Table,
        Buttons,
        Form
    },
    methods: {
        ...mapActions(useCounter, ["fetchAllSales", "fetchProducts"]),
        formDisplay() {
            if (document.getElementById("form").style.display === "block") {
                document.getElementById("form").style.display = "none"              
            } else {
                document.getElementById("form").style.display = "block"
            }
        }
    },
    computed: {
        ...mapState(useCounter, ['sales', "products"])
    },
    created() {
        this.fetchAllSales()
        this.fetchProducts()
    }
}
</script>

<template>
    <div id="page">
        <div class="container-fluid col-10 justify-content-between" id="buttons">
            <Buttons button-name="Add Sales" @click="formDisplay"/>
        </div>
        <div class="container-fluid col-10 form-popup" id="form">
            <Form :products="products"/>
        </div>
        <div class="container-fluid col-10 align-items-center justify-content-between">
            <Table />
        </div>
    </div>
</template>

<style scoped>

#page {
  background-color: #023047;
  width: auto;
  height: auto;
  padding-top: 50px;
  padding-bottom: 150px;
}
#buttons {
    margin-top:50px;
    margin-bottom: 10px;
}

.form-popup {
  display: none;
}
</style>