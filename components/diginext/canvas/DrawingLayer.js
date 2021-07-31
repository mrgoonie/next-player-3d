import { Component, createRef } from "react";
import * as Konva from "konva";

const DrawingLayerResizeMode = {
  get MANUAL() { return "MANUAL" };
  get FIT_TO_BROWSER() { return "FIT_TO_BROWSER" };
  get FIT_TO_PARENT() { return "FIT_TO_PARENT" };
}

const DrawingLayerInteractionMode = {
  get DRAW() { return "DRAW" };
  get MOVE() { return "MOVE" };
}

export default class DrawingLayer extends Component {

  backgroundColor;
  resizeMode;
  interactionMode;
  strokeSize;
  brushColor;

  constructor(props) {
    super(props)

    this.containerRef = createRef();

    this.parseProps(props);

    this.stageData = {
      size: {
        width: 1000,
        height: 1000
      }
    }

    this.state = {}
  }

  parseProps(props) {
    this.className = props.className || "";
    this.resizeMode = props.resizeMode ? props.resizeMode : DrawingLayerResizeMode.MANUAL;
    this.interactionMode = props.interactionMode ? props.interactionMode : DrawingLayerInteractionMode.DRAW;
    this.backgroundColor = props.backgroundColor;
    this.brushColor = "#ff0000";
    this.strokeSize = props.strokeSize || 3;
  }

  componentDidMount() {
    console.log("mounted")
    var container = this.containerRef.current;
    var props = this.props;

    // console.log(container.parentElement.clientWidth, container.parentElement.clientHeight);

    // parse configuration
    switch (this.resizeMode) {
      case DrawingLayerResizeMode.MANUAL:
        if (typeof props.width == "undefined" || typeof props.height == "undefined") {
          console.warn(`You set resize mode to manual, but didn't define "width" and "height" value.`);
        } else {
          this.stageData.size.width = props.width;
          this.stageData.size.height = props.height;
        }
        break;

      case DrawingLayerResizeMode.FIT_TO_PARENT:
        this.stageData.size.width = container.parentElement.clientWidth;
        this.stageData.size.height = container.parentElement.clientHeight;
        break;

      default: // FIT TO BROWSER
        this.stageData.size.width = window.innerWidth;
        this.stageData.size.height = window.innerHeight;
        break;
    }

    // setup Konva.js
    this.setupKonva();

    // setup drawing
    this.setupDrawing()

    // resize event
    this.resize();

    // test
    // var circle = new Konva.Circle({
    //   radius: 50,
    //   fill: 'red',
    //   x: this.stage.width() / 2,
    //   y: this.stage.height() / 2,
    // });
    // this.layer.add(circle);
    // this.layer.draw();

    console.log(this.containerRef);
  }

  shouldComponentUpdate(nextProps, nextState) {

    this.parseProps(nextProps);

    return false;
  }

  exportBase64() {
    return this.stage.toDataURL();
  }

  switchMode(mode) {
    this.interactionMode = mode;

    if (this.background) {
      if (this.interactionMode == DrawingLayerInteractionMode.MOVE) {
        this.background.draggable(true);
      } else {
        this.background.draggable(false);
      }
    }

  }

  setBrushColor(color) {
    this.brushColor = color
  }

  setStrokeSize(size) {
    this.strokeSize = size
  }

