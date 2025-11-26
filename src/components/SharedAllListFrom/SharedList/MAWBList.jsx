import React from "react";
import { Table, Tag, Input, Button } from "antd";
import { SearchOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    name: "EY",
    carrier: "ETIHAD AIRWAYS",
    status: "ACTIVE",
  },
];

const MAWBList = () => {
  const columns = [
    {
      title: "S/L No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Name *",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      sorter: (a, b) => a.carrier.localeCompare(b.carrier),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button icon={<MenuOutlined />} type="text" />
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type to filter..."
            prefix={<SearchOutlined />}
            className="w-64"
          />
        </div>
       
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        className="ant-table-striped"
      />
    </div>
  );
};

export default MAWBList;
