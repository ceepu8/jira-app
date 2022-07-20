import React, { useState } from "react";
import "./single-comment.styles.css";

import { userLocalService } from "local-services/local-service";
import { getAllCommentAPI } from "redux/slices/commentSlice";
import { deleteComment, updateComment } from "apis/comment.management.apis";

import { Avatar, Row, Col, Button, Modal, Tag } from "antd";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import ReactHtmlParser from "react-html-parser";

export const SingleCommentComponent = ({ comment }) => {
  const { taskDetail } = useSelector((state) => state.taskSlice);
  const { taskId } = taskDetail;
  const [visible, setVisible] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const [contentComment, setContentComment] = useState(comment.contentComment);
  const dispatch = useDispatch();

  const user = userLocalService.getUserInfor();

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteComment(comment.id);
      if (response.statusCode === 200) {
        toast.success("Delete comment successfully");
        dispatch(getAllCommentAPI(taskId));
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = async () => {
    try {
      const data = await updateComment({
        commentId: comment.id,
        contentComment: contentComment,
      });
      if (data.statusCode === 200) {
        dispatch(getAllCommentAPI(taskId));
        setIsEditComment(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = () => {
    setIsEditComment(true);
  };

  return (
    <Row className="mb-5">
      <Col span={2}>
        <Avatar src={comment.user.avatar} size="large" />
      </Col>
      <Col span={22}>
        <span className="text-blue-900 font-semibold mr-2">
          {comment.user.name}
        </span>
        {user.id === comment.userId ? (
          <>
            {" "}
            <Tag color="green">My comment</Tag>
          </>
        ) : (
          ""
        )}
        <br />
        {isEditComment ? (
          <>
            <Editor
              value={contentComment}
              onEditorChange={(value) => setContentComment(value)}
              init={{
                height: 150,
                menubar: false,
              }}
            />
            <Button
              type="primary"
              className="mt-3 handle-action-text"
              style={{ cursor: "pointer" }}
              onClick={editComment}
            >
              Update
            </Button>
            <Button
              type="primary"
              className="ml-3 handle-action-text"
              style={{ cursor: "pointer" }}
              onClick={() => setIsEditComment(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <span className="text-gray-900">
              {ReactHtmlParser(comment.contentComment)}
            </span>
            <div className="flex">
              {user.id === comment.userId ? (
                <>
                  <button
                    className="text-gray-600 mr-3 handle-action-text"
                    style={{ cursor: "pointer" }}
                    onClick={handleEditComment}
                  >
                    Edit
                  </button>
                  <button
                    className="text-gray-600 handle-action-text"
                    style={{ cursor: "pointer" }}
                    onClick={showModal}
                  >
                    Delete
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}

        <Modal
          visible={visible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="Delete comment"
        >
          <p className="text-xl font-semibold">
            Are you sure to delete this comment?
          </p>
          <p>Once you delete, it's gone for good.</p>
        </Modal>
      </Col>
    </Row>
  );
};
