<template>
    <Renderer ref="renderer"
              antialias
              :orbit-ctrl="{ enableDamping: true, autoRotateThreshold: 0.1 }"
              resize="window">
        <Camera :position="{ z: 10 }" />
        <Scene>
            <AmbientLight :intensity="0.2"/>
            <PointLight :position="{ y: 20, z: 20 }" />
            <Box :position="{ x: -0.0, y: -0.2, z: 0 }" :width="10" :height="0.1" :depth="10">
                <LambertMaterial :color="'#44eeff'" />
            </Box>
            <Sphere :radius="0.1">
                <LambertMaterial :color="'#ABF8E4'"/>
            </Sphere>
        </Scene>
    </Renderer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Box, Sphere,Camera, ExtrudeGeometry, AmbientLight,LambertMaterial, Mesh, MeshPublicInterface, PointLight, Renderer, RendererPublicInterface, Scene } from './../../src/export'
import { Shape, Vector3 } from 'three';

export default defineComponent({
    components: { Box, Sphere,Camera, LambertMaterial,AmbientLight, PointLight, Renderer, Scene, Mesh, ExtrudeGeometry },
    data() {
        return {
            shape: new Shape(),
            options: { bevelEnabled: false, depth: 1.0 },
            position: new Vector3(1,0,1)
        }
    },
    mounted() {
        let size = 2;
        this.shape = new Shape();
        this.shape.moveTo(0, 0);
        this.shape.lineTo(-1 * size, 0.);
        this.shape.lineTo(-1 * size, size/2);
        this.shape.lineTo(0, size);
        this.shape.lineTo(0, 0);
        const renderer = this.$refs.renderer as RendererPublicInterface
        // const mesh = (this.$refs.box as MeshPublicInterface).mesh
        // if (renderer && mesh) {
        //     renderer.onBeforeRender(() => {
        //         // mesh.rotation.x += 0.01
        //     })
        // }
    },
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
