// src/pages/business/BusinessList.jsx
import React, { useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Dropdown,
  Space,
  Select,
  Card,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

// 🔹 তোমার নিজের path অনুযায়ী ঠিক রাখো
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";
import AddBusinessModal from "../Modal/AddBusinessModal";

const BusinessList = () => {
  const [data] = useState([
    {
      id: 1,
      name: "N2N Supply Chain Solutions Ltd.",
      phone: "+88 01989-151353",
      email: "info@n2nscs.com",
      address: "House# 7 (4th Floor), Road# 2/1, Banani, Dhaka, Bangladesh",
      logo: "N2N",
      status: "ACTIVE",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // 🔹 AddBusinessModal এর জন্য minimal state (চাইলে এটাও বাদ দিতে পারো)
  const [modalState, setModalState] = useState({
    open: false,
    mode: "view",
    record: null,
  });

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const q = searchText.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q)
    );
  }, [data, searchText]);

  // ---------- ACTION HANDLERS ----------
  const openBusinessModal = (mode, record) => {
    setModalState({
      open: true,
      mode,
      record,
    });
  };

  const closeBusinessModal = () => {
    setModalState({
      open: false,
      mode: "view",
      record: null,
    });
  };

  // ---------- ACTION MENU ----------
  const actionMenu = (record) => ({
    onClick: ({ key }) => {
      if (key === "view") openBusinessModal("view", record);
      if (key === "edit") openBusinessModal("edit", record);
      if (key === "details") openBusinessModal("details", record);
      // ❌ delete এখানে handle করছি না, delete-modal item এ DeleteModal নিজেই কাজ করবে
    },
    items: [
      {
        key: "view",
        icon: <InfoCircleOutlined />,
        label: "View",
      },
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
      { type: "divider" },
      {
        key: "delete-modal",
        icon: <DeleteOutlined />,
        danger: true,
        // 🔹 এখানে শুধু DeleteModal component call করা হচ্ছে – কোন props নাই
        label: <DeleteModal />,
      },
    ],
  });

  // ---------- COLUMNS ----------
  const columns = [
    {
      title: "S/L No.",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 90,
      render: (text) => (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #e5e5e5",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Dropdown trigger={["click"]} menu={actionMenu(record)}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Card style={{ margin: 16 }} bodyStyle={{ padding: 16 }}>
      {/* Filter Row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 16,
          marginBottom: 12,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <span>Filter:</span>
          <Search
            placeholder="Type to filter..."
            allowClear
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 260 }}
            prefix={<SearchOutlined />}
          />
        </Space>

        <Space>
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

      {/* Table */}
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
      />

      {/* Add / View / Edit / Details Modal 
          👉 চাইলে একটুও props না দিয়ে শুধু <AddBusinessModal /> রেখে দিতে পারো */}
      <AddBusinessModal
        open={modalState.open}
        mode={modalState.mode}
        record={modalState.record}
        onClose={closeBusinessModal}
      />
    </Card>
  );
};

export default BusinessList;
