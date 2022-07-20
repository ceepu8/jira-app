import React from "react";

import "./member-column.styles.css";

import { Popconfirm } from "antd";

import { MemberModalComponent } from "../member-modal/member-modal.component";
import { renderAvatar } from "../../../utils/avatar-render.utils";

export const MemberColumnComponent = ({ projectDetail }) => {
  const { members } = projectDetail;
  console.log(projectDetail);

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
        className="member-avatar-list cursor-pointer inline-block"
      >
        {members && renderAvatar(members)}
      </Popconfirm>
    </div>
  );
};
