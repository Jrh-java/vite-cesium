<template>
    <div>
        我是daughter组件
        <el-button type="primary" @click="add()">add</el-button>
        <el-button type="primary" @click="add2()">add2</el-button>
        <el-button type="primary" @click="openPanel()">打开弹窗</el-button>
        <el-button type="" @click="minus">minus</el-button>
    </div>
</template>

<script lang="ts">
import { h } from 'vue'
import resizepanel from './resizepanel.vue'
export default {
    props: {
    receivedValue: {
      type: String,
      required: true
    },
    fatherData:String
  },
  
    setup (props,context) {
   
       // const emits = defineEmits(['add'])
        console.log(props.fatherData)
        console.log(props,context)
        const add=()=>{
            context.emit('add', 1)
        }
        const add2=()=>{
            emits('add', "我是daughter组件的数据")
            // context.
        }
        const minus=()=>{
            context.emit('minus', -1)
        }
        return {add,minus,add2}
    }
}
</script>

<style lang="scss" scoped>

</style>