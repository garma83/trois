import { PropType } from 'vue'
import { geometryComponent } from './Geometry'
import { ExtrudeGeometry, ExtrudeGeometryOptions, Shape, BufferGeometry } from 'three'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

export const props = {
    shapes: { type: [Object, Array] as PropType<Shape | Shape[]> },
    options: { type: Object as PropType<ExtrudeGeometryOptions[] | ExtrudeGeometryOptions> },
} as const

export function createGeometry(comp: any): ExtrudeGeometry | BufferGeometry {
    if (Array.isArray(comp.options) && Array.isArray(comp.shapes)) {

        // @ts-ignore
        const geometries = props.shapes.map((shape: Shape | Shape[], index: number) => {
            return new ExtrudeGeometry(shape, comp.options[index])
        });

        return mergeBufferGeometries(geometries);
    } else {
        return new ExtrudeGeometry(comp.shapes, comp.options)
    }
}

export default geometryComponent('ExtrudeGeometry', props, createGeometry)
