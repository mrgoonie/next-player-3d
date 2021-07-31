import Badge from "components/diginext/elements/Badge";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import Color from "plugins/utils/Color";
import { forwardRef } from "react";

const BadgeType = {
  get PRIMARY() {
    return "primary";
  },
  get SECONDARY() {
    return "secondary";
  },
  get SUCCESS() {
    return "success";
  },
  get DANGER() {
    return "danger";
  },
  get WARNING() {
    return "warning";
  },
  get INFO() {
    return "info";
  },
  get LIGHT() {
    return "light";
  },
  get DARK() {
    return "dark";
  },
};

const BadgeSize = {
  get NORMAL() {
    return "normal";
  },
  get SMALL() {
    return "small";
  },
  get LARGE() {
    return "large";
  },
};

const AdminBadge = ({
  children,
  size = BadgeSize.NORMAL,
  type = BadgeType.PRIMARY,
  outline = false,
  round = false,
  onClick,
  ...rest
}) => {
  let padding;
  let fontSize;
  let bgColor;
  let bgColorActive;
  let textColor;
  let textColorActive;
  let borderRadius;
  let border;

  switch (size) {
    case BadgeSize.LARGE:
      padding = ".5rem 1rem";
      fontSize = "1.2rem";
      borderRadius = ".5rem";
      break;
    case BadgeSize.SMALL:
      padding = ".2rem .4rem";
      fontSize = "0.9rem";
      borderRadius = ".25rem";
      break;
  }

  switch (type) {
    case BadgeType.SECONDARY:
      bgColor = DefaultStyles.colors.secondary;
      textColor = textColorActive = "white";
      break;

    case BadgeType.SUCCESS:
      bgColor = DefaultStyles.colors.success;
      textColor = textColorActive = "white";
      break;

    case BadgeType.DANGER:
      bgColor = DefaultStyles.colors.danger;
      textColor = textColorActive = "white";
      break;

    case BadgeType.WARNING:
      bgColor = DefaultStyles.colors.warning;
      textColor = textColorActive = "black";
      break;

    case BadgeType.LIGHT:
      bgColor = DefaultStyles.colors.brightest;
      textColor = textColorActive = "black";
      break;

    case BadgeType.DARK:
      bgColor = DefaultStyles.colors.darkest;
      textColor = textColorActive = "white";
      break;

    case BadgeType.INFO:
      bgColor = DefaultStyles.colors.info;
      textColor = textColorActive = "white";
      break;

    // PRIMARY
    default:
      bgColor = DefaultStyles.colors.primary;
      textColor = textColorActive = "white";
      break;
  }

  bgColorActive = Color.hexDarken(bgColor, 0.4);

  if (outline == true) {
    border = `1px solid ${bgColor}`;
    textColor = bgColor;
    bgColor = "white";
  }

  if(round == true){
    borderRadius = "20rem";
  }

  // console.log(bgColorActive);

  return (
    <Badge
      padding={padding}
      onClick={onClick}
      textColor="white"
      fontSize={fontSize}
      bgColor={bgColor}
      bgColorActive={bgColorActive}
      textColor={textColor}
      textColorActive={textColorActive}
      borderRadius={borderRadius}
      border={border}
      borderActive={border}
      {...rest}
    >
      {children}
    </Badge>
  );
};

export { BadgeType, BadgeSize };

export default AdminBadge;
