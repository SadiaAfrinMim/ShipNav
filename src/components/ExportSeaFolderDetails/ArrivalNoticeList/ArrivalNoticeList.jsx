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
} from "antd";
import { ReloadOutlined, PlusOutlined, CalendarOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function ArrivalNoticeList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  // palette (inline only)
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";

  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, align: "center" },
    { title: "HBL", dataIndex: "hbl", width: 160 },
    {
      title: "Date *",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    {
      title: "Notify Party",
      dataIndex: "notify",
      width: 220,
      sorter: (a, b) => (a.notify || "").localeCompare(b.notify || ""),
    },
    {
      title: "Consignee",
      dataIndex: "consignee",
      width: 220,
      sorter: (a, b) => (a.consignee || "").localeCompare(b.consignee || ""),
    },
    {
      title: "Shipper",
      dataIndex: "shipper",
      width: 220,
      sorter: (a, b) => (a.shipper || "").localeCompare(b.shipper || ""),
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

  const data = []; // keep empty to match screenshot

  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const reset = () => form.resetFields();

  const addArrival = () => {
    // navigate to your create route, e.g. /import-sea/arrival-notice/booking
    console.log("Add Arrival Notice");
  };

  return (
    <div className="px-4">
      {/* Teal title bar */}
     

      {/* Filter card */}
      <Card
       
      >
        <Form form={form} layout="vertical">
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12}>
              <Form.Item label="Start Date *" name="startDate">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="End Date *" name="endDate">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
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
                `Showing ${data.length === 0 ? 0 : range[0]} to ${
                  data.length === 0 ? 0 : range[1]
                } of ${total} entries`,
            }}
            locale={{ emptyText: "No data available in table" }}
            scroll={{ x: 1200 }}
          />
        </Form>
      </Card>
    </div>
  );
}
