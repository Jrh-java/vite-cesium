<template>
    <div>
        <div>
        <el-button type="primary" @click="addEntities()">添加模型</el-button>
    </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '../../../store/pinia';
import * as Cesium from 'cesium'
const viewer = ref() as any;
const addEntities = async () => {
    var parentEntity = viewer.value.entities.add({
        name:"我是一个实体组",
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        ellipse: {
            semiMinorAxis: 100000.0,
            semiMajorAxis: 200000.0,
            material: Cesium.Color.RED.withAlpha(0.5)
        },
        point: {
 
                pixelSize: 10,
                color: Cesium.Color.YELLOW
            
        },
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                -75.59777, 40.03883,
                -80.03755, 42.03943,
                -84.56789, 42.12345
            ]),
            material: Cesium.Color.BLUE.withAlpha(0.5)
        }
    });
    viewer.value.flyTo(parentEntity);
}
onMounted(async () => {
    viewer.value =  await useStore().getViewer()
    console.log(viewer.value,"viewer")
})
</script>

<style scoped>

</style>