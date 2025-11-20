// src/pages/gh-agent/GhAgentList.jsx
import React, { useMemo, useState } from "react";
import { Layout, Table, Input, Button, Tooltip } from "antd";
import {
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddGhAgentModal from "../Modal/AddGhAgentModal";


const { Content } = Layout;
const { Search } = Input;

const initialData = [
  {
    id: 1,
    name: "Karim and CnF",
    phone: "",
    email: "",
    address: "",
    status: "ACTIVE",
  },
];

const GhAgentList = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      (item.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.address || "").toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "id",
      width: 70,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Name *",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 90,
      render: (status) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            status === "ACTIVE"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      width: 70,
      align: "center",
      render: (_, record) => (
        <Tooltip title="Edit">
          <button
            className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
            onClick={() => {
              setEditingRow(record);
              setModalOpen(true);
            }}
          >
            <MenuOutlined className="text-[12px]" />
          </button>
        </Tooltip>
      ),
    },
  ];

  const handleSubmit = (values) => {
    if (editingRow) {
      setData((prev) =>
        prev.map((row) =>
          row.id === editingRow.id ? { ...row, ...values } : row
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        { id: prev.length + 1, status: "ACTIVE", ...values },
      ]);
    }
    setModalOpen(false);
    setEditingRow(null);
  };

 

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="">
        {/* white card area like screenshot */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
         

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
          </div>
        </div>
      </Content>

      {/* Add / Edit Modal */}
      <AddGhAgentModal
        open={modalOpen}
        initialValues={editingRow}
        onCancel={() => {
          setModalOpen(false);
          setEditingRow(null);
        }}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default GhAgentList;
