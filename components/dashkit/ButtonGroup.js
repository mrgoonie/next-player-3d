import DashkitButton, { ButtonShape, ButtonType } from "components/dashkit/Buttons";
import { Children } from "react";
import Button from "components/diginext/button/Button";
import Dropdown from "./Dropdown";

const ButtonGroup = (props) => {
  const amountChildren = Children.count(props.children);
  const childrenWithProps = Children.map(props.children, (child, index) => {
    if (React.isValidElement(child)) {
      // console.log(child instanceof DashkitButton, child instanceof Button)
      // console.log(child.type.name == "DashkitButton")
      let newProps = { ...child.props };
      // console.log(child.type.name);

      if (child.type == Button) {
        newProps.borderRadius = "0";
      } else if (child.type == DashkitButton || child.type == Dropdown) {
        if (amountChildren > 1) {
          if (index == 0) {
            newProps.shape = ButtonShape.ROUND_RECT_LEFT;
          } else if (index == amountChildren - 1) {
            newProps.shape = ButtonShape.ROUND_RECT_RIGHT;
          } else {
            newProps.shape = ButtonShape.RECT;
          }
        } else {
          newProps.shape = ButtonShape.ROUND_RECT;
        }
        // pass style type from group to children props
        // console.log(newProps.type);
        if (!newProps.type) newProps.type = props.type ?? ButtonType.PRIMARY;
        if (!newProps.size) newProps.size = props.size ?? ButtonType.NORMAL;
      } else {
      }

      return React.cloneElement(child, newProps);
    }
    return child;
  });

  const ele = (
    <>
      <style jsx>{`
        .btn-group {
          display: inline-block;
          ${`border-radius: ${props.borderRadius ?? ".375rem"};`}
        }
      `}</style>
      <div className="btn-group" {...props}>
        {childrenWithProps}
      </div>
    </>
  );

  return ele;
};

export default ButtonGroup;
