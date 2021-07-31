const SidebarStates = {
  get EXPAND() {
    return "EXPAND";
  },
};

const Sidebar = ({ children, borderColor = "#e3ebf6", state = SidebarStates.EXPAND, width, ...rest }) => {
  let cssWidth = width;
  if (typeof cssWidth != "undefined") {
    cssWidth = typeof width == "string" ? width : `${width}px`;
  }

  return (
    <>
      <style jsx>{`
        .container {
          ${cssWidth ? `width: ${cssWidth};` : ""}
          min-height: 100%;
          background-color: white;
          padding: 0;
          ${`border-right: 1px solid ${borderColor};`}
          transition: all 0.25s;
        }
      `}</style>
      <div className="sidebar container" {...rest}>
        {children}
      </div>
    </>
  );
};

export default Sidebar;
