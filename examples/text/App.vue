<template>
    <Renderer ref="renderer"
              antialias
              :orbit-ctrl="{ enableDamping: true }"
              resize="window">
        <Camera :position="{ z: 10 }" />
        <!-- <Raycaster @click="onClickRaycaster" /> -->
        <Scene>
            <PointLight :position="{ y: 50, z: 50 }" />
            <Text :text="'he'" :fontSrc="'helvetiker_bold.typeface.json'">
            </Text>
        </Scene>
    </Renderer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Box, Camera, LambertMaterial, Raycaster, PointLight, Renderer, Sphere, Scene, Text } from './../../src/export'

export default defineComponent({
    components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, Sphere, Raycaster, Text },
    methods: {

    },
    data() {
        return {
        }
    },
    setup(props): any {

    }
})
</script>

<style>
body,
html {
    margin: 0;
}

canvas {
    display: block;
}
</style>
