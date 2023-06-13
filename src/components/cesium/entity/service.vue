<template>
    <div>

    </div>
</template>

<script setup>
import * as Cesium from 'cesium';
var imageryLayers = viewer.imageryLayers;
var wmsLayer = imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    url : 'https://mywms.com/wms',
    layers : 'mylayer',
    parameters : {
        transparent : true,
        format : 'image/png'
    }
}));
</script>

<style lang="scss" scoped>

</style>