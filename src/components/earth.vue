<template>
    <div id="cesiumContainer" class="h-full"></div>
    <skyline></skyline>
    <labelVue></labelVue>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import * as Cesium from 'cesium';
import { useStore } from '../store/pinia';
import { storeToRefs } from 'pinia'; 
import skyline from './cesium/analysis/skyline.vue';
import labelVue from './cesium/entity/label.vue';
const store = useStore();
let viewer: any
onMounted(() => {
    
    viewer= new Cesium.Viewer('cesiumContainer');
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