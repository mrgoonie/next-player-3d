import * as THREE from "three";
import { Object3D, LoadingManager, TextureLoader, AudioLoader, CubeTextureLoader, FileLoader } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import UrlUtils from "../utils/UrlUtils";

const loadFont = require("load-bmfont");

export const PlayerLoaderEvent = {
  START: "start",
  COMPLETED: "completed",
  PROGRESS: "progress",
  ERROR: "error",
};

export default class PlayerLoader extends THREE.EventDispatcher {
  // #privateField = 'test';

  collection = new Map();

  #cubeImagesRLTBFB = [
    "left.jpg", // px
    "right.jpg", // nx
    "top.jpg", // py
    "bottom.jpg", // ny
    "front.jpg", // pz
    "back.jpg", // nz
  ];

  #cubeImagesXYZ = ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"];

  constructor() {
    super();

    const scope = this;

    const manager = (this.manager = new LoadingManager());
    this.dracoLoader = new DRACOLoader();

    manager.onStart = function (url, itemsLoaded, itemsTotal) {
      scope.dispatchEvent({ type: PlayerLoaderEvent.START });
    };

    manager.onLoad = function () {
      scope.dispatchEvent({ type: PlayerLoaderEvent.COMPLETED });
      // console.log('Loading complete!');
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      const percent = parseFloat(itemsLoaded) / parseFloat(itemsTotal);
      // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

      scope.dispatchEvent({ type: PlayerLoaderEvent.PROGRESS, percent: percent });
    };

    manager.onError = function (url) {
      scope.dispatchEvent({ type: PlayerLoaderEvent.ERROR, url });
      // console.log('There was an error loading ' + url);
    };
    // console.log(this.#privateField);
  }

  /**
   *
   * @param {Object[]} list - The employees who are responsible for the project.
   * @param {string} list[].url - The name of an employee.
   * @param {string} list[].key - The employee's department.
   * @param {string} list[].type - The employee's department.
   */
  async loadList(list) {
    const scope = this;
    return new Promise((resolve, reject) => {
      Promise.all(
        list.map(async (item) => {
          const url = item.url || "";
          const key = item.key || null;
          const type = item.type || null;
          const loadedItem = await this.load(url, key, type);
          return loadedItem;
        })
      )
        .then(() => resolve(scope.collection))
        .catch((e) => console.log("[PlayerLoader] ERROR:", e));
    });
  }

  /**
   * Use to load MODELS or TEXTURES or ASSETS.
   * @param {String} url
   * @param {String} [key]
   * @param {('fbx'|'svg'|'glb'|'gltf'|'obj'|'mp3'|'jpg'|'png'|'cube_map'|'equirectangular')} [type]
   * @param {THREE.WebGLRenderer} [renderer]
   */
  load(url, key, type, renderer) {
    const scope = this;
    key = key || UrlUtils.getFileNameWithExtension(url);

    return new Promise((resolve, reject) => {
      let loader;
      if (key.indexOf("cube_map") != -1 || type == "cube_map") {
        loader = new CubeTextureLoader(this.manager);
        loader.setPath(url);
        if (key.indexOf("_xyz") != -1) {
          loader.load(this.#cubeImagesXYZ, onItemLoaded);
        } else {
          loader.load(this.#cubeImagesRLTBFB, onItemLoaded);
        }
      } else if (key.indexOf("equirectangular") != -1 || type == "equirectangular") {
        loader = new TextureLoader(this.manager);
        loader.load(url, onItemLoaded, undefined, onItemError);
      } else {
        var fileExt = type || UrlUtils.getFileExtension(url);
        switch (fileExt) {
          case "fbx":
            loader = new FBXLoader(this.manager);
            break;

          case "svg":
            loader = new SVGLoader(this.manager);
            break;

          case "glb":
            loader = new GLTFLoader(this.manager);
            break;

          case "gltf":
            loader = new GLTFLoader(this.manager);
            loader.setDRACOLoader(this.dracoLoader);
            loader.dracoLoader.setDecoderPath("/draco/gltf/");
            break;

          case "obj":
            loader = new OBJLoader(this.manager);
            break;

          case "mp3":
            loader = new AudioLoader(this.manager);
            break;

          case "jpg":
            loader = new TextureLoader(this.manager);
            break;

          case "png":
            loader = new TextureLoader(this.manager);
            break;

          default:
            loader = new FileLoader(this.manager);
            break;
        }
        loader.load(url, onItemLoaded, undefined, onItemError);
      }

      function onItemError(e) {
        console.error("LOADING ERROR !");
        console.log(e);

        reject(e);
        // console.log("[Assets] Error " + e.target.status + ": " + e.target.statusText);
      }

      function onItemLoaded(object) {
        var obj3d;

        if (key.indexOf("equirectangular") != -1 || type == "equirectangular") {
          if (!renderer) {
            reject({ target: { statusText: `"renderer" param is required` } });
            return;
          }
          const rt = new THREE.WebGLCubeRenderTarget(object.image.height);
          rt.fromEquirectangularTexture(renderer, object);
          obj3d = rt.texture;
        } else {
          if (typeof object.scene != "undefined") {
            // console.log (object);
            var holder = new Object3D();
            holder.add(object.scene);
            // object.scene.scale.setScalar(100);
            obj3d = holder;
            if (typeof object.animations != "undefined") {
              obj3d.animations = object.animations;
            }
            if (typeof object.assets != "undefined") {
              obj3d.assets = object.assets;
            }
            if (typeof object.parser != "undefined") {
              obj3d.parser = object.parser;
            }
          } else {
            obj3d = object;
          }
        }

        scope.collection.set(key, obj3d);

        resolve(obj3d);
      }
    });
  }
}
