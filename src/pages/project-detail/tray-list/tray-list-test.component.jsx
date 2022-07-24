import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import "./tray-list.styles.css";

import { Card, Col, Row } from "antd";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";

import { CSSTransition } from "react-transition-group";

import { getStatus } from "../../../apis/status.management.api";

import { TrayItemComponent } from "../tray-item/tray-item.component";

import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { TaskCardComponent } from "../task-card/task-card.component";

import { deleteTask, updateTaskStatus } from "apis/task.management.apis";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchProjectDetail,
  setProjectDetail,
} from "../../../redux/slices/projectSlice";
import { getDetailProject } from "../../../apis/project.management.apis";
import { toast } from "react-toastify";

export const TrayListComponentTest = ({ projectDetail }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([]);
  const [toggleTrash, setIsToggleTrash] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await getStatus();
      setStatus(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchProjectDetail = async (id) => {
    try {
      const response = await getDetailProject(id);
      dispatch(setProjectDetail(response.content));
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = async (result) => {
    const {
      destination: { droppableId },
      draggableId,
    } = result;
    if (droppableId === "deleteTask" && toggleMessage) {
      try {
        const response = await deleteTask(draggableId);
        if (response.statusCode === 200) {
          setToggleMessage(false);
          toast.success("Delete task successfully");
          dispatch(fetchProjectDetail(projectDetail.id));
        }
      } catch (error) {
        const {
          response: { data },
        } = error;
        if (data?.statusCode === 403) {
          toast.error(
            "You are unauthorized to handle this action, please contact the project owner!"
          );
        }
      }
    } else {
      const data = {
        taskId: draggableId,
        statusId: Number(droppableId),
      };
      try {
        const { statusCode } = await updateTaskStatus(data);
        if (statusCode === 200) {
          dispatch(fetchProjectDetail(projectDetail.id));
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsToggleTrash(false);
  };
  const renderStatusTrack = () => {
    return status.map((each) => {
      let taskList = [];
      if (projectDetail.lstTask && projectDetail.lstTask.length > 0) {
        projectDetail.lstTask.forEach((task) => {
          if (task.statusName === each.statusName) {
            taskList = [...task.lstTaskDeTail];
          }
        });
      }

      return (
        <Col
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 6 }}
          key={each.statusId}
        >
          <h1
            style={{
              backgroundColor: "#165fc7",
              padding: "10px",
              borderRadius: "10px 10px 0 0",
              color: "#ffffff",
            }}
          >
            {each.statusName}
          </h1>
          <Droppable droppableId={each.statusId}>
            {(provided, snapshot) => (
              <Card
                ref={provided.innerRef}
                {...provided.droppableProps}
                // title={each.statusName}
                style={{
                  backgroundColor: "#f2f5f7",
                  border: "none",
                  minHeight: "550px",
                  paddingBottom: "20px",
                }}
              >
                {taskList.map((task, index) => {
                  return (
                    <Draggable
                      key={task.taskId}
                      draggableId={task.taskId.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCardComponent task={task} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        </Col>
      );
    });
  };

  return (
    <div className="site-card-wrapper">
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={() => setIsToggleTrash(true)}
      >
        <Row gutter={8}>{renderStatusTrack()}</Row>

        <Droppable droppableId="deleteTask">
          {(provided, snapshot) => {
            return (
              <>
                <div
                  className={`${styles.positionTrash}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onMouseOver={() => {
                    setToggleMessage(true);
                  }}
                  onMouseLeave={() => {
                    setToggleMessage(false);
                  }}
                >
                  <CSSTransition
                    in={toggleTrash}
                    unmountOnExit
                    timeout={300}
                    classNames="delete"
                  >
                    <DeleteOutlined className={`${styles.trashIcon}`} />
                  </CSSTransition>
                </div>
                <CSSTransition
                  in={toggleMessage && toggleTrash}
                  classNames="message"
                  unmountOnExit
                  timeout={300}
                >
                  <div className={`${styles.warningMessage}`}>
                    <WarningOutlined className={`${styles.warningIcon}`} />
                    <span className="text-[15px]">Sure to delete?</span>
                  </div>
                </CSSTransition>
              </>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
