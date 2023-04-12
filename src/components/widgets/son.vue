<template>
  <button @click="add1">+1</button>
  <button @click="minus1">-1</button>
  <div>
           {{num}}
        </div>
</template>
    
<script lang='ts' setup>
import { defineComponent, ref } from 'vue'
    

    

    // todo
    const emits = defineEmits(['add','minus'])
    let num=ref(0);
    const add1=()=>{
        num.value++;
        emits('add',num)
    }
    const minus1=()=>{
        num.value--;
        emits('minus',num)
    }



</script>
    
<style lang='stylus' scoped></style>
    