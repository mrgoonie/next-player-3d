import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";

const Card = ({ children, shadow = false, width, height, className, style }) => {
  let boxShadow = "";
  if (typeof shadow == "boolean") {
    boxShadow = shadow ? "box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03);" : "";
  } else {
    boxShadow = `box-shadow: ${shadow};`;
  }
  // box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03);
  // const { width } = rest;

  return (
    <div
      className={`card ${className ? className : ""}`}
      style={{ border: `${DefaultStyles.colors.border} solid 1px`, ...style }}
    >
      <style jsx>{`
        .card {
          border-radius: 0.5rem;
          background-color: #fff;
          ${width ? `width: ${width};` : null}
          ${boxShadow}
        }
      `}</style>
      {children}
    </div>
  );
};

const CardBody = ({ children }) => {
  return (
    <div className="card-body">
      <style jsx>{`
        .card-body {
          padding: 1.5rem;
        }
      `}</style>
      {children}
    </div>
  );
};

const CardHeader = ({ children, style }) => {
  return (
    <div className="card-header" style={{ borderBottom: `${DefaultStyles.colors.border} solid 1px`, ...style }}>
      <style jsx>{`
        .card-header {
          padding: 1rem 1.5rem;
        }
      `}</style>
      {children}
    </div>
  );
};

const CardFooter = ({ children, padding }) => {
  return (
    <div className="card-footer">
      <style jsx>{`
        .card-footer {
          border-top: #edf2f9 solid 1px;
          padding: ${typeof padding != "undefined" ? padding : "1rem 1.5rem"};
          border-radius: 0 0 0.5rem 0.5rem;
          overflow: hidden;
        }
      `}</style>
      {children}
    </div>
  );
};

export { CardHeader, CardBody, CardFooter };

export default Card;
