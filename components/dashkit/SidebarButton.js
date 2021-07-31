import ButtonBlank from "components/diginext/button/ButtonBlank";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";

const SidebarButton = ({ children, href, className }) => {
  return (
    <ButtonBlank
      href={href}
      padding="8px 0px"
      style={{ display: "block" }}
      fontColor={DefaultStyles.colors.secondary}
      fontColorActive={DefaultStyles.colors.darkest}
      className={`sidebar-btn ${className ? className : ""}`}
    >
      {children}
    </ButtonBlank>
  );
};

export default SidebarButton;
