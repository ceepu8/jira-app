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

  return (
    <Avatar.Group>
      {dataList.map((each, index) => {
        if (index < 4) {
          return (
            <Avatar
              key={each.userId}
              size="large"
              style={{ backgroundColor: colorList[index] }}
            >
              {formatName(each.name)}
            </Avatar>
          );
        } else if (index === 4) {
          return (
            <Avatar
              key={each.userId}
              size="large"
              style={{ backgroundColor: colorList[index] }}
            >
              +{dataList.length - 4}
            </Avatar>
          );
        } else {
          return;
        }
      })}
    </Avatar.Group>
  );
};
