<script>
export default {
    props: ['color'],
    data() {
        return {
            activeColor: this.color.hex_value,
            theHeight: 20,
            theMargin: 4
        }
    }
}
</script>
<template>
    <div class="color d-inline-flex " :style="{ 'background-color': activeColor,height:theHeight+'px',margin:theMargin+'px' }">
        <div class="color" style="height:20px;margin: 4px;width: 20px;border-radius: 50%;"></div>
    </div>
</template>