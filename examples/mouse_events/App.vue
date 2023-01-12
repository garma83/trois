<template>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true }" resize="window">
    <Camera :position="{ z: 10 }" />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box :size="1" ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }" @click="onClick" @pointerDown="onPointerDown" @pointerMove="onPointerMove">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Box, Camera, LambertMaterial, MeshPublicInterface, PointLight, Renderer, RendererPublicInterface, Scene } from './../../src/export'

export default defineComponent({
  components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
  methods: {
    onClick(event){
        console.log("Mesh clicked")
    },
    onPointerDown(event){
        console.log("Mesh mouse down")
    },
    onPointerMove(event){
        console.log("Mesh mouse moved")
    }
  }
})
</script>

<style>
body, html {
  margin: 0;
}
canvas {
  display: block;
}
</style>
