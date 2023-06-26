<template>
    <div>
        <div style="height: 100px;width: 100%;position: absolute;top: 0;background: rgb(162 180 247 / 67%);">

            <el-button  @click="data.dialogVisible = true,changeWidget(index)" v-for=" (item,index) in config.widgetArr">
                {{ item.name  }}
            </el-button>

            <el-dialog v-model="data.dialogVisible" title="Tips" width="30%" :before-close="handleClose">
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
    </div>
</template>

<script setup lang="ts">

import config from './config.json'
import { ElMessageBox } from 'element-plus'
import { reactive } from 'vue';

const data = reactive({
    dialogVisible: false,
    isAnalysis: false,
    dynamicComponent: 'skylineVue',
    widgetIndex: 0
})
function changeWidget (index: number){
    data.widgetIndex = index
    data.dynamicComponent = config.widgetArr[index].component
    console.log(data.dynamicComponent)
}
console.log(config, 'headerCOnfig')
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style lang="scss" scoped></style>