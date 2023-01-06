// import { meshComponent } from 'troisjs/src/meshes/Mesh'
// import { props } from 'troisjs/src/geometries/BoxGeometry'
// import type { SceneInjectionKey } from 'troisjs/src/core/Scene'
// import { BoxGeometry } from 'three'
// import type { ComponentPropsOptions, ComponentPublicInstance, InjectionKey, watch } from 'vue'
import { defineComponent, watch } from 'vue'
import { Plane, Vector3, Material, Mesh as TMesh, GridHelper as TGridHelper } from 'three'
import Object3D from '../core/Object3D'
import Mesh from '../meshes/Mesh'
// import type { Object3DSetupInterface } from 'troisjs/src/core/Object3D'
import { bindProp } from '../tools'

// export interface MeshSetupInterface extends Object3DSetupInterface {
//     mesh?: TMesh
//     geometry?: BufferGeometry
//     material?: Material
//     loading?: boolean
// }

// export interface MeshInterface extends MeshSetupInterface {
//     setGeometry(g: BufferGeometry): void
//     setMaterial(m: Material): void
// }

// export interface MeshPublicInterface extends ComponentPublicInstance, MeshInterface { }

// export const MeshInjectionKey: InjectionKey<MeshPublicInterface> = Symbol('Mesh')

const props = {
    size: { type: Number, required: true, default: 100 },
    divisions: { type: Number, required: true, default: 10 },
    color1: { type: Number, default: 2 },
    color2: { type: Number, default: 2 },
}

export default defineComponent({
    extends: Object3D,
    name: "Grid",
    props,
    provide() {
        return {
            // [MeshInjectionKey as symbol]: this,
        }
    },
    mounted() {
        // @ts-ignore
        if(!this.mesh) this.initMesh()

        // add watchers
        const watchProps = ['size', 'divisions', 'color1', 'color2']
        watchProps.forEach(p => {
            // @ts-ignore
            watch(() => this[p], () => {
                this.refreshGeometry()
            })
        })
    },
    unmounted() {
        // @ts-ignore
        if(this.mesh) this.removeFromParent(this.mesh)
    },
    methods: {
        initMesh() {
            var gridHelper = new TGridHelper(this.size, this.divisions, this.color1, this.color2);
            gridHelper.geometry.rotateX(Math.PI / 2);
            (gridHelper.material as Material).clippingPlanes = [
                new Plane(new Vector3(1, 0, 0), this.size / 4),
                new Plane(new Vector3(-1, 0, 0), this.size / 4),
                new Plane(new Vector3(0, 1, 0), this.size / 4),
                new Plane(new Vector3(0, -1, 0), this.size / 4),
            ]
            // console.log(gridHelper.material.clippingPlanes)

            bindProp(this, 'castShadow', gridHelper)
            bindProp(this, 'receiveShadow', gridHelper)

            // console.log(gridHelper, this.size, this.divisions, this.color1, this.color2)
            // @ts-ignore
            this.mesh = gridHelper
            this.initObject3D(gridHelper)
        },
        refreshGeometry() {
            // @ts-ignore
            this.getParent().remove(this.mesh)
            // this.mesh.traverse(el => {

            //     if (el.geometry) {
            //         el.geometry.dispose();
            //     }
            // })
            // @ts-ignore
            this.mesh.dispose();
            // this.mesh.geometry.dispose();
            // this.mesh.material.dispose();
            this.initMesh();
            // const oldGeo = this.geometry
            // this.createGeometry()
            // if (this.mesh && this.geometry) this.mesh.geometry = this.geometry
            // oldGeo?.dispose()
        },
    }
})
