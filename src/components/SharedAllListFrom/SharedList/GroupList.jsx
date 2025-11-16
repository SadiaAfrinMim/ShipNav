// src/pages/group/GroupList.jsx
import React, { useMemo, useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Dropdown,
  Menu,
  Space,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const GroupList = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const [data] = useState([
    { id: 1, name: "Admin", description: "Administrator" },
    { id: 2, name: "Accounts & Finance", description: "Accounts & Finance" },
    { id: 3, name: "Shipper", description: "For booking" },
    { id: 4, name: "Master", description: "System Administrator" },
  ]);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const text = searchText.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(text) ||
        item.description.toLowerCase().includes(text)
    );
  }, [data, searchText]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleMenuClick = (action, record) => {
    if (action === "edit") {
      console.log("Edit:", record);
    } else if (action === "details") {
      console.log("Details:", record);
    } else if (action === "delete") {
      console.log("Delete:", record);
    }
  };

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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
                key: "edit",
                icon: <EditOutlined />,
                label: "Edit",
              },
              {
                key: "details",
                icon: <InfoCircleOutlined />,
                label: "Details",
              },
              {
                type: "divider",
              },
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
              icon={<MoreOutlined />}
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="w-full  sm:p-5">
      {/* Header bar like screenshot */}
     

      {/* Card body */}
      <div className="bg-white rounded-b-lg shadow-sm px-3 sm:px-4 pb-4 pt-3">
        {/* Top controls: filter + show + button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          {/* Filter */}
          <div className="w-full md:max-w-xs">
            <Search
              allowClear
              placeholder="Type to filter..."
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              size="small"
            />
          </div>

          {/* Right side: Show dropdown + Add button */}
          <div className="flex flex-col xs:flex-row md:flex-row items-stretch xs:items-center gap-2 md:gap-3 md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                Show:
              </span>
              <Select
                size="small"
                value={pageSize}
                onChange={(value) => setPageSize(value)}
                className="min-w-[70px]"
              >
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
              </Select>
            </div>

          
          </div>
        </div>

        {/* Table (scrollable on small screen) */}
        <div className="overflow-x-auto">
          <Table
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize,
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

export default GroupList;
