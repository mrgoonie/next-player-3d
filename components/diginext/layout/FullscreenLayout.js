import defaultStyle from "./FullscreenLayout.module.scss";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function FullscreenLayout({ className = "", style = {}, styleMobile = {}, styleDesktop = {}, children, ...rest }) {
  const classNames = [defaultStyle.layout, className].join(" ");
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 768 });
  const [currentStyle, setCurrentStyle] = useState(styleDesktop);

  useEffect(() => {
    setCurrentStyle(isDesktopOrLaptop ? styleDesktop : styleMobile);
  }, [isDesktopOrLaptop]);

  return (
      <div className={classNames} style={{ ...style, ...currentStyle }}>
        {children}
      </div>
  );
}

export default FullscreenLayout;
