<script>
export default {
    name: "NotFoundPage"
}
</script>

<template>
<div class="container">
    <div class="column">
        <div class="col-md-12">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div class="error-actions">
                    <router-link to="/home" class="btn btn-primary btn-lg">Take Me Home</router-link>
                    <router-link to="/feature" class="btn btn-danger btn-lg">Feature</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.error-template {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>