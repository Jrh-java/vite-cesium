<template>
  <button @click="methods.startRendering">
    <i class="iconfont iconxiangmuguanli" style="font-size: 16px; color: aqua"></i>
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
            'varying vec2 v_textureCoordinates;' +
            'void main(void)' +
            '{' +
            'float depth = czm_readDepth(depthTexture, v_textureCoordinates);' +
            'vec4 color = texture2D(colorTexture, v_textureCoordinates);' +
            'if(depth<1.0 - 0.000001){' +
            'gl_FragColor = color;' +
            '}' +
            'else{' +
            'gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
            '}' +
            '}'
        });

        var postProccessStage1 = new proxy.$Cesium.PostProcessStage({
          name: 'czm_skylinetemp1',
          fragmentShader:
            'uniform sampler2D colorTexture;' +
            'uniform sampler2D redTexture;' +
            'uniform sampler2D silhouetteTexture;' +
            'varying vec2 v_textureCoordinates;' +
            'void main(void)' +
            '{' +
            'vec4 redcolor=texture2D(redTexture, v_textureCoordinates);' +
            'vec4 silhouetteColor = texture2D(silhouetteTexture, v_textureCoordinates);' +
            'vec4 color = texture2D(colorTexture, v_textureCoordinates);' +
            'if(redcolor.r == 1.0){' +
            'gl_FragColor = mix(color, vec4(1.0,0.0,0.0,1.0), silhouetteColor.a);' +
            '}' +
            'else{' +
            'gl_FragColor = color;' +
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
      }
    };
    const data = reactive({
      isAnalysis: false
    });
    // todo
    onMounted(() => {
      //alert(defineProps)
      console.log(props);
      methods.startRendering()
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
