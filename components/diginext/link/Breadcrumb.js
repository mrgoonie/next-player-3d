import InlineSplitter from "components/diginext/elements/InlineSplitter";
import AdminIcon from "components/dashkit/Icon";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import Link from "next/link";
import React, { Children } from "react";

const BreadcrumbItem = ({ children, href, ...rest }) => {
  const element = (
    <li className="breadcrumb-item" {...rest}>
      <style jsx global>{`
        .breadcrumb-item {
          ${href ? "cursor: pointer;" : ""}
          display: inline-block;
        }

        .breadcrumb-item:last-child a {
          color: ${DefaultStyles.colors.secondary};
          cursor: default;
        }
      `}</style>
      <a>{children}</a>
    </li>
  );
  return href ? <Link href={href}>{element}</Link> : element;
};

const Breadcrumb = (props) => {
  const amountChildren = Children.count(props.children);
  const childrenWithProps = Children.map(props.children, (child, index) => {
    let newProps = { ...child.props };
    newProps.key = `breadcrumb-item-${index}`;

    if (React.isValidElement(child)) {
      // console.log(child instanceof DashkitButton, child instanceof Button)
      // console.log(child.type.name == "DashkitButton")
      // let newProps = { ...child.props };
      // if (index == amountChildren - 1) newProps.style = { color: `${DefaultStyles.colors.secondary} !important` };
    }

    return React.cloneElement(child, newProps);
  });

  const renderChildren = [];

  childrenWithProps.map((child, index) => {
    renderChildren.push(child);

    if (index < amountChildren - 1) {
      // const sepe = React.cloneElement(<span>{`>`}</span>)
      const sepe = (
        <InlineSplitter width={20} key={`inline-plitter-${index}`}>
          <AdminIcon name="arrow-right" fill={DefaultStyles.colors.secondary} />
        </InlineSplitter>
      );
      renderChildren.push(sepe);
    }
  });

  return (
    <nav className="breadcrumb-container">
      <ol className="breadcrumb">{renderChildren}</ol>
    </nav>
  );
};

export default Breadcrumb;

export { BreadcrumbItem };
