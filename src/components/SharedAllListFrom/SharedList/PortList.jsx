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

const initialData = [
  { key: 1, sl: 1, category: "Sea", name: "Chittagong", code: "BDCGP", country: "Bangladesh", status: "ACTIVE" },
  { key: 2, sl: 2, category: "Sea", name: "LE HAVRE", code: "BEANR", country: "France", status: "ACTIVE" },
  { key: 3, sl: 3, category: "Sea", name: "Antwerp", code: "DEHAM", country: "Belgium", status: "ACTIVE" },
  { key: 4, sl: 4, category: "Sea", name: "Hamburg", code: "NLRTM", country: "Germany", status: "ACTIVE" },
  { key: 5, sl: 5, category: "Sea", name: "Rotterdam", code: "USNYC", country: "Netherlands", status: "ACTIVE" },
  { key: 6, sl: 6, category: "Sea", name: "NEW YORK", code: "USNYC", country: "United States", status: "ACTIVE" },
  { key: 7, sl: 7, category: "Sea", name: "Colombo", code: "LK CMB", country: "Sri Lanka", status: "ACTIVE" },
  { key: 8, sl: 8, category: "Sea", name: "London Gateway", code: "GBLGP", country: "United Kingdom", status: "ACTIVE" },
  { key: 9, sl: 9, category: "Air", name: "DAC", code: "DAC", country: "Bangladesh", status: "ACTIVE" },
  { key: 10, sl: 10, category: "Air", name: "JFK", code: "JFK", country: "United States", status: "ACTIVE" },
];

const pageSizeOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

const PortList = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return initialData;
    const q = searchText.toLowerCase();

    return initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [searchText]);

  const items = [
    { key: "1", label: "View" },
    { key: "2", label: "Edit" },
    { key: "3", label: "Deactivate" },
  ];

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 80,
      sorter: (a, b) => a.sl - b.sl,
    },
    {
      title: "Category *",
      dataIndex: "category",
      width: 120,
      filters: [
        { text: "Sea", value: "Sea" },
        { text: "Air", value: "Air" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Name *",
      dataIndex: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Code",
      dataIndex: "code",
      width: 120,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Country *",
      dataIndex: "country",
      ellipsis: true,
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (value) => (
        <Tag
          className="px-3 py-1 rounded-full text-xs font-semibold border-0"
          color={value === "ACTIVE" ? "green" : "red"}
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center",
      render: () => (
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
        >
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
    
     

      <Content className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
          {/* Filter row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-4">
            <Search
              allowClear
              placeholder="Type to filter..."
              prefix={<SearchOutlined />}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className="md:max-w-xs"
              size="middle"
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

          {/* Data table */}
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
            className="port-table"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default PortList;
