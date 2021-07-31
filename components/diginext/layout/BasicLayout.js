const BasicLayout = ({
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
  style,
  ...rest
}) => {
  return (
    <>
      <style jsx>{`
        .layout-basic {
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
      <div className={`layout-basic ${className ? className : ""}`} style={style} {...rest}>
        {children}
      </div>
    </>
  );
};

export default BasicLayout;
