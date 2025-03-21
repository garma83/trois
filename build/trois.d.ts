import * as vue from 'vue';
import { ComponentPublicInstance, InjectionKey, PropType, ComponentPropsOptions, WatchStopHandle, App } from 'vue';
import * as three from 'three';
import { Intersection, Vector2, Vector3, Object3D, EventDispatcher, WebGLRenderer, Camera, Scene, WebGLRendererParameters, OrthographicCamera, PerspectiveCamera, Group, Mesh as Mesh$1, WebGLCubeRenderTarget, CubeCamera, BufferGeometry, Material, Curve, Light, Texture, ShaderMaterial, VideoTexture, MeshBasicMaterial, SpriteMaterial, Sprite, Points, GridHelper, TextureLoader } from 'three';
import { EffectComposer as EffectComposer$1 } from 'three/examples/jsm/postprocessing/EffectComposer';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import * as three_examples_jsm_postprocessing_Pass from 'three/examples/jsm/postprocessing/Pass';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

interface PointerEventInterface {
    type: 'pointerenter' | 'pointermove' | 'pointerleave' | 'click' | 'pointerdown' | 'pointerup';
    position?: Vector2;
    positionN?: Vector2;
    positionV3?: Vector3;
}
interface PointerIntersectEventInterface {
    type: 'pointerenter' | 'pointerover' | 'pointermove' | 'pointerleave' | 'click' | 'pointerdown' | 'pointerup';
    component: any;
    over?: boolean;
    intersect?: Intersection;
    intersects?: Intersection[];
}
type PointerCallbackType = (e: PointerEventInterface) => void;
type PointerIntersectCallbackType = (e: PointerIntersectEventInterface) => void;
interface PointerPublicConfigInterface {
    intersectMode?: 'frame';
    intersectRecursive?: boolean;
    touch?: boolean;
    resetOnEnd?: boolean;
    onEnter?: PointerCallbackType;
    onMove?: PointerCallbackType;
    onUp?: PointerCallbackType;
    onDown?: PointerCallbackType;
    onLeave?: PointerCallbackType;
    onClick?: PointerCallbackType;
    onIntersectEnter?: PointerIntersectCallbackType;
    onIntersectOver?: PointerIntersectCallbackType;
    onIntersectMove?: PointerIntersectCallbackType;
    onIntersectLeave?: PointerIntersectCallbackType;
    onIntersectUp?: PointerIntersectCallbackType;
    onIntersectDown?: PointerIntersectCallbackType;
    onIntersectClick?: PointerIntersectCallbackType;
}
interface PointerInterface {
    position: Vector2;
    positionN: Vector2;
    positionV3: Vector3;
    intersectObjects: Object3D[] | (() => Object3D[]);
    listeners: boolean;
    addListeners(cb: void): void;
    removeListeners(cb: void): void;
    intersect(): void;
}

/**
 * Abstract base class for controls.
 *
 * @abstract
 * @augments EventDispatcher
 */
declare class Controls extends EventDispatcher {
    /**
     * Constructs a new controls instance.
     *
     * @param {Object3D} object - The object that is managed by the controls.
     * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
     */
    constructor(object: any, domElement?: null);
    /**
     * Connects the controls to the DOM. This method has so called "side effects" since
     * it adds the module's event listeners to the DOM.
     */
    connect(): void;
    /**
     * Disconnects the controls from the DOM.
     */
    disconnect(): void;
    /**
     * Call this method if you no longer want use to the controls. It frees all internal
     * resources and removes all event listeners.
     */
    dispose(): void;
    /**
     * Controls should implement this method if they have to update their internal state
     * per simulation step.
     *
     * @param {number} [delta] - The time delta in seconds.
     */
    update(): void;
}
//# sourceMappingURL=Controls.d.ts.map

/**
 * Orbit controls allow the camera to orbit around a target.
 *
 * OrbitControls performs orbiting, dollying (zooming), and panning. Unlike {@link TrackballControls},
 * it maintains the "up" direction `object.up` (+Y by default).
 *
 * - Orbit: Left mouse / touch: one-finger move.
 * - Zoom: Middle mouse, or mousewheel / touch: two-finger spread or squish.
 * - Pan: Right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move.
 *
 * ```js
 * const controls = new OrbitControls( camera, renderer.domElement );
 *
 * // controls.update() must be called after any manual changes to the camera's transform
 * camera.position.set( 0, 20, 100 );
 * controls.update();
 *
 * function animate() {
 *
 * 	// required if controls.enableDamping or controls.autoRotate are set to true
 * 	controls.update();
 *
 * 	renderer.render( scene, camera );
 *
 * }
 * ```
 *
 * @augments Controls
 */
declare class OrbitControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Object3D} object - The object that is managed by the controls.
     * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
     */
    constructor(object: any, domElement?: null);
    connect(): void;
    disconnect(): void;
    dispose(): void;
    /**
     * Get the current vertical rotation, in radians.
     *
     * @return {number} The current vertical rotation, in radians.
     */
    getPolarAngle(): any;
    /**
     * Get the current horizontal rotation, in radians.
     *
     * @return {number} The current horizontal rotation, in radians.
     */
    getAzimuthalAngle(): any;
    /**
     * Returns the distance from the camera to the target.
     *
     * @return {number} The distance from the camera to the target.
     */
    getDistance(): any;
    /**
     * Adds key event listeners to the given DOM element.
     * `window` is a recommended argument for using this method.
     *
     * @param {HTMLDOMElement} domElement - The DOM element
     */
    listenToKeyEvents(domElement: any): void;
    /**
     * Removes the key event listener previously defined with `listenToKeyEvents()`.
     */
    stopListenToKeyEvents(): void;
    /**
     * Save the current state of the controls. This can later be recovered with `reset()`.
     */
    saveState(): void;
    /**
     * Reset the controls to their state from either the last time the `saveState()`
     * was called, or the initial state.
     */
    reset(): void;
    update(deltaTime?: null): boolean;
    _getAutoRotationAngle(deltaTime: any): number;
    _getZoomScale(delta: any): number;
    _rotateLeft(angle: any): void;
    _rotateUp(angle: any): void;
    _panLeft(distance: any, objectMatrix: any): void;
    _panUp(distance: any, objectMatrix: any): void;
    _pan(deltaX: any, deltaY: any): void;
    _dollyOut(dollyScale: any): void;
    _dollyIn(dollyScale: any): void;
    _updateZoomParameters(x: any, y: any): void;
    _clampDistance(dist: any): number;
    _handleMouseDownRotate(event: any): void;
    _handleMouseDownDolly(event: any): void;
    _handleMouseDownPan(event: any): void;
    _handleMouseMoveRotate(event: any): void;
    _handleMouseMoveDolly(event: any): void;
    _handleMouseMovePan(event: any): void;
    _handleMouseWheel(event: any): void;
    _handleKeyDown(event: any): void;
    _handleTouchStartRotate(event: any): void;
    _handleTouchStartPan(event: any): void;
    _handleTouchStartDolly(event: any): void;
    _handleTouchStartDollyPan(event: any): void;
    _handleTouchStartDollyRotate(event: any): void;
    _handleTouchMoveRotate(event: any): void;
    _handleTouchMovePan(event: any): void;
    _handleTouchMoveDolly(event: any): void;
    _handleTouchMoveDollyPan(event: any): void;
    _handleTouchMoveDollyRotate(event: any): void;
    _addPointer(event: any): void;
    _removePointer(event: any): void;
    _isTrackingPointer(event: any): boolean;
    _trackPointer(event: any): void;
    _getSecondPointerPosition(event: any): any;
    _customWheelEvent(event: any): {
        clientX: any;
        clientY: any;
        deltaY: any;
    };
}
//# sourceMappingURL=OrbitControls.d.ts.map

interface SizeInterface {
    width: number;
    height: number;
    wWidth: number;
    wHeight: number;
    ratio: number;
}
interface ThreeConfigInterface {
    params?: WebGLRendererParameters;
    canvas?: HTMLCanvasElement;
    antialias: boolean;
    alpha: boolean;
    autoClear: boolean;
    orbitCtrl: boolean | Record<string, unknown>;
    pointer: boolean | PointerPublicConfigInterface;
    resize: boolean | string;
    width?: number;
    height?: number;
    onResize?(size: SizeInterface): void;
    [index: string]: any;
}
interface ThreeInterface {
    config: ThreeConfigInterface;
    renderer: WebGLRenderer;
    composer?: EffectComposer;
    camera?: Camera;
    cameraCtrl?: OrbitControls;
    scene?: Scene;
    pointer?: PointerInterface;
    size: SizeInterface;
    init(): boolean;
    dispose(): void;
    render(): void;
    renderC(): void;
    setSize(width: number, height: number): void;
    addIntersectObject(o: Object3D): void;
    removeIntersectObject(o: Object3D): void;
}

