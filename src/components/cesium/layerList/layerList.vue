<template>
    <div>
        <div class="button-panel" ref="buttonPanel">
            <el-button @click="openPanel" style="width: 35px;height: 35px;">
                <el-icon>
                    <Expand />
                </el-icon>
            </el-button>
        </div>
        <div class="list-panel" ref="listPanel">
            <el-icon @click="openPanel">
                <Back />
            </el-icon>
            <el-button type="primary" @click="addLayer">添加图层</el-button>
            <entities></entities>
            <measure></measure>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useStore } from '../../../store/pinia';
import entities from '../entity/entities.vue';
import * as Cesium from 'cesium';
import measure from '../measure/measure.vue';
const listPanel = ref<HTMLElement | null>() as any;
const buttonPanel = ref<HTMLElement | null>() as any;
const layerList = ref() as any;
const viewer = ref() as any;

const addLayer = async () => {
    // axios.get("public/layer/china.json").then(async (res)=>{
    //     console.log(res.data)
    //     const data = res.data;
    //     const china = await Cesium.GeoJsonDataSource.load(data);
    //     layerList.value.add(china);
    // })
    let chinaData = await Cesium.GeoJsonDataSource.load("public/layer/china.json");
    store.viewer.dataSources.add(chinaData);
}
const openPanel = () => {

    if (listPanel.value?.style.left === '-300px'||listPanel.value?.style.left === '') {
        listPanel.value.style.left = '0px';
        buttonPanel.value.style.display = 'none';

    } else {
        listPanel.value.style.left = '-300px';
        buttonPanel.value.style.display = 'block';
    }
}
const store = useStore() as any;

onMounted(() => {

    //  console.log(viewer.value,"viewer")
    // listPanel.value = viewer?.imageryLayers;
    // console.log(listPanel.value)
})
</script>

<style scoped>
.list-panel {
    position: absolute;
    top: 20%;
    left: -300px;
    width: 300px;
    height: 60%;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    z-index: 999;
}

.button-panel {
    position: absolute;
    top: 100px;
    left: 20px;
    z-index: 1000;
}

.list-panel>i {
    font-size: 30px;
    position: absolute;
    left: 10px;
    top: 10px;

}</style>