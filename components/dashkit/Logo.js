import asset from "plugins/assets/asset";

const AdminLogo = ({ children, width, height, maxWidth, maxHeight, ...rest }) => {
  return (
    <div className="logo" {...rest}>
      <style jsx>{`
        .logo {
          text-align: center;
        }
        .logo img {
          display: inline-block;
          width: ${width ? `${width}px` : "auto"};
          height: ${height ? `${height}px` : "auto"};
          ${maxWidth ? `max-width: ${maxWidth};` : ""}
          ${maxHeight ? `max-height: ${maxHeight};` : ""}
        }
      `}</style>
      <img src={asset("/images/gotest-logo.svg")} />
    </div>
  );
};

export default AdminLogo;
