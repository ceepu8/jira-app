import { Avatar, Popconfirm, Select } from "antd";

import "./add-member-task.styles.css";

import { useSelector } from "react-redux";
import { useState } from "react";
import { assignUserTask } from "apis/task.management.apis";
import { fetchTaskDetail } from "redux/slices/taskSlice";
import { useDispatch } from "react-redux";

const { Option } = Select;

export const AddMemberTaskComponent = () => {
  const { projectDetail } = useSelector((state) => state.projectSlice);
  const { taskDetail } = useSelector((state) => state.taskSlice);
  const { members } = projectDetail;

  const dispatch = useDispatch();

  const [newMemberAdded, setNewMemberAdded] = useState(null);

  const confirm = async () => {
    const data = {
      taskId: taskDetail.taskId,
      userId: newMemberAdded,
    };
    try {
      const response = await assignUserTask(data);
      // if (response.statusCode === 200) {
      //   dispatch(fetchTaskDetail(taskDetail.taskId));
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const content = (
    <div className="w-[300px]">
      <Select
        style={{
          width: "100%",
        }}
        onChange={(value) => setNewMemberAdded(value)}
        placeholder="Select member"
      >
        {members.map((user, index) => {
          return (
            <Option key={user.name + index} value={user.userId}>
              <div
                style={{ justifyContent: "space-between" }}
                className="flex "
              >
                <span>
                  {user.name} - {user.userId}
                </span>
              </div>
            </Option>
          );
        })}
      </Select>
    </div>
  );

  return (
    <>
      <Popconfirm
        placement="bottom"
        title={content}
        onConfirm={confirm}
        okText="Add"
        cancelText="Cancel"
      >
        <Avatar
          style={{
            backgroundColor: "#dedede",
            color: "#000",
            verticalAlign: "middle",
            margin: "0 2px",
            cursor: "pointer",
          }}
          size="large"
          gap={1}
        >
          +
        </Avatar>
      </Popconfirm>
    </>
  );
};
