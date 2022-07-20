import React, { useEffect, useState } from "react";

import "./tray-list.styles.css";

import { Card, Col, Row } from "antd";

import { getStatus } from "../../../apis/status.management.api";

import { TrayItemComponent } from "../tray-item/tray-item.component";

import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { TaskCardComponent } from "../task-card/task-card.component";

export const TrayListComponent = ({ projectDetail }) => {
  console.log(projectDetail);
  const [status, setStatus] = useState([]);
  const [taskList, setTaskList] = useState([]);

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {};
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
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Card
                ref={provided.innerRef}
                {...provided.droppableProps}
                // title={each.statusName}
                style={{
                  backgroundColor: "#f2f5f7",
                  border: "none",
                  height: "500px",
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
                {/* <TrayItemComponent status={each} taskList={taskList} /> */}
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
