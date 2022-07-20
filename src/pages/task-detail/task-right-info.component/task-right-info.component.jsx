import React from "react";

import { Select, Input, Slider } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

import { renderPriority } from "../../../forms/create-task-form/priority.settings";
import { renderAvatar } from "../../../utils/avatar-render.utils";
import { useSelector } from "react-redux";

const { Option } = Select;

export const TaskRightInfoComponent = () => {
  const { taskDetail } = useSelector((state) => state.taskSlice);
  return (
    <div className="task-right-info">
      <div className="status">
        <p className="font-semibold text-xs text-gray-500">STATUS</p>
        <Select className="text-sm" defaultValue="BACKLOG">
          <Option value="BACKLOG"></Option>
          <Option value="SELECTED FOR DEVELOPMENT"></Option>
          <Option value="DONE"></Option>
        </Select>
      </div>
      <div className="assignees mt-3">
        <p className="font-semibold text-xs text-gray-500">ASSIGNEES</p>
        {renderAvatar(taskDetail.assigness)}
      </div>
      <div className="priority mt-3">
        <p className="font-semibold text-xs text-gray-500">PRIORITY</p>
        {renderPriority(taskDetail.priorityTask.priority)}
      </div>
      <div className="original-estimate mt-3">
        <p className="font-semibold text-xs text-gray-500">
          ORIGINAL ESTIMATE (HOURS)
        </p>
        <Input value={taskDetail.originalEstimate} />
      </div>
      <div className="time-tracking mt-3">
        <span className="font-semibold text-xs text-gray-500">
          TIME TRACKING
        </span>
        <div className="flex items-center justify-around">
          <ClockCircleOutlined className="f-[20px]" />
          <div className="w-[90%]">
            <Slider
              defaultValue={taskDetail.timeTrackingSpent}
              max={taskDetail.originalEstimate}
              key="timeTrackingSpent"
            />
            <div
              className="flex justify-between text-xs font-semibold"
              style={{ transform: "translateY(-12px)", padding: "0 5px" }}
            >
              <span>{taskDetail.timeTrackingSpent}h Logged</span>
              <span>{taskDetail.originalEstimate}h Estimated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
