import React from "react";

import { Avatar, Popconfirm } from "antd";

import "./add-member-avatar.styles.css";
import { UserSearchModalComponent } from "../user-search-modal/user-search-modal.component";

export const AddMemberComponent = ({ projectId }) => {
  const content = (
    <div className="w-[300px]">
      <UserSearchModalComponent projectId={projectId} />
    </div>
  );

  const confirm = () => {};
  return (
    <>
      <Popconfirm
        placement="bottom"
        title={content}
        onConfirm={confirm}
        okText="Add"
        cancelText="Cancel"
      >
        <Avatar
          style={{
            backgroundColor: "#dedede",
            color: "#000",
            verticalAlign: "middle",
            margin: "0 2px",
            cursor: "pointer",
          }}
          size="large"
          gap={1}
        >
          +
        </Avatar>
      </Popconfirm>
    </>
  );
};
