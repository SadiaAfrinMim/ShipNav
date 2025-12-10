"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Pagination,
  Dropdown,
  Menu,
} from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  EyeOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../SharedAllListFrom/Modal/DeleteModal";



const { RangePicker } = DatePicker;
const { Option } = Select;

const ShippingOrderList = () => {
  const [carrier, setCarrier] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  const data = [
    {
      key: "1",
      number: "ESSO#25000005",
      booking: "ES#25000005",
      date: "10/08/2025",
      cfs: "Golden Containers ltd",
      carrier: "ECU Worldwide",
    },
    {
      key: "2",
      number: "ESSO#25000004",
      booking: "ES#25000004",
      date: "08/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "MSC",
    },
    {
      key: "3",
      number: "ESSO#25000003",
      booking: "ES#25000003",
      date: "07/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "ONE Line",
    },
    {
      key: "4",
      number: "ESSO#25000001",
      booking: "ES#25000001",
      date: "06/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "MSC",
    },
    {
      key: "5",
      number: "ESSO#25000002",
      booking: "ES#25000002",
      date: "06/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "MSC",
    },
  ];

  const handleActionClick = (key, record) => {
    if (key === "edit") {
      navigate("/export-sea/edit-shipping-order");
    } else if (key === "view") {
      navigate("/export-sea/view-shipping-order");
      console.log("View", record);
    } else if (key === "copy") {
      navigate("/export-sea/copy-shipping-order");
      console.log("Copy", record);
    }
    // 🔹 delete এখানে আর handle করছি না, কারণ এখন DeleteModal নিজেই কাজ করবে
  };

  const columns = [
    { title: "S/L No.", dataIndex: "key", width: 80 },
    { title: "Number", dataIndex: "number" },
    { title: "Booking No.", dataIndex: "booking" },
    { title: "Date", dataIndex: "date" },
    { title: "CFS", dataIndex: "cfs" },
    { title: "Carrier", dataIndex: "carrier" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const menu = (
          <Menu onClick={(info) => handleActionClick(info.key, record)}>
            <Menu.Item key="view" icon={<EyeOutlined />}>
              View
            </Menu.Item>
            <Menu.Item key="edit" icon={<EditOutlined />}>
              Edit
            </Menu.Item>
            <Menu.Item key="copy" icon={<CopyOutlined />}>
              Copy
            </Menu.Item>

            {/* 🔥 শুধু DeleteModal call করছি */}
            <Menu.Item key="delete">
              <DeleteModal />
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="link" icon={<FilterOutlined />}>
              Action
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-4" justify="center">
        <Col xs={24} md={4}>
          <Select
            value={carrier}
            onChange={(val) => setCarrier(val)}
            style={{ width: "100%" }}
          >
            <Option value="All">All Carriers</Option>
            <Option value="MSC">MSC</Option>
            <Option value="ONE Line">ONE Line</Option>
            <Option value="ECU Worldwide">ECU Worldwide</Option>
          </Select>
        </Col>

        <Col xs={24} md={6}>
          <RangePicker style={{ width: "100%" }} />
        </Col>

        <Col xs={24} md={6}>
          <Input placeholder="🔍 Type to filter..." />
        </Col>

        <Col xs={24} md={4} className="flex justify-center items-center gap-2">
          <Select
            value={pageSize}
            onChange={(val) => {
              setPageSize(val);
              setCurrentPage(1);
            }}
            style={{ width: 90 }}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
        </Col>
      </Row>

      <Table
        bordered
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        className="rounded-lg"
      />

      <div className="mt-4 flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
        <span className="text-sm text-gray-600">
          Showing {1 + (currentPage - 1) * pageSize} to{" "}
          {Math.min(currentPage * pageSize, data.length)} of {data.length}{" "}
          entries
        </span>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ShippingOrderList;
