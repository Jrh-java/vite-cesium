<template>
    <div id="cesiumContainer" class="h-full"></div>
    <!-- <skyline></skyline> -->
    <!-- <labelVue></labelVue> -->
    <!-- <testClick></testClick> -->
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import * as Cesium from 'cesium';
import { useStore } from '../store/pinia';
import { storeToRefs } from 'pinia';
import skyline from './cesium/analysis/skyline.vue';
import labelVue from './cesium/entity/label.vue';
import resizepanel from './widgets/resizepanel.vue';
import testClick from './test/testClick.vue';
import axios from 'axios';
const store = useStore();
let viewer: any

onMounted(async () => {
    console.log()
    viewer = new Cesium.Viewer('cesiumContainer', { animation: false, timeline: false, fullscreenButton: false, infoBox: false, homeButton: false, geocoder: false, sceneModePicker: false, selectionIndicator: false, baseLayerPicker: false, navigationHelpButton: false });
    window["viewer"]=viewer
    // 隐藏版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";
    viewer.scene.setTerrain(
        new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))
    )
    var rectangle = Cesium.Rectangle.fromDegrees(112.30633331500007, 33.12452755500004, 112.30724648200007, 33.125093348000036);
    var imageryProvider = new Cesium.WebMapServiceImageryProvider({
        url: '/localhostapi/geoserver/ne/wms',
        layers: 'ne:蒋庄',
        parameters: {
            service: 'WMS',
            version: '1.1.0',
            request: 'GetMap',
            format: 'image/png',
            transparent: true
        },
        rectangle: rectangle
    });
    var imageryLayer = viewer.imageryLayers.addImageryProvider(imageryProvider);
    const imageryRectangle = imageryLayer.getImageryRectangle();
    // viewer.camera.flyTo({
    //     destination: imageryRectangle
    // });

    // viewer.imageryLayers.addImageryProvider(imageryProvider);
    console.log(viewer, Cesium.Cartesian3.fromDegrees(116.16250361, 39.93487418, 500.0))
    // 将WMTS图层添加到Viewer中
    // 创建Cesium的ImageryProvider对象
    var wmtsImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
        url: '/localhost8080/geoserver/gwc/service/wmts/rest/vitecesium:yulin/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png',
        layer: 'vitecesium:yulin',
        style: '',
        format: 'image/png',
        tileMatrixSetID: 'EPSG:4326',
        tilingScheme: new Cesium.GeographicTilingScheme()
    });
    viewer.scene.imageryLayers.addImageryProvider(wmtsImageryProvider);
    axios.get('/localhost8080/geoserver/beijin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=beijin%3APeking&maxFeatures=50&outputFormat=application%2Fjson').then(res => {
        console.log(res)
        viewer.dataSources.add(Cesium.GeoJsonDataSource.load(res.data, {
            stroke: Cesium.Color.HOTPINK,
            fill: Cesium.Color.PINK.withAlpha(0.5),
            strokeWidth: 13,
            markerSymbol: '?'
        }))
    })
    flyToRectangle([
        Cesium.Cartesian3.fromDegrees(
            116.16235287,39.93580344,
            0
        ),
        Cesium.Cartesian3.fromDegrees(
            116.16236361,39.93587749,
            0
        ),
    ])
    storeToRefs(store).viewer.value = viewer
    viewer.entities.add({

        show: false,
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
            pixelSize: 10,
            color: Cesium.Color.BLUE,
        },
    });
});
/**
  * @description: 飞行定位到一个矩形
  * @return {*}
  */
function flyToRectangle(RectangleCD: Cesium.Cartesian3[]) {

    // 添加定位信息
    RectangleCD = RectangleCD || [
        Cesium.Cartesian3.fromDegrees(
            104.15528644354428,
            30.752166584535513,
            0
        ),
        Cesium.Cartesian3.fromDegrees(
            104.27206271917905,
            30.827572468324576,
            0
        ),
    ];

    var rec = Cesium.Rectangle.fromCartesianArray(RectangleCD);
    var boundingSphere = Cesium.BoundingSphere.fromRectangle3D(rec);
    viewer.camera.flyToBoundingSphere(boundingSphere, {
        duration: 5,
        complete: function () {
        },
        offset: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90),
            range: 0.0,
        },
    });
}
</script>

<style>
#cesiumContainer {
    height: 100%;
    width: 100%;
}

a {
    color: rgb(255, 255, 255)
}
</style>