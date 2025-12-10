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

export default function ForwardLetterList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // inline palette
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";

  // ---- ROUTE HANDLERS ----
  const handleView = (record) => {
    navigate("/import-sea/view-forward-letter", {
      state: record,
    });
  };

  const handleEdit = (record) => {
    navigate("/import-sea/edit-forward-letter", {
      state: record,
    });
  };

  const handleCopy = (record) => {
    navigate("/import-sea/copy-forward-letter", {
      state: record,
    });
  };

  const addForwardLetter = () => {
    // create / booking route
    navigate("/import-sea/forward-letter/booking");
  };

  // ---- FAKE JSON DATA ----
  const data = [
    {
      sl: 1,
      hbl: "HBL-SEA-24000001",
      date: "2025-12-02",
      to: "Commissioner of Customs, Chattogram",
      impRegNo: "IR-2024-000123",
      lineNo: "LN-001",
      validUpto: "2026-01-31",
      cnfAgent: "ABC C&F Agency",
    },
    {
      sl: 2,
      hbl: "HBL-SEA-24000002",
      date: "2025-12-03",
      to: "Commissioner of Customs, ICD Dhaka",
      impRegNo: "IR-2024-000124",
      lineNo: "LN-002",
      validUpto: "2026-02-15",
      cnfAgent: "N2N C&F Services",
    },
    {
      sl: 3,
      hbl: "HBL-SEA-24000003",
      date: "2025-11-28",
      to: "Deputy Commissioner, Customs House Chattogram",
      impRegNo: "IR-2024-000130",
      lineNo: "LN-003",
      validUpto: "2026-01-20",
      cnfAgent: "Blue Ocean C&F",
    },
    {
      sl: 4,
      hbl: "HBL-SEA-24000004",
      date: "2025-11-25",
      to: "Commissioner of Customs, Mongla Port",
      impRegNo: "IR-2024-000140",
      lineNo: "LN-004",
      validUpto: "2026-03-10",
      cnfAgent: "Delta Trade & C&F",
    },
    {
      sl: 5,
      hbl: "HBL-SEA-24000005",
      date: "2025-11-22",
      to: "Assistant Commissioner, Customs ICD Kamalapur",
      impRegNo: "IR-2024-000155",
      lineNo: "LN-005",
      validUpto: "2026-02-28",
      cnfAgent: "Prime Logistics C&F",
    },
    {
      sl: 6,
      hbl: "HBL-SEA-24000006",
      date: "2025-11-18",
      to: "Commissioner of Customs, Benapole",
      impRegNo: "IR-2024-000162",
      lineNo: "LN-006",
      validUpto: "2026-01-15",
      cnfAgent: "Borderline C&F Agency",
    },
    {
      sl: 7,
      hbl: "HBL-SEA-24000007",
      date: "2025-11-15",
      to: "Deputy Commissioner, Customs House Chattogram",
      impRegNo: "IR-2024-000170",
      lineNo: "LN-007",
      validUpto: "2026-03-05",
      cnfAgent: "Evergreen C&F",
    },
    {
      sl: 8,
      hbl: "HBL-SEA-24000008",
      date: "2025-11-10",
      to: "Commissioner of Customs, Pangaon ICT",
      impRegNo: "IR-2024-000181",
      lineNo: "LN-008",
      validUpto: "2026-04-01",
      cnfAgent: "Metro C&F Solutions",
    },
  ];

  // ---- ACTION HANDLER (for dropdown) ----
  const handleActionClick = (key, record) => {
    if (key === "view") {
      handleView(record);
    }

    if (key === "edit") {
      handleEdit(record);
    }

    if (key === "copy") {
      handleCopy(record);
    }

    // "delete-modal" এর জন্য এখানে কিছু করার দরকার নেই,
    // label এর ভেতরের <DeleteModal /> নিজেই modal handle করবে
  };

  // ---- DROPDOWN ITEMS (View / Edit / Copy / Delete) ----
  const baseActionItems = [
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
      label: <DeleteModal />, // Delete button + modal
    },
  ];

  // table columns (per screenshot)
  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, align: "center" },
    { title: "HBL", dataIndex: "hbl", width: 160 },
    {
      title: "Date *",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    { title: "To", dataIndex: "to", width: 220 },
    { title: "Imp. Reg. No.", dataIndex: "impRegNo", width: 160 },
    { title: "Line No.", dataIndex: "lineNo", width: 140 },
    { title: "Valid Upto", dataIndex: "validUpto", width: 140 },
    { title: "C&F Agent", dataIndex: "cnfAgent", width: 220 },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: baseActionItems,
            onClick: ({ key }) => handleActionClick(key, record),
          }}
        >
          <Button type="text" size="small" icon={<AlignRightOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // actions
  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };
  const reset = () => form.resetFields();

  return (
    <div className="px-4">
      

      {/* Filter card */}
      <Card>
        <Form form={form} layout="vertical">
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="To" name="to">
                <Select
                  showSearch
                  options={[
                    { label: "All", value: "All" },
                    { label: "C&F Agent A", value: "C&F Agent A" },
                    { label: "C&F Agent B", value: "C&F Agent B" },
                  ]}
                  defaultValue="All"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Start Date *" name="startDate">
                <DatePicker
                  style={{ width: "100%" }}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Form.Item label="End Date *" name="endDate">
                <DatePicker
                  style={{ width: "100%" }}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Filter + Show */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderTop: `1px solid ${border}`,
              paddingTop: 8,
              marginTop: 4,
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
