import { Avatar } from "antd";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import { HorizontalList, ListItem, ListItemSize, VerticalList, VerticalListAlign } from "components/diginext/layout/ListLayout";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import asset from "plugins/assets/asset";

const ActivityItem = ({ children, text, desc, subtext, ...rest }) => {
  const descElement = desc ? <p style={{ color: DefaultStyles.colors.secondary }}>{desc}</p> : null;

  const subtextElement = subtext ? <p style={{ color: DefaultStyles.colors.border }}>{subtext}</p> : null;

  return (
    <HorizontalList {...rest}>
      <VerticalList align="center" style={{ marginRight: "10px" }}>
        <Avatar
          src={asset("/admin/images/avatar.png")}
          size={40}
          style={{ backgroundColor: DefaultStyles.colors.border }}
        />
        <ListItem size="stretch" border={`1px solid ${DefaultStyles.colors.border}`}></ListItem>
      </VerticalList>

      <ListItem size="stretch">
        {children}
        {descElement}
        {subtextElement}
        <BlockSplitter height={20} />
      </ListItem>
    </HorizontalList>
  );
};

export default ActivityItem;
