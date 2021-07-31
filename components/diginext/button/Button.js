import AppLink from "components/diginext/link/AppLink";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import Link from "next/link";

// import style from "./Button.module.scss";
const Button = ({
  children,
  onClick,
  href,
  className,
  disabled = false,
  active = false,
  cursor = true,
  fontSize = "1rem",
  textColor = "black",
  textColorActive = "black",
  bgColor = "white",
  bgColorActive = "gray",
  border = "1px solid transparent",
  borderActive = "1px solid transparent",
  padding = "0.55rem 0.95rem",
  borderRadius = ".375rem",
  ...rest
}) => {
  // console.log(href);
  const handleClick = (e) => {
    // console.log("clicked")
    if (disabled) return;
    if (onClick) onClick(e);
  };

  const ele = (
    <>
      <style jsx>{`
        .btn {
          display: inline-block;
          transition: all 0.25s;
          ${`cursor: ${cursor ? "pointer" : "default"};`}
          ${`padding: ${padding};`} 
          ${`font-size: ${fontSize};`}
          ${`color: ${textColor};`} 
          ${`background-color: ${bgColor};`} 
          ${`border: ${border};`}
          ${`border-radius: ${borderRadius};`}
        }
        .btn.active,
        .btn:focus,
        .btn:hover,
        .btn:active,
        .btn:visited,
        .btn:active:hover,
        .btn:active:focus {
          ${`font-size: ${fontSize};`}
          ${`color: ${textColorActive};`}
          ${`background-color: ${bgColorActive};`}
        }
        .btn.disabled {
          ${`color: ${textColor};`}
          ${`background-color: ${DefaultStyles.colors.disabled};`}
          opacity: 0.4;
          cursor: default;
        }
      `}</style>
      <span
        className={`btn ${className ? className : ""} ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </span>
    </>
  );

  return href ? <AppLink href={href}>{ele}</AppLink> : ele;
};

export default Button;
