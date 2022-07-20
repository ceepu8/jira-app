import React, { useState } from "react";

import { Avatar, Button, Input, Modal } from "antd";

import { BsSearch } from "react-icons/bs";

import { AddMemberAvatarComponent } from "../../../components/members/add-member-avatar/add-member-avatar.component";
import { CreateTaskForm } from "../../../forms/create-task-form/create-task.form";
import { renderAvatar } from "../../../utils/avatar-render.utils";
import { useSelector } from "react-redux";
import { MemberComponent } from "../../../components/members/members.component";

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
    <div className="search-bar flex justify-between text-center pb-5">
      <div className="flex">
        <div className="flex mr-5">
          <Input style={{ borderRadius: "0px", width: "250px" }} />
          <button
            style={{ borderRadius: "0px 5px 5px 0" }}
            className="bg-blue-400 text-white"
          >
            <BsSearch style={{ padding: "5px", fontSize: "30px" }} />
          </button>
        </div>
        <div className="member-section ">
          <MemberComponent projectDetail={{ id: id, members: members }} />
        </div>
      </div>

      <Button className="bg-blue-500 text-white" onClick={showModal}>
        Create Task
      </Button>
      <Modal
        title="Create Task"
        className="w-[700px]"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <CreateTaskForm />
      </Modal>
    </div>
  );
};
