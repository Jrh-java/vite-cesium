<template>
    <div id="cesiumContainer" class="h-full"></div>
    <skyline></skyline>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';
import { useStore } from '../store/pinia';
import { storeToRefs } from 'pinia'; 
import skyline from './cesium/analysis/skyline.vue';
const store = useStore();

onMounted(() => {
    
    let viewer: any = new Cesium.Viewer('cesiumContainer');
    storeToRefs(store).viewer.value = viewer
    viewer.entities.add({
        
        show  :false,
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
            pixelSize: 10,
            color: Cesium.Color.BLUE,
        },
    });
});
</script>

<style>
#cesiumContainer {
    height: 100%;
    width: 100%;
}
a{
    color:rgb(255, 255, 255)
}

</style>