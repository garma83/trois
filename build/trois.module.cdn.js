import { toRef, watch, ref, defineComponent, watchEffect, inject, provide, getCurrentInstance, onUnmounted, createApp as createApp$1 } from 'vue';
import { EventDispatcher, Ray, Plane as Plane$1, MathUtils, Vector3, MOUSE, TOUCH, Quaternion, Spherical, Vector2, Raycaster as Raycaster$1, InstancedMesh as InstancedMesh$1, WebGLRenderer, OrthographicCamera as OrthographicCamera$1, PerspectiveCamera as PerspectiveCamera$1, Scene as Scene$1, Color, Texture as Texture$1, Group as Group$1, WebGLCubeRenderTarget, LinearMipmapLinearFilter, RGBAFormat, CubeCamera as CubeCamera$1, Mesh as Mesh$1, BufferGeometry, BufferAttribute, BoxGeometry as BoxGeometry$1, CircleGeometry as CircleGeometry$1, ConeGeometry as ConeGeometry$1, CylinderGeometry as CylinderGeometry$1, DodecahedronGeometry as DodecahedronGeometry$1, ExtrudeGeometry as ExtrudeGeometry$1, IcosahedronGeometry as IcosahedronGeometry$1, LatheGeometry as LatheGeometry$1, OctahedronGeometry as OctahedronGeometry$1, PlaneGeometry as PlaneGeometry$1, PolyhedronGeometry as PolyhedronGeometry$1, RingGeometry as RingGeometry$1, SphereGeometry as SphereGeometry$1, ShapeGeometry as ShapeGeometry$1, TetrahedronGeometry as TetrahedronGeometry$1, TorusGeometry as TorusGeometry$1, TorusKnotGeometry as TorusKnotGeometry$1, Curve, CatmullRomCurve3, TubeGeometry as TubeGeometry$1, SpotLight as SpotLight$1, DirectionalLight as DirectionalLight$1, AmbientLight as AmbientLight$1, HemisphereLight as HemisphereLight$1, PointLight as PointLight$1, RectAreaLight as RectAreaLight$1, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshPhysicalMaterial, PointsMaterial as PointsMaterial$1, ShadowMaterial as ShadowMaterial$1, MeshStandardMaterial, MeshToonMaterial, TextureLoader, MeshMatcapMaterial, ShaderMaterial as ShaderMaterial$1, RawShaderMaterial as RawShaderMaterial$1, ShaderChunk, UniformsUtils, ShaderLib, CubeReflectionMapping, CubeTextureLoader, VideoTexture as VideoTexture$1, DoubleSide, SpriteMaterial, Sprite as Sprite$1, Points as Points$1, GridHelper as GridHelper$1 } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { EffectComposer as EffectComposer$1 } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass as RenderPass$1 } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass as BokehPass$1 } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { FilmPass as FilmPass$1 } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { HalftonePass as HalftonePass$1 } from 'three/examples/jsm/postprocessing/HalftonePass.js';
import { SMAAPass as SMAAPass$1 } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { SSAOPass as SSAOPass$1 } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { UnrealBloomPass as UnrealBloomPass$1 } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

function applyObjectProps(dst, options, setter) {
  if (options instanceof Object) {
    Object.entries(options).forEach(([key, value]) => {
      if (setter) setter(dst, key, value);
      else dst[key] = value;
    });
  }
}
function bindObjectProp(src, prop, dst, apply = true, setter) {
  if (apply) applyObjectProps(dst, src[prop], setter);
  const r = toRef(src, prop);
  return watch(r, (value) => {
    applyObjectProps(dst, value, setter);
  });
}
function bindObjectProps(src, dst, apply = true, setter) {
  if (apply) applyObjectProps(dst, src, setter);
  const r = ref(src);
  return watch(r, (value) => {
    applyObjectProps(dst, value, setter);
  }, { deep: true });
}
function setFromProp(o, prop) {
  if (prop instanceof Object) {
    Object.entries(prop).forEach(([key, value]) => {
      o[key] = value;
    });
  }
}
function bindProps(src, props, dst) {
  props.forEach((prop) => {
    bindProp(src, prop, dst, prop);
  });
}
function bindProp(src, srcProp, dst, dstProp) {
  const _dstProp = dstProp || srcProp;
  const ref2 = toRef(src, srcProp);
  if (ref2.value instanceof Object) {
    setFromProp(dst[_dstProp], ref2.value);
    watch(ref2, (value) => {
      setFromProp(dst[_dstProp], value);
    }, { deep: true });
  } else {
    if (ref2.value !== void 0) dst[_dstProp] = src[srcProp];
    watch(ref2, (value) => {
      dst[_dstProp] = value;
    });
  }
}
function propsValues(props, exclude = []) {
  const values = {};
  Object.entries(props).forEach(([key, value]) => {
    if (!exclude || !exclude.includes(key)) {
      values[key] = value;
    }
  });
  return values;
}
function lerp(value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}
function limit(val, min, max) {
  return val < min ? min : val > max ? max : val;
}
const MATCAP_ROOT = "https://rawcdn.githack.com/emmelleppi/matcaps/9b36ccaaf0a24881a39062d05566c9e92be4aa0d";
const DEFAULT_MATCAP = "0404E8_0404B5_0404CB_3333FC";
function getMatcapUrl(hash = DEFAULT_MATCAP, format = 1024) {
  const fileName = `${hash}${getMatcapFormatString(format)}.png`;
  return `${MATCAP_ROOT}/${format}/${fileName}`;
}
function getMatcapFormatString(format) {
  switch (format) {
    case 64:
      return "-64px";
    case 128:
      return "-128px";
    case 256:
      return "-256px";
    case 512:
      return "-512px";
    default:
      return "";
  }
}

class Controls extends EventDispatcher {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(object, domElement = null) {
    super();
    this.object = object;
    this.domElement = domElement;
    this.enabled = true;
    this.state = -1;
    this.keys = {};
    this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null };
    this.touches = { ONE: null, TWO: null };
  }
  /**
   * Connects the controls to the DOM. This method has so called "side effects" since
   * it adds the module's event listeners to the DOM.
   */
  connect() {
  }
  /**
   * Disconnects the controls from the DOM.
   */
  disconnect() {
  }
  /**
   * Call this method if you no longer want use to the controls. It frees all internal
   * resources and removes all event listeners.
   */
  dispose() {
  }
  /**
   * Controls should implement this method if they have to update their internal state
   * per simulation step.
   *
   * @param {number} [delta] - The time delta in seconds.
   */
  update() {
  }
}

