// import style from "./Button.module.scss";
const Badge = ({
  children,
  onClick,
  cursor = false,
  fontSize = "1rem",
  textColor = "black",
  textColorActive = "black",
  bgColor = "white",
  bgColorActive = "gray",
  border = "1px solid transparent",
  borderActive = "1px solid transparent",
  padding = "0.2rem 0.5rem",
  borderRadius = ".375rem",
  ...rest
}) => {
  // console.log(bgColorActive);
  return (
    <>
      <style jsx>{`
        .badge {
          display: inline-block;
          transition: all 0.25s;
          ${cursor ? "cursor: pointer;" : ""}
          ${`padding: ${padding};`}
          ${`font-size: ${fontSize};`}
          ${`color: ${textColor};`}
          ${`background-color: ${bgColor};`}
          ${`border: ${border};`}
          ${`border-radius: ${borderRadius};`}
        }
      `}</style>
      <span className="badge" {...rest}>
        {children}
      </span>
    </>
  );
};

export default Badge;
