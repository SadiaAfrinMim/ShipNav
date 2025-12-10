import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
  Dropdown,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  CalendarOutlined,
  AlignRightOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";

const { Text } = Typography;

export default function DeliveryOrderList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const border = "#cfe7ea";

  // ---------- ROUTE HANDLERS ----------
  const handleView = (record) => {
    navigate("/import-sea/view-delivery-order", {
      state: record,
    });
  };

  const handleEdit = (record) => {
    navigate("/import-sea/edit-delivery-order", {
      state: record,
    });
  };

  const handleCopy = (record) => {
    navigate("/import-sea/copy-delivery-order", {
      state: record,
    });
  };

  const handleAdd = () => {
    navigate("/import-sea/delivery-order/booking");
  };

  // ---------- FAKE JSON DATA ----------
  const data = [
    {
      sl: 1,
      hbl: "HBL-SEA-25000001",
      date: "2025-11-25",
      doNo: "DO-2025-0001",
      deliverTo: "Dhaka Importers Ltd.",
      beNo: "BE-2025-110001",
      beDate: "2025-11-22",
      validUpto: "2025-12-31",
    },
    {
      sl: 2,
      hbl: "HBL-SEA-25000002",
      date: "2025-11-26",
      doNo: "DO-2025-0002",
      deliverTo: "Chittagong Steel Works",
      beNo: "BE-2025-110010",
      beDate: "2025-11-23",
      validUpto: "2026-01-05",
    },
    {
      sl: 3,
      hbl: "HBL-SEA-25000003",
      date: "2025-11-28",
      doNo: "DO-2025-0003",
      deliverTo: "Metro Mart Superstore",
      beNo: "BE-2025-110018",
      beDate: "2025-11-24",
      validUpto: "2026-01-10",
    },
    {
      sl: 4,
      hbl: "HBL-SEA-25000004",
      date: "2025-11-30",
      doNo: "DO-2025-0004",
      deliverTo: "Royal Garments BD",
      beNo: "BE-2025-110025",
      beDate: "2025-11-26",
      validUpto: "2026-01-20",
    },
    {
      sl: 5,
      hbl: "HBL-SEA-25000005",
      date: "2025-12-02",
      doNo: "DO-2025-0005",
      deliverTo: "Prime Agro Industries",
      beNo: "BE-2025-120002",
      beDate: "2025-11-29",
      validUpto: "2026-02-01",
    },
    {
      sl: 6,
      hbl: "HBL-SEA-25000006",
      date: "2025-12-03",
      doNo: "DO-2025-0006",
      deliverTo: "Sunrise Electronics",
      beNo: "BE-2025-120008",
      beDate: "2025-11-30",
      validUpto: "2026-02-05",
    },
    {
      sl: 7,
      hbl: "HBL-SEA-25000007",
      date: "2025-12-05",
      doNo: "DO-2025-0007",
      deliverTo: "Smart Textile Mills",
      beNo: "BE-2025-120015",
      beDate: "2025-12-01",
      validUpto: "2026-02-10",
    },
    {
      sl: 8,
      hbl: "HBL-SEA-25000008",
      date: "2025-12-07",
      doNo: "DO-2025-0008",
      deliverTo: "Green Leaf Foods",
      beNo: "BE-2025-120021",
      beDate: "2025-12-02",
      validUpto: "2026-02-15",
    },
  ];

  // ---------- ACTION DROPDOWN ----------
  const handleActionClick = (key, record) => {
    if (key === "view") handleView(record);
    if (key === "edit") handleEdit(record);
    if (key === "copy") handleCopy(record);
    // delete-modal -> DeleteModal নিজেই modal open/close করবে
  };

  const actionItems = [
    {
      key: "view",
      label: (
        <Space>
          <EyeOutlined /> View
        </Space>
      ),
    },
    {
      key: "edit",
      label: (
        <Space>
          <EditOutlined /> Edit
        </Space>
      ),
    },
    {
      key: "copy",
      label: (
        <Space>
          <CopyOutlined /> Copy
        </Space>
      ),
    },
    { type: "divider" },
    {
      key: "delete-modal",
      label: <DeleteModal />, // Delete button + modal (previous moto)
    },
  ];

  // ---------- TABLE COLUMNS ----------
  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, align: "center" },
    { title: "HBL", dataIndex: "hbl", width: 160 },
    {
      title: "Date *",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    { title: "D/O No.", dataIndex: "doNo", width: 160 },
    { title: "Deliver To", dataIndex: "deliverTo", width: 220 },
    { title: "B/E No", dataIndex: "beNo", width: 180 },
    {
      title: "B/E Date",
      dataIndex: "beDate",
      width: 140,
      sorter: (a, b) => new Date(a.beDate || 0) - new Date(b.beDate || 0),
    },
    { title: "Valid Upto", dataIndex: "validUpto", width: 140 },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: actionItems,
            onClick: ({ key }) => handleActionClick(key, record),
          }}
        >
          <Button type="text" size="small" icon={<AlignRightOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // ---------- TOP ACTIONS ----------
  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const reset = () => form.resetFields();

  return (
    <div className="px-4">
      {/* Teal top bar */}
      <div
        style={{
         
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#fff",
        }}
      >
        

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Form form={form} layout="inline">
            <Form.Item
              name="startDate"
              label={
                <span style={{ color: "#fff" }}>Start Date *</span>
              }
              style={{ marginBottom: 0 }}
            >
              <DatePicker
                style={{ width: 200 }}
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="endDate"
              label={
                <span style={{ color: "#fff" }}>End Date *</span>
              }
              style={{ marginBottom: 0 }}
            >
              <DatePicker
                style={{ width: 200 }}
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
          </Form>

         
        </div>
      </div>

      {/* Card with filter + table */}
      <Card style={{ borderTop: "none", borderRadius: 0 }}>
        <Form form={form} layout="vertical">
          {/* Filter + Show row (under teal bar) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderBottom: `1px solid ${border}`,
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            <Space>
              <Text strong>Filter:</Text>
              <Input
                placeholder="Type to filter..."
                allowClear
                style={{ width: 260 }}
              />
            </Space>

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text>Show:</Text>
              <Select
                value={pageSize}
                style={{ width: 80 }}
                onChange={(v) => setPageSize(v)}
                options={[10, 25, 50, 100].map((n) => ({
                  label: n,
                  value: n,
                }))}
              />
            </div>
          </div>

          {/* Table */}
          <Table
            bordered
            size="middle"
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey={(r, i) => i}
            pagination={{
              pageSize,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            }}
            locale={{ emptyText: "No data available in table" }}
            scroll={{ x: 1300 }}
          />
        </Form>
      </Card>
    </div>
  );
}