  addBackground(src) {
    var scope = this;
    var stage = this.stage;
    var layer = this.layer;
    console.log(src, src instanceof Blob, typeof src);

    if (src instanceof Blob) {
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        let contents = event.target.result;
        _loadImg(contents, _addBg);
      });
      reader.readAsDataURL(src);
    } else if (typeof src == "string") {
      _loadImg(src, _addBg);
    } else {
      console.error("Not sure what type of the image is.");
    }

    async function _loadImg(src, cb) {
      var image = new Image()
      image.src = src;
      image.onload = (e) => {
        if (cb) cb(image)
      }
    }

    function _addBg(image) {
      if (scope.background) {
        scope.background.destroy();
      }

      scope.background = new Konva.Image({
        x: 0,
        y: 0,
        image: image,
        width: image.width,
        height: image.height,
        draggable: (scope.interactionMode == DrawingLayerInteractionMode.MOVE),
        dragBoundFunc: scope.backgroundBoundFunc.bind(scope),
      });

      // if (scope.background.width() < scope.stage.width()) {
      var s = scope.stage.width() / scope.background.width()
      scope.background.width(scope.background.width() * s)
      scope.background.height(scope.background.height() * s)
      // }

      if (scope.background.height() < scope.stage.height()) {
        s = scope.stage.height() / scope.background.height()
        scope.background.height(scope.background.height() * s)
        scope.background.width(scope.background.width() * s);
      }

      scope.background.orgWidth = scope.background.width()
      scope.background.orgHeight = scope.background.height()

      // add the shape to the layer
      layer.add(scope.background);

      scope.background.moveToBottom();
      scope.background.moveUp();

      // enable pinch to scale?
      if (scope.props.pinchToScaleEnabled) {
        scope.enableTouchToScaleBackground();
      }

      layer.draw();
    }
  }

  backgroundBoundFunc(pos) {
    var scope = this;
    var bg = this.background;
    var newX = pos.x > 0 ? 0 : pos.x;
    var newY = pos.y > 0 ? 0 : pos.y;

    if (newX < scope.stage.width() - bg.width())
      newX = scope.stage.width() - bg.width();
    if (newY < scope.stage.height() - bg.height())
      newY = scope.stage.height() - bg.height();

    return {
      x: newX,
      y: newY,
    };
  }

  scaleBackground(scale) {
    if (!this.background) return;

    var bg = this.background;

    bg.width(bg.orgWidth * scale)
    bg.height(bg.orgHeight * scale)

    bg.x(this.backgroundBoundFunc(bg.position()).x);
    bg.y(this.backgroundBoundFunc(bg.position()).y);
    bg.dragBoundFunc(this.backgroundBoundFunc.bind(this));

    this.layer.batchDraw();
  }

  enableTouchToScaleBackground() {
    // https://konvajs.org/docs/sandbox/Multi-touch_Scale_Shape.html

    var stage = this.stage;
    var lastDist = 0;
    var startScale = 1;
    var activeShape = this.background;

    function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    stage.getContent().addEventListener(
      'touchmove',
      function (evt) {
        var touch1 = evt.touches[0];
        var touch2 = evt.touches[1];

        if (touch1 && touch2) {
          var dist = getDistance(
            {
              x: touch1.clientX,
              y: touch1.clientY,
            },
            {
              x: touch2.clientX,
              y: touch2.clientY,
            }
          );

          if (!lastDist) {
            lastDist = dist;
          }

          var scale = (activeShape.scaleX() * dist) / lastDist;
          activeShape.scaleX(scale);
          activeShape.scaleY(scale);

          layer.draw();
          lastDist = dist;
        }
      },
      false
    );

    stage.getContent().addEventListener(
      'touchend',
      function () {
        lastDist = 0;
      },
      false
    );
  }

  setupDrawing() {
    var scope = this;
    var stage = this.stage;
    var layer = this.layer;
    var isPaint = false;
    var mode = 'brush';
    var lastLine;

    stage.on('mousedown touchstart', function (e) {
      if (scope.interactionMode != DrawingLayerInteractionMode.DRAW) return;
      isPaint = true;
      var pos = stage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: scope.brushColor,
        strokeWidth: scope.strokeSize,
        globalCompositeOperation:
          mode === 'brush' ? 'source-over' : 'destination-out',
        points: [pos.x, pos.y],
      });
      layer.add(lastLine);
    });

    stage.on('mouseup touchend', function () {
      isPaint = false;
    });

    // and core function - drawing
    stage.on('mousemove touchmove', function () {
      if (!isPaint) {
        return;
      }

      const pos = stage.getPointerPosition();
      var newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
      layer.batchDraw();
    });
  }

  setupKonva() {
    var stageWidth = this.stageData.size.width;
    var stageHeight = this.stageData.size.height;
    console.log(stageWidth, stageHeight);

    this.stage = new Konva.Stage({
      container: 'drawing-layer-container',
      width: stageWidth,
      height: stageHeight,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    if (this.backgroundColor) {
      this.bgColorShape = new Konva.Rect({
        x: stageWidth / 2,
        y: stageHeight / 2,
        width: 5000,
        height: 5000,
        fill: this.backgroundColor,
        offsetX: 2500,
        offsetY: 2500
      });
      // add the shape to the layer
      this.layer.add(this.bgColorShape);
    }

    this.layer.draw();
  }

  resize() {
    var scope = this;
    var stageWidth = this.stageData.size.width;
    var stageHeight = this.stageData.size.width;

    // if (this.resizeMode == DrawingLayerResizeMode.FIT_TO_BROWSER) {
    //   fitStageIntoParentContainer();
    //   // adapt the stage on any window resize
    //   window.addEventListener('resize', fitStageIntoParentContainer);

    //   function fitStageIntoParentContainer() {
    //     var container = scope.containerRef.current;

    //     // now we need to fit stage into parent
    //     var containerWidth = container.offsetWidth;
    //     // to do this we need to scale the stage
    //     var scale = containerWidth / stageWidth;

    //     stage.width(stageWidth * scale);
    //     stage.height(stageHeight * scale);
    //     stage.scale({ x: scale, y: scale });
    //     stage.draw();
    //   }
    // }

    // if (this.resizeMode == DrawingLayerResizeMode.FIT_TO_PARENT) {
    //   resizeFollowParentContainer();
    //   // adapt the stage on any window resize
    //   window.addEventListener('resize', resizeFollowParentContainer);

    //   function resizeFollowParentContainer() {
    //     var container = scope.containerRef.current;

    //     // now we need to fit stage into parent
    //     var containerWidth = container.offsetWidth;
    //     // to do this we need to scale the stage
    //     var scale = containerWidth / stageWidth;

    //     stage.width(container.offsetWidth);
    //     stage.height(container.offsetHeight);
    //     stage.draw();
    //   }
    // }
  }

  render() {
    return (
      <>
        <style jsx>{`
          .container {}
        `}</style>
        <div id="drawing-layer-container" className={`container ${this.props.className}`} ref={this.containerRef}></div>
      </>
    )
  }
}