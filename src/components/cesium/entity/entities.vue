<template>
    <div>
        <el-button type="primary" @click="addEntities()">添加模型</el-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useStore } from '../../../store/pinia';
import * as Cesium from 'cesium'
const viewer = ref() as any
const store = useStore()
const addEntities = () => {
    //    // 创建第一个entityCollection
    // var entityCollection1 = new Cesium.EntityCollection();

    // // 创建第二个entityCollection
    // var entityCollection2 = new Cesium.EntityCollection();

    // // 创建第一个实体
    // var entity1 = new Cesium.Entity({
    //     name: '实体1',
    //     position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    //     point: {
    //         pixelSize: 100,
    //         color: Cesium.Color.RED
    //     }
    // });

    // // 创建第二个实体
    // var entity2 = new Cesium.Entity({
    //     name: '实体2',
    //     position: Cesium.Cartesian3.fromDegrees(-80.03755, 42.03943),
    //     point: {
    //         pixelSize: 100,
    //         color: Cesium.Color.BLUE
    //     }
    // });

    // // 将实体1添加到entityCollection1中
    // entityCollection1.add(entity1);

    // // 将实体2添加到entityCollection2中
    // entityCollection2.add(entity2);

    // // 将entityCollection1添加到viewer.entities中
    // viewer.value.entities.add(entityCollection1);

    // 将entityCollection2添加到viewer.entities中
    // viewer.value.entities.add(entityCollection2);
    var parentEntity = viewer.value.entities.add({
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
    // getViewer()
    viewer.value = await store.getViewer()
    console.log(viewer)
})
</script>

<style scoped></style>