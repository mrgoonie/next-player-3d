import * as THREE from "three";
import ObjectManager from "./ObjectManager";

const ThreeUtils = {
  /**
   * @param  {string} color="#fff"
   * @param  {number} intensity=1
   * @param  {number} distance=1
   * @param  {boolean} helper=false
   * @returns {THREE.PointLight}
   */
  createPointLight: ({ color = "#fff", intensity = 1, distance = 1, isHelper = false }) => {
    // var lightHolder = new THREE.Object3D()

    var light = new THREE.PointLight(color, intensity, distance);
    // lightHolder.light = light;
    // lightHolder.add(light)

    if (isHelper) {
      var helper = new THREE.PointLightHelper(light, distance);
      light.helper = helper;
      light.add(helper);
    }
    return light;
  },

  /**
   * @param  {string} color="#fff"
   * @param  {number} intensity=1
   * @param  {boolean} debug=false
   * @returns {THREE.DirectionalLight}
   */
  createDirectionalLight: ({ color = "#fff", intensity = 1, debug = false }) => {
    var light = new THREE.DirectionalLight(color, intensity);
    // lightHolder.light = light;
    // lightHolder.add(light)

    if (debug) {
      var helper = new THREE.DirectionalLightHelper(light);
      light.helper = helper;
      light.add(helper);
    }
    return light;
  },

  /**
   * @param  {string} color hex color code
   * @param  {number} width=1
   * @param  {number} height=1
   * @param  {boolean} transparent=false
   * @returns {THREE.Mesh}
   */
  createMeshColor(color, width = 1, height = 1, transparent = false, type = "basic") {
    var geometry = new THREE.PlaneBufferGeometry(width, height, 2, 2);
    var material =
      type == "basic"
        ? new THREE.MeshBasicMaterial({ color, transparent })
        : new THREE.MeshPhongMaterial({ color, transparent });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  },

  /**
   * @param  {string} url
   * @param  {number} width=1
   * @param  {number} height=1
   * @param  {boolean} transparent=false
   * @returns {THREE.Mesh}
   */
  createMeshFromTextureUrl(url, width = 1, height = 1, transparent = false) {
    var map = new THREE.TextureLoader().load(url);
    var geometry = new THREE.PlaneBufferGeometry(width, height, 2, 2);
    var material = new THREE.MeshBasicMaterial({ map, transparent });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  },

  /**
   * @param  {string} url
   * @param  {number} width = 1
   * @param  {number} height = 1
   * @param  {boolean} transparent = false
   * @param  {object} origin = { x: 0.5, y: 0.5 }
   * @returns {THREE.Mesh}
   */
  createSpriteFromTextureUrl(url, width = 1, height = 1, transparent = false, origin = { x: 0.5, y: 0.5 }) {
    var map = new THREE.TextureLoader().load(url);
    var material = new THREE.SpriteMaterial({
      map,
      transparent,
      depthTest: false,
      depthWrite: false,
    });
    var mesh = new THREE.Sprite(material);
    mesh.scale.set(width, height, 1);
    mesh.center.set(origin.x, origin.y);
    return mesh;
  },

  /**
   * @param  {THREE.Vector3} size=new THREE.Vector3(20, 20, 20)
   * @param  {string} color="#ff0000"
   * @returns {THREE.Mesh}
   */
  createCube(size = new THREE.Vector3(1, 1, 1), color = "#ff0000") {
    var geometry = new THREE.BoxBufferGeometry(size.x, size.y, size.z);
    var material = new THREE.MeshStandardMaterial({ color: color });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  },

  /**
   * @param  {THREE.Object3D} object
   * @param  {string} axis
   */
  normalizeRotation: function (object, axis) {
    return THREE.Math.degToRad(THREE.Math.radToDeg(object.rotation[axis]) % 360);
  },

  /**
   * @param  {THREE.Object3D} model
   */
  disposeObject3D: function (model) {
    var i;
    if (model.parent) {
      for (i = model.parent.children.length - 1; i >= 0; i--) {
        model.parent.children[i].traverse(traverseFunc);
      }
      ThreeUtils.clearThree(model.parent);
    } else {
      for (i = model.children.length - 1; i >= 0; i--) {
        model.children[i].traverse(traverseFunc);
      }
      ThreeUtils.clearThree(model);
    }

    model = null;

    function traverseFunc(child) {
      if (child.isMesh) {
        ThreeUtils.disposeHierarchy(child, ThreeUtils.disposeNode);
      }
    }
  },
  /**
   * @param {THREE.Mesh} node
   */
  disposeNode: function (node) {
    if (node instanceof THREE.Mesh) {
      if (node.geometry) {
        node.geometry.dispose();
      }

      if (node.material) {
        if (node.material instanceof THREE.MeshFaceMaterial) {
          $.each(node.material.materials, function (idx, mtrl) {
            if (mtrl.map) mtrl.map.dispose();
            if (mtrl.lightMap) mtrl.lightMap.dispose();
            if (mtrl.bumpMap) mtrl.bumpMap.dispose();
            if (mtrl.normalMap) mtrl.normalMap.dispose();
            if (mtrl.specularMap) mtrl.specularMap.dispose();
            if (mtrl.envMap) mtrl.envMap.dispose();

            mtrl.dispose(); // disposes any programs associated with the material
          });
        } else {
          if (node.material.map) node.material.map.dispose();
          if (node.material.lightMap) node.material.lightMap.dispose();
          if (node.material.bumpMap) node.material.bumpMap.dispose();
          if (node.material.normalMap) node.material.normalMap.dispose();
          if (node.material.specularMap) node.material.specularMap.dispose();
          if (node.material.envMap) node.material.envMap.dispose();

          node.material.dispose(); // disposes any programs associated with the material
        }
      }
    }
  }, // disposeNode

  disposeHierarchy: function (node, callback) {
    for (var i = node.children.length - 1; i >= 0; i--) {
      var child = node.children[i];
      ThreeUtils.disposeHierarchy(child, callback);
      callback(child);
    }
  },

  clearChild: function (obj) {
    while (obj.children.length > 0) {
      // if (obj.children[0].dispose) {
      //   obj.children[0].dispose()
      // }
      ThreeUtils.clearThree(obj.children[0]);
      obj.remove(obj.children[0]);
    }
    return;

    while (obj.children.length > 0) {
      ThreeUtils.clearThree(obj.children[0]);
      obj.remove(obj.children[0]);
    }
    if (obj.geometry) {
      obj.geometry.dispose();
      if (obj.geometry.vertices) obj.geometry.vertices = [];
      if (obj.geometry.attributes) obj.geometry.attributes = null;
    }
    if (obj.material)
      if (obj.material.length > 0) {
        for (var j = 0; j < obj.material.length; j++) {
          obj.material[j].dispose();
        }
      } else obj.material.dispose();
    if (obj.texture) obj.texture.dispose();
  },

  clearThree: function (obj, skipCheck) {

    // if (skipCheck) {
    //   this.clearChild(obj);
    //   if (obj.parent) obj.parent.remove(obj);
    //   obj = null;
    //   return;
    // }
    if (obj) {
      while (obj.children.length > 0) {
        if (!skipCheck) {
          if (obj.children[0].dispose) {
            obj.children[0].dispose()
          }
        }
        ThreeUtils.clearThree(obj.children[0]);
        obj.remove(obj.children[0]);
      }
    }
    return;

    // THREE.Scene can no longer has .dispose() method:
    // if (obj.dispose && !(obj instanceof THREE.Scene)) {
    if (obj.dispose) {
      obj.dispose();
      return;
    }

    if (obj.clearChild) {
      obj.clearChild();
      return;
    }

    this.clearChild(obj);
  },

  /**
   *
   * @param {THREE.Object3D} obj
   * @param {THREE.Camera} camera
   * @param {Object} options
   */
  worldToScreenPosition: function (obj, camera, options) {
    if (!obj) return { x: 0, y: 0, z: 0 };

    options = options || {};
    const delta = options.hasOwnProperty("delta") ? options["delta"] : { x: 0, y: 0 };

    const renderer = ObjectManager.get("renderer");
    const canvas = renderer.getContext().canvas;

    const resolution = window.devicePixelRatio || 1;

    const widthHalf = (0.5 * canvas.width) / resolution;
    const heightHalf = (0.5 * canvas.height) / resolution;

    const vector = new THREE.Vector3();
    obj.updateMatrixWorld();
    camera.updateWorldMatrix();

    // camera.upda
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.x += delta.x;
    vector.y += delta.y;
    vector.project(camera);

    vector.x = vector.x * widthHalf;
    vector.y = vector.y * heightHalf;

    return {
      x: vector.x,
      y: vector.y,
      z: -1,
    };
  },

  worldToCanvasPosition: function (obj, camera) {
    const renderer = ObjectManager.get("renderer");
    const canvas = renderer.getContext().canvas;

    const vector = new THREE.Vector3();

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    const widthHalf = 0.5 * canvas.width;
    const heightHalf = 0.5 * canvas.height;

    vector.x = vector.x * widthHalf + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    return {
      x: vector.x,
      y: vector.y,
      z: -1,
    };
  },

  rotateAroundObjectAxis: function (object, axis, radians) {
    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotationMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
  },

  rotateAroundWorldAxis: function (object, axis, radians) {
    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    rotationMatrix.multiply(object.matrix); // pre-multiply
    object.matrix = rotationMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
  },

  makeTextSprite: function (message, parameters) {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "MontserratMedium";

    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 28;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0;

    var borderColor = parameters.hasOwnProperty("borderColor")
      ? parameters["borderColor"]
      : { r: 255, g: 0, b: 0, a: 1.0 };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor")
      ? parameters["backgroundColor"]
      : { r: 255, g: 255, b: 255, a: 1.0 };

    var canvasWidth = parameters.hasOwnProperty("canvasWidth") ? parameters["canvasWidth"] : 32;

    var spriteScl = parameters.hasOwnProperty("spriteScl") ? parameters["spriteScl"] : 0.6;

    var canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasWidth;
    var context = canvas.getContext("2d");
    context.font = "" + fontsize + "px " + fontface;
    // context.fillStyle = "rgba(0, 0, 200, 0.2)";
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // get size data (height depends only on font size)
    var metrics = context.measureText(message);

    // var textWidth = vi_char.includes(message) ? metrics.width * .6 : metrics.width;
    var textWidth = metrics.width;
    // //console.log(message, textWidth);
    // background color
    context.fillStyle =
      "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle =
      "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;

    // text color
    context.fillStyle = "rgba(255, 84, 23, 1.0)";

    context.textAlign = "center";
    // context.fillText(message, borderThickness, fontsize + borderThickness);
    context.fillText(message, canvas.width / 2, fontsize + borderThickness);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set((canvas.width / 10) * 2, (canvas.height / 10) * 2, 1.0);
    sprite.width = (textWidth / sprite.scale.x) * spriteScl;

    return sprite;
  },
};

export default ThreeUtils;
