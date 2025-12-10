// File: AddRequestLetter.jsx
import React from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function AddRequestLetter() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const primaryBlue = "#1677ff";
  const border = "#d2dbf8";
  const bgSoft = "#f8faff";

  const handleSubmit = (values) => {
    console.log("SUBMITTED:", values);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log("FILE SELECTED:", file);
  };

  return (
    <div className="px-4" style={{ marginTop: 10 }}>
      <Card
        style={{
          borderRadius: 10,
          background: "#fff",
          borderColor: border,
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
        bodyStyle={{ padding: "22px 26px" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          {/* Date */}
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Date *</span>}
            name="date"
            rules={[{ required: true, message: "Please select Date" }]}
            style={{ marginBottom: 14 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              size="large"
              format="DD MMMM, YYYY"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          {/* GH Agent */}
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>GH Agent *</span>}
            name="ghAgent"
            rules={[{ required: true, message: "Please select GH Agent" }]}
            style={{ marginBottom: 14 }}
          >
            <Select
              size="large"
              placeholder="Select GH Agent"
              allowClear
              style={{
                background: bgSoft,
                borderRadius: 6,
              }}
            >
              <Option value="GH Agent A">GH Agent A</Option>
              <Option value="GH Agent B">GH Agent B</Option>
              <Option value="GH Agent C">GH Agent C</Option>
              <Option value="GH Agent D">GH Agent D</Option>
            </Select>
          </Form.Item>

          {/* Authorized Person + File Upload */}
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Authorized Person *</span>}
            style={{ marginBottom: 14 }}
            required
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Form.Item
                name="authorizedPerson"
                rules={[
                  { required: true, message: "Enter authorized person name" },
                ]}
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Input
                  size="large"
                  placeholder="Enter name"
                  style={{ borderRadius: 6 }}
                />
              </Form.Item>

              <input
                type="file"
                onChange={handleFileChange}
                style={{
                  padding: "6px",
                  borderRadius: 6,
                  background: "#f0f5ff",
                  border: `1px dashed ${primaryBlue}`,
                  cursor: "pointer",
                }}
              />

              <Text type="secondary" style={{ fontSize: 12 }}>
                Accepted formats: png, jpg — Max: 500KB
              </Text>
            </Space>
          </Form.Item>

          {/* MAWB */}
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>MAWB</span>}
            name="mawb"
            style={{ marginBottom: 16 }}
          >
            <Select
              size="large"
              allowClear
              placeholder="Select MAWB"
              style={{
                borderRadius: 6,
                background: bgSoft,
              }}
            >
              <Option value="MAWB-001">MAWB-001</Option>
              <Option value="MAWB-002">MAWB-002</Option>
              <Option value="MAWB-003">MAWB-003</Option>
            </Select>
          </Form.Item>

          {/* Footer */}
          <div
            style={{
              borderTop: `1px solid ${border}`,
              paddingTop: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Text type="secondary" style={{ fontSize: 12 }}>
              * Required Fields
            </Text>

            <Space>
              <Button
                style={{
                  minWidth: 100,
                  background: "#fff",
                  borderColor: primaryBlue,
                  color: primaryBlue,
                  borderRadius: 6,
                }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                style={{
                  minWidth: 110,
                  background: primaryBlue,
                  borderColor: primaryBlue,
                  borderRadius: 6,
                }}
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
}
