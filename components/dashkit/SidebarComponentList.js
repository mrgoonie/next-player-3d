import Sidebar from "components/diginext/containers/Sidebar";
import AppLink from "components/diginext/link/AppLink";
import AdminLogo from "./Logo";
import AdminIcon from "./Icon";
import { useRouter } from "next/router";
import { Menu } from "antd";
const { SubMenu } = Menu;

const ComponentListSidebar = ({ children, width, onChange }) => {
  const router = useRouter();

  const changeHandler = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log("key", key);
    if (onChange) onChange(key);
  };

  return (
    <Sidebar width={width}>
      <AdminLogo maxWidth="60%" style={{ paddingTop: "1.2rem", paddingBottom: "1.2rem" }} />

      <Menu
        // style={{ width: width }}
        defaultSelectedKeys={[router.pathname]}
        defaultOpenKeys={["menu-components"]}
        mode="inline"
        onSelect={changeHandler}
      >
        <SubMenu
          key="menu-pages"
          title={
            <span>
              <AdminIcon name="dashboard" size={20} />
              <span>Pages</span>
            </span>
          }
        >
          <Menu.Item key="/dashkit/pages/list">
            <AppLink href="/dashkit/pages/list">List (table)</AppLink>
          </Menu.Item>
          <Menu.Item key="/dashkit/pages/edit">
            <AppLink href="/dashkit/pages/edit">Edit</AppLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="menu-components"
          title={
            <span>
              <AdminIcon name="book-open" size={20} />
              <span>Components</span>
            </span>
          }
        >
          <Menu.Item key="alerts">
            <AppLink href="/dashkit#alerts">Alerts</AppLink>
          </Menu.Item>
          <Menu.Item key="avatars">
            <AppLink href="/dashkit#avatars">Avatars</AppLink>
          </Menu.Item>
          <Menu.Item key="badges">
            <AppLink href="/dashkit#badges">Badges</AppLink>
          </Menu.Item>
          <Menu.Item key="breadcrumbs">
            <AppLink href="/dashkit#breadcrumbs">Breadcrumbs</AppLink>
          </Menu.Item>
          <Menu.Item key="buttons">
            <AppLink href="/dashkit#buttons">Buttons</AppLink>
          </Menu.Item>
          <Menu.Item key="button-group">
            <AppLink href="/dashkit#button-group">Button group</AppLink>
          </Menu.Item>
          <Menu.Item key="cards">
            <AppLink href="/dashkit#cards">Cards</AppLink>
          </Menu.Item>
          <Menu.Item key="checklist">
            <AppLink href="/dashkit#checklist">Checklist</AppLink>
          </Menu.Item>
          <Menu.Item key="dropdowns">
            <AppLink href="/dashkit#dropdowns">Dropdowns</AppLink>
          </Menu.Item>
          <Menu.Item key="forms">
            <AppLink href="/dashkit#forms">Forms</AppLink>
          </Menu.Item>
          <Menu.Item key="text-editors">
            <AppLink href="/dashkit#text-editors">Text Editors</AppLink>
          </Menu.Item>
          <Menu.Item key="lists">
            <AppLink href="/dashkit#lists">Lists</AppLink>
          </Menu.Item>
          <Menu.Item key="modals">
            <AppLink href="/dashkit#modals">Modals</AppLink>
          </Menu.Item>
          <Menu.Item key="navs">
            <AppLink href="/dashkit#navs">Navs</AppLink>
          </Menu.Item>
          <Menu.Item key="notifications">
            <AppLink href="/dashkit#notifications">Notifications</AppLink>
          </Menu.Item>
          <Menu.Item key="page-headers">
            <AppLink href="/dashkit#page-headers">Page headers</AppLink>
          </Menu.Item>
          <Menu.Item key="paginations">
            <AppLink href="/dashkit#paginations">Pagination</AppLink>
          </Menu.Item>
          <Menu.Item key="popovers">
            <AppLink href="/dashkit#popovers">Popovers</AppLink>
          </Menu.Item>
          <Menu.Item key="progress">
            <AppLink href="/dashkit#progress">Progress</AppLink>
          </Menu.Item>
          <Menu.Item key="spinners">
            <AppLink href="/dashkit#spinners">Spinners</AppLink>
          </Menu.Item>
          <Menu.Item key="tables">
            <AppLink href="/dashkit#tables">Tables</AppLink>
          </Menu.Item>

          <Menu.Item key="tooltips">
            <AppLink href="/dashkit#tooltips">Tooltips</AppLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default ComponentListSidebar;