const _changeEvent = { type: "change" };
const _startEvent = { type: "start" };
const _endEvent = { type: "end" };
const _ray = new Ray();
const _plane = new Plane$1();
const _TILT_LIMIT = Math.cos(70 * MathUtils.DEG2RAD);
const _v = new Vector3();
const _twoPI = 2 * Math.PI;
const _STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
};
const _EPS = 1e-6;
class OrbitControls extends Controls {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(object, domElement = null) {
    super(object, domElement);
    this.state = _STATE.NONE;
    this.target = new Vector3();
    this.cursor = new Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minTargetRadius = 0;
    this.maxTargetRadius = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.05;
    this.enableZoom = true;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.keyRotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.zoomToCursor = false;
    this.autoRotate = false;
    this.autoRotateThreshold = 0;
    this.autoRotateThresholdTrigger = 2;
    this.autoRotateSpeed = 2;
    this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" };
    this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };
    this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this._domElementKeyEvents = null;
    this._lastPosition = new Vector3();
    this._lastQuaternion = new Quaternion();
    this._lastTargetPosition = new Vector3();
    this._quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
    this._quatInverse = this._quat.clone().invert();
    this._spherical = new Spherical();
    this._sphericalDelta = new Spherical();
    this._scale = 1;
    this._panOffset = new Vector3();
    this._rotateStart = new Vector2();
    this._rotateEnd = new Vector2();
    this._rotateDelta = new Vector2();
    this._panStart = new Vector2();
    this._panEnd = new Vector2();
    this._panDelta = new Vector2();
    this._dollyStart = new Vector2();
    this._dollyEnd = new Vector2();
    this._dollyDelta = new Vector2();
    this._dollyDirection = new Vector3();
    this._mouse = new Vector2();
    this._performCursorZoom = false;
    this._pointers = [];
    this._pointerPositions = {};
    this._controlActive = false;
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerUp = onPointerUp.bind(this);
    this._onContextMenu = onContextMenu.bind(this);
    this._onMouseWheel = onMouseWheel.bind(this);
    this._onKeyDown = onKeyDown.bind(this);
    this._onTouchStart = onTouchStart.bind(this);
    this._onTouchMove = onTouchMove.bind(this);
    this._onMouseDown = onMouseDown.bind(this);
    this._onMouseMove = onMouseMove.bind(this);
    this._interceptControlDown = interceptControlDown.bind(this);
    this._interceptControlUp = interceptControlUp.bind(this);
    if (this.domElement !== null) {
      this.connect();
    }
    this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointercancel", this._onPointerUp);
    this.domElement.addEventListener("contextmenu", this._onContextMenu);
    this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false });
    const document = this.domElement.getRootNode();
    document.addEventListener("keydown", this._interceptControlDown, { passive: true, capture: true });
    this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.domElement.removeEventListener("pointercancel", this._onPointerUp);
    this.domElement.removeEventListener("wheel", this._onMouseWheel);
    this.domElement.removeEventListener("contextmenu", this._onContextMenu);
    this.stopListenToKeyEvents();
    const document = this.domElement.getRootNode();
    document.removeEventListener("keydown", this._interceptControlDown, { capture: true });
    this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLDOMElement} domElement - The DOM element
   */
  listenToKeyEvents(domElement) {
    domElement.addEventListener("keydown", this._onKeyDown);
    this._domElementKeyEvents = domElement;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    if (this._domElementKeyEvents !== null) {
      this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown);
      this._domElementKeyEvents = null;
    }
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target);
    this.position0.copy(this.object.position);
    this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0);
    this.object.position.copy(this.position0);
    this.object.zoom = this.zoom0;
    this.object.updateProjectionMatrix();
    this.dispatchEvent(_changeEvent);
    this.update();
    this.state = _STATE.NONE;
  }
  update(deltaTime = null) {
    const position = this.object.position;
    _v.copy(position).sub(this.target);
    _v.applyQuaternion(this._quat);
    this._spherical.setFromVector3(_v);
    if (this.autoRotate && this.state === _STATE.NONE) {
      this._rotateLeft(this._getAutoRotationAngle(deltaTime));
    }
    if (this.enableDamping) {
      this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor;
      this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor;
    } else {
      this._spherical.theta += this._sphericalDelta.theta;
      this._spherical.phi += this._sphericalDelta.phi;
    }
    let min = this.minAzimuthAngle;
    let max = this.maxAzimuthAngle;
    if (isFinite(min) && isFinite(max)) {
      if (min < -Math.PI) min += _twoPI;
      else if (min > Math.PI) min -= _twoPI;
      if (max < -Math.PI) max += _twoPI;
      else if (max > Math.PI) max -= _twoPI;
      if (min <= max) {
        this._spherical.theta = Math.max(min, Math.min(max, this._spherical.theta));
      } else {
        this._spherical.theta = this._spherical.theta > (min + max) / 2 ? Math.max(min, this._spherical.theta) : Math.min(max, this._spherical.theta);
      }
    }
    this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
    this._spherical.makeSafe();
    if (this.enableDamping === true) {
      this.target.addScaledVector(this._panOffset, this.dampingFactor);
    } else {
      this.target.add(this._panOffset);
    }
    this.target.sub(this.cursor);
    this.target.clampLength(this.minTargetRadius, this.maxTargetRadius);
    this.target.add(this.cursor);
    let zoomChanged = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) {
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    } else {
      const prevRadius = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale);
      zoomChanged = prevRadius != this._spherical.radius;
    }
    _v.setFromSpherical(this._spherical);
    _v.applyQuaternion(this._quatInverse);
    position.copy(this.target).add(_v);
    this.object.lookAt(this.target);
    if (this.enableDamping === true) {
      if (Math.abs(this._sphericalDelta.theta) > this.autoRotateThresholdTrigger) {
        this.autoRotateThresholdTriggered = true;
      }
      if (Math.abs(this._sphericalDelta.theta) < this.autoRotateThreshold - 0.01) {
        this.autoRotateThresholdTriggered = false;
      }
      if (!this.autoRotateThresholdTriggered || Math.abs(this._sphericalDelta.theta) > this.autoRotateThreshold) {
        this._sphericalDelta.theta *= 1 - this.dampingFactor;
      }
      this._sphericalDelta.phi *= 1 - this.dampingFactor;
      this._panOffset.multiplyScalar(1 - this.dampingFactor);
    } else {
      this._sphericalDelta.set(0, 0, 0);
      this._panOffset.set(0, 0, 0);
    }
    if (this.zoomToCursor && this._performCursorZoom) {
      let newRadius = null;
      if (this.object.isPerspectiveCamera) {
        const prevRadius = _v.length();
        newRadius = this._clampDistance(prevRadius * this._scale);
        const radiusDelta = prevRadius - newRadius;
        this.object.position.addScaledVector(this._dollyDirection, radiusDelta);
        this.object.updateMatrixWorld();
        zoomChanged = !!radiusDelta;
      } else if (this.object.isOrthographicCamera) {
        const mouseBefore = new Vector3(this._mouse.x, this._mouse.y, 0);
        mouseBefore.unproject(this.object);
        const prevZoom = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
        this.object.updateProjectionMatrix();
        zoomChanged = prevZoom !== this.object.zoom;
        const mouseAfter = new Vector3(this._mouse.x, this._mouse.y, 0);
        mouseAfter.unproject(this.object);
        this.object.position.sub(mouseAfter).add(mouseBefore);
        this.object.updateMatrixWorld();
        newRadius = _v.length();
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
        this.zoomToCursor = false;
      }
      if (newRadius !== null) {
        if (this.screenSpacePanning) {
          this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(newRadius).add(this.object.position);
        } else {
          _ray.origin.copy(this.object.position);
          _ray.direction.set(0, 0, -1).transformDirection(this.object.matrix);
          if (Math.abs(this.object.up.dot(_ray.direction)) < _TILT_LIMIT) {
            this.object.lookAt(this.target);
          } else {
            _plane.setFromNormalAndCoplanarPoint(this.object.up, this.target);
            _ray.intersectPlane(_plane, this.target);
          }
        }
      }
    } else if (this.object.isOrthographicCamera) {
      const prevZoom = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
      if (prevZoom !== this.object.zoom) {
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      }
    }
    this._scale = 1;
    this._performCursorZoom = false;
    if (zoomChanged || this._lastPosition.distanceToSquared(this.object.position) > _EPS || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > _EPS || this._lastTargetPosition.distanceToSquared(this.target) > _EPS) {
      this.dispatchEvent(_changeEvent);
      this._lastPosition.copy(this.object.position);
      this._lastQuaternion.copy(this.object.quaternion);
      this._lastTargetPosition.copy(this.target);
      return true;
    }
    return false;
  }
  _getAutoRotationAngle(deltaTime) {
    if (deltaTime !== null) {
      return _twoPI / 60 * this.autoRotateSpeed * deltaTime;
    } else {
      return _twoPI / 60 / 60 * this.autoRotateSpeed;
    }
  }
  _getZoomScale(delta) {
    const normalizedDelta = Math.abs(delta * 0.01);
    return Math.pow(0.95, this.zoomSpeed * normalizedDelta);
  }
  _rotateLeft(angle) {
    this._sphericalDelta.theta -= angle;
  }
  _rotateUp(angle) {
    this._sphericalDelta.phi -= angle;
  }
  _panLeft(distance, objectMatrix) {
    _v.setFromMatrixColumn(objectMatrix, 0);
    _v.multiplyScalar(-distance);
    this._panOffset.add(_v);
  }
  _panUp(distance, objectMatrix) {
    if (this.screenSpacePanning === true) {
      _v.setFromMatrixColumn(objectMatrix, 1);
    } else {
      _v.setFromMatrixColumn(objectMatrix, 0);
      _v.crossVectors(this.object.up, _v);
    }
    _v.multiplyScalar(distance);
    this._panOffset.add(_v);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(deltaX, deltaY) {
    const element = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const position = this.object.position;
      _v.copy(position).sub(this.target);
      let targetDistance = _v.length();
      targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
      this._panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
      this._panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
    } else if (this.object.isOrthographicCamera) {
      this._panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
      this._panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
      this.enablePan = false;
    }
  }
  _dollyOut(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale /= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _dollyIn(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale *= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _updateZoomParameters(x, y) {
    if (!this.zoomToCursor) {
      return;
    }
    this._performCursorZoom = true;
    const rect = this.domElement.getBoundingClientRect();
    const dx = x - rect.left;
    const dy = y - rect.top;
    const w = rect.width;
    const h = rect.height;
    this._mouse.x = dx / w * 2 - 1;
    this._mouse.y = -(dy / h) * 2 + 1;
    this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(dist) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, dist));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(event) {
    this._rotateStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownDolly(event) {
    this._updateZoomParameters(event.clientX, event.clientX);
    this._dollyStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownPan(event) {
    this._panStart.set(event.clientX, event.clientY);
  }
  _handleMouseMoveRotate(event) {
    this._rotateEnd.set(event.clientX, event.clientY);
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
    this.update();
  }
  _handleMouseMoveDolly(event) {
    this._dollyEnd.set(event.clientX, event.clientY);
    this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart);
    if (this._dollyDelta.y > 0) {
      this._dollyOut(this._getZoomScale(this._dollyDelta.y));
    } else if (this._dollyDelta.y < 0) {
      this._dollyIn(this._getZoomScale(this._dollyDelta.y));
    }
    this._dollyStart.copy(this._dollyEnd);
    this.update();
  }
  _handleMouseMovePan(event) {
    this._panEnd.set(event.clientX, event.clientY);
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
    this.update();
  }
  _handleMouseWheel(event) {
    this._updateZoomParameters(event.clientX, event.clientY);
    if (event.deltaY < 0) {
      this._dollyIn(this._getZoomScale(event.deltaY));
    } else if (event.deltaY > 0) {
      this._dollyOut(this._getZoomScale(event.deltaY));
    }
    this.update();
  }
  _handleKeyDown(event) {
    let needsUpdate = false;
    switch (event.code) {
      case this.keys.UP:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.BOTTOM:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, -this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.LEFT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.RIGHT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(-this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
    }
    if (needsUpdate) {
      event.preventDefault();
      this.update();
    }
  }
  _handleTouchStartRotate(event) {
    if (this._pointers.length === 1) {
      this._rotateStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateStart.set(x, y);
    }
  }
  _handleTouchStartPan(event) {
    if (this._pointers.length === 1) {
      this._panStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panStart.set(x, y);
    }
  }
  _handleTouchStartDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyStart.set(0, distance);
  }
  _handleTouchStartDollyPan(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enablePan) this._handleTouchStartPan(event);
  }
  _handleTouchStartDollyRotate(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enableRotate) this._handleTouchStartRotate(event);
  }
  _handleTouchMoveRotate(event) {
    if (this._pointers.length == 1) {
      this._rotateEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateEnd.set(x, y);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(event) {
    if (this._pointers.length === 1) {
      this._panEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panEnd.set(x, y);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyEnd.set(0, distance);
    this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed));
    this._dollyOut(this._dollyDelta.y);
    this._dollyStart.copy(this._dollyEnd);
    const centerX = (event.pageX + position.x) * 0.5;
    const centerY = (event.pageY + position.y) * 0.5;
    this._updateZoomParameters(centerX, centerY);
  }
  _handleTouchMoveDollyPan(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enablePan) this._handleTouchMovePan(event);
  }
  _handleTouchMoveDollyRotate(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enableRotate) this._handleTouchMoveRotate(event);
  }
  // pointers
  _addPointer(event) {
    this._pointers.push(event.pointerId);
  }
  _removePointer(event) {
    delete this._pointerPositions[event.pointerId];
    for (let i = 0; i < this._pointers.length; i++) {
      if (this._pointers[i] == event.pointerId) {
        this._pointers.splice(i, 1);
        return;
      }
    }
  }
  _isTrackingPointer(event) {
    for (let i = 0; i < this._pointers.length; i++) {
      if (this._pointers[i] == event.pointerId) return true;
    }
    return false;
  }
  _trackPointer(event) {
    let position = this._pointerPositions[event.pointerId];
    if (position === void 0) {
      position = new Vector2();
      this._pointerPositions[event.pointerId] = position;
    }
    position.set(event.pageX, event.pageY);
  }
  _getSecondPointerPosition(event) {
    const pointerId = event.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[pointerId];
  }
  //
  _customWheelEvent(event) {
    const mode = event.deltaMode;
    const newEvent = {
      clientX: event.clientX,
      clientY: event.clientY,
      deltaY: event.deltaY
    };
    switch (mode) {
      case 1:
        newEvent.deltaY *= 16;
        break;
      case 2:
        newEvent.deltaY *= 100;
        break;
    }
    if (event.ctrlKey && !this._controlActive) {
      newEvent.deltaY *= 10;
    }
    return newEvent;
  }
}
function onPointerDown(event) {
  if (this.enabled === false) return;
  if (this._pointers.length === 0) {
    this.domElement.setPointerCapture(event.pointerId);
    this.domElement.addEventListener("pointermove", this._onPointerMove);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  if (this._isTrackingPointer(event)) return;
  this._addPointer(event);
  if (event.pointerType === "touch") {
    this._onTouchStart(event);
  } else {
    this._onMouseDown(event);
  }
}
function onPointerMove(event) {
  if (this.enabled === false) return;
  if (event.pointerType === "touch") {
    this._onTouchMove(event);
  } else {
    this._onMouseMove(event);
  }
}
function onPointerUp(event) {
  this._removePointer(event);
  switch (this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(event.pointerId);
      this.domElement.removeEventListener("pointermove", this._onPointerMove);
      this.domElement.removeEventListener("pointerup", this._onPointerUp);
      this.dispatchEvent(_endEvent);
      this.state = _STATE.NONE;
      break;
    case 1:
      const pointerId = this._pointers[0];
      const position = this._pointerPositions[pointerId];
      this._onTouchStart({ pointerId, pageX: position.x, pageY: position.y });
      break;
  }
}
function onMouseDown(event) {
  let mouseAction;
  switch (event.button) {
    case 0:
      mouseAction = this.mouseButtons.LEFT;
      break;
    case 1:
      mouseAction = this.mouseButtons.MIDDLE;
      break;
    case 2:
      mouseAction = this.mouseButtons.RIGHT;
      break;
    default:
      mouseAction = -1;
  }
  switch (mouseAction) {
    case MOUSE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(event);
      this.state = _STATE.DOLLY;
      break;
    case MOUSE.ROTATE:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      }
      break;
    case MOUSE.PAN:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onMouseMove(event) {
  switch (this.state) {
    case _STATE.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(event);
      break;
    case _STATE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(event);
      break;
    case _STATE.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(event);
      break;
  }
}
function onMouseWheel(event) {
  if (this.enabled === false || this.enableZoom === false || this.state !== _STATE.NONE) return;
  event.preventDefault();
  this.dispatchEvent(_startEvent);
  this._handleMouseWheel(this._customWheelEvent(event));
  this.dispatchEvent(_endEvent);
}
function onKeyDown(event) {
  if (this.enabled === false) return;
  this._handleKeyDown(event);
}
function onTouchStart(event) {
  this._trackPointer(event);
  switch (this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case TOUCH.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(event);
          this.state = _STATE.TOUCH_ROTATE;
          break;
        case TOUCH.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(event);
          this.state = _STATE.TOUCH_PAN;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case TOUCH.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(event);
          this.state = _STATE.TOUCH_DOLLY_PAN;
          break;
        case TOUCH.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(event);
          this.state = _STATE.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onTouchMove(event) {
  this._trackPointer(event);
  switch (this.state) {
    case _STATE.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(event);
      this.update();
      break;
    case _STATE.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(event);
      this.update();
      break;
    default:
      this.state = _STATE.NONE;
  }
}
function onContextMenu(event) {
  if (this.enabled === false) return;
  event.preventDefault();
}
function interceptControlDown(event) {
  if (event.key === "Control") {
    this._controlActive = true;
    const document = this.domElement.getRootNode();
    document.addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}
function interceptControlUp(event) {
  if (event.key === "Control") {
    this._controlActive = false;
    const document = this.domElement.getRootNode();
    document.removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}

function useRaycaster(options) {
  const {
    camera,
    resetPosition = new Vector3(0, 0, 0)
  } = options;
  const raycaster = new Raycaster$1();
  const position = resetPosition.clone();
  const plane = new Plane$1(new Vector3(0, 0, 1), 0);
  const updatePosition = (coords) => {
    raycaster.setFromCamera(coords, camera);
    camera.getWorldDirection(plane.normal);
    raycaster.ray.intersectPlane(plane, position);
  };
  const intersect = (coords, objects, recursive = false) => {
    raycaster.setFromCamera(coords, camera);
    return raycaster.intersectObjects(objects, recursive);
  };
  return {
    position,
    updatePosition,
    intersect
  };
}

function usePointer(options) {
  const {
    camera,
    domElement,
    intersectObjects,
    intersectRecursive = false,
    touch = true,
    resetOnEnd = false,
    onEnter = () => {
    },
    onMove = () => {
    },
    onDown = () => {
    },
    onUp = () => {
    },
    onLeave = () => {
    },
    onClick = () => {
    },
    onIntersectEnter = () => {
    },
    onIntersectOver = () => {
    },
    onIntersectMove = () => {
    },
    onIntersectLeave = () => {
    },
    onIntersectUp = () => {
    },
    onIntersectDown = () => {
    },
    onIntersectClick = () => {
    }
  } = options;
  const position = new Vector2(0, 0);
  const positionN = new Vector2(0, 0);
  const raycaster = useRaycaster({ camera });
  const positionV3 = raycaster.position;
  const obj = {
    position,
    positionN,
    positionV3,
    intersectObjects,
    listeners: false,
    addListeners,
    removeListeners,
    intersect
  };
  return obj;
  function reset() {
    position.set(0, 0);
    positionN.set(0, 0);
    positionV3.set(0, 0, 0);
  }
  function updatePosition(event) {
    let x, y;
    if (event.touches && event.touches.length > 0) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }
    const rect = domElement.getBoundingClientRect();
    position.x = x - rect.left;
    position.y = y - rect.top;
    positionN.x = position.x / rect.width * 2 - 1;
    positionN.y = -(position.y / rect.height) * 2 + 1;
    raycaster.updatePosition(positionN);
  }
  function intersect() {
    const _intersectObjects = getIntersectObjects();
    if (_intersectObjects.length) {
      const intersects = raycaster.intersect(positionN, _intersectObjects, intersectRecursive);
      const offObjects = [..._intersectObjects];
      const iMeshes = [];
      intersects.forEach((intersect2) => {
        var _a, _b, _c;
        const { object } = intersect2;
        const component = getComponent(object);
        if (object instanceof InstancedMesh$1) {
          if (iMeshes.indexOf(object) !== -1) return;
          iMeshes.push(object);
        }
        if (!object.userData.over) {
          object.userData.over = true;
          const overEvent = { type: "pointerover", over: true, component, intersect: intersect2, intersects };
          const enterEvent = { ...overEvent, type: "pointerenter" };
          onIntersectOver(overEvent);
          onIntersectEnter(enterEvent);
          (_a = component == null ? void 0 : component.onPointerOver) == null ? void 0 : _a.call(component, overEvent);
          (_b = component == null ? void 0 : component.onPointerEnter) == null ? void 0 : _b.call(component, enterEvent);
        }
        const moveEvent = { type: "pointermove", component, intersect: intersect2 };
        onIntersectMove(moveEvent);
        (_c = component == null ? void 0 : component.onPointerMove) == null ? void 0 : _c.call(component, moveEvent);
        offObjects.splice(offObjects.indexOf(object), 1);
      });
      offObjects.forEach((object) => {
        var _a, _b;
        const component = getComponent(object);
        if (object.userData.over) {
          object.userData.over = false;
          const overEvent = { type: "pointerover", over: false, component };
          const leaveEvent = { ...overEvent, type: "pointerleave" };
          onIntersectOver(overEvent);
          onIntersectLeave(leaveEvent);
          (_a = component == null ? void 0 : component.onPointerOver) == null ? void 0 : _a.call(component, overEvent);
          (_b = component == null ? void 0 : component.onPointerLeave) == null ? void 0 : _b.call(component, leaveEvent);
        }
      });
    }
  }
  function pointerEnter(event) {
    updatePosition(event);
    onEnter({ type: "pointerenter", position, positionN, positionV3 });
  }
  function pointerMove(event) {
    updatePosition(event);
    onMove({ type: "pointermove", position, positionN, positionV3 });
    intersect();
  }
  function pointerDown(event) {
    updatePosition(event);
    const _intersectObjects = getIntersectObjects();
    if (_intersectObjects.length) {
      const intersects = raycaster.intersect(positionN, _intersectObjects, intersectRecursive);
      const iMeshes = [];
      intersects.forEach((intersect2) => {
        var _a;
        const { object } = intersect2;
        const component = getComponent(object);
        if (object instanceof InstancedMesh$1) {
          if (iMeshes.indexOf(object) !== -1) return;
          iMeshes.push(object);
        }
        const event2 = { type: "pointerdown", component, intersect: intersect2, intersects };
        onIntersectDown(event2);
        (_a = component == null ? void 0 : component.onPointerDown) == null ? void 0 : _a.call(component, event2);
      });
    }
    onDown({ type: "pointerdown", position, positionN, positionV3 });
  }
  function pointerUp(event) {
    updatePosition(event);
    const _intersectObjects = getIntersectObjects();
    if (_intersectObjects.length) {
      const intersects = raycaster.intersect(positionN, _intersectObjects, intersectRecursive);
      const iMeshes = [];
      intersects.forEach((intersect2) => {
        var _a;
        const { object } = intersect2;
        const component = getComponent(object);
        if (object instanceof InstancedMesh$1) {
          if (iMeshes.indexOf(object) !== -1) return;
          iMeshes.push(object);
        }
        const event2 = { type: "pointerup", component, intersect: intersect2, intersects };
        onIntersectUp(event2);
        (_a = component == null ? void 0 : component.onPointerUp) == null ? void 0 : _a.call(component, event2);
      });
    }
    onUp({ type: "pointerup", position, positionN, positionV3 });
  }
  function pointerClick(event) {
    updatePosition(event);
    const _intersectObjects = getIntersectObjects();
    if (_intersectObjects.length) {
      const intersects = raycaster.intersect(positionN, _intersectObjects, intersectRecursive);
      const iMeshes = [];
      intersects.forEach((intersect2) => {
        var _a;
        const { object } = intersect2;
        const component = getComponent(object);
        if (object instanceof InstancedMesh$1) {
          if (iMeshes.indexOf(object) !== -1) return;
          iMeshes.push(object);
        }
        const event2 = { type: "click", component, intersect: intersect2, intersects };
        onIntersectClick(event2);
        (_a = component == null ? void 0 : component.onClick) == null ? void 0 : _a.call(component, event2);
      });
    }
    onClick({ type: "click", position, positionN, positionV3 });
  }
  function pointerLeave() {
    if (resetOnEnd) reset();
    onLeave({ type: "pointerleave" });
  }
  function getComponent(object) {
    if (object.userData.component) return object.userData.component;
    let parent = object.parent;
    while (parent) {
      if (parent.userData.component) {
        return parent.userData.component;
      }
      parent = parent.parent;
    }
    return void 0;
  }
  function getIntersectObjects() {
    if (typeof intersectObjects === "function") {
      return intersectObjects();
    } else return intersectObjects;
  }
  function addListeners() {
    domElement.addEventListener("mouseenter", pointerEnter);
    domElement.addEventListener("mousemove", pointerMove);
    domElement.addEventListener("mouseleave", pointerLeave);
    domElement.addEventListener("pointerdown", pointerDown);
    domElement.addEventListener("pointerup", pointerUp);
    domElement.addEventListener("click", pointerClick);
    if (touch) {
      domElement.addEventListener("touchstart", pointerEnter);
      domElement.addEventListener("touchmove", pointerMove);
      domElement.addEventListener("touchend", pointerLeave);
    }
    obj.listeners = true;
  }
  function removeListeners() {
    domElement.removeEventListener("mouseenter", pointerEnter);
    domElement.removeEventListener("mousemove", pointerMove);
    domElement.removeEventListener("mouseleave", pointerLeave);
    domElement.removeEventListener("pointerdown", pointerDown);
    domElement.removeEventListener("pointerup", pointerUp);
    domElement.removeEventListener("click", pointerClick);
    domElement.removeEventListener("touchstart", pointerEnter);
    domElement.removeEventListener("touchmove", pointerMove);
    domElement.removeEventListener("touchend", pointerLeave);
    obj.listeners = false;
  }
}

function useThree(params) {
  const config = {
    antialias: true,
    alpha: false,
    autoClear: true,
    orbitCtrl: false,
    pointer: false,
    resize: false,
    width: 300,
    height: 150
  };
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      config[key] = value;
    });
  }
  const size = {
    width: 1,
    height: 1,
    wWidth: 1,
    wHeight: 1,
    ratio: 1
  };
  const beforeRenderCallbacks = [];
  const intersectObjects = [];
  const renderer = createRenderer();
  const obj = {
    config,
    renderer,
    size,
    init,
    dispose,
    render,
    renderC,
    setSize,
    addIntersectObject,
    removeIntersectObject
  };
  return obj;
  function createRenderer() {
    const renderer2 = new WebGLRenderer({ canvas: config.canvas, antialias: config.antialias, alpha: config.alpha, ...config.params });
    renderer2.autoClear = config.autoClear;
    return renderer2;
  }
  function init() {
    if (!obj.scene) {
      console.error("Missing Scene");
      return false;
    }
    if (!obj.camera) {
      console.error("Missing Camera");
      return false;
    }
    if (config.resize) {
      onResize();
      window.addEventListener("resize", onResize);
    } else if (config.width && config.height) {
      setSize(config.width, config.height);
    }
    initPointer();
    if (config.orbitCtrl) {
      const cameraCtrl = new OrbitControls(obj.camera, obj.renderer.domElement);
      if (config.orbitCtrl instanceof Object) {
        Object.entries(config.orbitCtrl).forEach(([key, value]) => {
          cameraCtrl[key] = value;
        });
      }
      onBeforeRender(() => {
        cameraCtrl.update();
      });
      obj.cameraCtrl = cameraCtrl;
    }
    return true;
  }
  function initPointer() {
    let pointerConf = {
      camera: obj.camera,
      domElement: obj.renderer.domElement,
      intersectObjects
    };
    if (config.pointer && config.pointer instanceof Object) {
      pointerConf = { ...pointerConf, ...config.pointer };
    }
    const pointer = obj.pointer = usePointer(pointerConf);
    if (config.pointer || intersectObjects.length) {
      pointer.addListeners();
      if (pointerConf.intersectMode === "frame") {
        onBeforeRender(pointer.intersect);
      }
    }
  }
  function onBeforeRender(cb) {
    beforeRenderCallbacks.push(cb);
  }
  function render() {
    beforeRenderCallbacks.forEach((c) => c());
    obj.renderer.render(obj.scene, obj.camera);
  }
  function renderC() {
    beforeRenderCallbacks.forEach((c) => c());
    obj.composer.render();
  }
  function addIntersectObject(o) {
    if (intersectObjects.indexOf(o) === -1) {
      intersectObjects.push(o);
    }
    if (obj.pointer && !obj.pointer.listeners) {
      obj.pointer.addListeners();
    }
  }
  function removeIntersectObject(o) {
    const i = intersectObjects.indexOf(o);
    if (i !== -1) {
      intersectObjects.splice(i, 1);
    }
    if (obj.pointer && !config.pointer && intersectObjects.length === 0) {
      obj.pointer.removeListeners();
    }
  }
  function dispose() {
    window.removeEventListener("resize", onResize);
    if (obj.pointer) obj.pointer.removeListeners();
    if (obj.cameraCtrl) obj.cameraCtrl.dispose();
    if (obj.renderer) obj.renderer.dispose();
  }
  function onResize() {
    var _a;
    if (config.resize === "window") {
      setSize(window.innerWidth, window.innerHeight);
    } else {
      const elt = obj.renderer.domElement.parentNode;
      if (elt) setSize(elt.clientWidth, elt.clientHeight);
    }
    (_a = config.onResize) == null ? void 0 : _a.call(config, size);
  }
  function setSize(width, height) {
    size.width = width;
    size.height = height;
    size.ratio = width / height;
    obj.renderer.setSize(width, height, false);
    const camera = obj.camera;
    if (camera.type === "PerspectiveCamera") {
      const pCamera = camera;
      pCamera.aspect = size.ratio;
      pCamera.updateProjectionMatrix();
    }
    if (camera.type === "OrthographicCamera") {
      const oCamera = camera;
      size.wWidth = oCamera.right - oCamera.left;
      size.wHeight = oCamera.top - oCamera.bottom;
    } else {
      const wsize = getCameraSize();
      size.wWidth = wsize[0];
      size.wHeight = wsize[1];
    }
  }
  function getCameraSize() {
    const camera = obj.camera;
    const vFOV = camera.fov * Math.PI / 180;
    const h = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z);
    const w = h * camera.aspect;
    return [w, h];
  }
}

const RendererInjectionKey = Symbol("Renderer");
var Renderer = defineComponent({
  name: "Renderer",
  props: {
    params: { type: Object, default: () => ({}) },
    antialias: Boolean,
    alpha: Boolean,
    autoClear: { type: Boolean, default: true },
    orbitCtrl: { type: [Boolean, Object], default: false },
    pointer: { type: [Boolean, Object], default: false },
    resize: { type: [Boolean, String], default: false },
    shadow: Boolean,
    width: String,
    height: String,
    pixelRatio: Number,
    xr: Boolean,
    props: { type: Object, default: () => ({}) },
    onReady: Function
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    const initCallbacks = [];
    const mountedCallbacks = [];
    const beforeRenderCallbacks = [];
    const afterRenderCallbacks = [];
    const resizeCallbacks = [];
    const canvas = document.createElement("canvas");
    Object.entries(attrs).forEach(([key, value]) => {
      const matches = key.match(/^on([A-Z][a-zA-Z]*)$/);
      if (matches) {
        canvas.addEventListener(matches[1].toLowerCase(), value);
      } else {
        canvas.setAttribute(key, value);
      }
    });
    const config = {
      canvas,
      params: props.params,
      antialias: props.antialias,
      alpha: props.alpha,
      autoClear: props.autoClear,
      orbitCtrl: props.orbitCtrl,
      pointer: props.pointer,
      resize: props.resize
    };
    if (props.width) config.width = parseInt(props.width);
    if (props.height) config.height = parseInt(props.height);
    const three = useThree(config);
    bindObjectProp(props, "props", three.renderer);
    watchEffect(() => {
      if (props.pixelRatio) three.renderer.setPixelRatio(props.pixelRatio);
    });
    const renderFn = () => {
    };
    return {
      canvas,
      three,
      renderer: three.renderer,
      size: three.size,
      renderFn,
      raf: true,
      initCallbacks,
      mountedCallbacks,
      beforeRenderCallbacks,
      afterRenderCallbacks,
      resizeCallbacks
    };
  },
  computed: {
    camera: {
      get: function() {
        return this.three.camera;
      },
      set: function(camera) {
        this.three.camera = camera;
      }
    },
    scene: {
      get: function() {
        return this.three.scene;
      },
      set: function(scene) {
        this.three.scene = scene;
      }
    },
    composer: {
      get: function() {
        return this.three.composer;
      },
      set: function(composer) {
        this.three.composer = composer;
      }
    }
  },
  provide() {
    return {
      [RendererInjectionKey]: this
    };
  },
  mounted() {
    var _a;
    this.$el.parentNode.insertBefore(this.canvas, this.$el);
    if (this.three.init()) {
      if (this.three.pointer) {
        this.$pointer = this.three.pointer;
      }
      this.three.config.onResize = (size) => {
        this.resizeCallbacks.forEach((e) => e({ type: "resize", renderer: this, size }));
      };
      if (this.shadow) {
        this.renderer.shadowMap.enabled = true;
      }
      this.renderFn = this.three.composer ? this.three.renderC : this.three.render;
      this.initCallbacks.forEach((e) => e({ type: "init", renderer: this }));
      (_a = this.onReady) == null ? void 0 : _a.call(this, this);
      if (this.xr) {
        this.renderer.xr.enabled = true;
        this.renderer.setAnimationLoop(this.render);
      } else {
        requestAnimationFrame(this.renderLoop);
      }
    }
    this.mountedCallbacks.forEach((e) => e({ type: "mounted", renderer: this }));
  },
  beforeUnmount() {
    this.canvas.remove();
    this.beforeRenderCallbacks = [];
    this.afterRenderCallbacks = [];
    this.raf = false;
    this.three.dispose();
  },
  methods: {
    onInit(cb) {
      this.addListener("init", cb);
    },
    onMounted(cb) {
      this.addListener("mounted", cb);
    },
    onBeforeRender(cb) {
      this.addListener("beforerender", cb);
    },
    offBeforeRender(cb) {
      this.removeListener("beforerender", cb);
    },
    onAfterRender(cb) {
      this.addListener("afterrender", cb);
    },
    offAfterRender(cb) {
      this.removeListener("afterrender", cb);
    },
    onResize(cb) {
      this.addListener("resize", cb);
    },
    offResize(cb) {
      this.removeListener("resize", cb);
    },
    addListener(type, cb) {
      const callbacks = this.getCallbacks(type);
      callbacks.push(cb);
    },
    removeListener(type, cb) {
      const callbacks = this.getCallbacks(type);
      const index = callbacks.indexOf(cb);
      if (index !== -1) callbacks.splice(index, 1);
    },
    getCallbacks(type) {
      if (type === "init") {
        return this.initCallbacks;
      } else if (type === "mounted") {
        return this.mountedCallbacks;
      } else if (type === "beforerender") {
        return this.beforeRenderCallbacks;
      } else if (type === "afterrender") {
        return this.afterRenderCallbacks;
      } else {
        return this.resizeCallbacks;
      }
    },
    render(time) {
      this.beforeRenderCallbacks.forEach((e) => e({ type: "beforerender", renderer: this, time }));
      this.renderFn({ renderer: this, time });
      this.afterRenderCallbacks.forEach((e) => e({ type: "afterrender", renderer: this, time }));
    },
    renderLoop(time) {
      if (this.raf) requestAnimationFrame(this.renderLoop);
      this.render(time);
    }
  },
  render() {
    return this.$slots.default ? this.$slots.default() : [];
  },
  __hmrId: "Renderer"
});

var Camera = defineComponent({
  // TODO: eventually extend Object3D
  // extends: Object3D,
  props: {
    props: { type: Object, default: () => ({}) }
  },
  // inject: { renderer: RendererInjectionKey as symbol },
  // setup(): CameraSetupInterface {
  //   return {}
  // },
  render() {
    return this.$slots.default ? this.$slots.default() : [];
  }
});
function cameraSetProp(camera, key, value, updateProjectionMatrix = true) {
  camera[key] = value;
  if (updateProjectionMatrix) camera.updateProjectionMatrix();
}

var OrthographicCamera = defineComponent({
  extends: Camera,
  name: "OrthographicCamera",
  props: {
    left: { type: Number, default: -1 },
    right: { type: Number, default: 1 },
    top: { type: Number, default: 1 },
    bottom: { type: Number, default: -1 },
    near: { type: Number, default: 0.1 },
    far: { type: Number, default: 2e3 },
    zoom: { type: Number, default: 1 },
    position: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) }
  },
  setup(props) {
    const renderer = inject(RendererInjectionKey);
    if (!renderer) {
      console.error("Renderer not found");
      return;
    }
    const camera = new OrthographicCamera$1(props.left, props.right, props.top, props.bottom, props.near, props.far);
    renderer.camera = camera;
    bindProp(props, "position", camera);
    bindObjectProp(props, "props", camera, true, cameraSetProp);
    ["left", "right", "top", "bottom", "near", "far", "zoom"].forEach((p) => {
      watch(() => props[p], (value) => {
        cameraSetProp(camera, p, value);
      });
    });
    return { renderer, camera };
  },
  __hmrId: "OrthographicCamera"
});

