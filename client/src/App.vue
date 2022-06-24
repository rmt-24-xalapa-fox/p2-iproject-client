<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/Navbar.vue'
import XenditModal from '@/components/XenditModal.vue'
import { mapWritableState } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default {
  components: {
    RouterLink,
    RouterView,
    NavBar,
    XenditModal
  },
  computed: {
    ...mapWritableState(useCounterStore, ['errorHandler','linkXendit','showModal'])
  },
  watch:{
    errorHandler(newValue,oldValue){
      if(oldValue!=""){
        this.errorHandling(newValue);
      }
    },
    linkXendit(newValue,oldValue){
      if(newValue!=""){
        console.log(oldValue);
        console.log(newValue);

      }
    }
  },
  methods:{
    errorHandling(message) {
  let x = document.getElementById("snackbar");
  x.className = "show";
  x.innerHTML=message;
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
},
    buyCoinPopup(){

    }
  }
  
}
</script>

<template>
  <header>
    <NavBar />

    
  </header>
  <body>
  <router-view :key="$route.fullPath"></router-view>
  <XenditModal :show="showModal" @close="showModal = false" />
    <div id="snackbar">Some text some message..</div>
    <div class="modal-background"></div>
                    <div class="modal-popup">
                        <div class="modal-popup__icon-close"></div>
                        <iframe
                            v-if="linkXendit!=''"
                            :src="linkXendit"
                            class="iframe-invoice"
                            title="Invoice"
                        ></iframe>
                    </div>
  </body>
</template>

<style>
@import '@/assets/base.css';
body { padding-top: 45px; }
@media screen and (max-width: 768px) {
    body { padding-top: 50px; }
}
#snackbar {
        visibility: hidden;
        min-width: 250px;
        margin-left: -125px;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        padding: 16px;
        position: fixed;
        z-index: 1;
        left: 50%;
        bottom: 30px;
        font-size: 17px;
      }
      
      #snackbar.show {
        visibility: visible;
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }
      
      @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;} 
        to {bottom: 30px; opacity: 1;}
      }
      
      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }
      
      @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;} 
        to {bottom: 0; opacity: 0;}
      }
      
      @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }

.modal-background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1010;
    background-color: rgba(0, 0, 0, 0.65);
    display: none;
}

.modal-background--blackout {
    display: block;
}

.modal-popup {
    height: calc(100vh - 150px);
    width: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1011;
    background-color: #ffffff;
    transform: translateX(-50%) translateY(calc(-50% - 0.5px));
}

.modal-popup__icon-close {
    width: 30px;
    height: 30px;
    position: absolute;
    right: -15px;
    top: -15px;
    cursor: pointer;
    background: url(/images/store/icon-times.svg) center no-repeat #4573ff;
}

.modal-popup,
.modal-popup__icon-close {
    opacity: 0;
    pointer-events: none;
    transition: all 300ms ease-in-out;
}

.modal-popup--visible,
.modal-popup--visible .modal-popup__icon-close {
    opacity: 1;
    pointer-events: auto;
}

/* iFrame */
.iframe-invoice {
    height: inherit;
    width: inherit;
    border: 0;
    overflow-y: scroll;
}

@media screen and (max-width: 768px) {
    /* Configuration */
    .configure {
        flex: 0 0 100%;
    }
    /* Modal */
    .modal-popup {
        height: calc(100% - 40px);
        width: calc(100vw - 40px);
    }
}
</style>
