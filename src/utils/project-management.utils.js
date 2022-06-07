import { Avatar } from "antd";

export const projectThreadColumn = [
  {
    title: "Project ID",
    dataIndex: "categoryId",
    key: "categoryId",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
    render: (members) => {
      if (members && members.length > 0) {
        return members.map((member) => {
          return (
            <Avatar
              style={{
                backgroundColor: "#7265e6",
                verticalAlign: "middle",
                margin: "2px",
              }}
              size="large"
              gap={1}
            >
              {formatName(member.name)}
            </Avatar>
          );
        });
      }
      return "";
    },
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
  },
];

const formatName = (name) => {
  let formattedName = "";
  for (var i = 0; i < name.length; i++) {
    if (i === 0) {
      formattedName += name[i].toUpperCase();
    }
    if (name[i] === " " && name[i + 1].match(/[a-z]/i)) {
      formattedName += name[i + 1].toUpperCase();
    }
  }
  return formattedName;
};
