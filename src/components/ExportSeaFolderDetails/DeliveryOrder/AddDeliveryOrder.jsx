// File: AddDeliveryOrder.jsx
import React from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Typography,
  Select,
  Row,
  Col,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function AddDeliveryOrder() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Blue palette
  const primaryBlue = "#1677ff";
  const border = "#d4ddf5";
  const rightPanelBg = "#f5f8ff";

  const handleSubmit = (values) => {
    console.log("DELIVERY ORDER SUBMIT:", values);
    // এখানে তোমার API call হবে
  };

  return (
    <div className="px-4">
      <Card
        style={{
          borderRadius: 8,
          borderColor: border,
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            hbl: undefined,
          }}
        >
          {/* == MAIN FLEX WRAPPER (2 : 3)== */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap", // ছোট স্ক্রিনে নিচে নেবে
            }}
          >
            {/* LEFT SIDE: 2 অংশ */}
            <div
              style={{
                flex: 2,
                minWidth: 320,
              }}
            >
              <Row gutter={[12, 4]}>
                <Col span={24}>
                  <Form.Item
                    label="HBL"
                    name="hbl"
                    style={{ marginBottom: 10 }}
                    rules={[{ required: true, message: "Please select HBL" }]}
                  >
                    <Select
                      placeholder="-- Select/None --"
                      size="middle"
                      allowClear
                    >
                      <Option value="HBL-SEA-25000001">
                        HBL-SEA-25000001
                      </Option>
                      <Option value="HBL-SEA-25000002">
                        HBL-SEA-25000002
                      </Option>
                      <Option value="HBL-SEA-25000003">
                        HBL-SEA-25000003
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Date *"
                    name="date"
                    style={{ marginBottom: 10 }}
                    rules={[{ required: true, message: "Please select Date" }]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      suffixIcon={<CalendarOutlined />}
                      format="DD MMMM, YYYY"
                      size="middle"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Deliver To"
                    name="deliverTo"
                    style={{ marginBottom: 10 }}
                    rules={[
                      { required: true, message: "Please enter Deliver To" },
                    ]}
                  >
                    <Input size="middle" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="B/E No"
                    name="beNo"
                    style={{ marginBottom: 10 }}
                    rules={[{ required: true, message: "Please enter B/E No" }]}
                  >
                    <Input size="middle" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="B/E Date"
                    name="beDate"
                    style={{ marginBottom: 10 }}
                    rules={[
                      { required: true, message: "Please select B/E Date" },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      suffixIcon={<CalendarOutlined />}
                      format="DD MMMM, YYYY"
                      size="middle"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Valid Upto"
                    name="validUpto"
                    style={{ marginBottom: 10 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select Valid Upto date",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      suffixIcon={<CalendarOutlined />}
                      format="DD MMMM, YYYY"
                      size="middle"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Marks & No."
                    name="marksNo"
                    style={{ marginBottom: 10 }}
                  >
                    <TextArea rows={2} style={{ resize: "none" }} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    style={{ marginBottom: 10 }}
                  >
                    <TextArea rows={2} style={{ resize: "none" }} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Remark"
                    name="remark"
                    style={{ marginBottom: 4 }}
                  >
                    <TextArea rows={2} style={{ resize: "none" }} />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* RIGHT SIDE: 3 অংশ */}
            <div
              style={{
                flex: 3,
                minWidth: 320,
              }}
            >
              <div
                style={{
                  border: `1px solid ${border}`,
                  background: rightPanelBg,
                  padding: 10,
                  borderRadius: 6,
                  minHeight: 210,
                  boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
                }}
              >
                {/* Top info (MBL / Reg / VSL / Arrival Date) */}
                <Row gutter={[8, 4]}>
                  <Col span={24}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        color: "#334155",
                      }}
                    >
                      <span>
                        <strong>MBL :</strong>{" "}
                        <span style={{ fontWeight: 400, color: "#64748b" }}>
                          ----------
                        </span>
                      </span>
                      <span>
                        <strong>VSL :</strong>{" "}
                        <span style={{ fontWeight: 400, color: "#64748b" }}>
                          ----------
                        </span>
                      </span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        color: "#334155",
                      }}
                    >
                      <span>
                        <strong>Reg. No. :</strong>{" "}
                        <span style={{ fontWeight: 400, color: "#64748b" }}>
                          ----------
                        </span>
                      </span>
                      <span>
                        <strong>Arrival Date :</strong>{" "}
                        <span style={{ fontWeight: 400, color: "#64748b" }}>
                          ----------
                        </span>
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* Container header row */}
                <div
                  style={{
                    marginTop: 10,
                    border: `1px solid ${border}`,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1.3fr 1.3fr 1fr 1.2fr 1.7fr 1.5fr",
                      background: primaryBlue,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "5px 4px",
                        borderRight: "1px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      Cntr. Type
                    </div>
                    <div
                      style={{
                        padding: "5px 4px",
                        borderRight: "1px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      Cntr. No.
                    </div>
                    <div
                      style={{
                        padding: "5px 4px",
                        borderRight: "1px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      Mode
                    </div>
                    <div
                      style={{
                        padding: "5px 4px",
                        borderRight: "1px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      Volume (In)
                    </div>
                    <div
                      style={{
                        padding: "5px 4px",
                        borderRight: "1px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      Package Quantity (In)
                    </div>
                    <div style={{ padding: "5px 4px" }}>
                      Gross Weight (In)
                    </div>
                  </div>

                  <div
                    style={{
                      minHeight: 26,
                      background: "#ffffff",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              borderTop: `1px solid ${border}`,
              marginTop: 10,
              paddingTop: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text type="secondary" style={{ fontSize: 11 }}>
              * Required Fields
            </Text>

            <div style={{ marginLeft: "auto" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  minWidth: 120,
                  background: primaryBlue,
                  borderColor: primaryBlue,
                  borderRadius: 4,
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}
