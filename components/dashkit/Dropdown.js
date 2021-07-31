import InlineSplitter from "components/diginext/elements/InlineSplitter";
import AdminIcon from "components/dashkit/Icon";
import { HorizontalList, HorizontalListAlign } from "components/diginext/layout/ListLayout";
import AdminGlobalStyle, { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import DashkitButton, { ButtonShape, ButtonType } from "components/dashkit/Buttons";
import Color from "plugins/utils/Color";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DropdownMenu = ({ children, ...rest }) => {
  return (
    <div className="dropdown-menu">
      {children}
    </div>
  );
};

const DropdownMenuItem = ({ children, href, onClick, cursor = 1, ...rest }) => {
  const handleClick = (e) => {
    if (onClick) onClick();
  };

  const item = (
    <div className="dropdown-menu-item" onClick={handleClick} {...rest}>
      <style jsx>{`
        .dropdown-menu-item {
          ${cursor ? "cursor: pointer;" : null}
        }
      `}</style>
      {children}
    </div>
  );

  const render = href ? <Link href={href}>{item}</Link> : item;

  return render;
};

const Dropdown = ({ label, type = ButtonType.PRIMARY, shape = ButtonShape.ROUND_RECT, children }) => {
  const [isShow, setIsShow] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (isShow) {
      window.addEventListener("mousedown", onMouseDown);
    }
  }, [isShow]);

  function onMouseDown(e) {
    // console.log(e.path);
    // console.log(e.path.indexOf(dropdownRef.current));
    const isClickWithinDropdown = e.path.indexOf(dropdownRef.current) > -1;
    // console.log(isClickWithinDropdown ? "clicked on dropdown" : "clicked outside");
    window.removeEventListener("mousedown", onMouseDown);

    if (!isClickWithinDropdown) {
      setIsShow(false);
    } else {
      setTimeout(() => setIsShow(false), 20);
    }
  }

  const toggleClick = (e) => {
    // e.stopPropagation();
    setIsShow(!isShow);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <style jsx>{`
        .dropdown {
          display: inline-block;
          position: relative;
        }
        .group {
          position: absolute;
          overflow: hidden;
          display: block;
        }
        .group.hide {
          display: none;
        }
      `}</style>

      <DashkitButton onClick={toggleClick} type={type} shape={shape}>
        <HorizontalList align="middle">
          <span>{label}</span>
          <InlineSplitter width={10} />
          <AdminIcon name="arrow-collapse" width="8px" height="auto" />
        </HorizontalList>
      </DashkitButton>

      <div className={`group ${isShow ? "" : "hide"}`}>{children}</div>
    </div>
  );
};

export { DropdownMenu, DropdownMenuItem };

export default Dropdown;
