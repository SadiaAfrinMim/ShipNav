// src/pages/business/BusinessList.jsx 
import React, { useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Dropdown,
  Menu,
  Space,
  Select,
  message,
  Card,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import BusinessListHeader from "../HeaderTitle/AdminHeaderWithModal";


const { Search } = Input;
const { Option } = Select;

const BusinessList = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "N2N Supply Chain Solutions Ltd.",
      phone: "+88 01989-151353",
      email: "info@n2nscs.com",
      address:
        "House# 7 (4th Floor), Road# 2/1, Banani, Dhaka, Bangladesh",
      logo: "N2N",
      status: "ACTIVE",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

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

  const handleEdit = (record) => {
    message.info(`Edit business: ${record.name}`);
  };

  const handleDetails = (record) => {
    message.info(`View details: ${record.name}`);
  };

  const handleDelete = (record) => {
    message.warn(`Delete clicked for: ${record.name}`);
  };

  const actionMenu = (record) => (
    <Menu
      onClick={({ key }) => {
        if (key === "edit") handleEdit(record);
        if (key === "details") handleDetails(record);
        if (key === "delete") handleDelete(record);
      }}
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
        <Dropdown overlay={actionMenu(record)} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];


  const handleCreateBusiness = async (values) => {


    const newItem = {
      id: data.length + 1,
      name: values.fullName,
      phone: values.phone || "",
      email: values.email || "",
      address: values.address || "",
      logo: values.code || "LOGO",
      status: "ACTIVE",
    };

    setData((prev) => [...prev, newItem]);
    message.success("Business created successfully");
  };

  return (
    <Card style={{ margin: 16 }} bodyStyle={{ padding: 16 }}>

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
    </Card>
  );
};

export default BusinessList;
