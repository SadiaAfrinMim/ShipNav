import React from "react";
import {
  Row,
  Col,
  Form,
  Select,
  DatePicker,
  Input,
  Radio,
  Button,
  Space,
  Typography,
  Divider,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const ShipmentAdviceForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 4,
        padding: 24,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
    

      <Form  form={form} layout="vertical" onFinish={handleSubmit}>
        {/* CATEGORY SECTION */}
        <Form.Item label="Category" name="category">
          <Radio.Group defaultValue="booking">
            <Radio value="booking">Booking No.</Radio>
            <Radio value="stuffing">Stuffing Plan No.</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={16}>
          {/* LEFT COLUMN */}
          <Col span={12}>
            <Form.Item name="bookingNo">
              <Select placeholder="(-- Select Booking --)" />
            </Form.Item>

            <Form.Item label="Shipping Line" name="shippingLine">
              <Select placeholder="(-- Select/None --)" />
            </Form.Item>

            <Form.Item label="FDR/VSL" name="fdrVsl">
              <Select placeholder="(-- Select/None --)" />
            </Form.Item>

            <Form.Item label="FDR/VSL ETD" name="fdrVslEtd">
              <Space>
                <DatePicker />
                <Select placeholder="(-- Select/None --)" style={{ width: 180 }} />
              </Space>
            </Form.Item>

            <Form.Item label="MTR/VSL" name="mtrVsl">
              <Select placeholder="(-- Select/None --)" />
            </Form.Item>

            <Form.Item label="MTR/VSL ETD" name="mtrVslEtd">
              <Space>
                <DatePicker />
                <Select placeholder="(-- Select/None --)" style={{ width: 180 }} />
              </Space>
            </Form.Item>
          </Col>

          {/* RIGHT COLUMN */}
          <Col span={12}>
            <Form.Item
              
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Remark" name="remark">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label="FDR/VSL Voyage" name="fdrVoyage">
              <Input />
            </Form.Item>

            <Form.Item label="FDR/VSL ETA" name="fdrEta">
              <Space>
                <DatePicker />
                <Select placeholder="(-- Select/None --)" style={{ width: 180 }} />
              </Space>
            </Form.Item>

            <Form.Item label="MTR/VSL" name="mtrVslRight">
              <Input />
            </Form.Item>

            <Form.Item label="MTR/VSL ETA" name="mtrEta">
              <Space>
                <DatePicker />
                <Select placeholder="(-- Select/None --)" style={{ width: 180 }} />
              </Space>
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ margin: "8px 0" }} />

        <Row justify="space-between" align="middle">
          <Col>
            <span style={{ fontSize: 12, color: "#888" }}>* Required Fields</span>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ShipmentAdviceForm;
