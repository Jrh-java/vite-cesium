<template>
     <div class="toolbar">
        <!-- <div style="display: flex;">
            <img src="@/assets/icons/icon-blue.png" alt="logo" style="width:50px" />
            <h3>北港故里运营管理平台</h3>
        </div>
        <el-divider direction="vertical" /> -->
        <!-- 工具栏内容 -->
        <div v-for="(item, index) in comps" style="display: flex;flex-direction: row;">

            <div :class="{ active: item.isActive }" id="toolDiv" @click="toggleActivation(index, item)"
                v-if="!item.isDropdown">
                <i :class="item.img"></i>
                <span> {{ item.name }}</span>

            </div>
            <!-- <div :class="{ active: item.isActive }" id="toolDiv" @click="toggleActivation(index)" v-if="item.isDropdown">
                <img :src="item.img" :alt="item.name">
                <span> {{ item.name }}</span>

            </div> -->
            <div v-if="item.isDropdown" id="toolDiv">
                <i :class="item.img"></i>
                <el-dropdown trigger="click" size="large">

                    <span class="el-dropdown-link">
                        {{ item.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="dropdowniItem in item.children"
                                @click="toggleDropMenu(dropdowniItem, item)">
                                <div :class="{ active: dropdowniItem.isActive }" id="dropdown-div" style="width:100%">
                                    {{
                                        dropdowniItem.name
                                    }}
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <el-divider direction="vertical" v-if="index !== comps.length - 1" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const comps=ref([
    {
        name:"地图",
        img:"iconfont icondiqiu",
        isActive:false,
        isDropdown:false,
    },
    {
        name:"分析",    
        img:"iconfont iconguihua",
        isActive:false,
        isDropdown:true,
        children:[
            {
                name:"天际线",
                isActive:false,
            },
            {
                name:"视域",
                isActive:false,
            },
            {
                name:"可视域",
                isActive:false,
            },
            {
                name:"地形剖面",
                isActive:false,
            },]
    },{
        name:"标绘",
        img:"iconfont iconceliang",
        isActive:false,
        isDropdown:false,
    },{
        name:"查询",
        img:"iconfont iconchaxun",
        isActive:false,
        isDropdown:false,
    },{
        name:"测量",
        img:"iconfont iconceju",
        isActive:false,
        isDropdown:false,
    },{
        name:"图层",
        img:"iconfont icontuceng",
        isActive:false,
        isDropdown:false,
    },{
        name:"图表",
        img:"iconfont icontubiao",
        isActive:false,
        isDropdown:false,
    },{
        name:"视频",
        img:"iconfont iconshipin",
        isActive:false,
        isDropdown:false,
    },{
        name:"数据",
        img:"iconfont iconshuju",
        isActive:false,
        isDropdown:false,
    },{
        name:"设置",
        img:"iconfont iconshezhi",
        isActive:false,
        isDropdown:false,
    }

])
const toggleDropMenu= (dropdowniItem: any, item: any) => {
    dropdowniItem.isActive = !dropdowniItem.isActive
    item.isActive = !item.isActive
}
const toggleActivation= (index: number, item: any) => {
    item.isActive = !item.isActive
}
</script>

<style lang="scss" scoped>
// span里的字号加粗
.toolbar span {
    font-weight: bold;
    font-size: medium;
}

.toolbar {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 6px rgba(4, 19, 223, 0.438);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 9999;
    /* 其他样式属性 */
}

#toolDiv {
    display: flex;
    align-items: center;
    padding: 3px 10px;
    background-color: white;
    //border: 2px solid lightgray;
    border-radius: 4px;
    color: black;
    cursor: pointer;
}

#toolDiv.active {
    background-color: #eaf2ff;
}

#dropdown-div.active {
    background-color: #003aff3b;
}

.el-divider--vertical {
    margin-top: 10px;
}

:deep(.el-popper) {
    inset: 144px auto auto 140px !important;
    position: absolute;
}

//渐隐渐现
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-leave {
    opacity: 0;
}

.fade-div {
    width: 200px;
    height: 185px;
    background-color: white;
    border-radius: 10px;
    padding: 12px;
}

.fade-div-realEstate {
    width: 150px;
    height: 155px;
    background-color: white;
    border-radius: 10px;
    padding: 12px;
}

img {
    margin-right: 7px;
}
#toolDiv>i{

    font-size: 27px;

}

.el-popper.is-pure.is-light.el-dropdown__popper {

    padding: 0;
    inset: 95px auto auto 149px !important;
}
</style>