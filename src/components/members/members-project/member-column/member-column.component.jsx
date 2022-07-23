import React from "react";

import "./member-column.styles.css";

import { Avatar, Popconfirm } from "antd";

import { renderAvatar } from "utils/avatar-render.utils";
import { MemberModalComponent } from "../member-modal/member-modal.component";

export const MemberColumnComponent = ({ projectDetail }) => {
  const { members } = projectDetail;

  const content = (
    <div className="w-[300px]">
      <MemberModalComponent projectDetail={projectDetail} />
    </div>
  );

  return (
    <div className="member-column">
      <Popconfirm
        placement="bottom"
        title={content}
        okText="Add"
        cancelText="Cancel"
        className="member-avatar-list cursor-pointer"
      >
        <div>{members && renderAvatar(members)}</div>
      </Popconfirm>
    </div>
  );
};
