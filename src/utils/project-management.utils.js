import { MemberProjectComponent } from "components/members/members-project/members.component";
import { NavLink } from "react-router-dom";
import { MemberComponent } from "../components/members/members-project/members.component";

let data = {
  id: 0,
  members: [],
};
export const projectThreadColumn = [
  {
    title: "Project ID",
    dataIndex: "id",
    key: "id",
    render: (text) => {
      data = { ...data, id: text };
      return <span>{text}</span>;
    },
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
    render: (text) => (
      <NavLink to={`/project/project-detail/${data.id}`}>{text}</NavLink>
    ),
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
    render: (creator) => {
      return <span>{creator.name}</span>;
    },
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
    render: (members) => {
      data = { ...data, members: [...members] };
      return <MemberProjectComponent projectDetail={data} />;
    },
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
  },
];

export const formatName = (name) => {
  let formattedName = "";
  for (var i = 0; i < name.length; i++) {
    if (i === 0) {
      formattedName += name[i].toUpperCase();
    }
    if (
      name[i] === " " &&
      name[i + 1] !== undefined &&
      name[i + 1].match(/[a-z]/i)
    ) {
      formattedName += name[i + 1].toUpperCase();
    }
  }
  return formattedName;
};
