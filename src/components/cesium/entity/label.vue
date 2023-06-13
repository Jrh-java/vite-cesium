<template>
    <div>
        <button @click="methods.addLabel()">
    创建标签
  </button>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
import { useStore } from '../../../store/pinia';
const { proxy } = getCurrentInstance() as any;
const store = useStore();
const methods = {
    addLabel() {
       // 创建一个Label对象
const label = viewer.entities.add({
  position: proxy.$Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
  label: {
    text: 'Hello, world!',
    font: '24px sans-serif',
    fillColor: proxy.$Cesium.Color.WHITE,
    outlineColor: proxy.$Cesium.Color.BLACK,
    outlineWidth: 2,
    style: proxy.$Cesium.LabelStyle.FILL_AND_OUTLINE,
    pixelOffset: new proxy.$Cesium.Cartesian2(0, -50),
    heightReference: proxy.$Cesium.HeightReference.CLAMP_TO_GROUND
  }
});

// 创建一个Arrow对象
const arrow = viewer.entities.add({
  polyline: {
    positions: [
      proxy.$Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163611, 39.9522222),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163611, 39.952667),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163056, 39.952),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163611, 39.951333),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163611, 39.951778),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.1641667, 39.951778),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.1641667, 39.951333),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163611, 39.950667),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163611, 39.951111),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.1641667, 39.951111),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.1641667, 39.950667),
      proxy.$Cesium.Cartesian3.fromDegrees(-75.163611, 39.95)
    ],
    width: 2,
    material: proxy.$Cesium.Color.RED
  }
});


//Label和Polyline连接起来
label.position = new proxy.$Cesium.CallbackProperty(() => {
  return arrow.polyline.positions.getValue()[0];
}, false);
viewer.flyTo(label, {
    duration: 1,
    offset: new proxy.$Cesium.HeadingPitchRange(0, proxy.$Cesium.Math.toRadians(-35), 2000)
});
    }
    
}
    // let viewer: any = store.viewer
    // let timeMachine: any
    
    // const getViewer = () => {
    //     viewer = store.viewer
    //     if (viewer == null) {
    //   //如果viewer为null则等待0.5s再次获取
    //    timeMachine= setInterval(() => {
    //     getViewer()
    //   }, 500);
    // }else{
    //     clearInterval(timeMachine)
    // }
    // }
    var viewer :any;
    onMounted(async() => {
        // getViewer()
        viewer=await store.getViewer()
        console.log(viewer)
    })

</script>

<style lang="scss" scoped>

</style>