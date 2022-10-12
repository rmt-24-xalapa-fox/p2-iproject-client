<script>
export default {
    name: "Header"
};
</script>

<template>
    <header>
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active"
                    style="background-image: url('http://www.poltekkesmamuju.ac.id/wp-content/uploads/2017/02/8516-1.jpg')">
                    <div class="carousel-caption">
                        <h5></h5>
                        <p></p>
                    </div>
                </div>
                <div class="carousel-item"
                    style="background-image: url('https://www.hetanews.com/images/20170608/20170608093155-ilustrasi-obat-obatan-tradisional.jpg')">
                    <div class="carousel-caption">
                        <h5></h5>
                        <p></p>
                    </div>
                </div>
                <div class="carousel-item"
                    style="background-image: url('https://cdn.popbela.com/content-images/post/20201208/dekoruma-com-0b7810518285aa165c4f1c17eb486ba4_750x500.jpg')">
                    <div class="carousel-caption">
                        <h5></h5>
                        <p></p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </header>
</template>

<style>
.carousel-item {
    height: 20vh;
    min-height: 200px;
    background: no-repeat center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>