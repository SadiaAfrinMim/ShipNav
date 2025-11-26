import React, { useMemo, useState } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Select,
  Tag,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Search } = Input;

const pageSizeOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

// demo data – চাইলে পরে API থেকে আনতে পারো
const initialData = [
  { key: 1, sl: 1, name: "Afghanistan",        code: "AF", status: "ACTIVE" },
  { key: 2, sl: 2, name: "Antigua and Barbuda", code: "AG", status: "ACTIVE" },
  { key: 3, sl: 3, name: "Hungary",            code: "HU", status: "ACTIVE" },
  { key: 4, sl: 4, name: "Iceland",            code: "IS", status: "ACTIVE" },
  { key: 5, sl: 5, name: "India",              code: "IN", status: "ACTIVE" },
  { key: 6, sl: 6, name: "Indonesia",          code: "ID", status: "ACTIVE" },
  { key: 7, sl: 7, name: "Iran",               code: "IR", status: "ACTIVE" },
  { key: 8, sl: 8, name: "Iraq",               code: "IQ", status: "ACTIVE" },
  { key: 9, sl: 9, name: "Ireland",            code: "IE", status: "ACTIVE" },
  { key: 10, sl: 10, name: "Isle of Man",      code: "IM", status: "ACTIVE" },
];

const CountryList = () => {
  const [data] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    const q = searchText.toLowerCase();

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [searchText, data]);

  const menuItems = [
    { key: "1", label: "Edit" },
    { key: "2", label: "Deactivate" },
  ];

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 80,
      sorter: (a, b) => a.sl - b.sl,
    },
    {
      title: "Name *",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Code",
      dataIndex: "code",
      width: 120,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 110,
      render: (val) => (
        <Tag
          color={val === "ACTIVE" ? "green" : "red"}
          style={{ borderRadius: 16, minWidth: 70, textAlign: "center" }}
        >
          {val}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center",
      render: () => (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="hover:bg-gray-100 rounded-full"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-slate-50">
      

      {/* CONTENT */}
      <Content className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
          {/* Filter row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-4">
            <Search
              allowClear
              placeholder="Type to filter..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={setSearchText}
              className="md:max-w-xs"
            />

            <div className="flex items-center gap-2 md:ml-auto">
              <span className="text-sm text-gray-500">Show:</span>
              <Select
                size="middle"
                options={pageSizeOptions}
                value={pageSize}
                onChange={(value) => setPageSize(value)}
                className="w-24"
              />
            </div>
          </div>

          {/* Table */}
          <Table
            rowKey="key"
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            }}
            size="middle"
            bordered={false}
            className="country-table"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default CountryList;
