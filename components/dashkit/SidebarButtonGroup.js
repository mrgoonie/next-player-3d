import ButtonExpandableGroup from "components/diginext/button/ButtonExpandableGroup";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";

const SidebarButtonGroup = ({ children, label, icon, show = true, href }) => {
  return (
    <ButtonExpandableGroup
      fontSize="15px"
      label={label}
      icon={icon}
      show={show}
      href={href}
      color={DefaultStyles.colors.info}
      colorActive={DefaultStyles.colors.darkest}
    >
      {children}
    </ButtonExpandableGroup>
  );
};

export default SidebarButtonGroup;
