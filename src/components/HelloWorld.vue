<template>
    <div id="cesiumContainer" class="h-full"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';

let viewer;
onMounted(() => {
    viewer = new Cesium.Viewer('cesiumContainer');
    viewer.entities.add({
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