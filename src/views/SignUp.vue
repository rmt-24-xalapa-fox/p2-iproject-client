<script>
import {db, app} from "../../config/firebaseconfig"
import {setDoc, doc, collection, getDocs, addDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import swal from 'sweetalert';
import {mapActions} from "pinia"
import {useMainStore} from "../stores"
export default {
    name: "SignUp",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    },
    methods: {
        ...mapActions(useMainStore, ["sendNotif"]),
        signUp() {
            let auth = getAuth(app)
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then(async res => {
                console.log(res);
                const newDoc = await addDoc(collection(db, "Users"), {
                    id: res.user.uid || null,
                    name: `${this.firstName} ${this.lastName}` || null,
                    email: this.email || null,
                    password: this.password || null,
                    imageUrl: "https://ptetutorials.com/images/user-profile.png",
                    status: ""
                });
                localStorage.setItem("id", res.user.uid);
                localStorage.setItem("name", `${this.firstName} ${this.lastName}`);
                localStorage.setItem("email", this.email);
                localStorage.setItem("imageUrl", "https://ptetutorials.com/images/user-profile.png");
                localStorage.setItem("status", "Hey I'm using YourChat!");
                localStorage.setItem("FirebaseDocId", newDoc.id);
                await this.sendNotif(this.email);
                this.firstName= "";
                this.lastName= "";
                this.email= "";
                this.password= "";
                this.$router.push("/");
            })
            .catch(err => {
                let errorMessage = err.message
                console.log(err);
                swal(errorMessage)
            })
        }
    }
}
</script>
<template>
    <!-- Section: Design Block -->
<section class="">
  <!-- Jumbotron -->
  <div class="px-4 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%); height: 100vh; padding-top: 120px;">
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight">
            Simple. Secure. <br />
            <span style="color: #FC7643;">Reliable messaging.</span>
          </h1>
          <p style="color: hsl(217, 10%, 50.8%)">
            With YourChat, you'll get fast, simple, secure messaging for free*, available on web all over the world.
            * Data charges may apply. Contact your provider for details.
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <form @submit.prevent="signUp">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example1" class="form-control" v-model="firstName"/>
                      <label class="form-label" for="form3Example1">First name</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example2" class="form-control" v-model="lastName"/>
                      <label class="form-label" for="form3Example2">Last name</label>
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" v-model="email"/>
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" v-model="password"/>
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <!-- Submit button -->
                <div class="row">
                    <button type="submit" class="btn btn-dark btn-block mb-4">
                        Sign Up
                    </button>
                </div>

              </form>
                <p class="text-center">Have an account? <router-link to="/login" class="text-decoration-none"><span style="color: #FC7643;">Login</span></router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</section>
<!-- Section: Design Block -->
</template>
<style></style>