var PerspectiveCamera = defineComponent({
  extends: Camera,
  name: "PerspectiveCamera",
  props: {
    aspect: { type: Number, default: 1 },
    far: { type: Number, default: 2e3 },
    fov: { type: Number, default: 50 },
    near: { type: Number, default: 0.1 },
    position: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) },
    lookAt: { type: Object, default: null }
  },
  setup(props) {
    var _a;
    const renderer = inject(RendererInjectionKey);
    if (!renderer) {
      console.error("Renderer not found");
      return;
    }
    const camera = new PerspectiveCamera$1(props.fov, props.aspect, props.near, props.far);
    renderer.camera = camera;
    bindProp(props, "position", camera);
    if (props.lookAt) camera.lookAt((_a = props.lookAt.x) != null ? _a : 0, props.lookAt.y, props.lookAt.z);
    watch(() => props.lookAt, (v) => {
      var _a2;
      camera.lookAt((_a2 = v.x) != null ? _a2 : 0, v.y, v.z);
    }, { deep: true });
    bindObjectProp(props, "props", camera, true, cameraSetProp);
    ["aspect", "far", "fov", "near"].forEach((p) => {
      watch(() => props[p], (value) => {
        cameraSetProp(camera, p, value);
      });
    });
    return { renderer, camera };
  },
  __hmrId: "PerspectiveCamera"
});

