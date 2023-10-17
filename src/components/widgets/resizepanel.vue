<template>
   <div class="resizable-draggable" ref="containerRef" v-resizeBottom>
    <div class="resize-handle" @mousedown="startResize"></div>
    <div class="draggable" :style="{ left: draggableLeft + 'px', top: draggableTop + 'px' }" @mousedown="startDrag">
      <p>可重塑和移动的div</p>
    </div>
  </div>
  </template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isResizing = ref(false);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const draggableLeft = ref(0);
const draggableTop = ref(0);

const containerRef = ref(null);

const startResize = (event) => {
  isResizing.value = true;
  startX.value = event.clientX;
  startY.value = event.clientY;

  // 添加mousemove事件监听器
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
};

const resize = (event) => {
  //   if (isResizing.value) {
  //   const containerRect = containerRef.value.getBoundingClientRect();
  //   const mouseX = event.clientX - containerRect.left;
  //   const mouseY = event.clientY - containerRect.top;

  //   const deltaX = mouseX - lastMouseX.value;
  //   const deltaY = mouseY - lastMouseY.value;

  //   let newWidth = containerRef.value.offsetWidth;
  //   let newHeight = containerRef.value.offsetHeight;

  //   if (resizeDirection.value.includes('left')) {
  //     newWidth -= deltaX;
  //     containerRef.value.style.left = containerRef.value.offsetLeft + deltaX + 'px';
  //   }

  //   if (resizeDirection.value.includes('top')) {
  //     newHeight -= deltaY;
  //     containerRef.value.style.top = containerRef.value.offsetTop + deltaY + 'px';
  //   }

  //   if (resizeDirection.value.includes('right')) {
  //     newWidth += deltaX;
  //   }

  //   if (resizeDirection.value.includes('bottom')) {
  //     newHeight += deltaY;
  //   }

  //   containerRef.value.style.width = newWidth + 'px';
  //   containerRef.value.style.height = newHeight + 'px';

  //   lastMouseX.value = mouseX;
  //   lastMouseY.value = mouseY;
  // }
};

const stopResize = () => {
  isResizing.value = false;

  // 移除mousemove事件监听器
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
};

const startDrag = (event) => {
  isDragging.value = true;
  startX.value = event.clientX;
  startY.value = event.clientY;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
};

const drag = (event) => {
  if (isDragging.value) {
    const deltaX = event.clientX - startX.value;
    const deltaY = event.clientY - startY.value;
    draggableLeft.value += deltaX;
    draggableTop.value += deltaY;
    startX.value = event.clientX;
    startY.value = event.clientY;
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
};

onMounted(() => {
  const containerElement = containerRef.value;
});

onUnmounted(() => {
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
});
</script>

<style scoped>
.resizable-draggable {
  position: relative;
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  overflow: auto;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: ns-resize;
}

.draggable {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 200px;
  height: 100px;
  background-color: #f0f0f0;
  cursor: move;
}
</style>