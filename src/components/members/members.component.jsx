import React from "react";
import { AddMemberAvatarComponent } from "./add-member-avatar/add-member-avatar.component";
import { MemberColumnComponent } from "./member-column/member-column.component";

export const MemberComponent = ({ projectDetail }) => {
  return (
    <div className="member">
      <div className="list-member inline-block">
        <MemberColumnComponent projectDetail={projectDetail} />
      </div>

      <div className="add-member inline-block">
        <AddMemberAvatarComponent projectId={projectDetail.id} />
      </div>
    </div>
  );
};