const SceneInjectionKey = Symbol("Scene");
var Scene = defineComponent({
  name: "Scene",
  props: {
    background: [String, Number, Object]
  },
  setup(props) {
    const renderer = inject(RendererInjectionKey);
    const scene = new Scene$1();
    if (!renderer) {
      console.error("Renderer not found");
      return;
    }
    renderer.scene = scene;
    provide(SceneInjectionKey, scene);
    const setBackground = (value) => {
      if (!value) return;
      if (typeof value === "string" || typeof value === "number") {
        if (scene.background instanceof Color) scene.background.set(value);
        else scene.background = new Color(value);
      } else if (value instanceof Texture$1) {
        scene.background = value;
      }
    };
    setBackground(props.background);
    watch(() => props.background, setBackground);
    const add = (o) => {
      scene.add(o);
    };
    const remove = (o) => {
      scene.remove(o);
    };
    return { scene, add, remove };
  },
  render() {
    return this.$slots.default ? this.$slots.default() : [];
  },
  __hmrId: "Scene"
});

const pointerProps = {
  onPointerEnter: Function,
  onPointerOver: Function,
  onPointerMove: Function,
  onPointerLeave: Function,
  onPointerDown: Function,
  onPointerUp: Function,
  onClick: Function
};
var Object3D = defineComponent({
  name: "Object3D",
  // inject for sub components
  inject: {
    renderer: RendererInjectionKey,
    scene: SceneInjectionKey
  },
  emits: ["created", "ready"],
  props: {
    position: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) },
    rotation: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) },
    scale: { type: Object, default: () => ({ x: 1, y: 1, z: 1, order: "XYZ" }) },
    lookAt: { type: Object, default: null },
    userData: { type: Object, default: () => ({}) },
    visible: { type: Boolean, default: true },
    props: { type: Object, default: () => ({}) },
    disableAdd: { type: Boolean, default: false },
    disableRemove: { type: Boolean, default: false },
    ...pointerProps
  },
  setup() {
    return {};
  },
  created() {
    if (!this.renderer) {
      console.error("Missing parent Renderer");
    }
    if (!this.scene) {
      console.error("Missing parent Scene");
    }
  },
  unmounted() {
    if (!this.disableRemove) this.removeFromParent();
    if (this.o3d) {
      if (this.renderer) this.renderer.three.removeIntersectObject(this.o3d);
    }
  },
  methods: {
    initObject3D(o3d) {
      var _a;
      this.o3d = o3d;
      o3d.userData.component = this;
      if (this.onPointerEnter || this.onPointerOver || this.onPointerMove || this.onPointerLeave || this.onPointerDown || this.onPointerUp || this.onClick) {
        if (this.renderer) this.renderer.three.addIntersectObject(o3d);
      }
      bindProp(this, "position", o3d);
      bindProp(this, "rotation", o3d);
      bindProp(this, "scale", o3d);
      bindProp(this, "userData", o3d.userData);
      bindProp(this, "visible", o3d);
      bindObjectProp(this, "props", o3d);
      this.$emit("created", o3d);
      if (this.lookAt) o3d.lookAt((_a = this.lookAt.x) != null ? _a : 0, this.lookAt.y, this.lookAt.z);
      watch(() => this.lookAt, (v) => {
        var _a2;
        o3d.lookAt((_a2 = v.x) != null ? _a2 : 0, v.y, v.z);
      }, { deep: true });
      this.parent = this.getParent();
      if (!this.disableAdd) {
        if (this.addToParent()) this.$emit("ready", this);
        else console.error("Missing parent (Scene, Group...)");
      }
    },
    getParent() {
      let parent = this.$parent;
      if (!parent) {
        const instance = getCurrentInstance();
        if (instance && instance.parent) parent = instance.parent.ctx;
      }
      while (parent) {
        if (parent.add) return parent;
        parent = parent.$parent;
      }
      return void 0;
    },
    addToParent(o) {
      const o3d = o || this.o3d;
      if (this.parent) {
        this.parent.add(o3d);
        return true;
      }
      return false;
    },
    removeFromParent(o) {
      const o3d = o || this.o3d;
      if (this.parent) {
        this.parent.remove(o3d);
        return true;
      }
      return false;
    },
    add(o) {
      var _a;
      (_a = this.o3d) == null ? void 0 : _a.add(o);
    },
    remove(o) {
      var _a;
      (_a = this.o3d) == null ? void 0 : _a.remove(o);
    }
  },
  render() {
    return this.$slots.default ? this.$slots.default() : [];
  },
  __hmrId: "Object3D"
});

var Group = defineComponent({
  name: "Group",
  extends: Object3D,
  setup() {
    return {
      group: new Group$1()
    };
  },
  created() {
    this.initObject3D(this.group);
  },
  __hmrId: "Group"
});

const emptyCallBack = () => {
};
var Raycaster = defineComponent({
  name: "Raycaster",
  props: {
    onPointerEnter: { type: Function, default: emptyCallBack },
    onPointerOver: { type: Function, default: emptyCallBack },
    onPointerMove: { type: Function, default: emptyCallBack },
    onPointerLeave: { type: Function, default: emptyCallBack },
    onPointerUp: { type: Function, default: emptyCallBack },
    onPointerDown: { type: Function, default: emptyCallBack },
    onClick: { type: Function, default: emptyCallBack },
    intersectMode: { type: String, default: "move" },
    intersectRecursive: { type: Boolean, default: false }
  },
  setup() {
    const renderer = inject(RendererInjectionKey);
    return { renderer };
  },
  mounted() {
    if (!this.renderer) {
      console.error("Renderer not found");
      return;
    }
    const renderer = this.renderer;
    this.renderer.onMounted(() => {
      if (!renderer.camera) return;
      this.pointer = usePointer({
        camera: renderer.camera,
        domElement: renderer.canvas,
        intersectObjects: () => renderer.scene ? renderer.scene.children : [],
        intersectRecursive: this.intersectRecursive,
        onIntersectEnter: this.onPointerEnter,
        onIntersectOver: this.onPointerOver,
        onIntersectMove: this.onPointerMove,
        onIntersectLeave: this.onPointerLeave,
        onIntersectUp: this.onPointerUp,
        onIntersectDown: this.onPointerDown,
        onIntersectClick: this.onClick
      });
      this.pointer.addListeners();
      if (this.intersectMode === "frame") {
        renderer.onBeforeRender(this.pointer.intersect);
      }
    });
  },
  unmounted() {
    var _a;
    if (this.pointer) {
      this.pointer.removeListeners();
      (_a = this.renderer) == null ? void 0 : _a.offBeforeRender(this.pointer.intersect);
    }
  },
  render() {
    return [];
  },
  __hmrId: "Raycaster"
});

var CubeCamera = defineComponent({
  extends: Object3D,
  props: {
    cubeRTSize: { type: Number, default: 256 },
    cubeCameraNear: { type: Number, default: 0.1 },
    cubeCameraFar: { type: Number, default: 2e3 },
    autoUpdate: Boolean,
    hideMeshes: { type: Array, default: () => [] }
  },
  setup(props) {
    const rendererC = inject(RendererInjectionKey);
    if (!rendererC || !rendererC.scene) {
      console.error("Missing Renderer / Scene");
      return {};
    }
    const renderer = rendererC.renderer, scene = rendererC.scene;
    const cubeRT = new WebGLCubeRenderTarget(props.cubeRTSize, { format: RGBAFormat, generateMipmaps: true, minFilter: LinearMipmapLinearFilter });
    const cubeCamera = new CubeCamera$1(props.cubeCameraNear, props.cubeCameraFar, cubeRT);
    const updateRT = () => {
      props.hideMeshes.forEach((m) => {
        m.visible = false;
      });
      cubeCamera.update(renderer, scene);
      props.hideMeshes.forEach((m) => {
        m.visible = true;
      });
    };
    if (props.autoUpdate) {
      rendererC.onBeforeRender(updateRT);
      onUnmounted(() => {
        rendererC.offBeforeRender(updateRT);
      });
    } else {
      rendererC.onMounted(updateRT);
    }
    return { cubeRT, cubeCamera, updateRT };
  },
  created() {
    if (this.cubeCamera) this.initObject3D(this.cubeCamera);
  },
  render() {
    return [];
  },
  __hmrId: "CubeCamera"
});

const MeshInjectionKey = Symbol("Mesh");
const Mesh = defineComponent({
  name: "Mesh",
  extends: Object3D,
  props: {
    castShadow: Boolean,
    receiveShadow: Boolean
  },
  setup() {
    return {};
  },
  provide() {
    return {
      [MeshInjectionKey]: this
    };
  },
  mounted() {
    if (!this.mesh && !this.loading) this.initMesh();
  },
  methods: {
    initMesh() {
      const mesh = new Mesh$1(this.geometry, this.material);
      bindProp(this, "castShadow", mesh);
      bindProp(this, "receiveShadow", mesh);
      this.mesh = mesh;
      this.initObject3D(mesh);
    },
    createGeometry() {
    },
    addGeometryWatchers(props) {
      Object.keys(props).forEach((prop) => {
        watch(() => this[prop], () => {
          this.refreshGeometry();
        });
      });
    },
    setGeometry(geometry) {
      this.geometry = geometry;
      if (this.mesh) this.mesh.geometry = geometry;
    },
    setMaterial(material) {
      this.material = material;
      if (this.mesh) this.mesh.material = material;
    },
    refreshGeometry() {
      const oldGeo = this.geometry;
      this.createGeometry();
      if (this.mesh && this.geometry) this.mesh.geometry = this.geometry;
      oldGeo == null ? void 0 : oldGeo.dispose();
    }
  },
  unmounted() {
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
  },
  __hmrId: "Mesh"
});
function meshComponent(name, props, createGeometry) {
  return defineComponent({
    name,
    extends: Mesh,
    props,
    created() {
      this.createGeometry();
      this.addGeometryWatchers(props);
    },
    methods: {
      createGeometry() {
        this.geometry = createGeometry(this);
      }
    }
  });
}

const Geometry = defineComponent({
  emits: ["created"],
  props: {
    rotateX: Number,
    rotateY: Number,
    rotateZ: Number,
    attributes: { type: Array, default: () => [] }
  },
  // inject for sub components
  inject: {
    mesh: MeshInjectionKey
  },
  setup() {
    return {};
  },
  created() {
    if (!this.mesh) {
      console.error("Missing parent Mesh");
      return;
    }
    this.createGeometry();
    this.rotateGeometry();
    if (this.geometry) this.mesh.setGeometry(this.geometry);
    Object.keys(this.$props).forEach((prop) => {
      watch(() => this[prop], this.refreshGeometry);
    });
  },
  unmounted() {
    var _a;
    (_a = this.geometry) == null ? void 0 : _a.dispose();
  },
  methods: {
    createGeometry() {
      const bufferAttributes = {};
      const geometry = new BufferGeometry();
      this.attributes.forEach((attribute) => {
        if (attribute.name && attribute.itemSize && attribute.array) {
          const bufferAttribute = bufferAttributes[attribute.name] = new BufferAttribute(attribute.array, attribute.itemSize, attribute.normalized);
          geometry.setAttribute(attribute.name, bufferAttribute);
        }
      });
      geometry.computeBoundingBox();
      geometry.userData.component = this;
      this.geometry = geometry;
      this.$emit("created", geometry);
    },
    rotateGeometry() {
      if (!this.geometry) return;
      if (this.rotateX) this.geometry.rotateX(this.rotateX);
      if (this.rotateY) this.geometry.rotateY(this.rotateY);
      if (this.rotateZ) this.geometry.rotateZ(this.rotateZ);
    },
    refreshGeometry() {
      const oldGeo = this.geometry;
      this.createGeometry();
      this.rotateGeometry();
      if (this.geometry && this.mesh) this.mesh.setGeometry(this.geometry);
      oldGeo == null ? void 0 : oldGeo.dispose();
    }
  },
  render() {
    return [];
  }
});
function geometryComponent(name, props, createGeometry) {
  return defineComponent({
    name,
    extends: Geometry,
    props,
    methods: {
      createGeometry() {
        this.geometry = createGeometry(this);
        this.geometry.userData.component = this;
        this.$emit("created", this.geometry);
      }
    }
  });
}

