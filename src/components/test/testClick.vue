<template>
    <div>   
        <el-button type="primary" @click="addClickEvent()">鼠标点击事件</el-button> 
        <el-button type="primary" @click="removeClickEvent()">移除鼠标点击事件</el-button> 
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '../../store/pinia';

const viewer=ref()
var handler :any;
const addClickEvent = () => {
    // 绑定屏幕空间事件
 handler = new Cesium.ScreenSpaceEventHandler(viewer.value.canvas);
handler.setInputAction(function(event){
    console.log('shift + 左键单击', event.position);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK, Cesium.KeyboardEventModifier.SHIFT);
}
const removeClickEvent = () => {
    // 移除屏幕空间事件
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK, Cesium.KeyboardEventModifier.SHIFT);
}
const store = useStore();
onMounted(async() => {
        // getViewer()
        // viewer.value=await store.getViewer()
        // console.log(viewer)
    })
</script>

<style scoped>

</style>