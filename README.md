# Player3D with Next.js

With the support of [Three.js](https://threejs.org/).

## Demo

https://next-player-3d.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Developer notes

**This is the custom 3D viewer I made for my project, it might not fit into your projects in some cases, considers using [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for better performance & production ready.**

## Features

- Display 3D models within a canvas.
- Change position/rotation/scale of the model via component props
- Change zoom/rotation of the Three.js control via component props
- Auto fit 3D model into the parent element.
- Load external texture file.
- Load external animation model.
- Animation control.
- Display skybox as background.

## Example code:

```
<Player3D
    // show/hide grid object & xyz axis in the view
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