const props$o = {
  size: Number,
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  depth: { type: Number, default: 1 },
  widthSegments: { type: Number, default: 1 },
  heightSegments: { type: Number, default: 1 },
  depthSegments: { type: Number, default: 1 }
};
function createGeometry$h(comp) {
  if (comp.size) {
    return new BoxGeometry$1(comp.size, comp.size, comp.size, comp.widthSegments, comp.heightSegments, comp.depthSegments);
  } else {
    return new BoxGeometry$1(comp.width, comp.height, comp.depth, comp.widthSegments, comp.heightSegments, comp.depthSegments);
  }
}
var BoxGeometry = geometryComponent("BoxGeometry", props$o, createGeometry$h);

const props$n = {
  radius: { type: Number, default: 1 },
  segments: { type: Number, default: 8 },
  thetaStart: { type: Number, default: 0 },
  thetaLength: { type: Number, default: Math.PI * 2 }
};
function createGeometry$g(comp) {
  return new CircleGeometry$1(comp.radius, comp.segments, comp.thetaStart, comp.thetaLength);
}
var CircleGeometry = geometryComponent("CircleGeometry", props$n, createGeometry$g);

const props$m = {
  radius: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  radialSegments: { type: Number, default: 8 },
  heightSegments: { type: Number, default: 1 },
  openEnded: { type: Boolean, default: false },
  thetaStart: { type: Number, default: 0 },
  thetaLength: { type: Number, default: Math.PI * 2 }
};
function createGeometry$f(comp) {
  return new ConeGeometry$1(comp.radius, comp.height, comp.radialSegments, comp.heightSegments, comp.openEnded, comp.thetaStart, comp.thetaLength);
}
var ConeGeometry = geometryComponent("ConeGeometry", props$m, createGeometry$f);

const props$l = {
  radiusTop: { type: Number, default: 1 },
  radiusBottom: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  radialSegments: { type: Number, default: 8 },
  heightSegments: { type: Number, default: 1 },
  openEnded: { type: Boolean, default: false },
  thetaStart: { type: Number, default: 0 },
  thetaLength: { type: Number, default: Math.PI * 2 }
};
function createGeometry$e(comp) {
  return new CylinderGeometry$1(comp.radiusTop, comp.radiusBottom, comp.height, comp.radialSegments, comp.heightSegments, comp.openEnded, comp.thetaStart, comp.thetaLength);
}
var CylinderGeometry = geometryComponent("CylinderGeometry", props$l, createGeometry$e);

const props$k = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 }
};
function createGeometry$d(comp) {
  return new DodecahedronGeometry$1(comp.radius, comp.detail);
}
var DodecahedronGeometry = geometryComponent("DodecahedronGeometry", props$k, createGeometry$d);

const props$j = {
  shapes: { type: [Object, Array] },
  options: { type: Object },
  positions: { type: Array, default: null },
  rotations: { type: Array, default: null }
};
function createGeometry$c(comp) {
  if (Array.isArray(comp.options) && Array.isArray(comp.shapes)) {
    if (comp.shapes.length > 0) {
      const geometries = comp.shapes.map((shape, index) => {
        const geometry = new ExtrudeGeometry$1(shape, comp.options[index]);
        if (comp.rotations) {
          if (comp.rotations[index].x != 0) geometry.rotateX(comp.rotations[index].x);
          if (comp.rotations[index].y != 0) geometry.rotateY(comp.rotations[index].y);
          if (comp.rotations[index].z != 0) geometry.rotateZ(comp.rotations[index].z);
        }
        if (comp.positions) {
          geometry.translate(comp.positions[index].x, comp.positions[index].y, comp.positions[index].z);
        }
        return geometry;
      });
      return mergeGeometries(geometries);
    } else {
      console.warn("Empty shape array found in ExtrudeGeometry");
      const geometry = new BoxGeometry$1(1e-3, 1e-3, 1e-3);
      geometry.translate(-1e3, -1e3, -1e3);
      return geometry;
    }
  } else {
    return new ExtrudeGeometry$1(comp.shapes, comp.options);
  }
}
var ExtrudeGeometry = geometryComponent("ExtrudeGeometry", props$j, createGeometry$c);

const props$i = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 }
};
function createGeometry$b(comp) {
  return new IcosahedronGeometry$1(comp.radius, comp.detail);
}
var IcosahedronGeometry = geometryComponent("IcosahedronGeometry", props$i, createGeometry$b);

const props$h = {
  points: Array,
  segments: { type: Number, default: 12 },
  phiStart: { type: Number, default: 0 },
  phiLength: { type: Number, default: Math.PI * 2 }
};
function createGeometry$a(comp) {
  return new LatheGeometry$1(comp.points, comp.segments, comp.phiStart, comp.phiLength);
}
var LatheGeometry = geometryComponent("LatheGeometry", props$h, createGeometry$a);

const props$g = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 }
};
function createGeometry$9(comp) {
  return new OctahedronGeometry$1(comp.radius, comp.detail);
}
var OctahedronGeometry = geometryComponent("OctahedronGeometry", props$g, createGeometry$9);

const props$f = {
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  widthSegments: { type: Number, default: 1 },
  heightSegments: { type: Number, default: 1 }
};
function createGeometry$8(comp) {
  return new PlaneGeometry$1(comp.width, comp.height, comp.widthSegments, comp.heightSegments);
}
var PlaneGeometry = geometryComponent("PlaneGeometry", props$f, createGeometry$8);

const props$e = {
  vertices: Array,
  indices: Array,
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 }
};
function createGeometry$7(comp) {
  return new PolyhedronGeometry$1(comp.vertices, comp.indices, comp.radius, comp.detail);
}
var PolyhedronGeometry = geometryComponent("PolyhedronGeometry", props$e, createGeometry$7);

const props$d = {
  innerRadius: { type: Number, default: 0.5 },
  outerRadius: { type: Number, default: 1 },
  thetaSegments: { type: Number, default: 8 },
  phiSegments: { type: Number, default: 1 },
  thetaStart: { type: Number, default: 0 },
  thetaLength: { type: Number, default: Math.PI * 2 }
};
function createGeometry$6(comp) {
  return new RingGeometry$1(comp.innerRadius, comp.outerRadius, comp.thetaSegments, comp.phiSegments, comp.thetaStart, comp.thetaLength);
}
var RingGeometry = geometryComponent("RingGeometry", props$d, createGeometry$6);

const props$c = {
  radius: { type: Number, default: 1 },
  widthSegments: { type: Number, default: 12 },
  heightSegments: { type: Number, default: 12 },
  phiStart: { type: Number, default: 0 },
  phiLength: { type: Number, default: Math.PI * 2 },
  thetaStart: { type: Number, default: 0 },
  thetaLength: { type: Number, default: Math.PI }
};
function createGeometry$5(comp) {
  return new SphereGeometry$1(comp.radius, comp.widthSegments, comp.heightSegments, comp.phiStart, comp.phiLength, comp.thetaStart, comp.thetaLength);
}
var SphereGeometry = geometryComponent("SphereGeometry", props$c, createGeometry$5);

const props$b = {
  shapes: { type: [Object, Array] },
  curveSegments: { type: Number }
};
function createGeometry$4(comp) {
  return new ShapeGeometry$1(comp.shapes, comp.curveSegments);
}
var ShapeGeometry = geometryComponent("ShapeGeometry", props$b, createGeometry$4);

const props$a = {
  radius: { type: Number, default: 1 },
  detail: { type: Number, default: 0 }
};
function createGeometry$3(comp) {
  return new TetrahedronGeometry$1(comp.radius, comp.detail);
}
var TetrahedronGeometry = geometryComponent("TetrahedronGeometry", props$a, createGeometry$3);

const props$9 = {
  radius: { type: Number, default: 1 },
  tube: { type: Number, default: 0.4 },
  radialSegments: { type: Number, default: 8 },
  tubularSegments: { type: Number, default: 6 },
  arc: { type: Number, default: Math.PI * 2 }
};
function createGeometry$2(comp) {
  return new TorusGeometry$1(comp.radius, comp.tube, comp.radialSegments, comp.tubularSegments, comp.arc);
}
var TorusGeometry = geometryComponent("TorusGeometry", props$9, createGeometry$2);

const props$8 = {
  radius: { type: Number, default: 1 },
  tube: { type: Number, default: 0.4 },
  tubularSegments: { type: Number, default: 64 },
  radialSegments: { type: Number, default: 8 },
  p: { type: Number, default: 2 },
  q: { type: Number, default: 3 }
};
function createGeometry$1(comp) {
  return new TorusKnotGeometry$1(comp.radius, comp.tube, comp.tubularSegments, comp.radialSegments, comp.p, comp.q);
}
var TorusKnotGeometry = geometryComponent("TorusKnotGeometry", props$8, createGeometry$1);

const props$7 = {
  points: Array,
  path: Curve,
  tubularSegments: { type: Number, default: 64 },
  radius: { type: Number, default: 1 },
  radialSegments: { type: Number, default: 8 },
  closed: { type: Boolean, default: false }
};
function createGeometry(comp) {
  let curve;
  if (comp.points) {
    curve = new CatmullRomCurve3(comp.points);
  } else if (comp.path) {
    curve = comp.path;
  } else {
    console.error("Missing path curve or points.");
  }
  return new TubeGeometry$1(curve, comp.tubularSegments, comp.radius, comp.radiusSegments, comp.closed);
}
var TubeGeometry = defineComponent({
  extends: Geometry,
  props: props$7,
  methods: {
    createGeometry() {
      this.geometry = createGeometry(this);
    },
    // update points (without using prop, faster)
    updatePoints(points) {
      updateTubeGeometryPoints(this.geometry, points);
    }
  }
});
function updateTubeGeometryPoints(tube, points) {
  const curve = new CatmullRomCurve3(points);
  const { radialSegments, radius, tubularSegments, closed } = tube.parameters;
  const frames = curve.computeFrenetFrames(tubularSegments, closed);
  tube.tangents = frames.tangents;
  tube.normals = frames.normals;
  tube.binormals = frames.binormals;
  const pAttribute = tube.getAttribute("position");
  const nAttribute = tube.getAttribute("normal");
  const normal = new Vector3();
  const P = new Vector3();
  for (let i = 0; i < tubularSegments; i++) {
    updateSegment(i);
  }
  updateSegment(tubularSegments);
  tube.attributes.position.needsUpdate = true;
  tube.attributes.normal.needsUpdate = true;
  function updateSegment(i) {
    curve.getPointAt(i / tubularSegments, P);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments * Math.PI * 2;
      const sin = Math.sin(v);
      const cos = -Math.cos(v);
      normal.x = cos * N.x + sin * B.x;
      normal.y = cos * N.y + sin * B.y;
      normal.z = cos * N.z + sin * B.z;
      normal.normalize();
      const index = i * (radialSegments + 1) + j;
      nAttribute.setXYZ(index, normal.x, normal.y, normal.z);
      pAttribute.setXYZ(index, P.x + radius * normal.x, P.y + radius * normal.y, P.z + radius * normal.z);
    }
  }
}

var Light = defineComponent({
  extends: Object3D,
  name: "Light",
  props: {
    color: { type: String, default: "#ffffff" },
    intensity: { type: Number, default: 1 },
    castShadow: { type: Boolean, default: false },
    shadowMapSize: { type: Object, default: () => ({ x: 512, y: 512 }) },
    shadowCamera: { type: Object, default: () => ({}) }
  },
  setup() {
    return {};
  },
  unmounted() {
    if (this.light instanceof SpotLight$1 || this.light instanceof DirectionalLight$1) {
      this.removeFromParent(this.light.target);
    }
  },
  methods: {
    initLight(light) {
      this.light = light;
      if (light.shadow) {
        light.castShadow = this.castShadow;
        setFromProp(light.shadow.mapSize, this.shadowMapSize);
        setFromProp(light.shadow.camera, this.shadowCamera);
      }
      ["color", "intensity", "castShadow"].forEach((p) => {
        watch(() => this[p], (value) => {
          if (p === "color") {
            light.color.set(value);
          } else {
            light[p] = value;
          }
        });
      });
      this.initObject3D(light);
      if (light instanceof SpotLight$1 || light instanceof DirectionalLight$1) {
        bindProp(this, "target", light.target, "position");
        this.addToParent(light.target);
      }
    }
  },
  __hmrId: "Light"
});

var AmbientLight = defineComponent({
  extends: Light,
  created() {
    this.initLight(new AmbientLight$1(this.color, this.intensity));
  },
  __hmrId: "AmbientLight"
});

var DirectionalLight = defineComponent({
  extends: Light,
  props: {
    target: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) }
  },
  created() {
    this.initLight(new DirectionalLight$1(this.color, this.intensity));
  },
  __hmrId: "DirectionalLight"
});

var HemisphereLight = defineComponent({
  extends: Light,
  props: {
    groundColor: { type: String, default: "#444444" }
  },
  created() {
    const light = new HemisphereLight$1(this.color, this.groundColor, this.intensity);
    watch(() => this.groundColor, (value) => {
      light.groundColor.set(value);
    });
    this.initLight(light);
  },
  __hmrId: "HemisphereLight"
});

var PointLight = defineComponent({
  extends: Light,
  props: {
    distance: { type: Number, default: 0 },
    decay: { type: Number, default: 1 }
  },
  created() {
    this.initLight(new PointLight$1(this.color, this.intensity, this.distance, this.decay));
  },
  __hmrId: "PointLight"
});

