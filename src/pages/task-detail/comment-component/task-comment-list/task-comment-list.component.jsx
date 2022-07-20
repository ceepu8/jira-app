import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentAPI } from "../../../../redux/slices/commentSlice";
import { SingleCommentComponent } from "../single-comment/single-comment.component";

export const TaskCommentListComponent = () => {
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => state.taskSlice);
  const { commentList } = useSelector((state) => state.commentSlice);
  console.log(taskDetail);
  // console.log(commentList);
  useEffect(() => {
    dispatch(getAllCommentAPI(taskDetail.taskId));
  }, [taskDetail.taskId]);
  if (!commentList) {
    return;
  }
  console.log("render");
  return (
    <div>
      {commentList.map((comment) => {
        return <SingleCommentComponent comment={comment} />;
      })}
    </div>
  );
};
