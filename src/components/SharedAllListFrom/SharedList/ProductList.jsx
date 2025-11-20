// src/pages/product/ProductList.jsx
import React, { useMemo, useState } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Select,
  Tooltip,
} from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  ReloadOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

// 👉 চাইলে এখানে ডিফল্ট ডাটা দিতে পারো
const initialData = [
  // {
  //   id: 1,
  //   name: "Example Product",
  //   unit: "Cartons",
  //   category: "Freight",
  //   standardCost: 100,
  //   salesPrice: 120,
  //   image: "",
  //   status: "Active",
  // },
];

const ProductList = () => {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [unitFilter, setUnitFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [data] = useState(initialData);

  const handleReset = () => {
    setSearchText("");
    setCategoryFilter("All");
    setUnitFilter("All");
    setStatusFilter("All");
    setPageSize(10);
  };

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        (item.name || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .filter((item) =>
        categoryFilter === "All" ? true : item.category === categoryFilter
      )
      .filter((item) =>
        unitFilter === "All" ? true : item.unit === unitFilter
      )
      .filter((item) =>
        statusFilter === "All" ? true : item.status === statusFilter
      );
  }, [data, searchText, categoryFilter, unitFilter, statusFilter]);

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "id",
      width: 70,
      render: (_t, _r, index) => index + 1,
    },
    {
      title: "#",
      dataIndex: "checkbox",
      width: 40,
      render: () => <input type="checkbox" className="cursor-pointer" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: 110,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 140,
    },
    {
      title: "Standard Cost (Average)",
      dataIndex: "standardCost",
      width: 180,
      render: (val) =>
        val != null ? Number(val).toFixed(2) : "0.00",
    },
    {
      title: "Sales Price (MRP)",
      dataIndex: "salesPrice",
      width: 150,
      render: (val) =>
        val != null ? Number(val).toFixed(2) : "0.00",
    },
    {
      title: "Image",
      dataIndex: "image",
      width: 100,
      render: () => (
        <span className="text-xs text-blue-500 cursor-pointer">
          Image
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (status) => (
        <span
          className={`text-[12px] font-semibold ${
            status === "Active"
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          {status || "-"}
        </span>
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
    <Layout className="min-h-screen bg-gray-100">
      {/* 🔹 Teal header bar like screenshot */}
      <Header className="!bg-[#00BCD4] !px-4 !py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <UnorderedListOutlined />
          <span className="font-semibold text-[15px]">
            Product List
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            icon={<ReloadOutlined />}
            size="small"
            className="!bg-[#4a5568] !text-white !border-none hover:!bg-[#2d3748]"
            onClick={handleReset}
          >
            Reset
          </Button>

          {/* এখানে Add Product modal open করবে */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            className="!bg-emerald-500 hover:!bg-emerald-600 !border-none"
            onClick={() => {
              // TODO: open AddProductModal()
              console.log("Add Product clicked");
            }}
          >
            Add Product
          </Button>
        </div>
      </Header>

      <Content className="m-4">
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
          {/* Top filter row: Category | Unit | Status */}
          <div className="border-b border-gray-200 px-3 md:px-4 py-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-700 min-w-[70px]">
                Category
              </span>
              <Select
                size="small"
                value={categoryFilter}
                onChange={setCategoryFilter}
                className="w-full"
              >
                <Option value="All">All</Option>
                {/* Static example, পরে API থেকে map করতে পারো */}
                <Option value="Freight">Freight</Option>
                <Option value="Service">Service</Option>
              </Select>
            </div>

            {/* Unit */}
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-700 min-w-[40px]">
                Unit
              </span>
              <Select
                size="small"
                value={unitFilter}
                onChange={setUnitFilter}
                className="w-full"
                showSearch
                optionFilterProp="children"
              >
                <Option value="All">All</Option>
                <Option value="Cartons">Cartons</Option>
                <Option value="HBL">HBL</Option>
                <Option value="KG">KG</Option>
                <Option value="CBM">CBM</Option>
                <Option value="20GP">20GP</Option>
                <Option value="40GP">40GP</Option>
                {/* বাকি units চাইলে এখানেও যোগ করো */}
              </Select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-700 min-w-[50px]">
                Status
              </span>
              <Select
                size="small"
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-full"
              >
                <Option value="All">All</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </div>
          </div>

          {/* Filter + Show row */}
          <div className="border-b border-gray-200 px-3 md:px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Filter search */}
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-600">
                Filter:
              </span>
              <Search
                placeholder="Type to filter..."
                allowClear
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-56"
              />
            </div>

            {/* Show page size */}
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs md:text-sm text-gray-600">
                Show:
              </span>
              <Select
                size="small"
                value={pageSize}
                onChange={setPageSize}
                className="w-20"
              >
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="px-2 md:px-3 pb-3">
            <div className="overflow-x-auto">
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
                className="mt-2 min-w-[1000px]"
              />
            </div>

            {/* Bottom legend Active / Inactive */}
            <div className="mt-4">
              <div className="grid grid-cols-2 text-center text-xs font-medium text-white rounded-sm overflow-hidden">
                <div className="bg-emerald-500 py-1">Active</div>
                <div className="bg-red-500 py-1">Inactive</div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ProductList;
