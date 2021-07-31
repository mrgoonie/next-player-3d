import { useNextBrowserSize } from "plugins/next-reponsive";
import { useNextScroll } from "plugins/next-scroll";
import React, { useEffect, useRef, useState } from "react";

const Sticky = (props) => {
  const { children, offsetTop = 0, style } = props;

  const ref = useRef();

  const [elementOffsetY, setElementOffsetY] = useState();
  const [isSticked, setIsSticked] = useState(false);
  const [_style, setStyle] = useState({});
  const [height, setHeight] = useState(0);

  const scroll = useNextScroll();
  const browser = useNextBrowserSize();

  useEffect(() => {
    if (ref.current) {
      // console.log("ref.current", ref.current.getBoundingClientRect());
      setElementOffsetY(ref.current.offsetTop);
    }
  }, [browser.width, browser.height]);

  useEffect(() => {
    let top = scroll.y - elementOffsetY;
    // console.log("top", top);
    // console.log("elementOffsetY", elementOffsetY);

    if (top >= -offsetTop) {
      setIsSticked(true);
    } else {
      setIsSticked(false);
    }
  }, [elementOffsetY, scroll.y]);

  useEffect(() => {
    if (isSticked) {
      setHeight(ref.current.clientHeight);
      setStyle({
        position: "fixed",
        top: offsetTop + "px",
        width: "100%",
        ...style,
      });
      // console.log("STICKED");
    } else {
      setHeight(0);
      setStyle({
        position: "initial",
        ...style,
      });
      // console.log("NOT STICKED");
    }
  }, [ref, isSticked]);

  return (
    <div className="next-sticky" ref={ref}>
      <div style={{ height: height }} />
      <div style={_style}>{children}</div>
    </div>
  );
};

export default Sticky;
