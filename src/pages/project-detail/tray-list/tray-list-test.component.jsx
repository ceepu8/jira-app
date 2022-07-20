import React, { useEffect, useState } from "react";

import "./tray-list.styles.css";

import { Card, Col, Row } from "antd";

import { getStatus } from "../../../apis/status.management.api";

import { TrayItemComponent } from "../tray-item/tray-item.component";

import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { TaskCardComponent } from "../task-card/task-card.component";
import { updateTaskStatus } from "../../../apis/task.management.apis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchProjectDetail,
  setProjectDetail,
} from "../../../redux/slices/projectSlice";
import { getDetailProject } from "../../../apis/project.management.apis";

export const TrayListComponentTest = ({ projectDetail }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([]);

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

    const data = {
      taskId: draggableId,
      statusId: Number(droppableId),
    };
    try {
      const { statusCode } = await updateTaskStatus(data);
      if (statusCode === 200) {
        console.log(projectDetail);
        dispatch(fetchProjectDetail(projectDetail.id));
      }
    } catch (error) {
      console.log(error);
    }
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
        <Col span={6} key={each.statusId}>
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
                  minHeight: "500px",
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
      <Row gutter={8}>
        <DragDropContext onDragEnd={onDragEnd}>
          {renderStatusTrack()}
        </DragDropContext>
      </Row>
    </div>
  );
};