var RectAreaLight = defineComponent({
  extends: Light,
  props: {
    width: { type: Number, default: 10 },
    height: { type: Number, default: 10 },
    helper: Boolean
  },
  created() {
    RectAreaLightUniformsLib.init();
    const light = new RectAreaLight$1(this.color, this.intensity, this.width, this.height);
    const watchProps = ["width", "height"];
    watchProps.forEach((p) => {
      watch(() => this[p], (value) => {
        light[p] = value;
      });
    });
    if (this.helper) {
      const lightHelper = new RectAreaLightHelper(light);
      light.add(lightHelper);
    }
    this.initLight(light);
  },
  __hmrId: "RectAreaLight"
});

var SpotLight = defineComponent({
  extends: Light,
  props: {
    angle: { type: Number, default: Math.PI / 3 },
    decay: { type: Number, default: 1 },
    distance: { type: Number, default: 0 },
    penumbra: { type: Number, default: 0 },
    target: Object
  },
  created() {
    const light = new SpotLight$1(this.color, this.intensity, this.distance, this.angle, this.penumbra, this.decay);
    const watchProps = ["angle", "decay", "distance", "penumbra"];
    watchProps.forEach((p) => {
      watch(() => this[p], (value) => {
        light[p] = value;
      });
    });
    this.initLight(light);
  },
  __hmrId: "SpotLight"
});

const MaterialInjectionKey = Symbol("Material");
const BaseMaterial = defineComponent({
  emits: ["created"],
  props: {
    color: { type: String, default: "#ffffff" },
    props: { type: Object, default: () => ({}) }
  },
  inject: {
    mesh: MeshInjectionKey
  },
  setup() {
    return {};
  },
  provide() {
    return {
      [MaterialInjectionKey]: this
    };
  },
  created() {
    if (!this.mesh) {
      console.error("Missing parent Mesh");
      return;
    }
    if (this.createMaterial) {
      const material = this.material = this.createMaterial();
      watch(() => this.color, (value) => {
        material.color.set(value);
      });
      bindObjectProp(this, "props", material, false, this.setProp);
      this.$emit("created", material);
      this.mesh.setMaterial(material);
    }
  },
  unmounted() {
    var _a;
    (_a = this.material) == null ? void 0 : _a.dispose();
  },
  methods: {
    getMaterialParams() {
      return { ...propsValues(this.$props, ["props"]), ...this.props };
    },
    setProp(material, key, value, needsUpdate = false) {
      const dstVal = material[key];
      if (dstVal instanceof Color) dstVal.set(value);
      else material[key] = value;
      material.needsUpdate = needsUpdate;
    },
    setTexture(texture, key = "map") {
      this.setProp(this.material, key, texture, true);
    }
  },
  render() {
    return this.$slots.default ? this.$slots.default() : [];
  },
  __hmrId: "Material"
});
function materialComponent(name, props, createMaterial) {
  return defineComponent({
    name,
    extends: BaseMaterial,
    props,
    methods: {
      // @ts-ignore
      createMaterial() {
        return createMaterial(this.getMaterialParams());
      }
    }
  });
}
const BasicMaterial = materialComponent("BasicMaterial", { props: { type: Object, default: () => ({}) } }, (opts) => new MeshBasicMaterial(opts));
const LambertMaterial = materialComponent("LambertMaterial", { props: { type: Object, default: () => ({}) } }, (opts) => new MeshLambertMaterial(opts));
const PhongMaterial = materialComponent("PhongMaterial", { props: { type: Object, default: () => ({}) } }, (opts) => new MeshPhongMaterial(opts));
const PhysicalMaterial = materialComponent("PhysicalMaterial", { props: { type: Object, default: () => ({}) } }, (opts) => new MeshPhysicalMaterial(opts));
const PointsMaterial = materialComponent("PointsMaterial", { props: { type: Object, default: () => ({}) } }, (opts) => new PointsMaterial$1(opts));
const ShadowMaterial = materialComponent("ShadowMaterial", { color: { type: String, default: "#000000" }, props: { type: Object, default: () => ({}) } }, (opts) => new ShadowMaterial$1(opts));
const StandardMaterial = materialComponent("StandardMaterial", { props: { type: Object, default: () => ({}) } }, (opts) => new MeshStandardMaterial(opts));
const ToonMaterial = materialComponent("ToonMaterial", { props: { type: Object, default: () => ({}) } }, (opts) => new MeshToonMaterial(opts));

var MatcapMaterial = materialComponent(
  "MatcapMaterial",
  {
    src: String,
    name: { type: String, default: "0404E8_0404B5_0404CB_3333FC" }
  },
  (opts) => {
    const src = opts.src ? opts.src : getMatcapUrl(opts.name);
    const params = propsValues(opts, ["src", "name"]);
    params.matcap = new TextureLoader().load(src);
    return new MeshMatcapMaterial(params);
  }
);

const defaultVertexShader$1 = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;
const defaultFragmentShader$1 = `
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(vUv.x, vUv.y, 0., 1.0);
  }
`;
var ShaderMaterial = materialComponent(
  "ShaderMaterial",
  {
    props: { type: Object, default: () => ({
      uniforms: {},
      vertexShader: defaultVertexShader$1,
      fragmentShader: defaultFragmentShader$1
    }) }
  },
  (opts) => new ShaderMaterial$1(propsValues(opts, ["color"]))
);

const defaultVertexShader = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;
const defaultFragmentShader = `
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(vUv.x, vUv.y, 0., 1.0);
  }
`;
var RawShaderMaterial = materialComponent(
  "ShaderMaterial",
  {
    props: { type: Object, default: () => ({
      uniforms: {},
      vertexShader: defaultVertexShader,
      fragmentShader: defaultFragmentShader
    }) }
  },
  (opts) => new RawShaderMaterial$1(propsValues(opts, ["color"]))
);

function replaceAll(string, find, replace) {
  return string.split(find).join(replace);
}
const meshphongFragHead = ShaderChunk.meshphong_frag.slice(0, ShaderChunk.meshphong_frag.indexOf("void main() {"));
const meshphongFragBody = ShaderChunk.meshphong_frag.slice(ShaderChunk.meshphong_frag.indexOf("void main() {"));
const SubsurfaceScatteringShader = {
  uniforms: UniformsUtils.merge([
    ShaderLib.phong.uniforms,
    {
      thicknessColor: { value: new Color(16777215) },
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 }
    }
  ]),
  vertexShader: `
    #define USE_UV
    ${ShaderChunk.meshphong_vert}
  `,
  fragmentShader: `
    #define USE_UV
    #define SUBSURFACE

    ${meshphongFragHead}

    uniform float thicknessPower;
    uniform float thicknessScale;
    uniform float thicknessDistortion;
    uniform float thicknessAmbient;
    uniform float thicknessAttenuation;
    uniform vec3 thicknessColor;

    void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in GeometricContext geometry, inout ReflectedLight reflectedLight) {
      #ifdef USE_COLOR
        vec3 thickness = vColor * thicknessColor;
      #else
        vec3 thickness = thicknessColor;
      #endif
      vec3 scatteringHalf = normalize(directLight.direction + (geometry.normal * thicknessDistortion));
      float scatteringDot = pow(saturate(dot(geometry.viewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
      vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * thickness;
      reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
    }
  ` + meshphongFragBody.replace(
    "#include <lights_fragment_begin>",
    replaceAll(
      ShaderChunk.lights_fragment_begin,
      "RE_Direct( directLight, geometry, material, reflectedLight );",
      `
        RE_Direct( directLight, geometry, material, reflectedLight );
        #if defined( SUBSURFACE ) && defined( USE_UV )
          RE_Direct_Scattering(directLight, vUv, geometry, reflectedLight);
        #endif
      `
    )
  )
};

var SubSurfaceMaterial = defineComponent({
  extends: BaseMaterial,
  props: {
    uniforms: { type: Object, default: () => ({
      diffuse: "#ffffff",
      thicknessColor: "#ffffff",
      thicknessDistortion: 0.4,
      thicknessAmbient: 0.01,
      thicknessAttenuation: 0.7,
      thicknessPower: 2,
      thicknessScale: 4
    }) }
  },
  methods: {
    createMaterial() {
      const params = SubsurfaceScatteringShader;
      const uniforms = UniformsUtils.clone(params.uniforms);
      bindObjectProp(this, "uniforms", uniforms, true, (dst, key, value) => {
        const dstVal = dst[key].value;
        if (dstVal instanceof Color) dstVal.set(value);
        else dst[key].value = value;
      });
      const material = new ShaderMaterial$1({
        ...params,
        lights: true,
        ...this.props,
        uniforms
      });
      return material;
    }
  }
});

var Texture = defineComponent({
  inject: {
    material: MaterialInjectionKey
  },
  props: {
    name: { type: String, default: "map" },
    uniform: String,
    src: String,
    onLoad: Function,
    onProgress: Function,
    onError: Function,
    props: { type: Object, default: () => ({}) }
  },
  setup() {
    return {};
  },
  created() {
    this.refreshTexture();
    watch(() => this.src, this.refreshTexture);
  },
  unmounted() {
    var _a, _b;
    (_a = this.material) == null ? void 0 : _a.setTexture(null, this.name);
    (_b = this.texture) == null ? void 0 : _b.dispose();
  },
  methods: {
    createTexture() {
      if (!this.src) return void 0;
      return new TextureLoader().load(this.src, this.onLoaded, this.onProgress, this.onError);
    },
    initTexture() {
      if (!this.texture) return;
      bindObjectProp(this, "props", this.texture);
      if (!this.material) return;
      this.material.setTexture(this.texture, this.name);
      if (this.material.material instanceof ShaderMaterial$1 && this.uniform) {
        this.material.material.uniforms[this.uniform] = { value: this.texture };
      }
    },
    refreshTexture() {
      var _a;
      (_a = this.texture) == null ? void 0 : _a.dispose();
      this.texture = this.createTexture();
      this.initTexture();
    },
    onLoaded(t) {
      var _a;
      (_a = this.onLoad) == null ? void 0 : _a.call(this, t);
    }
  },
  render() {
    return [];
  }
});

var CubeTexture = defineComponent({
  extends: Texture,
  props: {
    name: { type: String, default: "envMap" },
    path: { type: String, required: true },
    urls: {
      type: Array,
      default: () => ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]
    },
    props: { type: Object, default: () => ({ mapping: CubeReflectionMapping }) }
  },
  created() {
    watch(() => this.path, this.refreshTexture);
    watch(() => this.urls, this.refreshTexture);
  },
  methods: {
    createTexture() {
      return new CubeTextureLoader().setPath(this.path).load(this.urls, this.onLoaded, this.onProgress, this.onError);
    }
  }
});

var VideoTexture = defineComponent({
  extends: Texture,
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  created() {
    watch(() => this.videoId, this.refreshTexture);
  },
  methods: {
    createTexture() {
      const video = document.getElementById(this.videoId);
      return new VideoTexture$1(video);
    }
  }
});

var Box = meshComponent("Box", props$o, createGeometry$h);

var Circle = meshComponent("Circle", props$n, createGeometry$g);

var Cone = meshComponent("Cone", props$m, createGeometry$f);

var Cylinder = meshComponent("Cylinder", props$l, createGeometry$e);

var Dodecahedron = meshComponent("Dodecahedron", props$k, createGeometry$d);

var Icosahedron = meshComponent("Icosahedron", props$i, createGeometry$b);

var Lathe = meshComponent("Lathe", props$h, createGeometry$a);

var Octahedron = meshComponent("Octahedron", props$g, createGeometry$9);

var Plane = meshComponent("Plane", props$f, createGeometry$8);

var Polyhedron = meshComponent("Polyhedron", props$e, createGeometry$7);

var Ring = meshComponent("Ring", props$d, createGeometry$6);

var Sphere = meshComponent("Sphere", props$c, createGeometry$5);

var Tetrahedron = meshComponent("Tetrahedron", props$a, createGeometry$3);

const props$6 = {
  text: { type: String, required: true, default: "Text" },
  fontSrc: { type: String, required: true },
  size: { type: Number, default: 80 },
  height: { type: Number, default: 5 },
  depth: { type: Number, default: 1 },
  curveSegments: { type: Number, default: 12 },
  bevelEnabled: { type: Boolean, default: false },
  bevelThickness: { type: Number, default: 10 },
  bevelSize: { type: Number, default: 8 },
  bevelOffset: { type: Number, default: 0 },
  bevelSegments: { type: Number, default: 5 },
  align: { type: [Boolean, String], default: false }
};
var Text = defineComponent({
  extends: Mesh,
  props: props$6,
  setup() {
    return {};
  },
  created() {
    if (!this.fontSrc) {
      console.error('Missing required prop: "font-src"');
      return;
    }
    const watchProps = [
      "text",
      "size",
      "height",
      "curveSegments",
      "bevelEnabled",
      "bevelThickness",
      "bevelSize",
      "bevelOffset",
      "bevelSegments",
      "align"
    ];
    watchProps.forEach((p) => {
      watch(() => this[p], () => {
        if (this.font) this.refreshGeometry();
      });
    });
    const loader = new FontLoader();
    this.loading = true;
    loader.load(this.fontSrc, (font) => {
      this.loading = false;
      this.font = font;
      this.createGeometry();
      this.initMesh();
    });
  },
  methods: {
    createGeometry() {
      this.geometry = new TextGeometry(this.text, {
        // @ts-ignore
        font: this.font,
        size: this.size,
        height: this.height,
        depth: this.depth,
        curveSegments: this.curveSegments,
        bevelEnabled: this.bevelEnabled,
        bevelThickness: this.bevelThickness,
        bevelSize: this.bevelSize,
        bevelOffset: this.bevelOffset,
        bevelSegments: this.bevelSegments
      });
      if (this.align === "center") {
        this.geometry.center();
      }
    }
  }
});

var Torus = meshComponent("Torus", props$9, createGeometry$2);

var TorusKnot = meshComponent("TorusKnot", props$8, createGeometry$1);

var Tube = defineComponent({
  extends: Mesh,
  props: props$7,
  created() {
    this.createGeometry();
    this.addGeometryWatchers(props$7);
  },
  methods: {
    createGeometry() {
      this.geometry = createGeometry(this);
    },
    // update curve points (without using prop, faster)
    updatePoints(points) {
      updateTubeGeometryPoints(this.geometry, points);
    }
  },
  __hmrId: "Tube"
});

