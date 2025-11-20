// src/pages/shipper/ShipperList.jsx
import React, { useMemo, useState } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Select,
  Tooltip,
  Dropdown,
} from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import AddShipperModal from "../Modal/party/AddShipperModal";
import ViewShipperModal from "../Modal/party/ViewShipperModal";
import OpeningBalanceModal from "../Modal/party/OpeningBalanceModal";
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";



const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const initialData = [
  {
    id: 1,
    name: "WAC LOGISTICS LTD.",
    phone: "",
    email: "",
    address:
      "SAFURA TOWER (7TH FLOOR) 20 KEMAL ATTATURK AVENUE BANANI C/A, DHAKA-1213, BANGLADESH",
    status: "Active",
  },
  {
    id: 2,
    name: "TEX ZONE KNITWEAR LTD.",
    phone: "",
    email: "",
    address: "PLOT NO. 8/6, BSCIC INDUSTRIAL AREA, TONGI, GAZIPUR, BANGLADESH",
    status: "Active",
  },
];

const ShipperList = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [data, setData] = useState(initialData);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openBalance, setOpenBalance] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        (item.name || "")
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        (item.address || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .filter((item) =>
        statusFilter === "All" ? true : item.status === statusFilter
      );
  }, [data, searchText, statusFilter]);

  const handleView = (record) => {
    setSelectedRecord(record);
    setOpenView(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setOpenEdit(true);
  };

  const handleDelete = (record) => {
    setSelectedRecord(record);
    setOpenDelete(true);
  };

  const handleBalance = (record) => {
    setSelectedRecord(record);
    setOpenBalance(true);
  };

  const handleAddSubmit = (values) => {
    const newId =
      data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const newRow = {
      id: newId,
      status: "Active",
      ...values,
    };
    setData((prev) => [...prev, newRow]);
    setOpenAdd(false);
  };

  const handleEditSubmit = (values) => {
    if (!selectedRecord) return;
    setData((prev) =>
      prev.map((row) =>
        row.id === selectedRecord.id ? { ...row, ...values } : row
      )
    );
    setOpenEdit(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedRecord) return;
    setData((prev) => prev.filter((row) => row.id !== selectedRecord.id));
    setOpenDelete(false);
  };

  const handleBalanceSubmit = (values) => {
    console.log("Opening balance saved for", selectedRecord, values);
    setOpenBalance(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      width: 40,
      render: () => <input type="checkbox" className="cursor-pointer" />,
    },
    {
      title: "S/L No.",
      dataIndex: "id",
      width: 70,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Name *",
      dataIndex: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
      render: (text) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Address (3/4 Lines)",
      dataIndex: "address",
      render: (text) => (
        <span className="text-gray-600 text-[13px] leading-snug">
          {text}
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
            status === "Active" ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "view",
                label: "View",
                onClick: () => handleView(record),
              },
              {
                key: "edit",
                label: "Edit",
                onClick: () => handleEdit(record),
              },
              {
                key: "balance",
                label: "Opening Balance",
                onClick: () => handleBalance(record),
              },
              {
                key: "delete",
                label: "Delete",
                style: { color: "red" },
                onClick: () => handleDelete(record),
              },
            ],
          }}
        >
          <button className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
            <MenuOutlined className="text-[12px]" />
          </button>
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
     
     

      <Content className="">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 m-4">
          {/* Filter row */}
          <div className="border-b border-gray-200 px-3 md:px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
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
              <span className="text-xs md:text-sm text-gray-600">Status</span>
              <Select
                size="small"
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-40"
                showSearch
                optionFilterProp="children"
              >
                <Option value="All">All</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
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
                  pageSize: 10,
                  showSizeChanger: false,
                  className: "mt-3 flex justify-end",
                }}
                className="mt-2 min-w-[800px]"
              />
            </div>

            {/* Bottom legend */}
            <div className="mt-4">
              <div className="grid grid-cols-2 text-center text-xs font-medium text-white rounded-sm overflow-hidden">
                <div className="bg-emerald-500 py-1">Active</div>
                <div className="bg-red-500 py-1">Inactive</div>
              </div>
            </div>
          </div>
        </div>
      </Content>

      {/* MODALS */}
      <AddShipperModal
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onSubmit={handleAddSubmit}
      />

      <AddShipperModal
        open={openEdit}
        initialValues={selectedRecord}
        title="Edit Shipper"
        onCancel={() => setOpenEdit(false)}
        onSubmit={handleEditSubmit}
      />

      <ViewShipperModal
        open={openView}
        onCancel={() => setOpenView(false)}
        data={selectedRecord}
      />

      <OpeningBalanceModal
        open={openBalance}
        onCancel={() => setOpenBalance(false)}
        data={selectedRecord}
        onSubmit={handleBalanceSubmit}
      />

      <DeleteConfirmModal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        data={selectedRecord}
        onConfirm={handleDeleteConfirm}
      />
    </Layout>
  );
};

export default ShipperList;
