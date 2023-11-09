<template>
    <div v-if="data.isActive">
       
            <el-dialog v-model="data.dialogVisible" :title="data.name" width="30%" :before-close="handleClose" draggable :modal=false  :close-on-click-modal="false">
                <!-- 写一个动态组件 -->
                <component :is="data.dynamicComponent"></component>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="data.dialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="data.dialogVisible = false">
                            Confirm
                        </el-button>
                    </span>
                </template>
            </el-dialog>
 
    </div>
</template>

<script setup lang="ts">

import { ElMessageBox } from 'element-plus'
import { reactive } from 'vue';

const data = reactive({
    dialogVisible: false,
    isActive: false,
    name: '未知组件',
    dynamicComponent: 'skylineVue',
})
class parameter {
    name: string
    component: string
    isActive: boolean = false
    constructor(name: string, component: string) {
        this.name = name
        this.component = component
    }
}
function changeWidget (param: parameter){
    data.dynamicComponent = param.component
    data.name = param.name
    data.isActive = param.isActive
    data.dialogVisible = param.isActive
    console.log(data.dynamicComponent)
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
defineExpose({
    changeWidget

})
</script>

<style lang="scss" scoped></style>