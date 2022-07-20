import { Card } from "antd";
import React, { useState } from "react";
import { TaskCardComponent } from "../task-card/task-card.component";

import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

export const TrayItemComponent = ({ status, taskList }) => {
  return (
    <Droppable droppableId="droppable" direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
        </div>
      )}
    </Droppable>
  );
};
