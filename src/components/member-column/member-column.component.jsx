import React from "react";

import { Popconfirm } from "antd";

import { AddMemberAvatarComponent } from "../members/add-member-avatar/add-member-avatar.component";
import { MemberModalComponent } from "../members/member-modal/member-modal.component";
import { renderAvatar } from "../../utils/avatar-render.utils";

export const MemberColumnComponent = ({ projectDetail }) => {
  const { members, projectId } = projectDetail;

  const content = (
    <div className="w-[300px]">
      <MemberModalComponent memberList={members} projectId={projectId} />
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
        {renderAvatar(members)}
      </Popconfirm>
      <div className="add-member-button inline-block">
        <AddMemberAvatarComponent projectId={projectId} />
      </div>
    </div>
  );
};
