<template>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true }" resize="window">
    <Camera :position="{ z: 10 }" />
    <!-- <Raycaster @click="onClickRaycaster" /> -->
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box :size="1" ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }" @click="onClickBox" @pointerDown="onPointerDown" @pointerMove="onPointerMove">
        <LambertMaterial />
      </Box>
      <Sphere :position="{ y: 2, z: 0 }" :radius="1" ref="sphere" @click="onClickSphere" @pointerDown="onPointerDown" @pointerMove="onPointerMove">
        <LambertMaterial />
      </Sphere>
    </Scene>
  </Renderer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Box, Camera, LambertMaterial, Raycaster, PointLight, Renderer, Sphere, Scene } from './../../src/export'

export default defineComponent({
  components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, Sphere,Raycaster },
  methods: {
    onClickBox(event){
        console.log("Box clicked")
    },
    onClickRaycaster(event){
        console.log("Raycaster clicked")
    },
    onClickSphere(event){
        console.log("Sphere clicked")
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
