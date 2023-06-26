<template>
    <div style="height: 100%;width: 100%;">
        <earth></earth>
        <headerVue></headerVue>
    </div>
</template>

<script lang="ts" setup>
import headerVue from './header.vue'
import earth from '../earth.vue'
import entity from '../widgets/entity.vue'
import { onMounted } from 'vue';
onMounted(() => {
    console.log('earth',earth)
})
</script>

<style lang="scss" scoped>

</style>