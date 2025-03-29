import { PropType } from 'vue'
import { geometryComponent } from './Geometry'
import { ExtrudeGeometry, ExtrudeGeometryOptions, Shape, BufferGeometry, Vector3, BoxGeometry } from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export const props = {
    shapes: { type: [Object, Array] as PropType<Shape | Shape[]> },
    options: { type: Object as PropType<ExtrudeGeometryOptions[] | ExtrudeGeometryOptions> },
    positions: { type: Array as PropType<Vector3[] | null>, default: null },
    rotations: { type: Array as PropType<Vector3[] | null>, default: null }
} as const

export function createGeometry(comp: any): ExtrudeGeometry | BufferGeometry {
    if (Array.isArray(comp.options) && Array.isArray(comp.shapes)) {

        if (comp.shapes.length > 0) {
            const geometries = comp.shapes.map((shape: Shape | Shape[], index: number) => {
                const geometry = new ExtrudeGeometry(shape, comp.options[index])
                if (comp.rotations) {
                    if (comp.rotations[index].x != 0) geometry.rotateX(comp.rotations[index].x)
                    if (comp.rotations[index].y != 0) geometry.rotateY(comp.rotations[index].y)
                    if (comp.rotations[index].z != 0) geometry.rotateZ(comp.rotations[index].z)
                }
                if (comp.positions) {
                    geometry.translate(comp.positions[index].x, comp.positions[index].y, comp.positions[index].z)
                }
                return geometry;
            });

            return mergeGeometries(geometries);
        } else {
            // this ensures mergeBufferGeometries wont fail, and the algorithm can still continue
            console.warn("Empty shape array found in ExtrudeGeometry")
            const geometry =  new BoxGeometry(0.001, 0.001, 0.001);
            geometry.translate(-1000,-1000,-1000)
            return geometry
        }
    } else {
        return new ExtrudeGeometry(comp.shapes, comp.options)
    }
}

export default geometryComponent('ExtrudeGeometry', props, createGeometry)
