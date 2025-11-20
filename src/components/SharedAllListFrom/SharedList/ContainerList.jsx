// File: src/pages/settings/container/ContainerList.jsx

import React, { useMemo, useState } from "react";
import { Layout, Table, Input, Button, Tooltip, Tag, Select } from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import AddContainerModal from "../Modal/AddContainerModal";
// future: import AddContainerModal from "./Modal/AddContainerModal";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const initialData = [
  { id: 1, name: "20GP", status: "ACTIVE" },
  { id: 2, name: "40GP", status: "ACTIVE" },
  { id: 3, name: "40HC", status: "ACTIVE" },
  { id: 4, name: "40OT", status: "ACTIVE" },
  { id: 5, name: "20HC", status: "ACTIVE" },
  { id: 6, name: "20OT", status: "ACTIVE" },
  { id: 7, name: "20FR", status: "ACTIVE" },
  { id: 8, name: "40FR", status: "ACTIVE" },
];

const ContainerList = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [data] = useState(initialData);

  const [modalOpen, setModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "id",
      width: 80,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Name *",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span className="font-medium text-gray-800">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => (
        <Tag color="green" className="px-3 text-[11px]">
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      width: 70,
      align: "center",
      render: () => (
        <Tooltip title="More actions">
          <button className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
            <MenuOutlined className="text-[12px]" />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <Layout className="bg-[#f5f5f5] min-h-screen">
      <Content className="p-3 md:p-4">
        <div className="bg-white border border-gray-200 rounded-md shadow-sm">
         

          {/* 🔹 Filter row */}
          <div className="px-3 md:px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-600">Filter:</span>
              <Search
                placeholder="Type to filter..."
                allowClear
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-56"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-600">Show:</span>
              <Select
                size="small"
                value={pageSize}
                onChange={(val) => setPageSize(val)}
                className="w-20"
              >
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
              </Select>
            </div>
          </div>

          {/* 🔹 Table */}
          <div className="px-2 md:px-3 pb-4">
            <Table
              size="small"
              rowKey="id"
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize,
                showSizeChanger: false,
                className: "mt-3 flex justify-end",
              }}
            />
          </div>
        </div>
      </Content>

      {/* Future: Add Container Modal */}
    
      <AddContainerModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={(values) => {
          console.log("Container submit:", values);
          setModalOpen(false);
        }}
      />
     
    </Layout>
  );
};

export default ContainerList;
