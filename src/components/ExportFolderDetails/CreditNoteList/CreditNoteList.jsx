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
  Row,
  Col,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  UndoOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function CreditNoteList() {
  const [form] = Form.useForm();

  // ------- UI constants (inline, not external CSS) -------
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";

  // ------- table state -------
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const dataSource = []; // keep empty to match your screenshot

  // ------- options -------
  const allOpt = useMemo(() => [{ label: "All", value: "All" }], []);
  const parties = useMemo(
    () => [
      { label: "All", value: "All" },
      { label: "Shipper A", value: "Shipper A" },
      { label: "Shipper B", value: "Shipper B" },
    ],
    []
  );
  const banks = useMemo(
    () => [{ label: "All", value: "All" }, { label: "City Bank", value: "City Bank" }, { label: "Eastern Bank PLC", value: "Eastern Bank PLC" }],
    []
  );

  // ------- columns -------
  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 90,
      align: "center",
      sorter: (a, b) => (a.sl || 0) - (b.sl || 0),
    },
    {
      title: "Reference",
      dataIndex: "reference",
      width: 160,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    {
      title: "HBL",
      dataIndex: "hbl",
      width: 140,
      sorter: (a, b) => (a.hbl || "").localeCompare(b.hbl || ""),
    },
    {
      title: "Bill to Party",
      dataIndex: "billTo",
      width: 180,
    },
    {
      title: "MBL",
      dataIndex: "mbl",
      width: 140,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      width: 160,
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      align: "right",
      width: 140,
      render: (v) => (v ? Number(v).toFixed(2) : "0"),
      sorter: (a, b) => (a.total || 0) - (b.total || 0),
    },
    {
      title: "Total Amount (EXG)",
      dataIndex: "totalExg",
      align: "right",
      width: 180,
      render: (v) => (v ? Number(v).toFixed(2) : "0"),
      sorter: (a, b) => (a.totalExg || 0) - (b.totalExg || 0),
    },
    {
      title: "Prepared By",
      dataIndex: "preparedBy",
      width: 160,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 120,
      render: () => (
        <Space>
          <Button size="small">View</Button>
          <Button size="small" type="primary">
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  // ------- handlers -------
  const onReset = () => {
    form.resetFields();
    // fetch again if needed
  };

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const onAdd = () => {
    // route to create page
    console.log("Add Credit Note");
  };

  return (
    <div
      style={{
        background: "#f3f6f7",
        minHeight: "100vh",
        padding: 12,
      }}
    >
     
      {/* Outer bordered card */}
      <Card
        
      >
        {/* Filters */}
        <Form form={form} layout="vertical">
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="HBL" name="hbl">
                <Select options={allOpt} defaultValue="All" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Shipper" name="shipper">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Consignee" name="consignee">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Agent" name="agent">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Third Party" name="thirdParty">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Bank" name="bank">
                <Select options={banks} defaultValue="All" showSearch />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="End Date" name="endDate">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
          </Row>

          {/* Search + page size */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 4,
              marginBottom: 8,
              borderTop: `1px solid ${border}`,
              paddingTop: 8,
            }}
          >
            <Space>
              <Text strong>Filter:</Text>
              <Input
                placeholder="Type to filter…"
                allowClear
                style={{ width: 260 }}
              />
            </Space>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <Text>Show:</Text>
              <Select
                value={pageSize}
                style={{ width: 80 }}
                onChange={(v) => setPageSize(v)}
                options={[10, 25, 50, 100].map((n) => ({ label: n, value: n }))}
              />
            </div>
          </div>
        </Form>

        {/* Table */}
        <Table
          size="middle"
          bordered
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          rowKey={(r, i) => i}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${dataSource.length === 0 ? 0 : range[0]} to ${dataSource.length === 0 ? 0 : range[1]} of ${total} entries`,
          }}
          scroll={{ x: 1200 }}
          locale={{
            emptyText: "No data available in table",
          }}
        />
      </Card>
    </div>
  );
}
