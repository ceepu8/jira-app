import React from "react";
import { AddMemberComponent } from "./add-member/add-member-avatar.component";
import { MemberColumnComponent } from "./member-column/member-column.component";

export const MemberProjectComponent = ({ projectDetail }) => {
  return (
    <div className="member flex">
      <div className="list-member">
        <MemberColumnComponent projectDetail={projectDetail} />
      </div>

      <div className="add-member">
        <AddMemberComponent projectId={projectDetail.id} />
      </div>
    </div>
  );
};
