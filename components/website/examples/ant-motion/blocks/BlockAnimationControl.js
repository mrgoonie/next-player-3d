import DashkitButton from "components/dashkit/Buttons";
import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import { BS } from "components/diginext/elements/Splitters";
import TweenOne from "rc-tween-one";
import { useEffect, useState } from "react";
import Highlight from "react-highlight";

const BlockAnimationControl = () => {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Card>
        <CardHeader>
          <h3>
            <strong>Control the animation</strong>
          </h3>
        </CardHeader>
        <CardBody>
          <TweenOne
            paused={paused}
            animation={{
              x: 80,
              yoyo: true,
              repeat: -1,
              duration: 1000,
              ease: "easeInOutBack",
              onUpdate: ({ ratio }) => {
                // setProgress(ratio);
              },
            }}
          >
            <div className="red-circle" />
          </TweenOne>
          <BS />
          <DashkitButton onClick={() => setPaused(!paused)}>Toggle PLAY/PAUSE</DashkitButton>
          <BS />
          Progress: {progress}
        </CardBody>
        <CardFooter padding={0}>
          <Highlight>
            {`<TweenOne
animation={{
  x: 80,
  yoyo: true,
  repeat: -1,
  duration: 1000,
}}
>
<div className="red-circle" />
</TweenOne>`}
          </Highlight>
        </CardFooter>
      </Card>

      <BS size={25} />
    </>
  );
};

export default BlockAnimationControl;