type CallbackType<T> = (event: T) => void;
interface EventInterface {
    type: 'init' | 'mounted';
    renderer: RendererInterface;
}
interface RenderEventInterface {
    type: 'beforerender' | 'afterrender';
    renderer: RendererInterface;
    time: number;
}
interface ResizeEventInterface {
    type: 'resize';
    renderer: RendererInterface;
    size: SizeInterface;
}
type InitCallbackType = CallbackType<EventInterface>;
type MountedCallbackType = CallbackType<EventInterface>;
type RenderCallbackType = CallbackType<RenderEventInterface>;
type ResizeCallbackType = CallbackType<ResizeEventInterface>;
interface EventCallbackMap {
    'init': InitCallbackType;
    'mounted': MountedCallbackType;
    'beforerender': RenderCallbackType;
    'afterrender': RenderCallbackType;
    'resize': ResizeCallbackType;
}
interface RenderFunctionEventInterface {
    renderer: RendererInterface;
    time: number;
}
interface RendererSetupInterface {
    canvas: HTMLCanvasElement;
    three: ThreeInterface;
    renderer: WebGLRenderer;
    size: SizeInterface;
    renderFn(e: RenderFunctionEventInterface): void;
    raf: boolean;
    $pointer?: PointerInterface;
    initCallbacks: InitCallbackType[];
    mountedCallbacks: MountedCallbackType[];
    beforeRenderCallbacks: RenderCallbackType[];
    afterRenderCallbacks: RenderCallbackType[];
    resizeCallbacks: ResizeCallbackType[];
}
interface RendererInterface extends RendererSetupInterface {
    scene?: Scene;
    camera?: Camera;
    composer?: EffectComposer$1;
    onInit(cb: InitCallbackType): void;
    onMounted(cb: MountedCallbackType): void;
    onBeforeRender(cb: RenderCallbackType): void;
    offBeforeRender(cb: RenderCallbackType): void;
    onAfterRender(cb: RenderCallbackType): void;
    offAfterRender(cb: RenderCallbackType): void;
    onResize(cb: ResizeCallbackType): void;
    offResize(cb: ResizeCallbackType): void;
    addListener<T extends keyof EventCallbackMap>(t: T, cb: EventCallbackMap[T]): void;
    removeListener<T extends keyof EventCallbackMap>(t: T, cb: EventCallbackMap[T]): void;
}
interface RendererPublicInterface extends ComponentPublicInstance, RendererInterface {
}
declare const RendererInjectionKey: InjectionKey<RendererPublicInterface>;
declare const _default$19: vue.DefineComponent<vue.ExtractPropTypes<{
    params: {
        type: PropType<WebGLRendererParameters>;
        default: () => {};
    };
    antialias: BooleanConstructor;
    alpha: BooleanConstructor;
    autoClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    orbitCtrl: {
        type: PropType<boolean | Record<string, unknown>>;
        default: boolean;
    };
    pointer: {
        type: PropType<boolean | PointerPublicConfigInterface>;
        default: boolean;
    };
    resize: {
        type: PropType<string | boolean>;
        default: boolean;
    };
    shadow: BooleanConstructor;
    width: StringConstructor;
    height: StringConstructor;
    pixelRatio: NumberConstructor;
    xr: BooleanConstructor;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    onReady: PropType<(r: RendererInterface) => void>;
}>, RendererSetupInterface, {}, {
    camera: {
        get: () => Camera | undefined;
        set: (camera: Camera) => void;
    };
    scene: {
        get: () => Scene | undefined;
        set: (scene: Scene) => void;
    };
    composer: {
        get: () => EffectComposer$1 | undefined;
        set: (composer: EffectComposer$1) => void;
    };
}, {
    onInit(cb: InitCallbackType): void;
    onMounted(cb: MountedCallbackType): void;
    onBeforeRender(cb: RenderCallbackType): void;
    offBeforeRender(cb: RenderCallbackType): void;
    onAfterRender(cb: RenderCallbackType): void;
    offAfterRender(cb: RenderCallbackType): void;
    onResize(cb: ResizeCallbackType): void;
    offResize(cb: ResizeCallbackType): void;
    addListener(type: string, cb: (e?: any) => void): void;
    removeListener(type: string, cb: (e?: any) => void): void;
    getCallbacks(type: string): InitCallbackType[] | RenderCallbackType[] | ResizeCallbackType[];
    render(time: number): void;
    renderLoop(time: number): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    params: {
        type: PropType<WebGLRendererParameters>;
        default: () => {};
    };
    antialias: BooleanConstructor;
    alpha: BooleanConstructor;
    autoClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    orbitCtrl: {
        type: PropType<boolean | Record<string, unknown>>;
        default: boolean;
    };
    pointer: {
        type: PropType<boolean | PointerPublicConfigInterface>;
        default: boolean;
    };
    resize: {
        type: PropType<string | boolean>;
        default: boolean;
    };
    shadow: BooleanConstructor;
    width: StringConstructor;
    height: StringConstructor;
    pixelRatio: NumberConstructor;
    xr: BooleanConstructor;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    onReady: PropType<(r: RendererInterface) => void>;
}>> & Readonly<{}>, {
    resize: string | boolean;
    params: WebGLRendererParameters;
    antialias: boolean;
    alpha: boolean;
    autoClear: boolean;
    orbitCtrl: boolean | Record<string, unknown>;
    pointer: boolean | PointerPublicConfigInterface;
    props: Record<string, any>;
    shadow: boolean;
    xr: boolean;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        params: {
            type: PropType<WebGLRendererParameters>;
            default: () => {};
        };
        antialias: BooleanConstructor;
        alpha: BooleanConstructor;
        autoClear: {
            type: BooleanConstructor;
            default: boolean;
        };
        orbitCtrl: {
            type: PropType<boolean | Record<string, unknown>>;
            default: boolean;
        };
        pointer: {
            type: PropType<boolean | PointerPublicConfigInterface>;
            default: boolean;
        };
        resize: {
            type: PropType<string | boolean>;
            default: boolean;
        };
        shadow: BooleanConstructor;
        width: StringConstructor;
        height: StringConstructor;
        pixelRatio: NumberConstructor;
        xr: BooleanConstructor;
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        onReady: PropType<(r: RendererInterface) => void>;
    }>> & Readonly<{}>, RendererSetupInterface, {}, {
        camera: {
            get: () => Camera | undefined;
            set: (camera: Camera) => void;
        };
        scene: {
            get: () => Scene | undefined;
            set: (scene: Scene) => void;
        };
        composer: {
            get: () => EffectComposer$1 | undefined;
            set: (composer: EffectComposer$1) => void;
        };
    }, {
        onInit(cb: InitCallbackType): void;
        onMounted(cb: MountedCallbackType): void;
        onBeforeRender(cb: RenderCallbackType): void;
        offBeforeRender(cb: RenderCallbackType): void;
        onAfterRender(cb: RenderCallbackType): void;
        offAfterRender(cb: RenderCallbackType): void;
        onResize(cb: ResizeCallbackType): void;
        offResize(cb: ResizeCallbackType): void;
        addListener(type: string, cb: (e?: any) => void): void;
        removeListener(type: string, cb: (e?: any) => void): void;
        getCallbacks(type: string): InitCallbackType[] | RenderCallbackType[] | ResizeCallbackType[];
        render(time: number): void;
        renderLoop(time: number): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        params: {
            type: PropType<WebGLRendererParameters>;
            default: () => {};
        };
        antialias: BooleanConstructor;
        alpha: BooleanConstructor;
        autoClear: {
            type: BooleanConstructor;
            default: boolean;
        };
        orbitCtrl: {
            type: PropType<boolean | Record<string, unknown>>;
            default: boolean;
        };
        pointer: {
            type: PropType<boolean | PointerPublicConfigInterface>;
            default: boolean;
        };
        resize: {
            type: PropType<string | boolean>;
            default: boolean;
        };
        shadow: BooleanConstructor;
        width: StringConstructor;
        height: StringConstructor;
        pixelRatio: NumberConstructor;
        xr: BooleanConstructor;
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        onReady: PropType<(r: RendererInterface) => void>;
    }>> & Readonly<{}>, RendererSetupInterface, {}, {
        camera: {
            get: () => Camera | undefined;
            set: (camera: Camera) => void;
        };
        scene: {
            get: () => Scene | undefined;
            set: (scene: Scene) => void;
        };
        composer: {
            get: () => EffectComposer$1 | undefined;
            set: (composer: EffectComposer$1) => void;
        };
    }, {
        onInit(cb: InitCallbackType): void;
        onMounted(cb: MountedCallbackType): void;
        onBeforeRender(cb: RenderCallbackType): void;
        offBeforeRender(cb: RenderCallbackType): void;
        onAfterRender(cb: RenderCallbackType): void;
        offAfterRender(cb: RenderCallbackType): void;
        onResize(cb: ResizeCallbackType): void;
        offResize(cb: ResizeCallbackType): void;
        addListener(type: string, cb: (e?: any) => void): void;
        removeListener(type: string, cb: (e?: any) => void): void;
        getCallbacks(type: string): InitCallbackType[] | RenderCallbackType[] | ResizeCallbackType[];
        render(time: number): void;
        renderLoop(time: number): void;
    }, {}>;
}, true, {}, any>;

