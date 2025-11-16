import React, { useMemo, useState } from "react";
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
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export default function FreightInvoiceList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  // palette (inline only)
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";

  // options
  const all = useMemo(() => [{ label: "All", value: "All" }], []);
  const parties = useMemo(
    () => [
      { label: "All", value: "All" },
      { label: "Party A", value: "Party A" },
      { label: "Party B", value: "Party B" },
    ],
    []
  );
  const banks = useMemo(
    () => [
      { label: "All", value: "All" },
      { label: "City Bank", value: "City Bank" },
      { label: "Eastern Bank PLC", value: "Eastern Bank PLC" },
    ],
    []
  );

  // columns
  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, align: "center" },
    { title: "Reference", dataIndex: "reference", width: 160 },
    {
      title: "Date",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    { title: "House Bill", dataIndex: "hbl", width: 160 },
    { title: "Attention", dataIndex: "attention", width: 160 },
    { title: "Bill to Party", dataIndex: "billTo", width: 180 },
    { title: "Master Bill", dataIndex: "mbl", width: 160 },
    { title: "Bank", dataIndex: "bank", width: 160 },
    {
      title: "Total Amount",
      dataIndex: "total",
      width: 140,
      align: "right",
      render: (v) => (v ? Number(v).toFixed(2) : "0"),
      sorter: (a, b) => (a.total || 0) - (b.total || 0),
    },
    {
      title: "Total Amount (EXG)",
      dataIndex: "totalExg",
      width: 180,
      align: "right",
      render: (v) => (v ? Number(v).toFixed(2) : "0"),
      sorter: (a, b) => (a.totalExg || 0) - (b.totalExg || 0),
    },
    { title: "Prepared By", dataIndex: "preparedBy", width: 160 },
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

  const data = []; // keep empty to match screenshot state

  // actions
  const onReset = () => {
    form.resetFields();
  };

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const onAdd = () => {
    // navigate to your create route e.g. /export-sea/freight-invoice/booking or /.../add
    console.log("Add Freight Invoice");
  };

  return (
    <div style={{ background: "#f3f6f7", minHeight: "100vh", padding: 12 }}>
    
    

      {/* Filter card */}
      <Card
        style={{
          marginTop: 8,
          
        }}
        bodyStyle={{ padding: 12 }}
      >
        <Form form={form} layout="vertical" initialValues={{ hbl: "All" }}>
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="House Bill" name="hbl">
                <Select options={all} defaultValue="All" showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Shipper" name="shipper">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Consignee" name="consignee">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Agent" name="agent">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Third Party" name="third">
                <Select options={parties} defaultValue="All" showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Bank" name="bank">
                <Select options={banks} defaultValue="All" showSearch />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Start Date *" name="startDate">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="End Date *" name="endDate">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
          </Row>

          {/* Filter text + Show page size */}
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
              <Input placeholder="Type to filter..." allowClear style={{ width: 260 }} />
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
              `Showing ${data.length === 0 ? 0 : range[0]} to ${data.length === 0 ? 0 : range[1]} of ${total} entries`,
          }}
          locale={{ emptyText: "No data available in table" }}
          scroll={{ x: 1400 }}
        />
      </Card>
    </div>
  );
}
