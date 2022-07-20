import React from "react";
import { CommentEditorComponent } from "./comment-editor/comment-editor.component";
import { TaskCommentListComponent } from "./task-comment-list/task-comment-list.component";

export const CommentComponent = () => {
  return (
    <div className="comment">
      <CommentEditorComponent />
      <TaskCommentListComponent />
    </div>
  );
};
