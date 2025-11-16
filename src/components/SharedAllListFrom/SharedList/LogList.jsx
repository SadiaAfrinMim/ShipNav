// src/pages/log/LogList.jsx
import React, { useMemo, useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Dropdown,
  Menu,
} from "antd";
import {
  MenuOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const LogList = () => {
  // ---- Demo data (ইচ্ছা করলে API থেকে আনবে) ----
  const [logs] = useState([
    // {
    //   id: 1,
    //   description: "User login",
    //   ipAddress: "192.168.0.12",
    //   link: "/dashboard",
    //   device: "Chrome / Windows",
    // },
  ]);

  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---- Filter logic ----
  const filteredData = useMemo(() => {
    if (!searchText) return logs;
    const text = searchText.toLowerCase();
    return logs.filter(
      (item) =>
        item.description?.toLowerCase().includes(text) ||
        item.ipAddress?.toLowerCase().includes(text) ||
        item.link?.toLowerCase().includes(text) ||
        item.device?.toLowerCase().includes(text)
    );
  }, [logs, searchText]);

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleMenuClick = (action, record) => {
    if (action === "details") {
      console.log("Details:", record);
    } else if (action === "delete") {
      console.log("Delete:", record);
    }
  };

  // ---- Table columns ----
  const columns = [
    {
      title: "S/L No.",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) =>
        (a.description || "").localeCompare(b.description || ""),
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
      sorter: (a, b) =>
        (a.ipAddress || "").localeCompare(b.ipAddress || ""),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      sorter: (a, b) => (a.link || "").localeCompare(b.link || ""),
      render: (text) =>
        text ? (
          <span className="text-blue-500 hover:underline cursor-pointer">
            {text}
          </span>
        ) : (
          "-"
        ),
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      sorter: (a, b) =>
        (a.device || "").localeCompare(b.device || ""),
    },
    {
      title: "Action",
      key: "action",
      width: 90,
      align: "center",
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleMenuClick(key, record)}
            items={[
              {
                key: "details",
                icon: <InfoCircleOutlined />,
                label: "Details",
              },
              { type: "divider" },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                danger: true,
                label: "Delete",
              },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              size="small"
              className="!px-2"
              icon={<MenuOutlined />}
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-[calc(100vh-80px)] p-2 sm:p-4">
      {/* Top header bar */}
      <div className="flex items-center justify-between   rounded-t-md shadow-sm px-3 sm:px-4 py-2">
        <div className="flex items-center gap-2">
          <MenuOutlined className="text-xs sm:text-sm" />
          <span className="font-semibold text-sm sm:text-base">
            Log List
          </span>
        </div>

        {/* Right side: Show dropdown (no Add button here) */}
        <div className="flex items-center gap-2">
          <span className="text-xs">Show:</span>
          <Select
            size="small"
            value={pageSize}
            onChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
            className="min-w-[70px]"
          >
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>
      </div>

      {/* White table area */}
      <div className="bg-white rounded-b-md shadow-sm px-3 sm:px-4 pt-3 pb-4">
        {/* Filter row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-600 whitespace-nowrap">
            Filter:
          </span>
          <Search
            allowClear
            size="small"
            placeholder="Type to filter..."
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={filteredData}
            locale={{ emptyText: "No data available in table" }}
            pagination={{
              current: currentPage,
              pageSize,
              total: filteredData.length,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
              showTotal: (total, range) =>
                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogList;
