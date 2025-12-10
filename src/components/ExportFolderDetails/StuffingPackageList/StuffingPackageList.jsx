// File: StuffingPackageList.jsx
import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
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
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";

const { Text } = Typography;
const { Option } = Select;

export default function StuffingPackageList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const border = "#cfe7ea";
  const teal = "#00b4bf";

  // ---------- ROUTE HANDLERS ----------
  const handleView = (record) => {
    navigate("/export-sea/view-stuffing-package", {
      state: record,
    });
  };

  const handleEdit = (record) => {
    navigate("/export-sea/edit-stuffing-package", {
      state: record,
    });
  };

  const handleCopy = (record) => {
    navigate("/export-sea/copy-stuffing-package", {
      state: record,
    });
  };

  const handleAdd = () => {
    navigate("/export-sea/stuffing-package/booking");
  };

  // ---------- FAKE JSON DATA ----------
  const data = [
    {
      sl: 1,
      stuffingPlanNo: "EAFH#25000001",
      date: "2025-12-04",
      mode: "CFS-CY",
    },
    {
      sl: 2,
      stuffingPlanNo: "EAFH#25000002",
      date: "2025-12-04",
      mode: "CFS-CY",
    },
    {
      sl: 3,
      stuffingPlanNo: "EAFH#25000003",
      date: "2025-12-05",
      mode: "CFS-CY",
    },
  ];

  // ---------- ACTION DROPDOWN ----------
  const handleActionClick = (key, record) => {
    if (key === "view") handleView(record);
    if (key === "edit") handleEdit(record);
    if (key === "copy") handleCopy(record);
    // "delete-modal" -> DeleteModal নিজে থেকেই modal open/close করবে
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
      label: <DeleteModal />, // Button + Modal
    },
  ];

  // ---------- TABLE COLUMNS ----------
  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, align: "center" },
    {
      title: "Stuffing Plan No.",
      dataIndex: "stuffingPlanNo",
      width: 220,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    {
      title: "Mode",
      dataIndex: "mode",
      width: 120,
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
      const hay = [row.stuffingPlanNo, row.date, row.mode]
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
      {/* Teal top bar: title + start/end date + buttons */}
      <div
        style={{
         
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#fff",
        }}
      >
       

        <div style={{ marginLeft: "auto" }}>
          <Form
            form={form}
            layout="inline"
            style={{ display: "flex", gap: 12, alignItems: "center" }}
          >
            <Form.Item
              name="startDate"
              label={<span >Start Date *</span>}
              style={{ marginBottom: 0 }}
            >
              <DatePicker
                size="small"
                style={{ width: 200 }}
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={<span >End Date *</span>}
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
              prefix={<SearchOutlined style={{ color: "#999" }} />}
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
          scroll={{ x: 900 }}
        />
      </Card>
    </div>
  );
}
