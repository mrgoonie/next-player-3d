import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";

const Section = ({
  children,
  width,
  height,
  background,
  backgroundColor,
  backgroundSize,
  backgroundPosition,
  padding,
  margin,
  border,
  borderTop = false,
  borderBottom = false,
  spaceTop = false,
  spaceBottom = false,
  borderRadius,
  className,
  id,
  style,
}) => {
  return (
    <>
      <style jsx>{`
        .section {
          ${padding ? `padding: ${padding};` : ""}
          ${margin ? `margin: ${margin};` : ""}
          ${width ? `width: ${width};` : ""}
          ${height ? `height: ${height};` : ""}
          ${background ? `background: ${background};` : ""}
          ${backgroundColor ? `background-color: ${backgroundColor};` : ""}
          ${backgroundSize ? `background-size: ${backgroundSize};` : ""}
          ${backgroundPosition ? `background-position: ${backgroundPosition};` : ""}
          ${border ? `border: ${border};` : ""}
          ${borderRadius ? `border-radius: ${borderRadius};` : ""}
          ${borderTop ? `border-top: 1px solid ${DefaultStyles.colors.border};` : ""}
          ${borderBottom ? `border-bottom: 1px solid ${DefaultStyles.colors.border};` : ""}
          ${spaceBottom ? `padding-bottom: 2rem;` : ""}
          ${spaceTop ? `padding-top: 2rem;` : ""}
        }
      `}</style>
      <div id={id} className={`section ${className ? className : ""}`} style={style}>
        {children}
      </div>
    </>
  );
};

export default Section;
