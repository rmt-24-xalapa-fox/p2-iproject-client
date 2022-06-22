<template>
  <div class="my-16 mx-auto max-w-md">
    <div class="bg-white py-8 px-6 shadow rounded-lg">
      <h2 class="mt-4 mb-8 text-center text-3xl font-bold text-rose-600">
        Register
      </h2>
      <form action="" class="space-y-6">
        <div>
          <label for="name" class="text-sm font-medium text-gray-700">
            Name
          </label>
          <div class="mt-2">
            <input
              type="text"
              id="name"
              name="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
        </div>

        <div>
          <label for="email" class="text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-2">
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
        </div>

        <div>
          <label for="password" class="text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-2">
            <input
              type="password"
              id="password"
              name="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <div
            class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="text-sm text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
};
</script>

<style scoped></style>
