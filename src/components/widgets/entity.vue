<template>
    <div>
        <elButton @click="addWMS">添加wms服务</elButton>
        <elButton @click="addWFS">添加wfs服务</elButton>
        <elButton @click="addwmts">添加wmts服务</elButton>
    </div>
</template>

<script setup lang="ts">
const addWMS = () => {
    console.log('addWMS')
}   
const addWFS = () => {
    console.log('addWFS')
}
const addwmts = () => {
    console.log('addwmts')
}
</script>

<style lang="scss" scoped>

</style>