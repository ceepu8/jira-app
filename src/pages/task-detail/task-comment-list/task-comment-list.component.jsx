import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentAPI } from "../../../../redux/slices/commentSlice";
import { SingleCommentComponent } from "../../single-comment/single-comment.component";

export const TaskCommentListComponent = ({ taskId }) => {
  console.log(taskId);
  const dispatch = useDispatch();
  const { commentList } = useSelector((state) => state.commentSlice);
  useEffect(() => {
    dispatch(getAllCommentAPI(taskId));
  }, []);
  return (
    <div>
      {commentList.map((comment) => {
        return <SingleCommentComponent comment={comment} />;
      })}
    </div>
  );
};
