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

import { useDispatch } from "react-redux";
import { setProjectDetail } from "../../../redux/slices/projectSlice";
import { getDetailProject } from "../../../apis/project.management.apis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const TrayListComponentTest = ({ listTask }) => {
  const dispatch = useDispatch();
  const [toggleTrash, setIsToggleTrash] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);

  const [currentListTask, setCurrentListTask] = useState([]);

  useEffect(() => {
    console.log(123);
    setCurrentListTask(listTask);
  }, [listTask]);

  const fetchProjectDetail = async (id) => {
    try {
      const response = await getDetailProject(id);
      dispatch(setProjectDetail(response.content));
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (destination.droppableId === "deleteTask" && toggleMessage) {
      const sourceColIndex = currentListTask.findIndex(
        (e) => e.statusId === source.droppableId
      );
      const sourceCol = currentListTask[sourceColIndex];
      const sourceSectionId = sourceCol.statusId;
      let sourceTasks = [...sourceCol.lstTaskDeTail];
      console.log(draggableId);
      sourceTasks = sourceTasks.filter(
        (task) => task.taskId !== Number(draggableId)
      );
      let newListTask = [...currentListTask];
      newListTask[sourceColIndex] = {
        ...newListTask[sourceColIndex],
        lstTaskDeTail: [...sourceTasks],
      };

      setCurrentListTask([...newListTask]);
      try {
        const response = await deleteTask(draggableId);
        if (response.statusCode === 200) {
          setToggleMessage(false);
          toast.success("Delete task successfully");
        }
      } catch (error) {
        if (error.statusCode === 403) {
          toast.error(
            "You are unauthorized to handle this action, please contact the project owner!"
          );
        }
      }
    } else {
      if (source.droppableId === destination.droppableId) {
        return;
      }

      const sourceColIndex = currentListTask.findIndex(
        (e) => e.statusId === source.droppableId
      );
      const destinationColIndex = currentListTask.findIndex(
        (e) => e.statusId === destination.droppableId
      );

      const sourceCol = currentListTask[sourceColIndex];
      const destinationCol = currentListTask[destinationColIndex];

      const sourceSectionId = sourceCol.statusId;
      const destinationSectionId = destinationCol.statusId;

      let sourceTasks = [...sourceCol.lstTaskDeTail];
      let destinationTasks = [...destinationCol.lstTaskDeTail];

      if (source.droppableId !== destination.droppableId) {
        const removeTask = sourceTasks.find(
          (task) => task.taskId !== draggableId
        );
        sourceTasks = sourceTasks.filter(
          (task) => task.taskId !== removeTask.taskId
        );
        destinationTasks.splice(destination.index, 0, removeTask);

        let newListTask = [...currentListTask];
        newListTask[sourceColIndex] = {
          ...newListTask[sourceColIndex],
          lstTaskDeTail: [...sourceTasks],
        };
        newListTask[destinationColIndex] = {
          ...newListTask[destinationColIndex],
          lstTaskDeTail: [...destinationTasks],
        };
        setCurrentListTask([...newListTask]);
      }

      const data = {
        taskId: draggableId,
        statusId: Number(destination.droppableId),
      };

      try {
        const { statusCode } = await updateTaskStatus(data);
        if (statusCode === 200) {
          toast.success("Update task status successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsToggleTrash(false);
  };
  console.log("render");
  const renderStatusTrack = () => {
    console.log(currentListTask);
    return currentListTask.map((taskGroup, index) => {
      return (
        <Col
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 6 }}
          key={taskGroup.statusId}
        >
          <h1
            style={{
              backgroundColor: "#165fc7",
              padding: "10px",
              borderRadius: "10px 10px 0 0",
              color: "#ffffff",
            }}
          >
            {taskGroup.statusName}
          </h1>
          <Droppable droppableId={taskGroup.statusId.toString()}>
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: "#f2f5f7",
                  border: "none",
                  minHeight: "550px",
                  paddingBottom: "20px",
                }}
              >
                {taskGroup.lstTaskDeTail.map((task) => {
                  if (task) {
                    return (
                      <Draggable
                        key={task.taskId}
                        draggableId={task.taskId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={task.taskId}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCardComponent task={task} />
                          </div>
                        )}
                      </Draggable>
                    );
                  }
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
