import { Button, Popconfirm, Skeleton, Table } from "antd";
import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

export const memberTaskColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
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

export const MemberTaskModalComponent = () => {
  const { taskDetail } = useSelector((state) => state.taskSlice);
  const { assigness } = taskDetail;

  const renderUserTable = (memberList) => {
    return memberList.map((member) => {
      let content = "";
      content = (
        <Popconfirm
          title="Are you sure to delete this member?"
          //  onConfirm={confirm(member.userId)}
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
    <div style={{ zIndex: "9999" }} class="member-task-table">
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
          dataLength={assigness.length}
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
            dataSource={renderUserTable(assigness)}
            columns={memberTaskColumns}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};
