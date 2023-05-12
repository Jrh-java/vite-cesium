<template>
  <button @click="methods.startRendering">
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
  <button @click="methods.addLineWidth">
    addLineWidth
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
import { useStore } from '../../../store/pinia';
import { storeToRefs } from 'pinia';
export default defineComponent({
  props: ['fatherdata'],

  setup(props) {
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
      startRendering() {
        methods.addentity();
        if (data.isAnalysis) {
          methods.clearAnalysisRes();
        } else {
          methods.startAnalysis();
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
      startAnalysis() {
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
            'fragColor = mix(color, vec4(1.0,0.0,0.0,1.0), silhouetteColor.a);' +
            '}' +
            'else{' +
            'fragColor = color;' +
            '}' +
            '}',
          uniforms: {
            redTexture: postProccessStage.name,
            silhouetteTexture: edgeDetection.name
          }
        });
        var postProccessStage = new proxy.$Cesium.PostProcessStageComposite({
          name: 'czm_skyline',
          stages: [edgeDetection, postProccessStage, postProccessStage1],
          inputPreviousStageTexture: false,
          uniforms: edgeDetection.uniforms
        });
        analysisCollection.add(postProccessStage);
      },
      addLineWidth() {
        // 获取后期处理阶段组合
        const postProcessStage = viewer.scene.postProcessStages.getByName('czm_skyline');

        // 获取当前线条宽度
        const lineWidth = postProcessStage.uniforms.lineWidth;

        // 将线条宽度增加 1
        postProcessStage.uniforms.lineWidth = lineWidth + 1;
      }
    };

    const data = reactive({
      isAnalysis: false
    });
    // todo
    onMounted(() => {
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
