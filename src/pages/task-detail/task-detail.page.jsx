import { Col, Row } from "antd";
import React from "react";
import { CommentComponent } from "./comment-component/comment.component";
import { TaskLeftInforComponent } from "./task-left-infor/task-left-infor.component";
import { TaskRightInfoComponent } from "./task-right-info.component/task-right-info.component";

export const TaskDetailPage = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col md={{ span: 16 }} span={15}>
          <TaskLeftInforComponent />
          <CommentComponent />
        </Col>
        <Col md={{ span: 8 }} span={9}>
          <TaskRightInfoComponent />
        </Col>
      </Row>
    </div>
  );
};
