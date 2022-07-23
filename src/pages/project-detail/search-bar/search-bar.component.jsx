import { useState } from "react";

import styles from "./style.module.css";

import { Avatar, Button, Col, Input, Modal, Row } from "antd";

import { BsSearch } from "react-icons/bs";

import { CreateTaskForm } from "../../../forms/create-task-form/create-task.form";
import { useSelector } from "react-redux";
import { MemberProjectComponent } from "components/members/members-project/members.component";

export const SearchBarComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { projectDetail } = useSelector((state) => state.projectSlice);
  const { members, id } = projectDetail;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="my-[25px]">
      <Row>
        <Col
          sm={{ span: 12 }}
          md={{ span: 8 }}
          xl={{ span: 6 }}
          xxl={{ span: 5 }}
        >
          <div className="flex">
            <Input style={{ borderRadius: "0px", width: "250px" }} />
            <button
              style={{ borderRadius: "0px 5px 5px 0" }}
              className="bg-blue-400 text-white"
            >
              <BsSearch style={{ padding: "5px", fontSize: "30px" }} />
            </button>
          </div>
        </Col>
        <Col
          sm={{ span: 12 }}
          md={{ span: 8 }}
          xl={{ span: 6 }}
          xxl={{ span: 4 }}
        >
          <div className="member-section">
            <MemberProjectComponent
              projectDetail={{ id: id, members: members }}
            />
          </div>
        </Col>
        <Col
          sm={{ span: 12 }}
          md={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 15 }}
        >
          <div className={`${styles.sectionCreateTask}`}>
            <button
              className={`${styles.buttonCreateTask}`}
              onClick={showModal}
            >
              Create Task
            </button>
            <Modal
              title="Create Task"
              className="w-[700px]"
              visible={isModalVisible}
              onCancel={handleCancel}
            >
              <CreateTaskForm />
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
};