interface Object3DSetupInterface {
    renderer?: RendererInterface;
    scene?: Scene;
    o3d?: Object3D;
    parent?: ComponentPublicInstance;
}
interface Object3DInterface extends Object3DSetupInterface {
    addToParent(o?: Object3D): boolean;
    removeFromParent(o?: Object3D): boolean;
    add(o: Object3D): void;
    remove(o: Object3D): void;
}
interface Object3DPublicInterface extends ComponentPublicInstance, Object3DInterface {
}
interface Vector2PropInterface {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
interface Vector3PropInterface extends Vector2PropInterface {
    z?: number;
}
interface EulerPropInterface extends Vector3PropInterface {
    order?: 'XYZ' | 'YZX' | 'ZXY' | 'XZY' | 'YXZ' | 'ZYX';
}
declare const _default$18: vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: Object3D): void;
    getParent(): undefined | ComponentPublicInstance;
    addToParent(o?: Object3D): boolean;
    removeFromParent(o?: Object3D): boolean;
    add(o: Object3D): void;
    remove(o: Object3D): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const _default$17: vue.DefineComponent<vue.ExtractPropTypes<{
    left: {
        type: NumberConstructor;
        default: number;
    };
    right: {
        type: NumberConstructor;
        default: number;
    };
    top: {
        type: NumberConstructor;
        default: number;
    };
    bottom: {
        type: NumberConstructor;
        default: number;
    };
    near: {
        type: NumberConstructor;
        default: number;
    };
    far: {
        type: NumberConstructor;
        default: number;
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
}>, {
    renderer: RendererPublicInterface;
    camera: OrthographicCamera;
} | undefined, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    props: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    left: {
        type: NumberConstructor;
        default: number;
    };
    right: {
        type: NumberConstructor;
        default: number;
    };
    top: {
        type: NumberConstructor;
        default: number;
    };
    bottom: {
        type: NumberConstructor;
        default: number;
    };
    near: {
        type: NumberConstructor;
        default: number;
    };
    far: {
        type: NumberConstructor;
        default: number;
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
}>> & Readonly<{}>, {
    position: Vector3PropInterface;
    left: number;
    right: number;
    top: number;
    bottom: number;
    near: number;
    far: number;
    zoom: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=OrthographicCamera.d.ts.map

declare const _default$16: vue.DefineComponent<vue.ExtractPropTypes<{
    aspect: {
        type: NumberConstructor;
        default: number;
    };
    far: {
        type: NumberConstructor;
        default: number;
    };
    fov: {
        type: NumberConstructor;
        default: number;
    };
    near: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
}>, {
    renderer: RendererPublicInterface;
    camera: PerspectiveCamera;
} | undefined, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    props: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    aspect: {
        type: NumberConstructor;
        default: number;
    };
    far: {
        type: NumberConstructor;
        default: number;
    };
    fov: {
        type: NumberConstructor;
        default: number;
    };
    near: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
}>> & Readonly<{}>, {
    position: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    near: number;
    far: number;
    aspect: number;
    fov: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=PerspectiveCamera.d.ts.map

declare const _default$15: vue.DefineComponent<{}, {
    group: Group;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Group.d.ts.map

declare const SceneInjectionKey: InjectionKey<Scene>;
declare const _default$14: vue.DefineComponent<vue.ExtractPropTypes<{
    background: (ObjectConstructor | StringConstructor | NumberConstructor)[];
}>, {
    scene: Scene;
    add: (o: Object3D) => void;
    remove: (o: Object3D) => void;
} | undefined, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    background: (ObjectConstructor | StringConstructor | NumberConstructor)[];
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

interface RaycasterSetupInterface {
    renderer?: RendererInterface;
    pointer?: PointerInterface;
}
declare const _default$13: vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerOver: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerMove: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerLeave: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerUp: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerDown: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onClick: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    intersectMode: {
        type: StringConstructor;
        default: string;
    };
    intersectRecursive: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, RaycasterSetupInterface, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerOver: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerMove: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerLeave: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerUp: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onPointerDown: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    onClick: {
        type: PropType<PointerIntersectCallbackType>;
        default: PointerIntersectCallbackType;
    };
    intersectMode: {
        type: StringConstructor;
        default: string;
    };
    intersectRecursive: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    intersectRecursive: boolean;
    onClick: PointerIntersectCallbackType;
    onPointerEnter: PointerIntersectCallbackType;
    onPointerOver: PointerIntersectCallbackType;
    onPointerMove: PointerIntersectCallbackType;
    onPointerLeave: PointerIntersectCallbackType;
    onPointerDown: PointerIntersectCallbackType;
    onPointerUp: PointerIntersectCallbackType;
    intersectMode: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Raycaster.d.ts.map

interface CubeCameraSetupInterface {
    cubeRT?: WebGLCubeRenderTarget;
    cubeCamera?: CubeCamera;
    updateRT?: {
        (): void;
    };
}
declare const _default$12: vue.DefineComponent<vue.ExtractPropTypes<{
    cubeRTSize: {
        type: NumberConstructor;
        default: number;
    };
    cubeCameraNear: {
        type: NumberConstructor;
        default: number;
    };
    cubeCameraFar: {
        type: NumberConstructor;
        default: number;
    };
    autoUpdate: BooleanConstructor;
    hideMeshes: {
        type: PropType<Mesh$1<three.BufferGeometry, three.Material | three.Material[]>[]>;
        default: () => never[];
    };
}>, CubeCameraSetupInterface, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    cubeRTSize: {
        type: NumberConstructor;
        default: number;
    };
    cubeCameraNear: {
        type: NumberConstructor;
        default: number;
    };
    cubeCameraFar: {
        type: NumberConstructor;
        default: number;
    };
    autoUpdate: BooleanConstructor;
    hideMeshes: {
        type: PropType<Mesh$1<three.BufferGeometry, three.Material | three.Material[]>[]>;
        default: () => never[];
    };
}>> & Readonly<{}>, {
    autoUpdate: boolean;
    cubeRTSize: number;
    cubeCameraNear: number;
    cubeCameraFar: number;
    hideMeshes: Mesh$1<three.BufferGeometry, three.Material | three.Material[]>[];
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=CubeCamera.d.ts.map

interface MeshSetupInterface$1 extends Object3DSetupInterface {
    mesh?: Mesh$1;
    geometry?: BufferGeometry;
    material?: Material;
    loading?: boolean;
}
interface MeshInterface extends MeshSetupInterface$1 {
    setGeometry(g: BufferGeometry): void;
    setMaterial(m: Material): void;
}
interface MeshPublicInterface extends ComponentPublicInstance, MeshInterface {
}
declare const MeshInjectionKey: InjectionKey<MeshPublicInterface>;
declare const Mesh: vue.DefineComponent<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>, MeshSetupInterface$1, {}, {}, {
    initMesh(): void;
    createGeometry(): void;
    addGeometryWatchers(props: Readonly<ComponentPropsOptions>): void;
    setGeometry(geometry: BufferGeometry): void;
    setMaterial(material: Material): void;
    refreshGeometry(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>> & Readonly<{}>, {
    castShadow: boolean;
    receiveShadow: boolean;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, MeshSetupInterface$1, {}, {}, {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<ComponentPropsOptions>): void;
        setGeometry(geometry: BufferGeometry): void;
        setMaterial(material: Material): void;
        refreshGeometry(): void;
    }, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, Object3DSetupInterface, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    } & {
        P: Readonly<vue.ExtractPropTypes<{
            onPointerEnter: FunctionConstructor;
            onPointerOver: FunctionConstructor;
            onPointerMove: FunctionConstructor;
            onPointerLeave: FunctionConstructor;
            onPointerDown: FunctionConstructor;
            onPointerUp: FunctionConstructor;
            onClick: FunctionConstructor;
            position: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            rotation: {
                type: vue.PropType<EulerPropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            scale: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                    order: string;
                };
            };
            lookAt: {
                type: vue.PropType<Vector3PropInterface>;
                default: null;
            };
            userData: {
                type: ObjectConstructor;
                default: () => {};
            };
            visible: {
                type: BooleanConstructor;
                default: boolean;
            };
            props: {
                type: ObjectConstructor;
                default: () => {};
            };
            disableAdd: {
                type: BooleanConstructor;
                default: boolean;
            };
            disableRemove: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{
            onReady?: ((...args: any[]) => any) | undefined;
            onCreated?: ((...args: any[]) => any) | undefined;
        }>;
        B: Object3DSetupInterface;
        D: {};
        C: {};
        M: {
            initObject3D(o3d: three.Object3D<three.Event>): void;
            getParent(): ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
            addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
            removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
            add(o: three.Object3D<three.Event>): void;
            remove(o: three.Object3D<three.Event>): void;
        };
        Defaults: {
            props: Record<string, any>;
            position: Vector3PropInterface;
            rotation: EulerPropInterface;
            scale: Vector3PropInterface;
            lookAt: Vector3PropInterface;
            userData: Record<string, any>;
            visible: boolean;
            disableAdd: boolean;
            disableRemove: boolean;
        };
    }, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }> & Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, Object3DSetupInterface & MeshSetupInterface$1, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    } & {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<ComponentPropsOptions>): void;
        setGeometry(geometry: BufferGeometry): void;
        setMaterial(material: Material): void;
        refreshGeometry(): void;
    }, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }>;
}, true, {}, any>;

