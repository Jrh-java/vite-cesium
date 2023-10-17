<template>
  <son @add="add" @minus="minus" :fatherData=fatherData ref="sonVue"></son>
  <daughter @add="add2" @minus="minus2" :fatherData=fatherData></daughter>
  <span>{{ number }}</span>
</template>
    
<script lang='ts' setup>
import { defineComponent, ref } from 'vue'
import son from './son.vue'
import daughter from './daughter.vue';
        const sonVue=ref()
        
        const fatherData=ref("我是father组件");
        const number=ref(0);
        // const sonData=ref()
        // console.log (sonData)
        const add=(num: number)=>{
            console.log(sonVue.value.sonData)
            sonVue.value.sayHello();
            number.value=num;
            console.log(num+123)
        }
        const minus=(num: number)=>{
            number.value=num;
            console.log(num)
        }
        const add2=(str: any)=>{
            console.log(str)
        }
        const minus2=(num: number)=>{
            number.value=num;
            console.log(num)
        }
    // todo


</script>
    
<style lang='stylus' scoped></style>
    