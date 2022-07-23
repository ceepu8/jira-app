import { Avatar, Card, Modal } from "antd";
import React, { useState } from "react";

import styles from "./style.module.css";

import { AiFillCheckSquare, AiFillWarning } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { renderPriority } from "../../../forms/create-task-form/priority.settings";
import { setTaskDetail } from "../../../redux/slices/taskSlice";
import { renderAvatar } from "../../../utils/avatar-render.utils";

import { TaskDetailPage } from "../../task-detail/task-detail.page";

export const TaskCardComponent = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenDetailTaskModal = () => {
    setIsModalVisible(true);
    dispatch(setTaskDetail(task));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    // <Draggable>
    <>
      <Card
        style={{
          padding: "8px",
          margin: "5px 0 0 0",
          filter: "drop-shadow(0px 1px 2px #999393)",

          // cursor: "pointer",
        }}
        onClick={handleOpenDetailTaskModal}
      >
        <p className={`font-medium ${styles.overflowText}`} style={{}}>
          {task.taskName}
        </p>
        <div
          style={{ justifyContent: "space-between" }}
          className="icons note flex items-center"
        >
          <div className="flex">
            {task.taskTypeDetail.id === 1 ? (
              <AiFillWarning
                key={task.taskTypeDetail.id}
                className="text-[25px] text-red-500 mr-[5px]"
              />
            ) : (
              <AiFillCheckSquare
                key={task.taskTypeDetail.id}
                className="text-[25px] text-blue-400 mr-[5px]"
              />
            )}

            {renderPriority(task.priorityTask.priority)}
          </div>

          <div className="inline">
            {/* {renderAvatar(task.assigness)} */}
            {task.assigness.map((assignee, index) => {
              if (index < 2) {
                return (
                  <img
                    style={{
                      width: "35px",
                      borderRadius: "50%",
                      display: "inline",
                      marginRight: "5px",
                    }}
                    className=""
                    src={assignee.avatar}
                    alt=""
                  />
                );
              } else if (index === 2) {
                return (
                  <Avatar style={{ backgroundColor: "#f56a00" }}>
                    +{task.assigness.length - 2}
                  </Avatar>
                );
              } else {
                return;
              }
            })}
          </div>
        </div>
      </Card>
      <Modal
        title={task.taskId}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="w-[1000px]"
      >
        <TaskDetailPage />
      </Modal>
    </>
    // </Draggable>
  );
};
