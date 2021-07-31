import css from "./CenterContainer.module.scss";

const CenterContainer = ({
  children,
  className,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  background,
  backgroundColor,
  backgroundSize,
  backgroundPosition,
  padding,
  margin,
  border,
  borderRadius,
  ...rest
}) => {
  return (
    <div className={`center-container ${css.container} ${className ? className : ""}`} {...rest}>
      <style jsx>{`
        .center-container {
          ${width ? `width: ${width};` : ""}
          ${height ? `height: ${height};` : ""}
          ${maxWidth ? `max-width: ${maxWidth};` : ""}
          ${maxHeight ? `max-height: ${maxHeight};` : ""}
          ${minWidth ? `min-width: ${minWidth};` : ""}
          ${minHeight ? `min-height: ${minHeight};` : ""}
          ${padding ? `padding: ${padding};` : ""}
          ${margin ? `margin: ${margin};` : ""}
          ${background ? `background: ${background};` : ""}
          ${backgroundColor ? `background-color: ${backgroundColor};` : ""}
          ${backgroundSize ? `background-size: ${backgroundSize};` : ""}
          ${backgroundPosition ? `background-position: ${backgroundPosition};` : ""}
          ${border ? `border: ${border};` : ""}
          ${borderRadius ? `border-radius: ${borderRadius};` : ""}
        }
      `}</style>
      {children}
    </div>
  );
};

export default CenterContainer;
