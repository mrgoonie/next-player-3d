import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import { BS } from "components/diginext/elements/Splitters";
import TweenOne from "rc-tween-one";
import Highlight from "react-highlight";

const BlockAnimationBasic = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h3>
            <strong>Basic animation</strong>
          </h3>
        </CardHeader>
        <CardBody>
          <TweenOne animation={{ x: 80 }}>
            <div className="red-circle" />
          </TweenOne>
        </CardBody>
        <CardFooter padding={0}>
          <Highlight>
            {`<TweenOne animation={{ x: 80, duration: 1000 }}>
  <div className="red-circle" />
</TweenOne>`}
          </Highlight>
        </CardFooter>
      </Card>

      <BS size={25} />
    </>
  );
};

export default BlockAnimationBasic;
