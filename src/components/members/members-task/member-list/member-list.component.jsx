import React from "react";

import { Avatar, Popconfirm } from "antd";

import { renderAvatar } from "utils/avatar-render.utils";
import { MemberTaskModalComponent } from "../member-modal/member-task-modal.component";
import { useSelector } from "react-redux";

export const MemberListComponent = () => {
  const { taskDetail } = useSelector((state) => state.taskSlice);

  const { assigness } = taskDetail;

  const content = (
    <div className="w-[300px]">
      <MemberTaskModalComponent />
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
        <div>{assigness && renderAvatar(assigness)}</div>
      </Popconfirm>
    </div>
  );
};
