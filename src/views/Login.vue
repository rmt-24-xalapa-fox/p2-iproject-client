<script>
import {db, app} from "../../config/firebaseconfig"
import {setDoc, doc, collection, getDocs, addDoc, where ,query} from "firebase/firestore"
import {signInWithEmailAndPassword, getAuth} from "firebase/auth"
import swal from 'sweetalert';
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        login() {
            let auth = getAuth(app);
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(async res => {
                if (res.user) {
                    const q = query(collection(db, "Users"), where("id", "==", res.user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, "=>", doc.data());
                        let userData = doc.data();
                        localStorage.setItem("id", userData.id);
                        localStorage.setItem("name", userData.name);
                        localStorage.setItem("email", userData.email);
                        localStorage.setItem("imageUrl", userData.imageUrl);
                        localStorage.setItem("status", userData.status);
                        localStorage.setItem("FirebaseDocId", doc.id);
                    })
                    this.email= "";
                    this.password= "";
                    this.$router.push("/")
                }
            })
            .catch(err => {
                let errorMessage = err.message;
                console.log(err, err.name);
                swal(errorMessage)
            })
        }
    },
    created() {
        if (localStorage.getItem("id")) {
            this.$router.push("/")
        }
    }
}
</script>
<template>
<!-- Section: Design Block -->
<section class="">
  <!-- Jumbotron -->
  <div class="px-4 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%); height: 100vh; padding-top: 150px;">
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
              <form @submit.prevent="login">
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
                        Sign In
                    </button>
                </div>

              </form>
                <p class="text-center">Don't have an account? <router-link to="/signup" class="text-decoration-none"><span style="color: #FC7643;">Register</span></router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</section>
<!-- Section: Design Block --></template>
<style></style>