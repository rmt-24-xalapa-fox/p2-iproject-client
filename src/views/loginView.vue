<script>
import { mapState, mapActions } from 'pinia'
import { useReportStore } from '../stores/report'

export default {
    name: "loginView",
    data() {
        return {
            loginData: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        ...mapActions(useReportStore, [`login`]),
        // ...mapActions(useReportStore, [`handleCredentialResponse`]),
        login1() {
            console.log(`LOGIN1`, this.loginData)
            this.login(this.loginData)
        },
        // handleCreds(resp) {
        //     this.handleCredentialResponse(resp)
        // }

    },
    created() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });

    },
    mounted() {
        function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
            console.log('statusChangeCallback');
            console.log(response);                   // The current login status of the person.
            if (response.status === 'connected') {   // Logged into your webpage and Facebook.
                testAPI();
            } else {                                 // Not logged into your webpage or we are unable to tell.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into this webpage.';
            }
        }


        function checkLoginState() {               // Called when a person is finished with the Login Button.
            FB.getLoginStatus(function (response) {   // See the onlogin handler
                statusChangeCallback(response);
            });
        }


        window.fbAsyncInit = function () {
            FB.init({
                appId: '{app-id}',
                cookie: true,                     // Enable cookies to allow the server to access the session.
                xfbml: true,                     // Parse social plugins on this webpage.
                version: '{api-version}'           // Use this Graph API version for this call.
            });


            FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
                statusChangeCallback(response);        // Returns the login status.
            });
        };

        function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
            });
        }

    },
}
</script>

<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Sign In</h2>

            </div>
            <form class="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="pb-5">
                        <label for="email-address" class="sr-only">Email address</label>
                        <input v-model="loginData.email" id="email-address" name="email" type="email"
                            autocomplete="email" required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input v-model="loginData.password" id="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>


                <div>
                    <button @click.prevent="login1()" type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                    </button>
                </div>
                <div class="text-center">
                    <p>Or Sign in with Facebook</p>
                    <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with"
                        data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>


                    <span class="text-muted" style="font-size: 0.7rem">(Please refresh if Facebook sign in doesn't show
                        up)</span>
                </div>
            </form>
        </div>
    </div>



</template>

<style scoped>
</style>