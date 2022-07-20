import { Avatar } from "antd";
import { formatName } from "./project-management.utils";

export const renderAvatar = (dataList) => {
  const colorList = [
    "#f56a00",
    "#87d068",
    "#1890ff",
    "#f759ab",
    "#7cb305",
    "#40a9ff",
    "#36cfc9",
    "#9254de",
    "#52c41a",
  ];

  return dataList.map((each, index) => {
    return (
      <Avatar
        key={each.userId}
        size="large"
        style={{ backgroundColor: colorList[index], marginRight: "3px" }}
      >
        {formatName(each.name)}
      </Avatar>
    );
  });
};
