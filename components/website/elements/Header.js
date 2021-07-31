import { Image } from "antd";
import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
import DashkitIcon from "components/dashkit/Icon";
import { LS } from "components/diginext/elements/Splitters";
import { HorizontalList, HorizontalListAlign, ListItem, ListItemSize } from "components/diginext/layout/ListLayout";
import Router from "next/router";
import asset from "plugins/assets/asset";

export default function Header({ children, hideButtons = false }) {
  const btns = (
    <>
      <DashkitButton href="/" type={ButtonType.SUCCESS}>
        <DashkitIcon name="home" size={12} />
      </DashkitButton>
      <LS size={10} />
      <DashkitButton onClick={() => Router.back()}>
        <DashkitIcon name="arrow-left" size={9} />
      </DashkitButton>
      <LS size={10} />
    </>
  );
  return (
    <HorizontalList align="middle">
      {!hideButtons && btns}
      <ListItem size="stretch">
        <h1>{children}</h1>
      </ListItem>
      <Image src={asset("/images/header_logo.png")} width={180} />
    </HorizontalList>
  );
}
