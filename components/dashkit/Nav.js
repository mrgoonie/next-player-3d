import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import DashkitButton, { ButtonSize } from "./Buttons";

import { HorizontalList, HorizontalListAlign } from "components/diginext/layout/ListLayout";
import { Children, Fragment, useEffect, useState } from "react";

const NavItem = ({
  children,
  type = "default",
  href,
  className,
  active = false,
  disabled = false,
  size = ButtonSize.NORMAL,
  bottomHighlight = true,
  textColor,
  onClick,
  ...rest
}) => {
  const clickHandler = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  let padding = "2rem 0";
  let fontSize = "1.15rem";
  switch (size) {
    case ButtonSize.SMALL:
      fontSize = "0.9rem";
      padding = "1.5rem 0";
      break;
    case ButtonSize.LARGE:
      fontSize = "1.3rem";
      break;
  }

  const item = (
    <div
      className={`nav-item ${className ? className : ""} ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
      onClick={clickHandler}
      {...rest}
    >
      <style jsx>{`
        
      `}</style>
      {/* <a href={href}>{children}</a> */}
      {children}
    </div>
  );

  return item;
};

/**
 * @param  {Object} props
 * @param  {Boolean} [props.borderBottom=false]
 * @param  {('small'|'normal'|'large')} [props.size="normal"]
 * @param  {Number} [props.defaultActiveIndex]
 * @param  {React.CSSProperties} [props.style]
 * @param  {('start'|'center'|'end'|'stretch'|'space_between'|'space_around')} [props.alignItem="start"]
 * @param  {void} [props.onChange]
 */
const Nav = ({
  children,
  borderBottom = false,
  size = "normal",
  alignItem = "start",
  defaultActiveIndex,
  onChange,
  style,
  gutter = 0,
  ...rest
}) => {
  const [activeId, setActiveId] = useState(defaultActiveIndex);
  const [navChildren, setNavChildren] = useState(children);

  useEffect(() => {
    // const amountChildren = Children.count(props.children);
    const orgChildren = children && children.type == Fragment ? children.props.children : children;
    const childrenWithProps = Children.map(orgChildren, (child, index) => {
      if (React.isValidElement(child)) {
        let newProps = { ...child.props };

        if (child.type == DashkitButton || child.type == NavItem) {
          // pass style type from group to children props
          // if (!newProps.type) newProps.type = props.type ?? ButtonType.PRIMARY;
          if (!newProps.size) newProps.size = size;
          newProps.active = typeof activeId != "undefined" && index == activeId;
          if (onChange) {
            const onClick = newProps.onClick;
            newProps.onClick = (e) => {
              if (onClick) onClick();
              setActiveId(index);
              onChange(index);
            };
          }
        }

        return React.cloneElement(child, newProps);
      }
      return child;
    });

    setNavChildren(childrenWithProps);
  }, [activeId, children]);

  return (
    <HorizontalList
      className="navs"
      gutter={gutter}
      align="middle"
      type={alignItem}
      style={{
        borderBottom: borderBottom ? `1px solid ${DefaultStyles.colors.border}` : `none`,
        ...style,
      }}
    >
      {navChildren}
    </HorizontalList>
  );
};

export { NavItem };

export default Nav;
