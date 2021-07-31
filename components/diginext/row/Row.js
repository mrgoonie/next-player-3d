/**
 * Renders a <Row /> component.
 * @param {Object} props - props
 * @param {string} props.className - external class name
 * @param {number} props.gutter - gutter of row
 * @param {any}    props.children - children of row
 */
export default function Row({
  className = "",
  gutter = 30,
  children = "",
  align = "",
  justify = "",
  ...rest
}) {
  const classNames = "row " + className;

  return (
    <>
      <style jsx>{`
        .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: ${-gutter / 2}px;
          margin-left: ${-gutter / 2}px;
          align-items: ${align};
          justify-content: ${justify};

          &.no-gutters {
            margin-right: 0;
            margin-left: 0;
          }
        }
      `}</style>

      <div className={classNames} {...rest}>
        {children}
      </div>
    </>
  );
}
