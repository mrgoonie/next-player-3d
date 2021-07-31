import { HorizontalList, HorizontalListAlign, ListItem, ListItemSize } from "components/diginext/layout/ListLayout";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import PropTypes from "prop-types";

/**
 *
 */
const PageHeader = ({
  children,
  title,
  pretitle,
  type = "description",
  size = 1,
  separator = false,
  spaceBottom = true,
  button,
  ...rest
}) => {
  let marginBottom = "";
  if (typeof spaceBottom == "boolean") {
    marginBottom = spaceBottom ? "margin-bottom: 2rem;" : "";
  } else {
    marginBottom = isNaN(spaceBottom) ? `margin-bottom: ${spaceBottom};` : `margin-bottom: ${spaceBottom}px;`;
  }

  return (
    <div className="section-header" {...rest}>
      <style jsx>{`
        .section-header {
          padding-top: 1.2rem;
          padding-bottom: 1.2rem;
          ${separator ? "border-bottom: 1px solid #E3EBF6;" : ""}
          ${marginBottom}
        }
        .pre-title {
          color: ${DefaultStyles.colors.secondary};
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.725rem;
          font-weight: 500;
          margin: 0.25rem 0;
        }
        .desc {
          font-size: ${1.2 - 0.1 * size}rem;
          color: #95aac9;
          margin-top: 0.35rem;
        }
      `}</style>
      <HorizontalList align="middle">
        <ListItem size="stretch">
          {pretitle ? <h5 className="pre-title">{pretitle}</h5> : null}
          {size == 1 ? <h1>{title}</h1> : null}
          {size == 2 ? <h2>{title}</h2> : null}
          {size == 3 ? <h3>{title}</h3> : null}
          {children && <div className="desc">{children}</div>}
        </ListItem>

        {button}
      </HorizontalList>
    </div>
  );
};

PageHeader.propTypes = {
  /**
   * Page header's title
   */
  title: PropTypes.string,
  type: PropTypes.oneOf(["description", "pretitle"]),
  size: PropTypes.oneOf([1, 2, 3]),
  separator: PropTypes.bool,
  spaceBottom: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default PageHeader;
