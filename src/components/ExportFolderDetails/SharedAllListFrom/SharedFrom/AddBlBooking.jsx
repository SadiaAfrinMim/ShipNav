// File: AddBlBooking.jsx
import React from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Checkbox,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import HeaderAddFromTitle from "../HeaderTitle/HeaderAddFromTitle";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function AddBlBooking() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const teal = "#00b4bf";
  const border = "#dbe4f0";
  const panelBg = "#e9f7f8";

  const handleSubmit = (values) => {
    console.log("B/L BOOKING SUBMIT:", values);
    // এখানে API call করবে
  };

  return (
    <div className="px-4 py-2">
      {/* Top teal header bar */}
     <HeaderAddFromTitle></HeaderAddFromTitle>

      {/* Main card */}
      <Card
        style={{
          borderRadius: 0,
          borderTop: "none",
          borderColor: border,
        }}
        bodyStyle={{ padding: 14 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          {/* Top HBL + Date row */}
          <Row gutter={[16, 6]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="HBL"
                name="hbl"
                style={{ marginBottom: 8 }}
                rules={[{ required: true, message: "Please select HBL" }]}
              >
                <Select
                  size="small"
                  placeholder="-- Select/None --"
                >
                  <Option value="HBL-SEA-25000001">HBL-SEA-25000001</Option>
                  <Option value="HBL-SEA-25000002">HBL-SEA-25000002</Option>
                  <Option value="HBL-SEA-25000003">HBL-SEA-25000003</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Date *"
                name="date"
                style={{ marginBottom: 8 }}
                rules={[{ required: true, message: "Please select Date" }]}
              >
                <DatePicker
                  size="small"
                  className="w-full"
                  format="DD MMMM, YYYY"
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Two main columns – Names (left) / Addresses (right) */}
          <Row gutter={[16, 4]}>
            {/* LEFT – Names */}
            <Col xs={24} md={12}>
              {[
                ["shipperName", "Shipper Name"],
                ["shipperBank", "Shipper Bank"],
                ["consigneeName", "Consignee Name"],
                ["consigneeBank", "Consignee Bank"],
                ["notify1Name", "First Notify Name"],
                ["notify2Name", "Second Notify Name"],
                ["notify3Name", "Third Notify Name"],
                ["agentName", "Agent Name"],
                ["localBlNo", "Local BL No."],
              ].map(([name, label]) => (
                <Form.Item
                  key={name}
                  label={label}
                  name={name}
                  style={{ marginBottom: 6 }}
                >
                  <Input size="small" />
                </Form.Item>
              ))}

              {/* Local BL Marks & No. – multi-line */}
              <Form.Item
                label="Marks & No."
                name="marksNo"
                style={{ marginBottom: 8 }}
              >
                <TextArea
                  rows={2}
                  className="resize-none"
                  style={{ fontSize: 12 }}
                />
              </Form.Item>
            </Col>

            {/* RIGHT – Addresses / description */}
            <Col xs={24} md={12}>
              {[
                ["shipperAddress", "Shipper Address"],
                ["shipperBankAddress", "Shipper Bank Address"],
                ["consigneeAddress", "Consignee Address"],
                ["consigneeBankAddress", "Consignee Bank Address"],
                ["notify1Address", "First Notify Address"],
                ["notify2Address", "Second Notify Address"],
                ["notify3Address", "Third Notify Address"],
                ["agentAddress", "Agent Address"],
              ].map(([name, label]) => (
                <Form.Item
                  key={name}
                  label={label}
                  name={name}
                  style={{ marginBottom: 6 }}
                >
                  <TextArea
                    rows={1}
                    className="resize-none"
                    style={{ fontSize: 12 }}
                  />
                </Form.Item>
              ))}

              <Form.Item
                label="Description of Goods"
                name="goodsDescription"
                style={{ marginBottom: 8 }}
              >
                <TextArea
                  rows={2}
                  className="resize-none"
                  style={{ fontSize: 12 }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Pricing / Collect + MAWB panel */}
          <Row gutter={[16, 8]} style={{ marginTop: 4 }}>
            {/* Pricing / Collect block */}
            <Col xs={24} md={12}>
              <div
                style={{
                  border: `1px solid ${border}`,
                  borderRadius: 4,
                  padding: 8,
                }}
              >
                <div style={{ display: "flex", fontSize: 11, marginBottom: 4 }}>
                  <div
                    style={{
                      width: "50%",
                      textAlign: "center",
                      fontWeight: 600,
                      borderRight: `1px solid ${border}`,
                    }}
                  >
                    PRICING
                  </div>
                  <div
                    style={{
                      width: "50%",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    COLLECT
                  </div>
                </div>

                {[
                  "Weight Charge",
                  "Valuation Charge",
                  "Tax",
                  "Total Other Charges Due Agent",
                  "Total Other Charges Due Carrier",
                  "Total",
                  "Rate of Exchange",
                  "Other Charges",
                ].map((label) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        width: 130,
                        fontSize: 11,
                        color: "#475569",
                      }}
                    >
                      {label}
                    </span>

                    <Form.Item
                      name={["pricing", label, "prepaid"]}
                      style={{ marginBottom: 0, flex: 1 }}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      name={["pricing", label, "collect"]}
                      style={{ marginBottom: 0, flex: 1 }}
                    >
                      <Input size="small" />
                    </Form.Item>
                  </div>
                ))}
              </div>
            </Col>

            {/* MAWB info panel */}
            <Col xs={24} md={12}>
              <div
                style={{
                  border: `1px solid ${border}`,
                  borderRadius: 4,
                  background: panelBg,
                  padding: 8,
                  minHeight: 180,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  MAWB
                </div>

                <div style={{ fontSize: 10, lineHeight: 1.4 }}>
                  <div>Routing &amp; Flight Schedule</div>
                  <div>Airport of Departure and Destination</div>
                  <div>Flight / Date</div>
                  <div>Handling Information</div>
                  <div>Accounting Information</div>
                  <div>Agent IATA Code &amp; Account No.</div>
                  <div>Airport of Destination</div>
                  <div>Next Destination and Flight No.</div>
                  <div>Currency / CHGS Code / WT/VAL / Other</div>
                  <div>Declared Value for Carriage</div>
                  <div>Declared Value for Customs</div>
                  <div>Charge Destination</div>
                  <div>Chargeable Weight</div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Commodity / totals row */}
          <Row gutter={[16, 6]} style={{ marginTop: 6 }}>
            <Col xs={24} md={14}>
              <Form.Item
                label="Commodity / Other Details"
                name="commodity"
                style={{ marginBottom: 6 }}
              >
                <TextArea
                  rows={1}
                  className="resize-none"
                  style={{ fontSize: 12 }}
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item
                label="Total"
                name="total"
                style={{ marginBottom: 6 }}
              >
                <Input size="small" />
              </Form.Item>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item
                label="AWB Weight"
                name="awbWeight"
                style={{ marginBottom: 6 }}
              >
                <Input size="small" />
              </Form.Item>
            </Col>
            <Col xs={12} md={2}>
              <Form.Item
                label="NVC"
                name="nvc"
                style={{ marginBottom: 6 }}
              >
                <Input size="small" />
              </Form.Item>
            </Col>
          </Row>

          {/* Footer */}
          <div
            style={{
              borderTop: `1px solid ${border}`,
              marginTop: 8,
              paddingTop: 6,
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
                
               className="to-blue-500 "
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
