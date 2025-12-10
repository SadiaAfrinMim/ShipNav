// File: RequestLetterList.jsx
import React, { useState, useMemo } from "react";
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
const { Option } = Select;

export default function RequestLetterList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const border = "#cfe7ea";
  const teal = "#00b4bf";

  // ---------- ROUTE HANDLERS ----------
  const handleView = (record) => {
    navigate("/import-sea/view-request-letter", {
      state: record,
    });
  };

  const handleEdit = (record) => {
    navigate("/import-sea/edit-request-letter", {
      state: record,
    });
  };

  const handleCopy = (record) => {
    navigate("/import-sea/copy-request-letter", {
      state: record,
    });
  };

  const handleAdd = () => {
    navigate("/import-sea/request-letter/booking");
  };

  // ---------- FAKE JSON DATA ----------
  const data = [
    {
      sl: 1,
      date: "2025-11-25",
      ghAgent: "GH Agent A",
      authorizedPerson: "Md. Rahim Uddin",
    },
    {
      sl: 2,
      date: "2025-11-27",
      ghAgent: "GH Agent B",
      authorizedPerson: "Nazmul Hasan",
    },
    {
      sl: 3,
      date: "2025-12-01",
      ghAgent: "GH Agent C",
      authorizedPerson: "Sharmin Akter",
    },
    {
      sl: 4,
      date: "2025-12-03",
      ghAgent: "GH Agent A",
      authorizedPerson: "Abdullah Al Mamun",
    },
    {
      sl: 5,
      date: "2025-12-05",
      ghAgent: "GH Agent D",
      authorizedPerson: "Farhana Sultana",
    },
  ];

  // ---------- ACTION DROPDOWN ----------
  const handleActionClick = (key, record) => {
    if (key === "view") handleView(record);
    if (key === "edit") handleEdit(record);
    if (key === "copy") handleCopy(record);
    // "delete-modal" এর জন্য DeleteModal নিজেই modal open/close করবে
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
      label: <DeleteModal />, // Button + Modal (আগের কম্পোনেন্টের মত)
    },
  ];

  // ---------- TABLE COLUMNS ----------
  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, align: "center" },
    {
      title: "Date *",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    { title: "GH Agent", dataIndex: "ghAgent", width: 220 },
    {
      title: "Authorized Person",
      dataIndex: "authorizedPerson",
      width: 260,
    },
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

  // ---------- FILTER ----------
  const filteredData = useMemo(() => {
    const t = filterText.trim().toLowerCase();
    if (!t) return data;

    return data.filter((row) => {
      const hay = [row.date, row.ghAgent, row.authorizedPerson]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(t);
    });
  }, [filterText, data]);

  // ---------- TOP ACTIONS ----------
  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const reset = () => {
    form.resetFields();
    setFilterText("");
  };

  return (
    <div className="px-4">
      {/* Teal top bar (GH Agent + Start/End Date + buttons) */}
      <div
        style={{
         
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#fff",
        }}
      >
        

     {/* 🔹 Filter Form Fields in Header (Equal Size) */}
<div style={{ marginLeft: "auto" }}>
  <Form
    form={form}
    layout="inline"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    {/* GH Agent */}
    <Form.Item
      name="ghAgent"
      label={<span style={{ color: "#fff" }}>GH Agent</span>}
      style={{ marginBottom: 0 }}
    >
      <Select
        size="small"
        style={{ width: 200 }}
        defaultValue="All"
      >
        <Option value="All">All</Option>
        <Option value="GH Agent A">GH Agent A</Option>
        <Option value="GH Agent B">GH Agent B</Option>
        <Option value="GH Agent C">GH Agent C</Option>
        <Option value="GH Agent D">GH Agent D</Option>
      </Select>
    </Form.Item>

    {/* Start Date */}
    <Form.Item
      name="startDate"
      label={<span style={{ color: "#fff" }}>Start Date *</span>}
      style={{ marginBottom: 0 }}
    >
      <DatePicker
        size="small"
        style={{ width: 200 }}
        suffixIcon={<CalendarOutlined />}
      />
    </Form.Item>

    {/* End Date */}
    <Form.Item
      name="endDate"
      label={<span style={{ color: "#fff" }}>End Date *</span>}
      style={{ marginBottom: 0 }}
    >
      <DatePicker
        size="small"
        style={{ width: 200 }}
        suffixIcon={<CalendarOutlined />}
      />
    </Form.Item>
  </Form>
</div>

      </div>

      {/* Card with filter + table */}
      <Card style={{ borderTop: "none", borderRadius: 0 }}>
        {/* Filter row */}
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
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
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
          dataSource={filteredData}
          columns={columns}
          rowKey={(r) => r.sl}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          }}
          locale={{ emptyText: "No data available in table" }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
}