interface GeometrySetupInterface {
    mesh?: MeshInterface;
    geometry?: BufferGeometry;
    watchProps?: string[];
}
interface GeometryAttributeInterface {
    name: string;
    array: ArrayLike<number>;
    itemSize: number;
    normalized?: boolean;
}
declare const Geometry: vue.DefineComponent<vue.ExtractPropTypes<{
    rotateX: NumberConstructor;
    rotateY: NumberConstructor;
    rotateZ: NumberConstructor;
    attributes: {
        type: PropType<GeometryAttributeInterface[]>;
        default: () => never[];
    };
}>, GeometrySetupInterface, {}, {}, {
    createGeometry(): void;
    rotateGeometry(): void;
    refreshGeometry(): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "created"[], "created", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    rotateX: NumberConstructor;
    rotateY: NumberConstructor;
    rotateZ: NumberConstructor;
    attributes: {
        type: PropType<GeometryAttributeInterface[]>;
        default: () => never[];
    };
}>> & Readonly<{
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    attributes: GeometryAttributeInterface[];
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const _default$11: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$10: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$$: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$_: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$Z: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$Y: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$X: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$W: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$V: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$U: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$T: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$S: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$R: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$Q: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$P: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$O: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$N: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$M: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly points: ArrayConstructor;
    readonly path: typeof Curve;
    readonly tubularSegments: {
        readonly type: NumberConstructor;
        readonly default: 64;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly radialSegments: {
        readonly type: NumberConstructor;
        readonly default: 8;
    };
    readonly closed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
}>, {}, {}, {}, {
    createGeometry(): void;
    updatePoints(points: Vector3[]): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    rotateX: NumberConstructor;
    rotateY: NumberConstructor;
    rotateZ: NumberConstructor;
    attributes: {
        type: vue.PropType<GeometryAttributeInterface[]>;
        default: () => never[];
    };
}>, GeometrySetupInterface, {}, {}, {
    createGeometry(): void;
    rotateGeometry(): void;
    refreshGeometry(): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "created"[], "created", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    rotateX: NumberConstructor;
    rotateY: NumberConstructor;
    rotateZ: NumberConstructor;
    attributes: {
        type: vue.PropType<GeometryAttributeInterface[]>;
        default: () => never[];
    };
}>> & Readonly<{
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    attributes: GeometryAttributeInterface[];
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly points: ArrayConstructor;
    readonly path: typeof Curve;
    readonly tubularSegments: {
        readonly type: NumberConstructor;
        readonly default: 64;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly radialSegments: {
        readonly type: NumberConstructor;
        readonly default: 8;
    };
    readonly closed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
}>> & Readonly<{}>, {
    readonly radius: number;
    readonly radialSegments: number;
    readonly tubularSegments: number;
    readonly closed: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

interface LightSetupInterface {
    light?: Light;
}

declare const _default$L: vue.DefineComponent<{}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, LightSetupInterface, {}, {}, {
    initLight(light: three.Light): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    castShadow: boolean;
    color: string;
    intensity: number;
    shadowMapSize: Vector2PropInterface;
    shadowCamera: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=AmbientLight.d.ts.map

declare const _default$K: vue.DefineComponent<vue.ExtractPropTypes<{
    target: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, LightSetupInterface, {}, {}, {
    initLight(light: three.Light): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    castShadow: boolean;
    color: string;
    intensity: number;
    shadowMapSize: Vector2PropInterface;
    shadowCamera: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    target: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
}>> & Readonly<{}>, {
    target: Vector3PropInterface;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=DirectionalLight.d.ts.map

declare const _default$J: vue.DefineComponent<vue.ExtractPropTypes<{
    groundColor: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, LightSetupInterface, {}, {}, {
    initLight(light: three.Light): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    castShadow: boolean;
    color: string;
    intensity: number;
    shadowMapSize: Vector2PropInterface;
    shadowCamera: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    groundColor: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    groundColor: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=HemisphereLight.d.ts.map

declare const _default$I: vue.DefineComponent<vue.ExtractPropTypes<{
    distance: {
        type: NumberConstructor;
        default: number;
    };
    decay: {
        type: NumberConstructor;
        default: number;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, LightSetupInterface, {}, {}, {
    initLight(light: three.Light): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    castShadow: boolean;
    color: string;
    intensity: number;
    shadowMapSize: Vector2PropInterface;
    shadowCamera: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    distance: {
        type: NumberConstructor;
        default: number;
    };
    decay: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    distance: number;
    decay: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=PointLight.d.ts.map

declare const _default$H: vue.DefineComponent<vue.ExtractPropTypes<{
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    helper: BooleanConstructor;
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, LightSetupInterface, {}, {}, {
    initLight(light: three.Light): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    castShadow: boolean;
    color: string;
    intensity: number;
    shadowMapSize: Vector2PropInterface;
    shadowCamera: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    helper: BooleanConstructor;
}>> & Readonly<{}>, {
    width: number;
    height: number;
    helper: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=RectAreaLight.d.ts.map

declare const _default$G: vue.DefineComponent<vue.ExtractPropTypes<{
    angle: {
        type: NumberConstructor;
        default: number;
    };
    decay: {
        type: NumberConstructor;
        default: number;
    };
    distance: {
        type: NumberConstructor;
        default: number;
    };
    penumbra: {
        type: NumberConstructor;
        default: number;
    };
    target: ObjectConstructor;
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, LightSetupInterface, {}, {}, {
    initLight(light: three.Light): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    castShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadowMapSize: {
        type: vue.PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    shadowCamera: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    castShadow: boolean;
    color: string;
    intensity: number;
    shadowMapSize: Vector2PropInterface;
    shadowCamera: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    angle: {
        type: NumberConstructor;
        default: number;
    };
    decay: {
        type: NumberConstructor;
        default: number;
    };
    distance: {
        type: NumberConstructor;
        default: number;
    };
    penumbra: {
        type: NumberConstructor;
        default: number;
    };
    target: ObjectConstructor;
}>> & Readonly<{}>, {
    distance: number;
    decay: number;
    angle: number;
    penumbra: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=SpotLight.d.ts.map

interface MaterialPropsInterface {
    alphaTest?: number;
    blending?: number;
    color?: number | string;
    depthTest?: boolean;
    depthWrite?: boolean;
    fog?: boolean;
    opacity?: number;
    side?: number;
    toneMapped?: boolean;
    transparent?: boolean;
    vertexColors?: boolean;
    visible?: boolean;
    [index: string]: any;
}

interface MaterialSetupInterface {
    mesh?: MeshInterface;
    material?: Material;
    createMaterial?(): Material;
}
interface MaterialInterface extends MaterialSetupInterface {
    setTexture(texture: Texture | null, key: string): void;
}
interface MaterialPublicInterface extends ComponentPublicInstance, MaterialInterface {
}
declare const MaterialInjectionKey: InjectionKey<MaterialPublicInterface>;
declare const BaseMaterial: vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    props: {
        type: PropType<MaterialPropsInterface>;
        default: () => {};
    };
}>, MaterialSetupInterface, {}, {}, {
    getMaterialParams(): {
        [x: string]: any;
        alphaTest?: number | undefined;
        blending?: number | undefined;
        color?: string | number | undefined;
        depthTest?: boolean | undefined;
        depthWrite?: boolean | undefined;
        fog?: boolean | undefined;
        opacity?: number | undefined;
        side?: number | undefined;
        toneMapped?: boolean | undefined;
        transparent?: boolean | undefined;
        vertexColors?: boolean | undefined;
        visible?: boolean | undefined;
    };
    setProp(material: any, key: string, value: any, needsUpdate?: boolean): void;
    setTexture(texture: Texture | null, key?: string): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "created"[], "created", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    props: {
        type: PropType<MaterialPropsInterface>;
        default: () => {};
    };
}>> & Readonly<{
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: MaterialPropsInterface;
    color: string;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        color: {
            type: StringConstructor;
            default: string;
        };
        props: {
            type: PropType<MaterialPropsInterface>;
            default: () => {};
        };
    }>> & Readonly<{
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, MaterialSetupInterface, {}, {}, {
        getMaterialParams(): {
            [x: string]: any;
            alphaTest?: number | undefined;
            blending?: number | undefined;
            color?: string | number | undefined;
            depthTest?: boolean | undefined;
            depthWrite?: boolean | undefined;
            fog?: boolean | undefined;
            opacity?: number | undefined;
            side?: number | undefined;
            toneMapped?: boolean | undefined;
            transparent?: boolean | undefined;
            vertexColors?: boolean | undefined;
            visible?: boolean | undefined;
        };
        setProp(material: any, key: string, value: any, needsUpdate?: boolean): void;
        setTexture(texture: Texture | null, key?: string): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "created"[], {}, {}, false, {
        mesh: symbol;
    }, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        color: {
            type: StringConstructor;
            default: string;
        };
        props: {
            type: PropType<MaterialPropsInterface>;
            default: () => {};
        };
    }>> & Readonly<{
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, MaterialSetupInterface, {}, {}, {
        getMaterialParams(): {
            [x: string]: any;
            alphaTest?: number | undefined;
            blending?: number | undefined;
            color?: string | number | undefined;
            depthTest?: boolean | undefined;
            depthWrite?: boolean | undefined;
            fog?: boolean | undefined;
            opacity?: number | undefined;
            side?: number | undefined;
            toneMapped?: boolean | undefined;
            transparent?: boolean | undefined;
            vertexColors?: boolean | undefined;
            visible?: boolean | undefined;
        };
        setProp(material: any, key: string, value: any, needsUpdate?: boolean): void;
        setTexture(texture: Texture | null, key?: string): void;
    }, {}>;
}, true, {}, any>;

declare const BasicMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
declare const LambertMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
declare const PhongMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
declare const PhysicalMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
declare const PointsMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
declare const ShadowMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
declare const StandardMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
declare const ToonMaterial: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;

declare const _default$F: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=MatcapMaterial.d.ts.map

declare const _default$E: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=ShaderMaterial.d.ts.map

interface SubSurfaceMaterialUniformsInterface {
    diffuse?: string | number;
    thicknessColor?: string | number;
    thicknessDistortion?: number;
    thicknessAmbient?: number;
    thicknessAttenuation?: number;
    thicknessPower?: number;
    thicknessScale?: number;
}
declare const _default$D: vue.DefineComponent<vue.ExtractPropTypes<{
    uniforms: {
        type: PropType<SubSurfaceMaterialUniformsInterface>;
        default: () => {
            diffuse: string;
            thicknessColor: string;
            thicknessDistortion: number;
            thicknessAmbient: number;
            thicknessAttenuation: number;
            thicknessPower: number;
            thicknessScale: number;
        };
    };
}>, {}, {}, {}, {
    createMaterial(): ShaderMaterial;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    props: {
        type: PropType<MaterialPropsInterface>;
        default: () => {};
    };
}>, MaterialSetupInterface, {}, {}, {
    getMaterialParams(): {
        [x: string]: any;
        alphaTest?: number | undefined;
        blending?: number | undefined;
        color?: string | number | undefined;
        depthTest?: boolean | undefined;
        depthWrite?: boolean | undefined;
        fog?: boolean | undefined;
        opacity?: number | undefined;
        side?: number | undefined;
        toneMapped?: boolean | undefined;
        transparent?: boolean | undefined;
        vertexColors?: boolean | undefined;
        visible?: boolean | undefined;
    };
    setProp(material: any, key: string, value: any, needsUpdate?: boolean): void;
    setTexture(texture: three.Texture | null, key?: string): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "created"[], "created", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    props: {
        type: PropType<MaterialPropsInterface>;
        default: () => {};
    };
}>> & Readonly<{
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: MaterialPropsInterface;
    color: string;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        color: {
            type: StringConstructor;
            default: string;
        };
        props: {
            type: PropType<MaterialPropsInterface>;
            default: () => {};
        };
    }>> & Readonly<{
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, MaterialSetupInterface, {}, {}, {
        getMaterialParams(): {
            [x: string]: any;
            alphaTest?: number | undefined;
            blending?: number | undefined;
            color?: string | number | undefined;
            depthTest?: boolean | undefined;
            depthWrite?: boolean | undefined;
            fog?: boolean | undefined;
            opacity?: number | undefined;
            side?: number | undefined;
            toneMapped?: boolean | undefined;
            transparent?: boolean | undefined;
            vertexColors?: boolean | undefined;
            visible?: boolean | undefined;
        };
        setProp(material: any, key: string, value: any, needsUpdate?: boolean): void;
        setTexture(texture: three.Texture | null, key?: string): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "created"[], {}, {}, false, {
        mesh: symbol;
    }, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        color: {
            type: StringConstructor;
            default: string;
        };
        props: {
            type: PropType<MaterialPropsInterface>;
            default: () => {};
        };
    }>> & Readonly<{
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, MaterialSetupInterface, {}, {}, {
        getMaterialParams(): {
            [x: string]: any;
            alphaTest?: number | undefined;
            blending?: number | undefined;
            color?: string | number | undefined;
            depthTest?: boolean | undefined;
            depthWrite?: boolean | undefined;
            fog?: boolean | undefined;
            opacity?: number | undefined;
            side?: number | undefined;
            toneMapped?: boolean | undefined;
            transparent?: boolean | undefined;
            vertexColors?: boolean | undefined;
            visible?: boolean | undefined;
        };
        setProp(material: any, key: string, value: any, needsUpdate?: boolean): void;
        setTexture(texture: three.Texture | null, key?: string): void;
    }, {}>;
}, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    uniforms: {
        type: PropType<SubSurfaceMaterialUniformsInterface>;
        default: () => {
            diffuse: string;
            thicknessColor: string;
            thicknessDistortion: number;
            thicknessAmbient: number;
            thicknessAttenuation: number;
            thicknessPower: number;
            thicknessScale: number;
        };
    };
}>> & Readonly<{}>, {
    uniforms: SubSurfaceMaterialUniformsInterface;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

interface TexureInterface {
    material?: MaterialInterface;
    texture?: Texture;
}
declare const _default$C: vue.DefineComponent<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    uniform: StringConstructor;
    src: StringConstructor;
    onLoad: PropType<(t: Texture) => void>;
    onProgress: PropType<(e: ProgressEvent) => void>;
    onError: PropType<(e: ErrorEvent) => void>;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, TexureInterface, {}, {}, {
    createTexture(): Texture | undefined;
    initTexture(): void;
    refreshTexture(): void;
    onLoaded(t: Texture): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    uniform: StringConstructor;
    src: StringConstructor;
    onLoad: PropType<(t: Texture) => void>;
    onProgress: PropType<(e: ProgressEvent) => void>;
    onError: PropType<(e: ErrorEvent) => void>;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    props: Record<string, any>;
    name: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const _default$B: vue.DefineComponent<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    path: {
        type: StringConstructor;
        required: true;
    };
    urls: {
        type: PropType<string[]>;
        default: () => string[];
    };
    props: {
        type: ObjectConstructor;
        default: () => {
            mapping: three.Mapping;
        };
    };
}>, {}, {}, {}, {
    createTexture(): three.CubeTexture;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    uniform: StringConstructor;
    src: StringConstructor;
    onLoad: PropType<(t: three.Texture) => void>;
    onProgress: PropType<(e: ProgressEvent<EventTarget>) => void>;
    onError: PropType<(e: ErrorEvent) => void>;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, TexureInterface, {}, {}, {
    createTexture(): three.Texture | undefined;
    initTexture(): void;
    refreshTexture(): void;
    onLoaded(t: three.Texture): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    uniform: StringConstructor;
    src: StringConstructor;
    onLoad: PropType<(t: three.Texture) => void>;
    onProgress: PropType<(e: ProgressEvent<EventTarget>) => void>;
    onError: PropType<(e: ErrorEvent) => void>;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    props: Record<string, any>;
    name: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    path: {
        type: StringConstructor;
        required: true;
    };
    urls: {
        type: PropType<string[]>;
        default: () => string[];
    };
    props: {
        type: ObjectConstructor;
        default: () => {
            mapping: three.Mapping;
        };
    };
}>> & Readonly<{}>, {
    props: Record<string, any>;
    name: string;
    urls: string[];
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=CubeTexture.d.ts.map

declare const _default$A: vue.DefineComponent<vue.ExtractPropTypes<{
    videoId: {
        type: StringConstructor;
        required: true;
    };
}>, {}, {}, {}, {
    createTexture(): VideoTexture;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    uniform: StringConstructor;
    src: StringConstructor;
    onLoad: vue.PropType<(t: three.Texture) => void>;
    onProgress: vue.PropType<(e: ProgressEvent<EventTarget>) => void>;
    onError: vue.PropType<(e: ErrorEvent) => void>;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, TexureInterface, {}, {}, {
    createTexture(): three.Texture | undefined;
    initTexture(): void;
    refreshTexture(): void;
    onLoaded(t: three.Texture): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    uniform: StringConstructor;
    src: StringConstructor;
    onLoad: vue.PropType<(t: three.Texture) => void>;
    onProgress: vue.PropType<(e: ProgressEvent<EventTarget>) => void>;
    onError: vue.PropType<(e: ErrorEvent) => void>;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    props: Record<string, any>;
    name: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    videoId: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=VideoTexture.d.ts.map

declare const _default$z: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Box.d.ts.map

declare const _default$y: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Circle.d.ts.map

declare const _default$x: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Cone.d.ts.map

declare const _default$w: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Cylinder.d.ts.map

declare const _default$v: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Dodecahedron.d.ts.map

declare const _default$u: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Icosahedron.d.ts.map

declare const _default$t: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Lathe.d.ts.map

declare const _default$s: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Octahedron.d.ts.map

declare const _default$r: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Plane.d.ts.map

declare const _default$q: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Polyhedron.d.ts.map

declare const _default$p: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Ring.d.ts.map

declare const _default$o: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Sphere.d.ts.map

declare const _default$n: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Tetrahedron.d.ts.map

interface TextSetupInterface extends MeshSetupInterface$1 {
    geometry?: TextGeometry;
    font?: Font;
}
declare const _default$m: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly text: {
        readonly type: StringConstructor;
        readonly required: true;
        readonly default: "Text";
    };
    readonly fontSrc: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    readonly size: {
        readonly type: NumberConstructor;
        readonly default: 80;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly depth: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly curveSegments: {
        readonly type: NumberConstructor;
        readonly default: 12;
    };
    readonly bevelEnabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly bevelThickness: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly bevelSize: {
        readonly type: NumberConstructor;
        readonly default: 8;
    };
    readonly bevelOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly bevelSegments: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly align: {
        readonly type: PropType<string | boolean>;
        readonly default: false;
    };
}>, TextSetupInterface, {}, {}, {
    createGeometry(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>, MeshSetupInterface$1, {}, {}, {
    initMesh(): void;
    createGeometry(): void;
    addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
        [x: string]: unknown;
    }>>): void;
    setGeometry(geometry: three.BufferGeometry): void;
    setMaterial(material: three.Material): void;
    refreshGeometry(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>> & Readonly<{}>, {
    castShadow: boolean;
    receiveShadow: boolean;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, MeshSetupInterface$1, {}, {}, {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, Object3DSetupInterface, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    } & {
        P: Readonly<vue.ExtractPropTypes<{
            onPointerEnter: FunctionConstructor;
            onPointerOver: FunctionConstructor;
            onPointerMove: FunctionConstructor;
            onPointerLeave: FunctionConstructor;
            onPointerDown: FunctionConstructor;
            onPointerUp: FunctionConstructor;
            onClick: FunctionConstructor;
            position: {
                type: PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            rotation: {
                type: PropType<EulerPropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            scale: {
                type: PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                    order: string;
                };
            };
            lookAt: {
                type: PropType<Vector3PropInterface>;
                default: null;
            };
            userData: {
                type: ObjectConstructor;
                default: () => {};
            };
            visible: {
                type: BooleanConstructor;
                default: boolean;
            };
            props: {
                type: ObjectConstructor;
                default: () => {};
            };
            disableAdd: {
                type: BooleanConstructor;
                default: boolean;
            };
            disableRemove: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{
            onReady?: ((...args: any[]) => any) | undefined;
            onCreated?: ((...args: any[]) => any) | undefined;
        }>;
        B: Object3DSetupInterface;
        D: {};
        C: {};
        M: {
            initObject3D(o3d: three.Object3D<three.Event>): void;
            getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
            addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
            removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
            add(o: three.Object3D<three.Event>): void;
            remove(o: three.Object3D<three.Event>): void;
        };
        Defaults: {
            props: Record<string, any>;
            position: Vector3PropInterface;
            rotation: EulerPropInterface;
            scale: Vector3PropInterface;
            lookAt: Vector3PropInterface;
            userData: Record<string, any>;
            visible: boolean;
            disableAdd: boolean;
            disableRemove: boolean;
        };
    }, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }> & Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, Object3DSetupInterface & MeshSetupInterface$1, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    } & {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }>;
}, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly text: {
        readonly type: StringConstructor;
        readonly required: true;
        readonly default: "Text";
    };
    readonly fontSrc: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    readonly size: {
        readonly type: NumberConstructor;
        readonly default: 80;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly depth: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly curveSegments: {
        readonly type: NumberConstructor;
        readonly default: 12;
    };
    readonly bevelEnabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly bevelThickness: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly bevelSize: {
        readonly type: NumberConstructor;
        readonly default: 8;
    };
    readonly bevelOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly bevelSegments: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly align: {
        readonly type: PropType<string | boolean>;
        readonly default: false;
    };
}>> & Readonly<{}>, {
    readonly height: number;
    readonly size: number;
    readonly depth: number;
    readonly curveSegments: number;
    readonly text: string;
    readonly bevelEnabled: boolean;
    readonly bevelThickness: number;
    readonly bevelSize: number;
    readonly bevelOffset: number;
    readonly bevelSegments: number;
    readonly align: string | boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Text.d.ts.map

declare const _default$l: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=Torus.d.ts.map

declare const _default$k: vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, vue.PublicProps>;
//# sourceMappingURL=TorusKnot.d.ts.map

declare const _default$j: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly points: ArrayConstructor;
    readonly path: typeof three.Curve;
    readonly tubularSegments: {
        readonly type: NumberConstructor;
        readonly default: 64;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly radialSegments: {
        readonly type: NumberConstructor;
        readonly default: 8;
    };
    readonly closed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
}>, {}, {}, {}, {
    createGeometry(): void;
    updatePoints(points: Vector3[]): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>, MeshSetupInterface$1, {}, {}, {
    initMesh(): void;
    createGeometry(): void;
    addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
        [x: string]: unknown;
    }>>): void;
    setGeometry(geometry: three.BufferGeometry): void;
    setMaterial(material: three.Material): void;
    refreshGeometry(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>> & Readonly<{}>, {
    castShadow: boolean;
    receiveShadow: boolean;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, MeshSetupInterface$1, {}, {}, {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, Object3DSetupInterface, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    } & {
        P: Readonly<vue.ExtractPropTypes<{
            onPointerEnter: FunctionConstructor;
            onPointerOver: FunctionConstructor;
            onPointerMove: FunctionConstructor;
            onPointerLeave: FunctionConstructor;
            onPointerDown: FunctionConstructor;
            onPointerUp: FunctionConstructor;
            onClick: FunctionConstructor;
            position: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            rotation: {
                type: vue.PropType<EulerPropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            scale: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                    order: string;
                };
            };
            lookAt: {
                type: vue.PropType<Vector3PropInterface>;
                default: null;
            };
            userData: {
                type: ObjectConstructor;
                default: () => {};
            };
            visible: {
                type: BooleanConstructor;
                default: boolean;
            };
            props: {
                type: ObjectConstructor;
                default: () => {};
            };
            disableAdd: {
                type: BooleanConstructor;
                default: boolean;
            };
            disableRemove: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{
            onReady?: ((...args: any[]) => any) | undefined;
            onCreated?: ((...args: any[]) => any) | undefined;
        }>;
        B: Object3DSetupInterface;
        D: {};
        C: {};
        M: {
            initObject3D(o3d: three.Object3D<three.Event>): void;
            getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
            addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
            removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
            add(o: three.Object3D<three.Event>): void;
            remove(o: three.Object3D<three.Event>): void;
        };
        Defaults: {
            props: Record<string, any>;
            position: Vector3PropInterface;
            rotation: EulerPropInterface;
            scale: Vector3PropInterface;
            lookAt: Vector3PropInterface;
            userData: Record<string, any>;
            visible: boolean;
            disableAdd: boolean;
            disableRemove: boolean;
        };
    }, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }> & Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, Object3DSetupInterface & MeshSetupInterface$1, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    } & {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }>;
}, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly points: ArrayConstructor;
    readonly path: typeof three.Curve;
    readonly tubularSegments: {
        readonly type: NumberConstructor;
        readonly default: 64;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly radialSegments: {
        readonly type: NumberConstructor;
        readonly default: 8;
    };
    readonly closed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
}>> & Readonly<{}>, {
    readonly radius: number;
    readonly radialSegments: number;
    readonly tubularSegments: number;
    readonly closed: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Tube.d.ts.map

interface ImageSetupInterface extends MeshSetupInterface$1 {
    material?: MeshBasicMaterial;
    texture?: Texture;
}
declare const _default$i: vue.DefineComponent<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
    width: NumberConstructor;
    height: NumberConstructor;
    widthSegments: {
        type: NumberConstructor;
        default: number;
    };
    heightSegments: {
        type: NumberConstructor;
        default: number;
    };
    keepSize: BooleanConstructor;
}>, ImageSetupInterface, {}, {}, {
    loadTexture(): Texture;
    refreshTexture(): void;
    onLoaded(texture: Texture): void;
    resize(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>, MeshSetupInterface$1, {}, {}, {
    initMesh(): void;
    createGeometry(): void;
    addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
        [x: string]: unknown;
    }>>): void;
    setGeometry(geometry: three.BufferGeometry): void;
    setMaterial(material: three.Material): void;
    refreshGeometry(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>> & Readonly<{}>, {
    castShadow: boolean;
    receiveShadow: boolean;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, MeshSetupInterface$1, {}, {}, {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, Object3DSetupInterface, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    } & {
        P: Readonly<vue.ExtractPropTypes<{
            onPointerEnter: FunctionConstructor;
            onPointerOver: FunctionConstructor;
            onPointerMove: FunctionConstructor;
            onPointerLeave: FunctionConstructor;
            onPointerDown: FunctionConstructor;
            onPointerUp: FunctionConstructor;
            onClick: FunctionConstructor;
            position: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            rotation: {
                type: vue.PropType<EulerPropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            scale: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                    order: string;
                };
            };
            lookAt: {
                type: vue.PropType<Vector3PropInterface>;
                default: null;
            };
            userData: {
                type: ObjectConstructor;
                default: () => {};
            };
            visible: {
                type: BooleanConstructor;
                default: boolean;
            };
            props: {
                type: ObjectConstructor;
                default: () => {};
            };
            disableAdd: {
                type: BooleanConstructor;
                default: boolean;
            };
            disableRemove: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{
            onReady?: ((...args: any[]) => any) | undefined;
            onCreated?: ((...args: any[]) => any) | undefined;
        }>;
        B: Object3DSetupInterface;
        D: {};
        C: {};
        M: {
            initObject3D(o3d: three.Object3D<three.Event>): void;
            getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
            addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
            removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
            add(o: three.Object3D<three.Event>): void;
            remove(o: three.Object3D<three.Event>): void;
        };
        Defaults: {
            props: Record<string, any>;
            position: Vector3PropInterface;
            rotation: EulerPropInterface;
            scale: Vector3PropInterface;
            lookAt: Vector3PropInterface;
            userData: Record<string, any>;
            visible: boolean;
            disableAdd: boolean;
            disableRemove: boolean;
        };
    }, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }> & Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, Object3DSetupInterface & MeshSetupInterface$1, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    } & {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }>;
}, true, {}, any>, "loaded"[], "loaded", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
    width: NumberConstructor;
    height: NumberConstructor;
    widthSegments: {
        type: NumberConstructor;
        default: number;
    };
    heightSegments: {
        type: NumberConstructor;
        default: number;
    };
    keepSize: BooleanConstructor;
}>> & Readonly<{
    onLoaded?: ((...args: any[]) => any) | undefined;
}>, {
    widthSegments: number;
    heightSegments: number;
    keepSize: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Image.d.ts.map

declare const _default$h: vue.DefineComponent<vue.ExtractPropTypes<{
    count: {
        type: NumberConstructor;
        required: true;
    };
}>, {}, {}, {}, {
    initMesh(): false | undefined;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>, MeshSetupInterface$1, {}, {}, {
    initMesh(): void;
    createGeometry(): void;
    addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
        [x: string]: unknown;
    }>>): void;
    setGeometry(geometry: three.BufferGeometry): void;
    setMaterial(material: three.Material): void;
    refreshGeometry(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    castShadow: BooleanConstructor;
    receiveShadow: BooleanConstructor;
}>> & Readonly<{}>, {
    castShadow: boolean;
    receiveShadow: boolean;
}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, MeshSetupInterface$1, {}, {}, {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, Object3DSetupInterface, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    } & {
        P: Readonly<vue.ExtractPropTypes<{
            onPointerEnter: FunctionConstructor;
            onPointerOver: FunctionConstructor;
            onPointerMove: FunctionConstructor;
            onPointerLeave: FunctionConstructor;
            onPointerDown: FunctionConstructor;
            onPointerUp: FunctionConstructor;
            onClick: FunctionConstructor;
            position: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            rotation: {
                type: vue.PropType<EulerPropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            scale: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                    order: string;
                };
            };
            lookAt: {
                type: vue.PropType<Vector3PropInterface>;
                default: null;
            };
            userData: {
                type: ObjectConstructor;
                default: () => {};
            };
            visible: {
                type: BooleanConstructor;
                default: boolean;
            };
            props: {
                type: ObjectConstructor;
                default: () => {};
            };
            disableAdd: {
                type: BooleanConstructor;
                default: boolean;
            };
            disableRemove: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{
            onReady?: ((...args: any[]) => any) | undefined;
            onCreated?: ((...args: any[]) => any) | undefined;
        }>;
        B: Object3DSetupInterface;
        D: {};
        C: {};
        M: {
            initObject3D(o3d: three.Object3D<three.Event>): void;
            getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
            addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
            removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
            add(o: three.Object3D<three.Event>): void;
            remove(o: three.Object3D<three.Event>): void;
        };
        Defaults: {
            props: Record<string, any>;
            position: Vector3PropInterface;
            rotation: EulerPropInterface;
            scale: Vector3PropInterface;
            lookAt: Vector3PropInterface;
            userData: Record<string, any>;
            visible: boolean;
            disableAdd: boolean;
            disableRemove: boolean;
        };
    }, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }> & Readonly<vue.ExtractPropTypes<{
        castShadow: BooleanConstructor;
        receiveShadow: BooleanConstructor;
    }>> & Readonly<{}>, Object3DSetupInterface & MeshSetupInterface$1, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    } & {
        initMesh(): void;
        createGeometry(): void;
        addGeometryWatchers(props: Readonly<vue.ComponentPropsOptions<{
            [x: string]: unknown;
        }>>): void;
        setGeometry(geometry: three.BufferGeometry): void;
        setMaterial(material: three.Material): void;
        refreshGeometry(): void;
    }, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }>;
}, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    count: {
        type: NumberConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=InstancedMesh.d.ts.map

interface SpriteSetupInterface extends Object3DSetupInterface {
    texture?: Texture;
    material?: SpriteMaterial;
    sprite?: Sprite;
}
declare const _default$g: vue.DefineComponent<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
}>, SpriteSetupInterface, {}, {}, {
    onLoaded(): void;
    updateUV(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, "loaded"[], "loaded", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{
    onLoaded?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Sprite.d.ts.map

interface PointsSetupInterface extends Object3DSetupInterface {
    mesh?: Points;
    points?: Points;
    geometry?: BufferGeometry;
    material?: Material;
}
declare const _default$f: vue.DefineComponent<{}, PointsSetupInterface, {}, {}, {
    setGeometry(geometry: BufferGeometry): void;
    setMaterial(material: Material): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, PointsSetupInterface, {}, {}, {
        setGeometry(geometry: BufferGeometry): void;
        setMaterial(material: Material): void;
    }, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, Object3DSetupInterface, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }>, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    } & {
        P: Readonly<vue.ExtractPropTypes<{
            onPointerEnter: FunctionConstructor;
            onPointerOver: FunctionConstructor;
            onPointerMove: FunctionConstructor;
            onPointerLeave: FunctionConstructor;
            onPointerDown: FunctionConstructor;
            onPointerUp: FunctionConstructor;
            onClick: FunctionConstructor;
            position: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            rotation: {
                type: vue.PropType<EulerPropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            scale: {
                type: vue.PropType<Vector3PropInterface>;
                default: () => {
                    x: number;
                    y: number;
                    z: number;
                    order: string;
                };
            };
            lookAt: {
                type: vue.PropType<Vector3PropInterface>;
                default: null;
            };
            userData: {
                type: ObjectConstructor;
                default: () => {};
            };
            visible: {
                type: BooleanConstructor;
                default: boolean;
            };
            props: {
                type: ObjectConstructor;
                default: () => {};
            };
            disableAdd: {
                type: BooleanConstructor;
                default: boolean;
            };
            disableRemove: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{
            onReady?: ((...args: any[]) => any) | undefined;
            onCreated?: ((...args: any[]) => any) | undefined;
        }>;
        B: Object3DSetupInterface;
        D: {};
        C: {};
        M: {
            initObject3D(o3d: three.Object3D<three.Event>): void;
            getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
            addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
            removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
            add(o: three.Object3D<three.Event>): void;
            remove(o: three.Object3D<three.Event>): void;
        };
        Defaults: {
            props: Record<string, any>;
            position: Vector3PropInterface;
            rotation: EulerPropInterface;
            scale: Vector3PropInterface;
            lookAt: Vector3PropInterface;
            userData: Record<string, any>;
            visible: boolean;
            disableAdd: boolean;
            disableRemove: boolean;
        };
    }, Readonly<vue.ExtractPropTypes<{
        onPointerEnter: FunctionConstructor;
        onPointerOver: FunctionConstructor;
        onPointerMove: FunctionConstructor;
        onPointerLeave: FunctionConstructor;
        onPointerDown: FunctionConstructor;
        onPointerUp: FunctionConstructor;
        onClick: FunctionConstructor;
        position: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        rotation: {
            type: vue.PropType<EulerPropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
            };
        };
        scale: {
            type: vue.PropType<Vector3PropInterface>;
            default: () => {
                x: number;
                y: number;
                z: number;
                order: string;
            };
        };
        lookAt: {
            type: vue.PropType<Vector3PropInterface>;
            default: null;
        };
        userData: {
            type: ObjectConstructor;
            default: () => {};
        };
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        disableAdd: {
            type: BooleanConstructor;
            default: boolean;
        };
        disableRemove: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        onReady?: ((...args: any[]) => any) | undefined;
        onCreated?: ((...args: any[]) => any) | undefined;
    }> & Readonly<{}> & Readonly<{}>, Object3DSetupInterface & PointsSetupInterface, {}, {}, {
        initObject3D(o3d: three.Object3D<three.Event>): void;
        getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
        addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
        removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
        add(o: three.Object3D<three.Event>): void;
        remove(o: three.Object3D<three.Event>): void;
    } & {
        setGeometry(geometry: BufferGeometry): void;
        setMaterial(material: Material): void;
    }, {
        props: Record<string, any>;
        position: Vector3PropInterface;
        rotation: EulerPropInterface;
        scale: Vector3PropInterface;
        lookAt: Vector3PropInterface;
        userData: Record<string, any>;
        visible: boolean;
        disableAdd: boolean;
        disableRemove: boolean;
    }>;
}, true, {}, any>;

declare const _default$e: vue.DefineComponent<{}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
}>, {}, {
    progress: number;
}, {}, {
    onLoad(model: three.Object3D<three.Event>): void;
    onProgress(progress: ProgressEvent<EventTarget>): void;
    onError(error: ErrorEvent): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, ("error" | "load" | "progress" | "before-load")[], "error" | "load" | "progress" | "before-load", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{
    onLoad?: ((...args: any[]) => any) | undefined;
    onProgress?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    "onBefore-load"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=GLTF.d.ts.map

declare const _default$d: vue.DefineComponent<{}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
}>, {}, {
    progress: number;
}, {}, {
    onLoad(model: three.Object3D<three.Event>): void;
    onProgress(progress: ProgressEvent<EventTarget>): void;
    onError(error: ErrorEvent): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, ("error" | "load" | "progress" | "before-load")[], "error" | "load" | "progress" | "before-load", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{
    onLoad?: ((...args: any[]) => any) | undefined;
    onProgress?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    "onBefore-load"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=FBX.d.ts.map

interface EffectComposerSetupInterface {
    renderer?: RendererInterface;
    composer?: EffectComposer;
}
interface EffectComposerInterface extends EffectComposerSetupInterface {
    addPass(pass: Pass): void;
    removePass(pass: Pass): void;
}
declare const ComposerInjectionKey: InjectionKey<EffectComposerInterface>;
declare const _default$c: vue.DefineComponent<{}, EffectComposerSetupInterface, {}, {}, {
    addPass(pass: Pass): void;
    removePass(pass: Pass): void;
    resize(): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, () => {
    [x: symbol]: vue.CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, EffectComposerSetupInterface, {}, {}, {
        addPass(pass: Pass): void;
        removePass(pass: Pass): void;
        resize(): void;
    }, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, {}, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<{}> & Readonly<{}>, EffectComposerSetupInterface, {}, {}, {
        addPass(pass: Pass): void;
        removePass(pass: Pass): void;
        resize(): void;
    }, {}>;
}, true, {}, any>;

interface EffectSetupInterface {
    renderer?: RendererInterface;
    composer?: EffectComposerInterface;
    pass?: Pass;
}
declare const _default$b: vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const _default$a: vue.DefineComponent<{}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=RenderPass.d.ts.map

declare const _default$9: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly focus: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly aperture: {
        readonly type: NumberConstructor;
        readonly default: 0.025;
    };
    readonly maxblur: {
        readonly type: NumberConstructor;
        readonly default: 0.01;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly focus: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly aperture: {
        readonly type: NumberConstructor;
        readonly default: 0.025;
    };
    readonly maxblur: {
        readonly type: NumberConstructor;
        readonly default: 0.01;
    };
}>> & Readonly<{}>, {
    readonly focus: number;
    readonly aperture: number;
    readonly maxblur: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=BokehPass.d.ts.map

declare const _default$8: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly noiseIntensity: {
        readonly type: NumberConstructor;
        readonly default: 0.5;
    };
    readonly scanlinesIntensity: {
        readonly type: NumberConstructor;
        readonly default: 0.05;
    };
    readonly scanlinesCount: {
        readonly type: NumberConstructor;
        readonly default: 4096;
    };
    readonly grayscale: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly noiseIntensity: {
        readonly type: NumberConstructor;
        readonly default: 0.5;
    };
    readonly scanlinesIntensity: {
        readonly type: NumberConstructor;
        readonly default: 0.05;
    };
    readonly scanlinesCount: {
        readonly type: NumberConstructor;
        readonly default: 4096;
    };
    readonly grayscale: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>> & Readonly<{}>, {
    readonly noiseIntensity: number;
    readonly scanlinesIntensity: number;
    readonly scanlinesCount: number;
    readonly grayscale: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=FilmPass.d.ts.map

declare const _default$7: vue.DefineComponent<{}, {}, {}, {}, {
    resize({ size }: {
        size: SizeInterface;
    }): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=FXAAPass.d.ts.map

declare const _default$6: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly shape: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 4;
    };
    readonly rotateR: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly rotateG: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly rotateB: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly scatter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly shape: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 4;
    };
    readonly rotateR: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly rotateG: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly rotateB: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly scatter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>> & Readonly<{}>, {
    readonly radius: number;
    readonly shape: number;
    readonly rotateR: number;
    readonly rotateG: number;
    readonly rotateB: number;
    readonly scatter: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=HalftonePass.d.ts.map

declare const _default$5: vue.DefineComponent<{}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=SMAAPass.d.ts.map

declare const _default$4: vue.DefineComponent<vue.ExtractPropTypes<{
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{}>, {
    options: Record<string, any>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=SSAOPass.d.ts.map

interface TiltShiftPassSetupInterface {
    uniforms1: {
        [name: string]: {
            value: any;
        };
    };
    uniforms2: {
        [name: string]: {
            value: any;
        };
    };
    pass1?: ShaderPass;
    pass2?: ShaderPass;
}
declare const _default$3: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly blurRadius: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly gradientRadius: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly start: {
        readonly type: PropType<Vector2PropInterface>;
        readonly default: () => {
            x: number;
            y: number;
        };
    };
    readonly end: {
        readonly type: PropType<Vector2PropInterface>;
        readonly default: () => {
            x: number;
            y: number;
        };
    };
}>, TiltShiftPassSetupInterface, {}, {}, {
    updateFocusLine(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly blurRadius: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly gradientRadius: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly start: {
        readonly type: PropType<Vector2PropInterface>;
        readonly default: () => {
            x: number;
            y: number;
        };
    };
    readonly end: {
        readonly type: PropType<Vector2PropInterface>;
        readonly default: () => {
            x: number;
            y: number;
        };
    };
}>> & Readonly<{}>, {
    readonly blurRadius: number;
    readonly gradientRadius: number;
    readonly start: Vector2PropInterface;
    readonly end: Vector2PropInterface;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=TiltShiftPass.d.ts.map

declare const _default$2: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly strength: {
        readonly type: NumberConstructor;
        readonly default: 1.5;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly threshold: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly strength: {
        readonly type: NumberConstructor;
        readonly default: 1.5;
    };
    readonly radius: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly threshold: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>> & Readonly<{}>, {
    readonly radius: number;
    readonly strength: number;
    readonly threshold: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=UnrealBloomPass.d.ts.map

declare const _default$1: vue.DefineComponent<vue.ExtractPropTypes<{
    center: {
        type: PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    strength: {
        type: NumberConstructor;
        default: number;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.DefineComponent<{}, EffectSetupInterface, {}, {}, {
    initEffectPass(pass: three_examples_jsm_postprocessing_Pass.Pass): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "ready"[], "ready", vue.PublicProps, Readonly<{}> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    center: {
        type: PropType<Vector2PropInterface>;
        default: () => {
            x: number;
            y: number;
        };
    };
    strength: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    center: Vector2PropInterface;
    strength: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=ZoomBlurPass.d.ts.map

interface MeshSetupInterface extends Object3DSetupInterface {
    helper?: GridHelper;
}
declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
    size: {
        type: NumberConstructor;
        required: boolean;
        default: number;
    };
    divisions: {
        type: NumberConstructor;
        required: boolean;
        default: number;
    };
    color1: {
        type: NumberConstructor;
    };
    color2: {
        type: NumberConstructor;
    };
}>, MeshSetupInterface, {}, {}, {
    initHelper(): void;
    destroyHelper(): void;
    refreshHelper(): void;
}, vue.ComponentOptionsMixin, vue.DefineComponent<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, Object3DSetupInterface, {}, {}, {
    initObject3D(o3d: three.Object3D<three.Event>): void;
    getParent(): vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any> | undefined;
    addToParent(o?: three.Object3D<three.Event> | undefined): boolean;
    removeFromParent(o?: three.Object3D<three.Event> | undefined): boolean;
    add(o: three.Object3D<three.Event>): void;
    remove(o: three.Object3D<three.Event>): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("created" | "ready")[], "created" | "ready", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    onPointerEnter: FunctionConstructor;
    onPointerOver: FunctionConstructor;
    onPointerMove: FunctionConstructor;
    onPointerLeave: FunctionConstructor;
    onPointerDown: FunctionConstructor;
    onPointerUp: FunctionConstructor;
    onClick: FunctionConstructor;
    position: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    rotation: {
        type: vue.PropType<EulerPropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
        };
    };
    scale: {
        type: vue.PropType<Vector3PropInterface>;
        default: () => {
            x: number;
            y: number;
            z: number;
            order: string;
        };
    };
    lookAt: {
        type: vue.PropType<Vector3PropInterface>;
        default: null;
    };
    userData: {
        type: ObjectConstructor;
        default: () => {};
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    disableAdd: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableRemove: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onReady?: ((...args: any[]) => any) | undefined;
    onCreated?: ((...args: any[]) => any) | undefined;
}>, {
    props: Record<string, any>;
    position: Vector3PropInterface;
    rotation: EulerPropInterface;
    scale: Vector3PropInterface;
    lookAt: Vector3PropInterface;
    userData: Record<string, any>;
    visible: boolean;
    disableAdd: boolean;
    disableRemove: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    size: {
        type: NumberConstructor;
        required: boolean;
        default: number;
    };
    divisions: {
        type: NumberConstructor;
        required: boolean;
        default: number;
    };
    color1: {
        type: NumberConstructor;
    };
    color2: {
        type: NumberConstructor;
    };
}>> & Readonly<{}>, {
    size: number;
    divisions: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

type OptionSetter = (dst: any, key: string, value: any) => void;
declare function applyObjectProps(dst: any, options: Record<string, unknown>, setter?: OptionSetter): void;
declare function bindObjectProp(src: any, prop: string, dst: any, apply?: boolean, setter?: OptionSetter): WatchStopHandle;
declare function bindObjectProps(src: any, dst: any, apply?: boolean, setter?: OptionSetter): WatchStopHandle;
declare function setFromProp(o: Record<string, unknown>, prop: Record<string, unknown>): void;
declare function bindProps(src: any, props: string[], dst: any): void;
declare function bindProp(src: any, srcProp: string, dst: any, dstProp?: string): void;
declare function propsValues(props: Record<string, unknown>, exclude?: string[]): Record<string, unknown>;
declare function lerp(value1: number, value2: number, amount: number): number;
declare function limit(val: number, min: number, max: number): number;
declare function getMatcapUrl(hash?: string, format?: number): string;

declare const TroisJSVuePlugin: {
    install(app: App): void;
};
declare function createApp(params: any): App;

interface TextureConfigInterface {
    src: string;
}
interface TexturesInterface {
    loader: TextureLoader;
    count: number;
    textures: Texture[];
    loadProgress: number;
    loadTextures(images: TextureConfigInterface[], cb: {
        (): void;
    }): void;
    dispose(): void;
}
declare function useTextures(): TexturesInterface;

export { _default$L as AmbientLight, BasicMaterial, _default$9 as BokehPass, _default$z as Box, _default$11 as BoxGeometry, Geometry as BufferGeometry, _default$16 as Camera, _default$y as Circle, _default$10 as CircleGeometry, ComposerInjectionKey, _default$x as Cone, _default$$ as ConeGeometry, _default$12 as CubeCamera, _default$B as CubeTexture, _default$w as Cylinder, _default$_ as CylinderGeometry, _default$K as DirectionalLight, _default$v as Dodecahedron, _default$Z as DodecahedronGeometry, _default$c as EffectComposer, _default$b as EffectPass, _default$Y as ExtrudeGeometry, _default$7 as FXAAPass, _default$d as FbxModel, _default$8 as FilmPass, _default$e as GltfModel, _default as GridHelper, _default$15 as Group, _default$6 as HalftonePass, _default$J as HemisphereLight, _default$u as Icosahedron, _default$X as IcosahedronGeometry, _default$i as Image, _default$h as InstancedMesh, LambertMaterial, _default$t as Lathe, _default$W as LatheGeometry, _default$F as MatcapMaterial, BaseMaterial as Material, MaterialInjectionKey, MaterialPublicInterface, Mesh, MeshInjectionKey, MeshPublicInterface, _default$18 as Object3D, Object3DPublicInterface, _default$s as Octahedron, _default$V as OctahedronGeometry, _default$17 as OrthographicCamera, _default$16 as PerspectiveCamera, PhongMaterial, PhysicalMaterial, _default$r as Plane, _default$U as PlaneGeometry, _default$I as PointLight, _default$f as Points, PointsMaterial, _default$q as Polyhedron, _default$T as PolyhedronGeometry, _default$13 as Raycaster, _default$H as RectAreaLight, _default$a as RenderPass, _default$19 as Renderer, RendererInjectionKey, RendererPublicInterface, _default$p as Ring, _default$S as RingGeometry, _default$5 as SMAAPass, _default$4 as SSAOPass, _default$14 as Scene, SceneInjectionKey, _default$E as ShaderMaterial, ShadowMaterial, _default$Q as ShapeGeometry, _default$o as Sphere, _default$R as SphereGeometry, _default$G as SpotLight, _default$g as Sprite, StandardMaterial, _default$D as SubSurfaceMaterial, _default$n as Tetrahedron, _default$P as TetrahedronGeometry, _default$m as Text, _default$C as Texture, _default$3 as TiltShiftPass, ToonMaterial, _default$l as Torus, _default$O as TorusGeometry, _default$k as TorusKnot, _default$N as TorusKnotGeometry, TroisJSVuePlugin, _default$j as Tube, _default$M as TubeGeometry, _default$2 as UnrealBloomPass, _default$A as VideoTexture, _default$1 as ZoomBlurPass, applyObjectProps, bindObjectProp, bindObjectProps, bindProp, bindProps, createApp, getMatcapUrl, lerp, limit, propsValues, setFromProp, useTextures };
