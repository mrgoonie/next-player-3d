import { useRouter } from "next/router";

import DashkitButton from "components/dashkit/Buttons";
import AdminIcon from "components/dashkit/Icon";

const BackButton = ({ children }) => {
  const router = useRouter();
  const onClick = (e) => {
    router.back();
  };
  return <DashkitButton onClick={onClick}><AdminIcon name="arrow-left"/>Back</DashkitButton>;
};

export default BackButton;
