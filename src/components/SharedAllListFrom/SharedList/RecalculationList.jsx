import React, { useMemo, useState } from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Select,
  Space,
} from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const RecalculationList = () => {
  const [data, setData] = useState([]); // API থেকে এলে এখানে সেট করবে
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // 🔍 Filter logic
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const q = searchText.toLowerCase();
    return data.filter((item) =>
      Object.values(item || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, searchText]);

  // 📊 Table columns
  const columns = [
    {
      title: "S/L No.",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Module *",
      dataIndex: "module",
      key: "module",
    },
    {
      title: "Name *",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Method *",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Adjust *",
      dataIndex: "adjust",
      key: "adjust",
    },
    {
      title: "Number/Amount *",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Account Chart *",
      dataIndex: "accountChart",
      key: "accountChart",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: () => <span>-</span>, // ভবিষ্যতে Edit/Delete যোগ করতে পারো
    },
  ];

  const handleAddRecalculation = () => {
    // এখানে future এ AddRecalculationModal open করবে
    console.log("Add Recalculation clicked");
  };

  return (
    <Card
      style={{ margin: 16, padding: 0 }}
      bodyStyle={{ padding: 0 }}
    >
     

      {/* 🔹 Filter + Show row */}
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          borderBottom: "1px solid #e8e8e8",
          background: "#fff",
        }}
      >
        <Space size={8} align="center">
          <span>Filter:</span>
          <Search
            placeholder="Type to filter..."
            allowClear
            style={{ width: 220 }}
            prefix={<SearchOutlined />}
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Space>

        <Space size={8} align="center">
          <span>Show:</span>
          <Select
            value={pageSize}
            style={{ width: 80 }}
            onChange={(value) => setPageSize(value)}
          >
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
          </Select>
        </Space>
      </div>

      {/* 🔹 Table */}
      <div style={{ padding: "0 16px 16px" }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          }}
          size="small"
          locale={{ emptyText: "No data available in table" }}
          bordered
        />
      </div>
    </Card>
  );
};

export default RecalculationList;
