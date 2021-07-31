
export default function Container({
  children = "",
  gutter = 20,
  fluid = false,
  className,
  ...rest
}) {
  const classNames = ["container", className ];

  const _padding = fluid ? "0" : `${gutter / 2}px`;

  if (fluid) classNames.push(styles["container-fluid"]);

  return (
    <div className={classNames.join(" ")} {...rest}>
      <style jsx>{`
        .container {
          padding-left: ${_padding};
          padding-right: ${_padding};
          width:100%;
          max-width: 1550px;
          margin: 0 auto;
        }

      `}</style>
      {children}
    </div>
  );
}
