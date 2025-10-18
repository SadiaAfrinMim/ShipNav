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

export default function ForwardLetterList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  // inline palette
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";

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
    { title: "To", dataIndex: "to", width: 200 },
    { title: "Imp. Reg. No.", dataIndex: "impRegNo", width: 160 },
    { title: "Line No.", dataIndex: "lineNo", width: 140 },
    { title: "Valid Upto", dataIndex: "validUpto", width: 140 },
    { title: "C&F Agent", dataIndex: "cnfAgent", width: 200 },
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

  // actions
  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };
  const reset = () => form.resetFields();
  const addForwardLetter = () => {
    // navigate to your create route, e.g. /import-sea/forward-letter/booking
    console.log("Add Forward Letter");
  };

  return (
    <div className="px-4">
   

      {/* Filter card */}
      <Card
       
      >
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
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
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
            scroll={{ x: 1300 }}
          />
        </Form>
      </Card>
    </div>
  );
}