var Image = defineComponent({
  emits: ["loaded"],
  extends: Mesh,
  props: {
    src: { type: String, required: true },
    width: Number,
    height: Number,
    widthSegments: { type: Number, default: 1 },
    heightSegments: { type: Number, default: 1 },
    keepSize: Boolean
  },
  setup() {
    return {};
  },
  created() {
    if (!this.renderer) return;
    this.geometry = new PlaneGeometry$1(1, 1, this.widthSegments, this.heightSegments);
    this.material = new MeshBasicMaterial({ side: DoubleSide, map: this.loadTexture() });
    watch(() => this.src, this.refreshTexture);
    ["width", "height"].forEach((p) => {
      watch(() => this[p], this.resize);
    });
    this.resize();
    if (this.keepSize) this.renderer.onResize(this.resize);
  },
  unmounted() {
    var _a;
    (_a = this.renderer) == null ? void 0 : _a.offResize(this.resize);
  },
  methods: {
    loadTexture() {
      return new TextureLoader().load(this.src, this.onLoaded);
    },
    refreshTexture() {
      var _a;
      (_a = this.texture) == null ? void 0 : _a.dispose();
      if (this.material) {
        this.material.map = this.loadTexture();
        this.material.needsUpdate = true;
      }
    },
    onLoaded(texture) {
      this.texture = texture;
      this.resize();
      this.$emit("loaded", texture);
    },
    resize() {
      if (!this.renderer || !this.texture) return;
      const screen = this.renderer.size;
      const iW = this.texture.image.width;
      const iH = this.texture.image.height;
      const iRatio = iW / iH;
      let w = 1, h = 1;
      if (this.width && this.height) {
        w = this.width * screen.wWidth / screen.width;
        h = this.height * screen.wHeight / screen.height;
      } else if (this.width) {
        w = this.width * screen.wWidth / screen.width;
        h = w / iRatio;
      } else if (this.height) {
        h = this.height * screen.wHeight / screen.height;
        w = h * iRatio;
      } else {
        if (iRatio > 1) w = h * iRatio;
        else h = w / iRatio;
      }
      if (this.mesh) {
        this.mesh.scale.x = w;
        this.mesh.scale.y = h;
      }
    }
  },
  __hmrId: "Image"
});

var InstancedMesh = defineComponent({
  extends: Mesh,
  props: {
    count: { type: Number, required: true }
  },
  methods: {
    initMesh() {
      if (!this.renderer) return;
      if (!this.geometry || !this.material) {
        console.error("Missing geometry and/or material");
        return false;
      }
      this.mesh = new InstancedMesh$1(this.geometry, this.material, this.count);
      this.mesh.userData.component = this;
      bindProp(this, "castShadow", this.mesh);
      bindProp(this, "receiveShadow", this.mesh);
      if (this.onPointerEnter || this.onPointerOver || this.onPointerMove || this.onPointerLeave || this.onPointerDown || this.onPointerUp || this.onClick) {
        this.renderer.three.addIntersectObject(this.mesh);
      }
      this.initObject3D(this.mesh);
    }
  },
  __hmrId: "InstancedMesh"
});

var Sprite = defineComponent({
  extends: Object3D,
  emits: ["loaded"],
  props: {
    src: { type: String, required: true }
  },
  setup() {
    return {};
  },
  created() {
    this.texture = new TextureLoader().load(this.src, this.onLoaded);
    this.material = new SpriteMaterial({ map: this.texture });
    this.sprite = new Sprite$1(this.material);
    this.initObject3D(this.sprite);
  },
  unmounted() {
    var _a, _b;
    (_a = this.texture) == null ? void 0 : _a.dispose();
    (_b = this.material) == null ? void 0 : _b.dispose();
  },
  methods: {
    onLoaded() {
      this.updateUV();
      this.$emit("loaded");
    },
    updateUV() {
      if (!this.texture || !this.sprite) return;
      const iWidth = this.texture.image.width;
      const iHeight = this.texture.image.height;
      const iRatio = iWidth / iHeight;
      let x = 0.5, y = 0.5;
      if (iRatio > 1) {
        x = 0.5 * iRatio;
      } else {
        y = 0.5 / iRatio;
      }
      const positions = this.sprite.geometry.attributes.position.array;
      positions[0] = -x;
      positions[1] = -y;
      positions[5] = x;
      positions[6] = -y;
      positions[10] = x;
      positions[11] = y;
      positions[15] = -x;
      positions[16] = y;
      this.sprite.geometry.attributes.position.needsUpdate = true;
    }
  },
  __hmrId: "Sprite"
});

var Points = defineComponent({
  extends: Object3D,
  setup() {
    return {};
  },
  provide() {
    return {
      [MeshInjectionKey]: this
    };
  },
  mounted() {
    this.mesh = this.points = new Points$1(this.geometry, this.material);
    this.initObject3D(this.mesh);
  },
  methods: {
    setGeometry(geometry) {
      this.geometry = geometry;
      if (this.mesh) this.mesh.geometry = geometry;
    },
    setMaterial(material) {
      this.material = material;
      if (this.mesh) this.mesh.material = material;
    }
  }
});

var Model = defineComponent({
  extends: Object3D,
  emits: ["before-load", "load", "progress", "error"],
  props: {
    src: { type: String, required: true }
  },
  data() {
    return {
      progress: 0
    };
  },
  methods: {
    onLoad(model) {
      this.$emit("load", model);
    },
    onProgress(progress) {
      this.progress = progress.loaded / progress.total;
      this.$emit("progress", progress);
    },
    onError(error) {
      this.$emit("error", error);
    }
  }
});

var GLTF = defineComponent({
  extends: Model,
  created() {
    const loader = new GLTFLoader();
    this.$emit("before-load", loader);
    loader.load(this.src, (gltf) => {
      this.onLoad(gltf);
      this.initObject3D(gltf.scene);
    }, this.onProgress, this.onError);
  }
});

var FBX = defineComponent({
  extends: Model,
  created() {
    const loader = new FBXLoader();
    this.$emit("before-load", loader);
    loader.load(this.src, (fbx) => {
      this.onLoad(fbx);
      this.initObject3D(fbx);
    }, this.onProgress, this.onError);
  }
});

const ComposerInjectionKey = Symbol("Composer");
var EffectComposer = defineComponent({
  setup() {
    const renderer = inject(RendererInjectionKey);
    return { renderer };
  },
  provide() {
    return {
      [ComposerInjectionKey]: this
    };
  },
  created() {
    if (!this.renderer) {
      console.error("Renderer not found");
      return;
    }
    const renderer = this.renderer;
    const composer = new EffectComposer$1(this.renderer.renderer);
    this.composer = composer;
    this.renderer.composer = composer;
    renderer.addListener("init", () => {
      renderer.renderer.autoClear = false;
      this.resize();
      renderer.addListener("resize", this.resize);
    });
  },
  unmounted() {
    var _a;
    (_a = this.renderer) == null ? void 0 : _a.removeListener("resize", this.resize);
  },
  methods: {
    addPass(pass) {
      var _a;
      (_a = this.composer) == null ? void 0 : _a.addPass(pass);
    },
    removePass(pass) {
      var _a;
      (_a = this.composer) == null ? void 0 : _a.removePass(pass);
    },
    resize() {
      if (this.composer && this.renderer) {
        this.composer.setSize(this.renderer.size.width, this.renderer.size.height);
      }
    }
  },
  render() {
    return this.$slots.default ? this.$slots.default() : [];
  },
  __hmrId: "EffectComposer"
});

var EffectPass = defineComponent({
  // inject for sub components
  inject: {
    renderer: RendererInjectionKey,
    composer: ComposerInjectionKey
  },
  emits: ["ready"],
  setup() {
    return {};
  },
  created() {
    if (!this.composer) {
      console.error("Missing parent EffectComposer");
    }
    if (!this.renderer) {
      console.error("Missing parent Renderer");
    }
  },
  unmounted() {
    var _a, _b, _c;
    if (this.pass) {
      (_a = this.composer) == null ? void 0 : _a.removePass(this.pass);
      (_c = (_b = this.pass).dispose) == null ? void 0 : _c.call(_b);
    }
  },
  methods: {
    initEffectPass(pass) {
      var _a;
      this.pass = pass;
      (_a = this.composer) == null ? void 0 : _a.addPass(pass);
      this.$emit("ready", pass);
    }
  },
  render() {
    return [];
  },
  __hmrId: "EffectPass"
});

var RenderPass = defineComponent({
  extends: EffectPass,
  created() {
    if (!this.renderer) return;
    if (!this.renderer.scene) {
      console.error("Missing Scene");
      return;
    }
    if (!this.renderer.camera) {
      console.error("Missing Camera");
      return;
    }
    const pass = new RenderPass$1(this.renderer.scene, this.renderer.camera);
    this.initEffectPass(pass);
  },
  __hmrId: "RenderPass"
});

const props$5 = {
  focus: { type: Number, default: 1 },
  aperture: { type: Number, default: 0.025 },
  maxblur: { type: Number, default: 0.01 }
};
var BokehPass = defineComponent({
  extends: EffectPass,
  props: props$5,
  created() {
    if (!this.renderer) return;
    if (!this.renderer.scene) {
      console.error("Missing Scene");
      return;
    }
    if (!this.renderer.camera) {
      console.error("Missing Camera");
      return;
    }
    const params = {
      focus: this.focus,
      aperture: this.aperture,
      maxblur: this.maxblur,
      width: this.renderer.size.width,
      height: this.renderer.size.height
    };
    const pass = new BokehPass$1(this.renderer.scene, this.renderer.camera, params);
    Object.keys(props$5).forEach((p) => {
      watch(() => this[p], (value) => {
        pass.uniforms[p].value = value;
      });
    });
    this.initEffectPass(pass);
  },
  __hmrId: "BokehPass"
});

const props$4 = {
  noiseIntensity: { type: Number, default: 0.5 },
  scanlinesIntensity: { type: Number, default: 0.05 },
  scanlinesCount: { type: Number, default: 4096 },
  grayscale: { type: Number, default: 0 }
};
var FilmPass = defineComponent({
  extends: EffectPass,
  props: props$4,
  created() {
    const pass = new FilmPass$1();
    Object.keys(props$4).forEach((p) => {
      watch(() => this[p], (value) => {
        pass.uniforms[p].value = value;
      });
    });
    this.initEffectPass(pass);
  },
  __hmrId: "FilmPass"
});

var FXAAPass = defineComponent({
  extends: EffectPass,
  created() {
    var _a;
    const pass = new ShaderPass(FXAAShader);
    (_a = this.renderer) == null ? void 0 : _a.addListener("resize", this.resize);
    this.initEffectPass(pass);
  },
  unmounted() {
    var _a;
    (_a = this.renderer) == null ? void 0 : _a.removeListener("resize", this.resize);
  },
  methods: {
    resize({ size }) {
      if (this.pass) {
        const { resolution } = this.pass.material.uniforms;
        resolution.value.x = 1 / size.width;
        resolution.value.y = 1 / size.height;
      }
    }
  },
  __hmrId: "FXAAPass"
});

const props$3 = {
  shape: { type: Number, default: 1 },
  radius: { type: Number, default: 4 },
  rotateR: { type: Number, default: Math.PI / 12 * 1 },
  rotateG: { type: Number, default: Math.PI / 12 * 2 },
  rotateB: { type: Number, default: Math.PI / 12 * 3 },
  scatter: { type: Number, default: 0 }
};
var HalftonePass = defineComponent({
  extends: EffectPass,
  props: props$3,
  created() {
    if (!this.renderer) return;
    const pass = new HalftonePass$1({});
    pass.setSize(this.renderer.size.width, this.renderer.size.height);
    Object.keys(props$3).forEach((p) => {
      pass.uniforms[p].value = this[p];
      watch(() => this[p], (value) => {
        pass.uniforms[p].value = value;
      });
    });
    this.initEffectPass(pass);
  },
  __hmrId: "HalftonePass"
});

var SMAAPass = defineComponent({
  extends: EffectPass,
  created() {
    if (!this.renderer) return;
    const pass = new SMAAPass$1();
    pass.setSize(this.renderer.size.width, this.renderer.size.height);
    this.initEffectPass(pass);
  },
  __hmrId: "SMAAPass"
});

var SSAOPass = defineComponent({
  extends: EffectPass,
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    if (!this.renderer) return;
    if (!this.renderer.scene) {
      console.error("Missing Scene");
      return;
    }
    if (!this.renderer.camera) {
      console.error("Missing Camera");
      return;
    }
    const pass = new SSAOPass$1(
      this.renderer.scene,
      this.renderer.camera,
      this.renderer.size.width,
      this.renderer.size.height
    );
    Object.keys(this.options).forEach((key) => {
      pass[key] = this.options[key];
    });
    this.initEffectPass(pass);
  },
  __hmrId: "SSAOPass"
});

var DefaultShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `};

var TiltShift = {
  uniforms: {
    tDiffuse: { value: null },
    blurRadius: { value: 0 },
    gradientRadius: { value: 0 },
    start: { value: new Vector2() },
    end: { value: new Vector2() },
    delta: { value: new Vector2() },
    texSize: { value: new Vector2() }
  },
  vertexShader: DefaultShader.vertexShader,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float blurRadius;
    uniform float gradientRadius;
    uniform vec2 start;
    uniform vec2 end;
    uniform vec2 delta;
    uniform vec2 texSize;
    varying vec2 vUv;

    float random(vec3 scale, float seed) {
      /* use the fragment position for a different seed per-pixel */
      return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }

    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;

      /* randomize the lookup values to hide the fixed number of samples */
      float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);

      vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));
      float radius = smoothstep(0.0, 1.0, abs(dot(vUv * texSize - start, normal)) / gradientRadius) * blurRadius;
      for (float t = -30.0; t <= 30.0; t++) {
          float percent = (t + offset - 0.5) / 30.0;
          float weight = 1.0 - abs(percent);
          vec4 texel = texture2D(tDiffuse, vUv + delta / texSize * percent * radius);
          // vec4 texel2 = texture2D(tDiffuse, vUv + vec2(-delta.y, delta.x) / texSize * percent * radius);

          /* switch to pre-multiplied alpha to correctly blur transparent images */
          texel.rgb *= texel.a;
          // texel2.rgb *= texel2.a;

          color += texel * weight;
          total += 2.0 * weight;
      }

      gl_FragColor = color / total;

      /* switch back from pre-multiplied alpha */
      gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
    }
  `
};

