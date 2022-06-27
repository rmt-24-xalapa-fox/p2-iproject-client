<script>
import { mapActions } from 'pinia';
import { useCounterStore } from "../stores/counter";
export default {
    name: "Register",
    data() {
        return {
            name: "",
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
            address: ""
        };
    },
    methods: {
        ...mapActions(useCounterStore, ['regHandler'])
    }
};
</script>
<template>
    <section class="h-100 h-custom"
        style="background-color: darkslategrey; background-image: url('https://i.insider.com/5f1f12a82618b9420626bb06?width=1136&format=jpeg'); background-size: cover;">
        <div class="container py-5 h-50">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-8 col-xl-6">
                    <div class="card rounded-3" style="background-color:dimgrey">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                            class="w-100" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                            alt="Sample photo">
                        <div class="card-body p-4 p-md-5">
                            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2" style="color:aquamarine; text-align: center;">
                                Add your account</h3>

                            <form class="px-md-2">

                                <div class="form-outline mb-4">
                                    <input type="text" id="form3Example1q" class="form-control" placeholder="Name"
                                        v-model="name" />
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="text" id="form3Example1q1" class="form-control" placeholder="Username"
                                        v-model="username" />
                                </div>

                                <div class="row">
                                    <div class="col-md-6 mb-4">

                                        <div class="form-outline datepicker">
                                            <input type="text" class="form-control" id="exampleDatepicker1"
                                                placeholder="Email" v-model="email" />
                                        </div>

                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <input type="password" class="form-control" placeholder="***********"
                                            v-model="password" />
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <input type="text" class="form-control" placeholder="Phone Number"
                                        v-model="phoneNumber" />
                                </div>
                                <div class="mb-4">
                                    <input type="text" class="form-control" placeholder="Address" v-model="address" />
                                </div>
                                <button type="submit" class="btn btn-success btn-lg mb-1"
                                    @click.prevent="regHandler(name, username, email, password, phoneNumber, address)">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
</style>