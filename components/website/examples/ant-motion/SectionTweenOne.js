import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import { BS } from "components/diginext/elements/Splitters";
import TweenOne from "rc-tween-one";
import Highlight from "react-highlight";
import BlockAnimationBasic from "./blocks/BlockAnimationBasic";
import BlockAnimationLoop from "./blocks/BlockAnimationLoop";
import BlockAnimationControl from "./blocks/BlockAnimationControl";

const SectionTweenOne = () => {
  return (
    <div>
    {/* BASIC ANIMATION */}
      <BlockAnimationBasic />

      {/* LOOP ANIMATION */}
      <BlockAnimationLoop />

      {/* ANIMATION CONTROLS */}
      <BlockAnimationControl />
    </div>
  );
};

export default SectionTweenOne;
