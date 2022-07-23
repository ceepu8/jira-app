import React from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Popconfirm, Skeleton, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { removeMemberProject } from "../../../../apis/project.management.apis";

import {
  fetchProjectDetail,
  fetchProjectList,
} from "../../../../redux/slices/projectSlice";
import { useLocation } from "react-router";

export const memberColumns = [
  {
    title: "ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

export const MemberModalComponent = ({ projectDetail }) => {
  const { members, id } = projectDetail;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleRemoveMemberProject = async (userId, projectId) => {
    try {
      const data = {
        projectId,
        userId,
      };
      const response = await removeMemberProject(data);
      if (response.statusCode === 200) {
        toast.success("Remove member successfully!");
        if (location.pathname === "/project") {
          dispatch(fetchProjectList());
        } else {
          dispatch(fetchProjectDetail(id));
        }
      }
    } catch (error) {
      const { response } = error;
      if (response.data && response.data.statusCode === 403) {
        toast.error(
          "You are unauthorized to handle this action, please contact the project owner"
        );
      }
    }
  };
  const confirm = (userId) => {
    return (e) => {
      handleRemoveMemberProject(userId, id);
    };
  };

  const renderUserTable = (memberList) => {
    return memberList.map((member) => {
      let content = "";
      content = (
        <Popconfirm
          title="Are you sure to delete this member?"
          onConfirm={confirm(member.userId)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="btn-remove"
            type="danger"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      );

      return { ...member, action: content };
    });
  };

  return (
    <>
      <p>List of members</p>
      <div
        id="scrollableDiv"
        style={{
          height: 200,
          overflow: "auto",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={members.length}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          scrollableTarget="scrollableDiv"
        >
          <Table
            className="w-full"
            dataSource={renderUserTable(members)}
            columns={memberColumns}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};
