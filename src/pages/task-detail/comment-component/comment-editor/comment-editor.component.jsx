import { useState } from "react";

import { userLocalService } from "local-services/local-service";
import { getAllCommentAPI } from "redux/slices/commentSlice";
import { insertComment } from "apis/comment.management.apis";

import { Avatar, Button, Col, Row } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";

export const CommentEditorComponent = () => {
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => state.taskSlice);
  const user = userLocalService.getUserInfor();

  const [comment, setComment] = useState({
    taskId: taskDetail.taskId,
    contentComment: "",
  });

  const onChange = (value) => {
    setComment((comment) => ({ ...comment, contentComment: value }));
  };

  const handleCancel = () => {
    setComment((state) => ({ ...state, contentComment: "" }));
  };

  const handleSubmit = async () => {
    try {
      const response = await insertComment(comment);
      if (response.statusCode === 200) {
        dispatch(getAllCommentAPI(taskDetail.taskId));
        setComment((state) => ({ ...state, contentComment: "" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-5">
      <p className="font-semibold">Comments</p>
      <Row>
        <Col span={2}>
          <div className="text-center">
            <Avatar size="large" src={user.avatar} />
          </div>{" "}
        </Col>
        <Col span={22}>
          <Editor
            onEditorChange={onChange}
            value={comment.contentComment}
            init={{
              height: 150,
              menubar: false,
            }}
          />
        </Col>
      </Row>
      {comment.contentComment ? (
        <div className="w-[100%] text-right mt-6">
          <Button className="mr-2" type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
