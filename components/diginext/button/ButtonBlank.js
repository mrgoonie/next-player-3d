import Link from "next/link";

export default function ButtonBlank({
  children,
  padding,
  href,
  height = 34,
  style,
  fontSize = "13px",
  fontColor = "#6E84A3",
  fontColorActive = "black",
  onClick,
  ...rest
}) {
  function handleClick(e) {
    if (onClick) onClick(e);
  }

  return (
    <div className="btn btn-dashkit btn-blank" onClick={handleClick} style={style} {...rest}>
      <style jsx>{`
        .btn {
          cursor: pointer;
          display: inline-block;
          line-height: ${fontSize};
          ${padding ? `padding: ${padding};` : ""}
          font-size: ${fontSize};
          color: ${fontColor};

          transition: all 0.25s;

          span {
            display: inline-block;
          }

          &:hover,
          &.active {
            color: ${fontColorActive};
          }
        }
      `}</style>
      {href ? (
        <Link href={href}>
          <span>{children}</span>
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
}
