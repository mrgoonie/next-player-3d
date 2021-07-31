# Player3D with Next.js

With the support of [Three.js](https://threejs.org/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Display 3D models within a canvas.
- Auto fit 3D model into the parent element.

## Example code:

```
<Player3D
    // show grid object & xyz axis in the view
    debug 
    // allow drag to view the model
    controlEnabled
    // allow zoom in/out
    zoomEnabled
    // automatically fit the model into the parent element
    fitToViewport

    /* 3D model file */ 
    src={"/test.glb"}

    /* external texture file */ 
    // textureSrc={"/test.png"}
    
    /* external animation file */ 
    // animationSrc={animationSrc1}

    /* animation options: loop, speed,... */ 
    // animationOptions={{ loop: "pingpong", timeScale: 0.8 }}
    
    /* to control the animation: play/pause/stop/... */ 
    // animationRef={animation1}
/>
```

## TODO

- No sure...
