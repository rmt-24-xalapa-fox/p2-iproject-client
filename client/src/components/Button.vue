<script>
export default {
    props: ["page"],
};
</script>

<template>
    <div class="row mb-3 px-3">
        <button type="submit" class="btn btn-blue text-center">{{ page }}</button>
    </div>
</template>


<style scoped>
.btn-blue {
    background-color: #1A237E;
    width: 150px;
    color: #fff;
    border-radius: 2px;
}

.btn-blue:hover {
    background-color: #3d76e0;
    color: white;
    cursor: pointer;
}
</style>