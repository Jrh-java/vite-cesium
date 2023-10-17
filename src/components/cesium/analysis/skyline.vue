<template>
  <button @click="methods.startRendering()">
    <i class="iconfont iconxiangmuguanli" style="font-size: 16px; color: aqua"></i>
    startRendering
  </button>
  <button @click="methods.flyto">
    <i class="iconfont iconxiangmuguanli" style="font-size: 16px; color: aqua"></i>
    flyto
  </button>
  <button @click="methods.setView">
    <i class="iconfont iconxiangmuguanli" style="font-size: 16px; color: aqua"></i>
    setview
  </button>
  <button @click="methods.look">
    <i class="iconfont iconxiangmuguanli" style="font-size: 16px; color: aqua"></i>
    look
  </button>
  <button @click="methods.changecolor">
    <i class="iconfont iconxiangmuguanli" style="font-size: 16px; color: aqua"></i>
    changecolor
  </button>
  <button @click="methods.startRendering('(1.0,1.0,1.0,1.0)', 0.8)">
    变蓝
  </button>
  <button @click="methods.startRendering('(0.0,1.0,1.0,1)', 10)">
    变红
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  defineProps
} from 'vue';
import map from 'ol/map'
import { useStore } from '../../../store/pinia';
import { storeToRefs } from 'pinia';
import { A } from '../utils/test'
import { h } from 'vue'
import { render } from 'vue';
import { onBeforeMount } from 'vue';
import btn from "./index.vue"
export default defineComponent({
  props: ['fatherdata'],

  setup(props) {
   
    let a = A("a", "b", "c")
    console.log(a)
    A("a", "x", "y", "d")
    const store = useStore();
    let viewer: any = store.viewer
    if (viewer == null) {
      //如果viewer为null则等待0.5s再次获取
      setTimeout(() => {
        viewer = store.viewer
      }, 500);
    }
    const { proxy } = getCurrentInstance() as any;
    var analysisCollection = {} as any;
    var entity: any;

    const methods = {
      changecolor() {
        entity.box.material.uniforms.color = proxy.$Cesium.Color.RED;
      },
      startRendering(color = '(1.0,0.0,0.0,1.0)', length = 1) {
        if (data.isAnalysis) {
          methods.clearAnalysisRes();
        } else {
          methods.startAnalysis(color, length);
        }
        data.isAnalysis = !data.isAnalysis;
      },
      flyto() {
        methods.addentity();
        // var heading = proxy.$Cesium.Math.toRadians(0.0);
        // var pitch = proxy.$Cesium.Math.toRadians(-60.0);
        // var range = 5000.0;
        // var i = 0;
        viewer.flyTo(entity, {
          offset: {
            heading: 0,
            pitch: 0,
            range: 0
          }
        });
      },
      setView() {
        methods.addentity();
        // var heading = proxy.$Cesium.Math.toRadians(0.0);
        // var pitch = proxy.$Cesium.Math.toRadians(-60.0);
        // var range = 5000.0;
        // var i = 0;
        viewer.camera.setView({
          destination: proxy.$Cesium.Cartesian3.fromDegrees(123, 22, 100),
          orientation: {
            heading: proxy.$Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north)
            pitch: proxy.$Cesium.Math.toRadians(0.0), // default value (looking down)
            roll: 0 // default value
          }
        });
      },
      look() {
        methods.addentity();
        // var heading = proxy.$Cesium.Math.toRadians(0.0);
        // var pitch = proxy.$Cesium.Math.toRadians(-60.0);
        // var range = 5000.0;
        // var i = 0;
        viewer.camera.look(
          proxy.$Cesium.Cartesian3.fromDegrees(123, 22, 100),
          10
        );
      },
      addentity() {
        entity = new proxy.$Cesium.Entity({
          position: proxy.$Cesium.Cartesian3.fromDegrees(123, 22, 0),
          box: {
            dimensions: new proxy.$Cesium.Cartesian3(40000, 50000, 100),
            shadows: proxy.$Cesium.ShadowMode.ENABLED
          }
        });
        viewer.entities.add(entity);
        //viewer.zoomTo(entity);
      },
      clearAnalysisRes() {
        analysisCollection.removeAll();
      },
      startAnalysis(color = '(1.0,0.0,0.0,1.0)', length = 1) {

        analysisCollection = viewer.scene.postProcessStages;
        var edgeDetection =
          proxy.$Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
        var postProccessStage = new proxy.$Cesium.PostProcessStage({
          name: 'czm_skylinetemp',
          fragmentShader:
            'uniform sampler2D colorTexture;' +
            'uniform sampler2D depthTexture;' +
            'in vec2 v_textureCoordinates;' +
            'out vec4 fragColor;' +
            'void main(void)' +
            '{' +
            'float depth = czm_readDepth(depthTexture, v_textureCoordinates);' +
            'vec4 color = texture(colorTexture, v_textureCoordinates);' +
            'if(depth<1.0 - 0.000001){' +
            'fragColor = color;' +
            '}' +
            'else{' +
            'fragColor = vec4(1.0,0.0,0.0,1.0);' +
            '}' +
            '}'
        });
        var postProccessStage1 = new proxy.$Cesium.PostProcessStage({
          name: 'czm_skylinetemp1',
          fragmentShader:
            'uniform sampler2D colorTexture;' +
            'uniform sampler2D redTexture;' +
            'uniform sampler2D silhouetteTexture;' +
            'in vec2 v_textureCoordinates;' +
            'out vec4 fragColor;' +
            'void main(void)' +
            '{' +
            'vec4 redcolor=texture(redTexture, v_textureCoordinates);' +
            'vec4 silhouetteColor = texture(silhouetteTexture, v_textureCoordinates);' +
            'vec4 color = texture(colorTexture, v_textureCoordinates);' +
            'if(redcolor.r == 1.0){' +
            `fragColor = mix(color, vec4${color}, silhouetteColor.a);` +
            '}' +
            'else{' +
            'fragColor = color;' +
            '}' +
            '}',
          uniforms: {
            redTexture: postProccessStage.name,
            silhouetteTexture: edgeDetection.name,
            lineWidth: 0 // 控制线条宽度的 uniform 变量
          },
          vertexShader:
            'attribute vec3 position;' +
            'attribute vec4 color;' +
            'uniform mat4 modelViewProjection;' +
            'uniform float lineWidth;' +
            'varying vec4 v_color;' +
            'void main() {' +
            'gl_Position = modelViewProjection * vec4(position, 1.0);' +
            'v_color = color;' +
            'vec3 normal = normalize(cross(dFdx(position), dFdy(position)));' +
            'gl_Position.xyz += normal * (lineWidth / 2.0);' +
            '}'
        });
        var postProccessStage = new proxy.$Cesium.PostProcessStageComposite({
          name: 'czm_skyline',
          stages: [edgeDetection, postProccessStage, postProccessStage1],
          inputPreviousStageTexture: false,
          uniforms: edgeDetection.uniforms
        });
        analysisCollection.add(postProccessStage);
      }
    };

    const data = reactive({
      isAnalysis: false
    });
    // todo
    onMounted(() => {
      let dom=document.querySelector('button')!;
      const Vnode= h(btn)
   const htmldiv = document.createElement('div');
   render(Vnode,htmldiv)
   document.body.appendChild(htmldiv.firstElementChild!);
  //dom.insertAdjacentElement('afterend',htmldiv)
    
      
    render(h('div', null, 'hello world'),dom);
      //alert(defineProps)
      console.log(props);
      //methods.startRendering()
    });
    return {
      defineComponent,
      getCurrentInstance,
      onMounted,
      reactive,
      ref,
      defineProps,
      props,
      proxy,
      analysisCollection,
      entity,
      methods,
      data,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
