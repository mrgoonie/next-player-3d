import PropTypes from "prop-types";

/**
 * @param  {object} props
 * @param  {Array} props.children
 * @param  {string} [props.type]=("scroll"|"clip")
 */
const ExpandContainer = ({ children, type = "scroll", ...rest }) => {
  return (
    <>
      <style jsx>{`
        .expand-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: ${type == "scroll" ? "scroll" : "hidden"};
        }
      `}</style>
      <div className="expand-container" {...rest}>
        {children}
      </div>
    </>
  );
};

export default ExpandContainer;
