import React, { useRef, useState } from "react";

import "./user-search-modal.styles.css";

import { AutoComplete, Button } from "antd";

import { useDispatch } from "react-redux";

import { getUser } from "../../../../apis/user.management.apis";
import { addMemberProject } from "../../../../apis/project.management.apis";

import { toast } from "react-toastify";
import {
  fetchProjectDetail,
  fetchProjectList,
} from "../../../../redux/slices/projectSlice";
import { useLocation } from "react-router";

const { Option } = AutoComplete;

export const UserSearchModalComponent = ({ projectId }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [currentUserList, setCurrentUserList] = useState([]);
  const searchRef = useRef(null);

  const fetchSearchMember = async (keyword) => {
    try {
      const data = await getUser(keyword);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUserInput = async (value) => {
    setCurrentUserList([]);

    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    if (value !== "") {
      searchRef.current = setTimeout(async () => {
        const { content } = await fetchSearchMember(value);
        console.log(content);
        setCurrentUserList([...content]);
      }, 300);
    }
  };

  const handleAddMemberProject = async (userId) => {
    try {
      const data = {
        projectId,
        userId,
      };
      const response = await addMemberProject(data);
      if (response.statusCode === 200) {
        toast.success("Add new member successfully!");
        if (location.pathname === "/project") {
          dispatch(fetchProjectList());
        } else {
          dispatch(fetchProjectDetail(projectId));
        }
      }
    } catch (error) {
      const { response } = error;
      if (response.data.statusCode === 403) {
        toast.error(
          "You are unauthorized to handle this action, please contact the project owner"
        );
      }
    }
  };

  return (
    <>
      <AutoComplete
        style={{
          width: "100%",
        }}
        onSearch={handleGetUserInput}
        placeholder="input here"
      >
        {currentUserList.map((user, index) => {
          return (
            <Option key={user.name + index} value={user.name}>
              <div
                style={{ justifyContent: "space-between" }}
                className="flex "
              >
                <span>
                  {user.name} - {user.userId}
                </span>
                <Button
                  type="primary"
                  onClick={() => handleAddMemberProject(user.userId)}
                >
                  Add
                </Button>
              </div>
            </Option>
          );
        })}
      </AutoComplete>
    </>
  );
};
