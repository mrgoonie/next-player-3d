import AdminIcon from "components/dashkit/Icon";
import { Children, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HorizontalList, HorizontalListAlign, ListItem, ListItemSize, ListType } from "components/diginext/layout/ListLayout";
import Link from "next/link";

const ButtonExpandableGroup = ({
  label = "",
  icon,
  children,
  show = false,
  fontSize = "14px",
  href,
  color = "#6e84a3",
  colorActive = "black",
}) => {
  const groupRef = useRef();
  const [isShow, setIsShow] = useState(show);
  const [containerHeight, setContainerHeight] = useState(0);
  const countChildren = Children.count(children);

  useEffect(() => {
    if (countChildren > 0 && containerHeight == 0) {
      setContainerHeight(groupRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    // console.log(`[${label}] isShow: ${isShow}`, containerHeight);

    if (containerHeight > 0) {
      if (isShow) {
        gsap.to(groupRef.current, {
          duration: 0.2,
          ease: "power2.inOut",
          height: containerHeight,
        });
      } else {
        gsap.to(groupRef.current, {
          duration: 0.2,
          ease: "power2.inOut",
          height: 0,
        });
      }
    }
  }, [isShow]);

  const toggleDisplay = () => {
    setIsShow(!isShow);
  };

  const btn = (
    <div className="btn" onClick={toggleDisplay}>
      <style jsx>{`
        .btn {
          cursor: pointer;
          padding: 0.5rem 1.4rem;
          vertical-align: middle;
          color: ${color} !important;
          font-size: ${fontSize};
        }
        .btn.active,
        .btn:hover {
          color: ${colorActive} !important;
        }
        .icon {
          width: 30px;
        }
      `}</style>
      <HorizontalList type="start" align="middle">
        <span className="icon">
          {icon ? (
            <AdminIcon name={icon} width="18px" height="auto" />
          ) : (
            <span style={{ width: "18px", display: "inline-block" }} />
          )}
        </span>

        <ListItem size="stretch">
          <span>{label}</span>
        </ListItem>

        {countChildren > 0 ? (
          <AdminIcon name={isShow ? "arrow-expand" : "arrow-collapse"} width="8px" height="auto" />
        ) : null}
      </HorizontalList>
    </div>
  );

  return (
    <div>
      <style jsx>{`
        .group {
          padding-left: 3.5rem;
          overflow: hidden;
        }
      `}</style>

      {href ? <Link href={href}>{btn}</Link> : btn}

      <div className="group" ref={groupRef}>
        {children}
      </div>
    </div>
  );
};

export default ButtonExpandableGroup;
