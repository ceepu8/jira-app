import React, { useState } from "react";

import "./create-task-form.styles.css";

import { Form, Select, Tag, Input, Col, Row, Slider, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import {
  AiFillCheckSquare,
  AiFillWarning,
  AiOutlineArrowUp,
} from "react-icons/ai";

import { priorityList } from "./priority.settings";
import { createTask } from "../../apis/task.management.apis";

import useNoti from "../../customHooks/useNoti";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectDetail } from "../../redux/slices/projectSlice";

const { Option } = Select;

export const CreateTaskForm = () => {
  const dispatch = useDispatch();

  const { projectDetail } = useSelector((state) => state.projectSlice);
  const { members, id } = projectDetail;
  const [task, setTask] = useState({
    listUserAsign: [],
    taskName: "string",
    description: "string",
    statusId: 1,
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: id,
    typeId: 1,
    priorityId: 1,
  });

  const handleDeselect = (value, event) => {
    let newUserList = [];
    let foundUser = task.listUserAsign.find((user) => user.userId === value);
    if (foundUser) {
      newUserList = task.listUserAsign.filter((user) => user.userId !== value);
    }
    setTask((task) => ({
      ...task,
      listUserAsign: [...newUserList],
    }));
  };

  const tagRender = (props) => {
    console.log(props);
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const { checkDataStatus } = useNoti("Create Task");

  const handleSubmit = async () => {
    try {
      const data = await createTask(task);
      checkDataStatus(data);
      dispatch(fetchProjectDetail(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Task Name" className="font-semibold">
        <Input
          className="w-[100%]"
          onChange={(event) => {
            setTask((task) => ({ ...task, taskName: event.target.value }));
          }}
          name="taskName"
        />
      </Form.Item>

      <Form.Item label="Task Type" className="font-semibold">
        <Select
          defaultValue={task.typeId}
          className="w-full"
          key="typeId"
          onSelect={(value, event) => {
            setTask((task) => ({
              ...task,
              taskType: event.key,
              typeId: value,
            }));
          }}
        >
          <Option value={1} key="bug" name="typeId">
            <AiFillWarning
              style={{ fontSize: "20px", marginRight: "5px", color: "#f5222d" }}
            />
            <span>Bug</span>
          </Option>
          <Option value={2} key="new task" name="typeId">
            <AiFillCheckSquare
              style={{ fontSize: "20px", marginRight: "5px", color: "#40a9ff" }}
            />
            New Task
          </Option>
        </Select>
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item label="Status" className="font-semibold pr-1">
            <Select
              defaultValue={task.statusId}
              onChange={(value) => {
                setTask((task) => ({ ...task, statusId: value }));
              }}
            >
              <Option value={1} name="statusId">
                Backlog
              </Option>
              <Option value={2} name="statusId">
                Selected for Development
              </Option>
              <Option value={3} name="statusId">
                In Progress
              </Option>
              <Option value={4} name="statusId">
                Done
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Priority" className="font-semibold pl-1">
            <Select
              defaultValue={task.priorityId}
              className="w-full"
              onSelect={(value) => {
                setTask((task) => ({ ...task, priorityId: value }));
              }}
            >
              {priorityList.map(({ icon, color, type, value }) => {
                return (
                  <Option key={type} value={value} name="priorityId">
                    <AiOutlineArrowUp
                      icon={icon}
                      style={{
                        fontSize: "20px",
                        marginRight: "5px",
                        color: color,
                      }}
                    />
                    {type}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={6}>
        <Col span={12}>
          <Form.Item label="Original Estimate" className="font-semibold">
            <Input
              type="number"
              onChange={(event) => {
                let value = Number(event.target.value);
                setTask((task) => ({
                  ...task,
                  originalEstimate: value,
                  timeTrackingSpent: value,
                  timeTrackingRemaining: 0,
                }));
              }}
              name="originalEstimate"
            />
          </Form.Item>
          <Form.Item label="Assignees" className="font-semibold">
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender(task.listUserAsign)}
              style={{ width: "100%" }}
              onSelect={(value, event) => {
                setTask((task) => ({
                  ...task,
                  listUserAsign: [...task.listUserAsign, event.member.userId],
                }));
              }}
              onDeselect={handleDeselect}
            >
              {members &&
                members.map((member) => {
                  return (
                    <Option
                      key={member.userId + member.name}
                      value={member.userId}
                      member={member}
                      name="listUserAsign"
                    >
                      {member.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Time Tracking" className="font-semibold">
            <Slider
              value={task.timeTrackingSpent}
              onChange={(value) => {
                setTask((task) => ({
                  ...task,
                  timeTrackingSpent: Number(value),
                  timeTrackingRemaining: task.originalEstimate - Number(value),
                }));
              }}
              max={task.originalEstimate}
              key="timeTrackingSpent"
            />
          </Form.Item>
          <Row gutter={6}>
            <Col span={12}>
              <Form.Item label="Time spent" className="font-normal">
                <Input
                  onChange={(event) => {
                    const { value } = event.target;
                    setTask((task) => ({
                      ...task,
                      timeTrackingSpent: Number(value),
                      timeTrackingRemaining:
                        task.originalEstimate - Number(value),
                    }));
                  }}
                  name="timeTrackingSpent"
                  type="number"
                  min={0}
                  value={task.timeTrackingSpent}
                  disabled={!task.originalEstimate ? true : false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Time remaining"
                className="font-normal text-right"
              >
                <Input
                  onChange={(event) => {
                    const { value } = event.target;
                    setTask((task) => ({
                      ...task,
                      timeTrackingRemaining: Number(value),
                      timeTrackingSpent: task.originalEstimate - Number(value),
                    }));
                  }}
                  name="timeTrackingRemaining"
                  type="number"
                  min={0}
                  value={task.timeTrackingRemaining}
                  disabled={!task.originalEstimate ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Form.Item label="Description" className="font-semibold">
        <Editor
          onEditorChange={(value) => {
            setTask((task) => ({
              ...task,
              description: value,
            }));
          }}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
