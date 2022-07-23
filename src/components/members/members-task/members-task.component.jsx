import React from "react";
import { AddMemberTaskComponent } from "./add-member/add-member-task.component";
import { MemberListComponent } from "./member-list/member-list.component";

export const MemberTaskComponent = () => {
  return (
    <div className="d-flex">
      <div>
        <MemberListComponent />
      </div>
      <div>
        <AddMemberTaskComponent />
      </div>
    </div>
  );
};
