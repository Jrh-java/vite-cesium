<template>
  <son @add="add" @minus="minus"></son>
  <span>{{ number }}</span>
</template>
    
<script lang='ts' setup>
import { defineComponent, ref } from 'vue'
import son from './son.vue'




        const number=ref(0);
        const add=(num: number)=>{
            number.value=num;
            console.log(num)
        }
        const minus=(num: number)=>{
            number.value=num;
            console.log(num)
        }
    // todo


</script>
    
<style lang='stylus' scoped></style>
    