const props$2 = {
  blurRadius: { type: Number, default: 10 },
  gradientRadius: { type: Number, default: 100 },
  start: { type: Object, default: () => ({ x: 0, y: 100 }) },
  end: { type: Object, default: () => ({ x: 10, y: 100 }) }
};
var TiltShiftPass = defineComponent({
  extends: EffectPass,
  props: props$2,
  setup() {
    return { uniforms1: {}, uniforms2: {} };
  },
  created() {
    if (!this.composer) return;
    this.pass1 = new ShaderPass(TiltShift);
    this.pass2 = new ShaderPass(TiltShift);
    const uniforms1 = this.uniforms1 = this.pass1.uniforms;
    const uniforms2 = this.uniforms2 = this.pass2.uniforms;
    uniforms2.blurRadius = uniforms1.blurRadius;
    uniforms2.gradientRadius = uniforms1.gradientRadius;
    uniforms2.start = uniforms1.start;
    uniforms2.end = uniforms1.end;
    uniforms2.texSize = uniforms1.texSize;
    bindProp(this, "blurRadius", uniforms1.blurRadius, "value");
    bindProp(this, "gradientRadius", uniforms1.gradientRadius, "value");
    this.updateFocusLine();
    ["start", "end"].forEach((p) => {
      watch(() => this[p], this.updateFocusLine, { deep: true });
    });
    this.pass1.setSize = (width, height) => {
      uniforms1.texSize.value.set(width, height);
    };
    this.initEffectPass(this.pass1);
    this.composer.addPass(this.pass2);
  },
  unmounted() {
    if (this.composer && this.pass2) this.composer.removePass(this.pass2);
  },
  methods: {
    updateFocusLine() {
      this.uniforms1.start.value.copy(this.start);
      this.uniforms1.end.value.copy(this.end);
      const dv = new Vector2().copy(this.end).sub(this.start).normalize();
      this.uniforms1.delta.value.copy(dv);
      this.uniforms2.delta.value.set(-dv.y, dv.x);
    }
  },
  __hmrId: "TiltShiftPass"
});

const props$1 = {
  strength: { type: Number, default: 1.5 },
  radius: { type: Number, default: 0 },
  threshold: { type: Number, default: 0 }
};
var UnrealBloomPass = defineComponent({
  extends: EffectPass,
  props: props$1,
  created() {
    if (!this.renderer) return;
    const size = new Vector2(this.renderer.size.width, this.renderer.size.height);
    const pass = new UnrealBloomPass$1(size, this.strength, this.radius, this.threshold);
    Object.keys(props$1).forEach((p) => {
      watch(() => this[p], (value) => {
        pass.uniforms[p].value = value;
      });
    });
    this.initEffectPass(pass);
  },
  __hmrId: "UnrealBloomPass"
});

var ZoomBlur = {
  uniforms: {
    tDiffuse: { value: null },
    center: { value: new Vector2(0.5, 0.5) },
    strength: { value: 0 }
  },
  vertexShader: DefaultShader.vertexShader,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 center;
    uniform float strength;
    varying vec2 vUv;

    float random(vec3 scale, float seed) {
      /* use the fragment position for a different seed per-pixel */
      return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }
    
    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;
      vec2 toCenter = center - vUv;
      
      /* randomize the lookup values to hide the fixed number of samples */
      float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
      
      for (float t = 0.0; t <= 40.0; t++) {
        float percent = (t + offset) / 40.0;
        float weight = 4.0 * (percent - percent * percent);
        vec4 texel = texture2D(tDiffuse, vUv + toCenter * percent * strength);

        /* switch to pre-multiplied alpha to correctly blur transparent images */
        texel.rgb *= texel.a;

        color += texel * weight;
        total += weight;
      }

      gl_FragColor = color / total;

      /* switch back from pre-multiplied alpha */
      gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
    }
  `
};

var ZoomBlurPass = defineComponent({
  extends: EffectPass,
  props: {
    center: { type: Object, default: () => ({ x: 0.5, y: 0.5 }) },
    strength: { type: Number, default: 0.5 }
  },
  created() {
    const pass = new ShaderPass(ZoomBlur);
    bindProp(this, "center", pass.uniforms.center, "value");
    bindProp(this, "strength", pass.uniforms.strength, "value");
    this.initEffectPass(pass);
  },
  __hmrId: "ZoomBlurPass"
});

const props = {
  size: { type: Number, required: true, default: 100 },
  divisions: { type: Number, required: true, default: 10 },
  color1: { type: Number },
  color2: { type: Number }
};
var GridHelper = defineComponent({
  extends: Object3D,
  name: "GridHelper",
  props,
  setup() {
    return {};
  },
  mounted() {
    if (!this.helper) this.initHelper();
    const watchProps = ["size", "divisions", "color1", "color2"];
    watchProps.forEach((p) => {
      watch(() => this[p], () => {
        this.refreshHelper();
      });
    });
  },
  unmounted() {
    this.destroyHelper();
  },
  methods: {
    initHelper() {
      this.helper = new GridHelper$1(this.size, this.divisions, this.color1, this.color2);
      bindProp(this, "castShadow", this.helper);
      bindProp(this, "receiveShadow", this.helper);
      this.initObject3D(this.helper);
    },
    destroyHelper() {
      var _a, _b;
      if (this.helper) this.removeFromParent(this.helper);
      (_a = this.getParent()) == null ? void 0 : _a.remove(this.helper);
      (_b = this.helper) == null ? void 0 : _b.dispose();
    },
    refreshHelper() {
      this.destroyHelper();
      this.initHelper();
    }
  }
});

var TROIS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AmbientLight: AmbientLight,
  BasicMaterial: BasicMaterial,
  BokehPass: BokehPass,
  Box: Box,
  BoxGeometry: BoxGeometry,
  BufferGeometry: Geometry,
  Camera: PerspectiveCamera,
  Circle: Circle,
  CircleGeometry: CircleGeometry,
  ComposerInjectionKey: ComposerInjectionKey,
  Cone: Cone,
  ConeGeometry: ConeGeometry,
  CubeCamera: CubeCamera,
  CubeTexture: CubeTexture,
  Cylinder: Cylinder,
  CylinderGeometry: CylinderGeometry,
  DirectionalLight: DirectionalLight,
  Dodecahedron: Dodecahedron,
  DodecahedronGeometry: DodecahedronGeometry,
  EffectComposer: EffectComposer,
  EffectPass: EffectPass,
  ExtrudeGeometry: ExtrudeGeometry,
  FXAAPass: FXAAPass,
  FbxModel: FBX,
  FilmPass: FilmPass,
  GltfModel: GLTF,
  GridHelper: GridHelper,
  Group: Group,
  HalftonePass: HalftonePass,
  HemisphereLight: HemisphereLight,
  Icosahedron: Icosahedron,
  IcosahedronGeometry: IcosahedronGeometry,
  Image: Image,
  InstancedMesh: InstancedMesh,
  LambertMaterial: LambertMaterial,
  Lathe: Lathe,
  LatheGeometry: LatheGeometry,
  MatcapMaterial: MatcapMaterial,
  Material: BaseMaterial,
  MaterialInjectionKey: MaterialInjectionKey,
  Mesh: Mesh,
  MeshInjectionKey: MeshInjectionKey,
  Object3D: Object3D,
  Octahedron: Octahedron,
  OctahedronGeometry: OctahedronGeometry,
  OrthographicCamera: OrthographicCamera,
  PerspectiveCamera: PerspectiveCamera,
  PhongMaterial: PhongMaterial,
  PhysicalMaterial: PhysicalMaterial,
  Plane: Plane,
  PlaneGeometry: PlaneGeometry,
  PointLight: PointLight,
  Points: Points,
  PointsMaterial: PointsMaterial,
  Polyhedron: Polyhedron,
  PolyhedronGeometry: PolyhedronGeometry,
  RawShaderMaterial: RawShaderMaterial,
  Raycaster: Raycaster,
  RectAreaLight: RectAreaLight,
  RenderPass: RenderPass,
  Renderer: Renderer,
  RendererInjectionKey: RendererInjectionKey,
  Ring: Ring,
  RingGeometry: RingGeometry,
  SMAAPass: SMAAPass,
  SSAOPass: SSAOPass,
  Scene: Scene,
  SceneInjectionKey: SceneInjectionKey,
  ShaderMaterial: ShaderMaterial,
  ShadowMaterial: ShadowMaterial,
  ShapeGeometry: ShapeGeometry,
  Sphere: Sphere,
  SphereGeometry: SphereGeometry,
  SpotLight: SpotLight,
  Sprite: Sprite,
  StandardMaterial: StandardMaterial,
  SubSurfaceMaterial: SubSurfaceMaterial,
  Tetrahedron: Tetrahedron,
  TetrahedronGeometry: TetrahedronGeometry,
  Text: Text,
  Texture: Texture,
  TiltShiftPass: TiltShiftPass,
  ToonMaterial: ToonMaterial,
  Torus: Torus,
  TorusGeometry: TorusGeometry,
  TorusKnot: TorusKnot,
  TorusKnotGeometry: TorusKnotGeometry,
  Tube: Tube,
  TubeGeometry: TubeGeometry,
  UnrealBloomPass: UnrealBloomPass,
  VideoTexture: VideoTexture,
  ZoomBlurPass: ZoomBlurPass,
  applyObjectProps: applyObjectProps,
  bindObjectProp: bindObjectProp,
  bindObjectProps: bindObjectProps,
  bindProp: bindProp,
  bindProps: bindProps,
  getMatcapUrl: getMatcapUrl,
  lerp: lerp,
  limit: limit,
  propsValues: propsValues,
  setFromProp: setFromProp
});

const TroisJSVuePlugin = {
  install(app) {
    const comps = [
      "Camera",
      "OrthographicCamera",
      "PerspectiveCamera",
      "Raycaster",
      "Renderer",
      "Scene",
      "Group",
      "CubeCamera",
      "AmbientLight",
      "DirectionalLight",
      "HemisphereLight",
      "PointLight",
      "RectAreaLight",
      "SpotLight",
      "BasicMaterial",
      "LambertMaterial",
      "MatcapMaterial",
      "PhongMaterial",
      "PhysicalMaterial",
      "PointsMaterial",
      "ShaderMaterial",
      "StandardMaterial",
      "SubSurfaceMaterial",
      "ToonMaterial",
      "Texture",
      "CubeTexture",
      "BufferGeometry",
      "Mesh",
      "Box",
      "BoxGeometry",
      "Circle",
      "CircleGeometry",
      "Cone",
      "ConeGeometry",
      "Cylinder",
      "CylinderGeometry",
      "Dodecahedron",
      "DodecahedronGeometry",
      "Icosahedron",
      "IcosahedronGeometry",
      "Lathe",
      "LatheGeometry",
      "Octahedron",
      "OctahedronGeometry",
      "Plane",
      "PlaneGeometry",
      "Polyhedron",
      "PolyhedronGeometry",
      "Ring",
      "RingGeometry",
      "Sphere",
      "SphereGeometry",
      "Tetrahedron",
      "TetrahedronGeometry",
      "Text",
      "Torus",
      "TorusGeometry",
      "TorusKnot",
      "TorusKnotGeometry",
      "Tube",
      "TubeGeometry",
      "Image",
      "InstancedMesh",
      "Points",
      "Sprite",
      "FbxModel",
      "GltfModel",
      "BokehPass",
      "EffectComposer",
      "FilmPass",
      "FXAAPass",
      "HalftonePass",
      "RenderPass",
      "SAOPass",
      "SMAAPass",
      "SSAOPass",
      "TiltShiftPass",
      "UnrealBloomPass",
      "ZoomBlurPass"
    ];
    comps.forEach((comp) => {
      app.component(comp, TROIS[comp]);
    });
  }
};
function createApp(params) {
  return createApp$1(params).use(TroisJSVuePlugin);
}

function useTextures() {
  const obj = {
    loader: new TextureLoader(),
    count: 0,
    textures: [],
    loadProgress: 0,
    loadTextures,
    dispose
  };
  return obj;
  function loadTextures(images, cb) {
    obj.count = images.length;
    obj.textures.splice(0);
    obj.loadProgress = 0;
    Promise.all(images.map(loadTexture)).then(cb);
  }
  function loadTexture(img, index) {
    return new Promise((resolve) => {
      obj.loader.load(
        img.src,
        (texture) => {
          obj.loadProgress += 1 / obj.count;
          obj.textures[index] = texture;
          resolve(texture);
        }
      );
    });
  }
  function dispose() {
    obj.textures.forEach((t) => t.dispose());
  }
}

export { AmbientLight, BasicMaterial, BokehPass, Box, BoxGeometry, Geometry as BufferGeometry, PerspectiveCamera as Camera, Circle, CircleGeometry, ComposerInjectionKey, Cone, ConeGeometry, CubeCamera, CubeTexture, Cylinder, CylinderGeometry, DirectionalLight, Dodecahedron, DodecahedronGeometry, EffectComposer, EffectPass, ExtrudeGeometry, FXAAPass, FBX as FbxModel, FilmPass, GLTF as GltfModel, GridHelper, Group, HalftonePass, HemisphereLight, Icosahedron, IcosahedronGeometry, Image, InstancedMesh, LambertMaterial, Lathe, LatheGeometry, MatcapMaterial, BaseMaterial as Material, MaterialInjectionKey, Mesh, MeshInjectionKey, Object3D, Octahedron, OctahedronGeometry, OrthographicCamera, PerspectiveCamera, PhongMaterial, PhysicalMaterial, Plane, PlaneGeometry, PointLight, Points, PointsMaterial, Polyhedron, PolyhedronGeometry, RawShaderMaterial, Raycaster, RectAreaLight, RenderPass, Renderer, RendererInjectionKey, Ring, RingGeometry, SMAAPass, SSAOPass, Scene, SceneInjectionKey, ShaderMaterial, ShadowMaterial, ShapeGeometry, Sphere, SphereGeometry, SpotLight, Sprite, StandardMaterial, SubSurfaceMaterial, Tetrahedron, TetrahedronGeometry, Text, Texture, TiltShiftPass, ToonMaterial, Torus, TorusGeometry, TorusKnot, TorusKnotGeometry, TroisJSVuePlugin, Tube, TubeGeometry, UnrealBloomPass, VideoTexture, ZoomBlurPass, applyObjectProps, bindObjectProp, bindObjectProps, bindProp, bindProps, createApp, getMatcapUrl, lerp, limit, propsValues, setFromProp, useTextures };
//# sourceMappingURL=trois.module.cdn.js.map
