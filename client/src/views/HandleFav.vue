<template>
    <div class="vertical-center" style="margin-top: 50px;">
        <div class="container">
            <div id="notfound" class="text-center ">
                <h1>😮</h1>
                <h2 class="mt-4">Oops! Page Not Be Found</h2>
                <p>Anda Harus Login Terlebih Dahulu!.</p>
                <RouterLink to="/login">Back to Login</RouterLink>
            </div>
        </div>
    </div>

</template>

<script>
</script>

<style scoped>

body {
    background-color: #f1f1f1;
}

.vertical-center {
    min-height: 100%;
    min-height: 100vh;

    display: flex;
    align-items: center;
}
</style>