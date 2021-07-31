const LeftSideBarLayout = ({
  children,
  background,
  padding,
  margin,
  border,
  borderRadius,
  style,
}) => {
  return (
    <>
      <style jsx>{`
        .layout-left-sidebar {
          ${padding ? `padding: ${padding};` : ""}
          ${margin ? `margin: ${margin};` : ""}
          ${background
            ? `background: ${background};`
            : ""}
          ${border
            ? `border: ${border};`
            : ""}
          ${borderRadius
            ? `border-radius: ${borderRadius};`
            : ""}
        }
      `}</style>
      <div className="layout-left-sidebar" style={style}>
        {children}
      </div>
    </>
  );
};

export default LeftSideBarLayout;
