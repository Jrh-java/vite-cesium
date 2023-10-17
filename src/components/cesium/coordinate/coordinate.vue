<template>
    <div>
        <div ref="mapCoordinate"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '../../../store/pinia';
import * as Cesium from 'cesium';
const viewer = ref()
const mapCoordinate = ref()
// var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
// //Cesium.ScreenSpaceEventType.MOUSE_MOVE ：监听鼠标移动
// handler.setInputAction(function(event) {

// }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
const show3DCoordinate = (coordinatesDiv) => {
    coordinatesDiv.style.zIndex = "50";
    coordinatesDiv.style.bottom = "1px";
    coordinatesDiv.style.height = "29px";
    coordinatesDiv.style.position = "absolute";
    coordinatesDiv.style.overflow = "hidden";
    coordinatesDiv.style.textAlign = "center";
    coordinatesDiv.style.padding = '0 10px';
    coordinatesDiv.style.background = "rgba(0,0,0,0.5)";
    coordinatesDiv.style.left = "0";
    coordinatesDiv.style.bottom = "0";
    coordinatesDiv.style.lineHeight = "29px";
    coordinatesDiv.innerHTML = "<span id='cd_label' style='font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;'>暂无坐标信息</span>";

    var handler3D = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas);
    handler3D.setInputAction((movement) => {
        var pick = new Cesium.Cartesian2(movement.endPosition.x, movement.endPosition.y);
        if (pick) {
            var cartesian = viewer.value.scene.globe.pick(viewer.value.camera.getPickRay(pick), viewer.value.scene);
            if (cartesian) {
                var cartographic = viewer.value.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                if (cartographic) {
                    var height = viewer.value.scene.globe.getHeight(cartographic);
                    var he = Math.sqrt(viewer.value.scene.camera.positionWC.x * viewer.value.scene.camera.positionWC.x + viewer.value.scene.camera.positionWC.y * viewer.value.scene.camera.positionWC.y + viewer.value.scene.camera.positionWC.z * viewer.value.scene.camera.positionWC.z);
                    var he2 = Math.sqrt(cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z);
                    var point = [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
                    if (!height) {
                        height = 0;
                    }
                    if (!he) {
                        he = 0;
                    }
                    if (!he2) {
                        he2 = 0;
                    }
                    if (!point) {
                        point = [0, 0];
                    }
                    coordinatesDiv.innerHTML = "<span id='cd_label' style='font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;'>视角高度:" + (he - he2).toFixed(2) + "米&nbsp;&nbsp;&nbsp;&nbsp;海拔高度:" + height.toFixed(2) + "米&nbsp;&nbsp;&nbsp;&nbsp;经度：" + point[0].toFixed(6) + "&nbsp;&nbsp;纬度：" + point[1].toFixed(6) + "</span>";
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE );
}
onMounted(async () => {
    console.log(mapCoordinate.value)
    viewer.value =await useStore().getViewer()
    console.log(viewer.value)
    show3DCoordinate(mapCoordinate.value)
    // 绑定屏幕空间事件
    // handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    // handler.setInputAction(function(event) {
    //     console.log('shift + 左键单击', event.position);
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK, Cesium.KeyboardEventModifier.SHIFT);
})
</script>

<style scoped></style>