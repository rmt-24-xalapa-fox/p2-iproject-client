<template>
    <div class="shell">
        <div class="container">
            <div class="row">
                <div class="col-md-3" v-for="product in products" :key="product.id">
                    <div class="wsk-cp-product">
                        <div class="wsk-cp-img">
                            <img :src="product.images_list[0]" alt="Product" class="img-responsive"
                                style="height: 150px;" />
                        </div>
                        <div class="wsk-cp-text" style="margin-top: -120px">
                            <div class="category">
                                <span>{{product.brand}}</span>
                            </div>
                            <div class="title-product">
                                <h3>{{product.title}}</h3>
                            </div>
                            <div class="description-prod">
                                <p>{{ product.product_details }}</p>
                            </div>
                            <div class="card-footer">
                                <div class="wcf-left"><span class="price">Rp. {{
                                Number(product.price).toLocaleString('de-DE', {minimumFractionDigits: 2 })
                                }}</span></div>
                                <div class="wcf-right"><button @click.prevent="btnFav(product.id)" class="buy-btn"><i
                                            class="fa fa-shopping-cart"></i></button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px; margin-left: 550px;" class="justify-content-center">
            <ul class="nav nav-tabs d-flex " data-aos="fade-up" data-aos-delay="200">

                <li class="nav-item">
                    <a class="nav-link show" data-bs-toggle="tab">
                        <h4>1</h4>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link show" data-bs-toggle="tab">
                        <h4>2</h4>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link show" data-bs-toggle="tab">
                        <h4>3</h4>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link show" data-bs-toggle="tab">
                        <h4>4</h4>
                    </a>
                </li>
            </ul>
        </div>
    </div>



</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from "../stores";
    export default {
        props: ['products'],
        methods: {
            ...mapActions(useIndexStore, ["addCart"]),

            btnFav(id) {
                this.addCart(id)
                    .then(() => { 
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: `Success add product to cart!`,
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `Anda Harus Login Terlebih Dahulu!`,
                        });
                    })
            },
        }
    }
</script>

<style scoped>

/*--------------------------------------------------------------
# Menu Section
--------------------------------------------------------------*/
 .nav-tabs {
    border: 0;
}

 .nav-link {
    margin: 0 10px;
    padding: 10px 5px;
    transition: 0.3s;
    color: var(--color-secondary);
    border-radius: 0;
    cursor: pointer;
    height: 100%;
    border: 0;
    border-bottom: 2px solid #b6b6bf;
}

@media (max-width: 575px) {
     .nav-link {
        margin: 0 10px;
        padding: 10px 0;
    }
}

 .nav-link i {
    padding-right: 15px;
    font-size: 48px;
}

 .nav-link h4 {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
    font-family: var(--font-secondary);
}

@media (max-width: 575px) {
     .nav-link h4 {
        font-size: 16px;
    }
}

 .nav-link:hover {
    color: var(--color-primary);
}

 .nav-link.active {
    color: var(--color-primary);
    border-color: var(--color-primary);
}

 .tab-content .tab-header {
    padding: 30px 0;
}

 .tab-content .tab-header p {
    font-size: 14px;
    text-transform: uppercase;
    color: #676775;
    margin-bottom: 0;
}

 .tab-content .tab-header h3 {
    font-size: 36px;
    font-weight: 600;
    color: var(--color-primary);
}


/* Card */
.shell {
    padding-bottom: 80px;
}

.wsk-cp-product {
    background: #fff;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    position: relative;
    margin: 20px auto;
}

.wsk-cp-img {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translate(-50%);
    -webkit-transform: translate(-50%);
    -ms-transform: translate(-50%);
    -moz-transform: translate(-50%);
    -o-transform: translate(-50%);
    -khtml-transform: translate(-50%);
    width: 100%;
    padding: 15px;
    transition: all 0.2s ease-in-out;
}

.wsk-cp-img img {
    width: 100%;
    transition: all 0.2s ease-in-out;
    border-radius: 6px;
}

.wsk-cp-product:hover .wsk-cp-img {
    top: -40px;
}

.wsk-cp-product:hover .wsk-cp-img img {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.wsk-cp-text {
    padding-top: 150%;
}

.wsk-cp-text .category {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    padding: 5px;
    margin-bottom: 45px;
    position: relative;
    transition: all 0.2s ease-in-out;
}

.wsk-cp-text .category>* {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -khtml-transform: translate(-50%, -50%);

}

.wsk-cp-text .category>span {
    padding: 12px 30px;
    border: 1px solid #313131;
    background: #212121;
    color: #fff;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    border-radius: 27px;
    transition: all 0.05s ease-in-out;

}

.wsk-cp-product:hover .wsk-cp-text .category>span {
    border-color: #ddd;
    box-shadow: none;
    padding: 11px 28px;
}

.wsk-cp-product:hover .wsk-cp-text .category {
    margin-top: 0px;
}

.wsk-cp-text .title-product {
    text-align: center;
}

.wsk-cp-text .title-product h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 15px auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

.wsk-cp-text .description-prod p {
    margin: 0;
}

/* Truncate */
.wsk-cp-text .description-prod {
    text-align: center;
    width: 100%;
    height: 62px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 15px;
}

.card-footer {
    padding: 25px 0 5px;
    border-top: 1px solid #ddd;
}

.card-footer:after,
.card-footer:before {
    content: '';
    display: table;
}

.card-footer:after {
    clear: both;
}

.card-footer .wcf-left {
    float: left;

}

.card-footer .wcf-right {
    float: right;
}

.price {
    font-size: 18px;
    font-weight: bold;
}

a.buy-btn {
    display: block;
    color: #212121;
    text-align: center;
    font-size: 18px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 50%;
    border: 1px solid #212121;
    transition: all 0.2s ease-in-out;
}

a.buy-btn:hover {
    border-color: #FF9800;
    background: #FF9800;
    color: #fff;
    text-decoration: none;
}

.wsk-btn {
    display: inline-block;
    color: #212121;
    text-align: center;
    font-size: 18px;
    transition: all 0.2s ease-in-out;
    border-color: #FF9800;
    background: #FF9800;
    padding: 12px 30px;
    border-radius: 27px;
    margin: 0 5px;
}

.wsk-btn:hover,
.wsk-btn:focus,
.wsk-btn:active {
    text-decoration: none;
    color: #fff;
}

.red {
    color: #F44336;
    font-size: 22px;
    display: inline-block;
    margin: 0 5px;
}

@media screen and (max-width: 991px) {
    .wsk-cp-product {
        margin: 40px auto;
    }

    .wsk-cp-product .wsk-cp-img {
        top: -40px;
    }

    .wsk-cp-product .wsk-cp-img img {
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    }

    .wsk-cp-product .wsk-cp-text .category>span {
        border-color: #ddd;
        box-shadow: none;
        padding: 11px 28px;
    }

    .wsk-cp-product .wsk-cp-text .category {
        margin-top: 0px;
    }

    a.buy-btn {
        border-color: #FF9800;
        background: #FF9800;
        color: #fff;
    }
}
</style>