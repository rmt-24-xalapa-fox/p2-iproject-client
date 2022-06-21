<script>
export default {
    name: "HomePage"
}
</script>

<template>
    <div class="container my-4">
        <h3 class="text-center my-4">List Rentalan</h3>
        <div class="row">
            <!-- CourseCard -->
            <div>
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
                                alt="Trendy Pants and Shoes" class="img-fluid rounded-start" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </p>
                                <p class="card-text">
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End CourseCard -->
           
        </div>
    </div>
</template>

<style scoped>
template {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
}
</style>