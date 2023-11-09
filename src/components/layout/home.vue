<template>
    <div style="height: 100%;width: 100%;">
        <earth></earth>
        <!-- <headerVue></headerVue> -->
        <topLeft ></topLeft>
        <coordinate></coordinate>
        <!-- <measure></measure> -->
        <layerList></layerList>
    </div>
</template>

<script lang="ts" setup>
import headerVue from './header.vue'
import earth from '../earth.vue'
import entity from '../widgets/entity.vue'
import topLeft from './topLeft.vue';
import coordinate from '../cesium/coordinate/coordinate.vue'
import measure  from '../cesium/measure/measure.vue';
import { onMounted } from 'vue';
import layerList from '../cesium/layerList/layerList.vue';
onMounted(() => {
    console.log('earth',earth)
})
</script>

<style lang="scss" scoped>

</style>