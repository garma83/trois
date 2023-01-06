import { defineComponent, watch } from 'vue'
import { GridHelper as TGridHelper } from 'three'
import Object3D from '../core/Object3D'
import type { Object3DSetupInterface } from '../core/Object3D'
import { bindProp } from '../tools'

export interface MeshSetupInterface extends Object3DSetupInterface {
    helper?: TGridHelper
}

const props = {
    size: { type: Number, required: true, default: 100 },
    divisions: { type: Number, required: true, default: 10 },
    color1: { type: Number },
    color2: { type: Number },
}

export default defineComponent({
    extends: Object3D,
    name: "GridHelper",
    props,
    setup(): MeshSetupInterface {
        return {}
    },
    mounted() {
        if (!this.helper) this.initHelper()

        // add watchers
        const watchProps = ['size', 'divisions', 'color1', 'color2']
        watchProps.forEach(p => {
            // @ts-ignore
            watch(() => this[p], () => {
                this.refreshHelper()
            })
        })
    },
    unmounted() {
        this.destroyHelper();
    },
    methods: {
        initHelper() {
            this.helper = new TGridHelper(this.size, this.divisions, this.color1, this.color2);

            bindProp(this, 'castShadow', this.helper)
            bindProp(this, 'receiveShadow', this.helper)

            this.initObject3D(this.helper)
        },
        destroyHelper() {
            if (this.helper) this.removeFromParent(this.helper)
            // @ts-ignore
            this.getParent()?.remove(this.helper)
            // @ts-ignore
            this.helper?.dispose();
        },
        refreshHelper() {
            this.destroyHelper();
            this.initHelper();
        },
    }
})
