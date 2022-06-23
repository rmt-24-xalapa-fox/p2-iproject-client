<script>
export default {
  name: "PaymentUser",
  data() {
    return {
      url: localStorage.getItem("redirect_url"),
    };
  },
};
</script>

<template>
  <div>
    <div
      class="flex items-center justify-center h-screen bg-gray-800 flex bg-gradient-to-r from-yellow-800 via-amber-500 to-brown-500"
    >
      <div class="bg-cyan-700 rounded-2xl border shadow-xl p-10 max-w-lg">
        <div class="flex flex-col items-center space-y-4">
          <h1 class="font-bold text-2xl text-gray-800 w-4/6 text-center">
            Order Confirmation
          </h1>
          <p class="text-sm text-gray-800 text-center w-5/6"></p>
          <div class="mt-7">
            <a
              :href="url"
              target="_blank"
              type="submit"
              class="bg-orange-600 w-full py-4 px-8 rounded-xl text-gray-800 font-semibold shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
            >
              Please Confirm Your Payment
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
