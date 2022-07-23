import "./member-search-modal.styles.css";

import { useSelector } from "react-redux";

import { Select } from "antd";
const { Option } = Select;

export const MemberSearchModalComponent = () => {
  const { projectDetail } = useSelector((state) => state.projectSlice);
  const { members } = projectDetail;

  const handleAddNewMember = (value) => {
    console.log(value);
  };
  return (
    <>
      <Select
        style={{
          width: "100%",
        }}
        onChange={handleAddNewMember}
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
    </>
  );
};
