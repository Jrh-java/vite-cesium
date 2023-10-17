<template>
    <button @click="add1">+1</button>
    <button @click="minus1">-1</button>
    <div>
        {{ num }}
    </div>
</template>
    
<script lang='ts' setup>
import { defineComponent, ref } from 'vue'


const sonData=ref('sonData是子组件的数据')
const fatherData = defineProps({
    fatherData:String
})
// const father2=defineProps(['fatherData'])
// todo
const emits = defineEmits(['add', 'minus',"sonData"])

let num = ref(0);
const add1 = () => {
    num.value++;
    emits('add', num)
    console.log(fatherData)
    // console.log(father2)
}
const minus1 = () => {
    num.value--;
    emits('minus', num)
}
const sayHello=()=>{
    console.log('子组件在say hello')
}
defineExpose({
    sonData,
    add1,
    minus1,
    num,
    sayHello
})


</script>
    
<style lang='stylus' scoped></style>
    