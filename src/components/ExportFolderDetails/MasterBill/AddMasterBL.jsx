// File: AddMasterBL.jsx
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
  Typography,
} from "antd";
import {
  CalendarOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";



const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const AddMasterBL = () => {
  const [form] = Form.useForm();

  // ---- Routing rows ----
  const [routes, setRoutes] = useState([
    {
      id: 1,
      uscNo: "",
      fromPol: undefined,
      toPod: undefined,
      date: null,
    },
  ]);

  // 🔻 delete modal state
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleRouteChange = (index, key, value) => {
    const clone = [...routes];
    clone[index] = { ...clone[index], [key]: value };
    setRoutes(clone);
  };

  const addRouteRow = () => {
    setRoutes((prev) => [
      ...prev,
      {
        id: Date.now(),
        uscNo: "",
        fromPol: undefined,
        toPod: undefined,
        date: null,
      },
    ]);
  };

  // আসল ডিলিট (মডাল থেকে confirm হলে কল হবে)
  const removeRouteRow = (index) => {
    if (routes.length === 1) return; // অন্তত ১টা রো থাকুক
    setRoutes(routes.filter((_, i) => i !== index));
  };

  const onFinish = (values) => {
    console.log("FORM:", values, "ROUTES:", routes);
  };

  // 🔻 DeleteModal confirm/cancel হ্যান্ডলার
  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      removeRouteRow(deleteIndex);
    }
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f7fb",
      }}
    >
      <Card
        style={{
          margin: "0 auto",
          borderRadius: 4,
          padding: 0,
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* ===== FORM BODY ===== */}
        <div style={{ padding: "12px 16px 10px", background: "#fff" }}>
          <Form
            form={form}
            layout="vertical"
            size="small"
            initialValues={{
              date: dayjs("2025-12-10"),
            }}
            onFinish={onFinish}
          >
            {/* 2-column top section */}
            <Row gutter={16}>
              {/* LEFT COLUMN */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date *"
                  name="date"
                  rules={[{ required: true, message: "Date is required" }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD MMMM, YYYY"
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>

                <Form.Item label="Carrier" name="carrier">
                  <Select placeholder="(~ Select/None ~)" allowClear>
                    <Option value="ONE Line">ONE Line</Option>
                    <Option value="MSC">MSC</Option>
                    <Option value="ECU Worldwide">ECU Worldwide</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Destination Agent" name="destinationAgent">
                  <Select placeholder="(~ Select/None ~)" allowClear>
                    <Option value="One Container Line GmbH">
                      One Container Line GmbH
                    </Option>
                    <Option value="Agent X">Agent X</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Prealert Send" name="prealertSend">
                  <Input />
                </Form.Item>

                <Form.Item label="POL" name="pol">
                  <Select placeholder="(~ Select/None ~)" allowClear>
                    <Option value="Chattogram">Chattogram</Option>
                    <Option value="Dhaka ICD">Dhaka ICD</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="ETD Date" name="etdDate">
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD MMMM, YYYY"
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>

                <Form.Item label="HBL" name="hbl">
                  <Select mode="multiple" placeholder="None selected" allowClear>
                    <Option value="ES#25000001">ES#25000001</Option>
                    <Option value="ES#25000002">ES#25000002</Option>
                    <Option value="ES#25000003">ES#25000003</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* RIGHT COLUMN */}
              <Col xs={24} md={12}>
                <Form.Item label="MBL" name="mbl">
                  <Input />
                </Form.Item>

                <Form.Item label="Origin Agent" name="originAgent">
                  <Select placeholder="(~ Select/None ~)" allowClear>
                    <Option value="N2N Supply Chain Solutions Ltd">
                      N2N Supply Chain Solutions Ltd
                    </Option>
                    <Option value="Agent Y">Agent Y</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Prealert Receive" name="prealertReceive">
                  <Input />
                </Form.Item>

                <Form.Item label="Prealert Sender" name="prealertSender">
                  <Input />
                </Form.Item>

                <Form.Item label="POD" name="pod">
                  <Select placeholder="(~ Select/None ~)" allowClear>
                    <Option value="Antwerp">Antwerp</Option>
                    <Option value="Felixstowe">Felixstowe</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="ETA Date" name="etaDate">
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD MMMM, YYYY"
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>

                <Form.Item label="Remark" name="remark">
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>

            {/* ===== ROUTING SECTION ===== */}
            <div
              style={{
                marginTop: 6,
                border: "1px solid #d8e3ee",
                borderRadius: 3,
                overflow: "hidden",
                fontSize: 11,
              }}
            >
              {/* Routing header row (blue strip) */}
              <div
                style={{
                  background: "#e9f7fb",
                  padding: "4px 8px",
                  borderBottom: "1px solid #d8e3ee",
                  fontWeight: 600,
                }}
              >
                Routing
              </div>

              {/* Column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 2fr 2fr 1.5fr 0.8fr",
                  background: "#f7fbff",
                  borderBottom: "1px solid #e2e8f3",
                  fontWeight: 500,
                }}
              >
                {["USC No.", "From (POL)", "To (POD)", "Date", "Action"].map(
                  (h) => (
                    <div
                      key={h}
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #e2e8f3",
                      }}
                    >
                      {h}
                    </div>
                  )
                )}
              </div>

              {/* Rows */}
              {routes.map((r, idx) => (
                <div
                  key={r.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 2fr 2fr 1.5fr 0.8fr",
                    borderBottom:
                      idx === routes.length - 1
                        ? "none"
                        : "1px solid #f0f2f7",
                  }}
                >
                  {/* USC No */}
                  <div
                    style={{
                      padding: "4px 6px",
                      borderRight: "1px solid #f0f2f7",
                    }}
                  >
                    <Input
                      size="small"
                      placeholder="USC No."
                      value={r.uscNo}
                      onChange={(e) =>
                        handleRouteChange(idx, "uscNo", e.target.value)
                      }
                    />
                  </div>

                  {/* From (POL) */}
                  <div
                    style={{
                      padding: "4px 6px",
                      borderRight: "1px solid #f0f2f7",
                    }}
                  >
                    <Select
                      size="small"
                      placeholder="(~ Select/None ~)"
                      value={r.fromPol}
                      onChange={(v) => handleRouteChange(idx, "fromPol", v)}
                      style={{ width: "100%" }}
                    >
                      <Option value="Chattogram">Chattogram</Option>
                      <Option value="Dhaka ICD">Dhaka ICD</Option>
                    </Select>
                  </div>

                  {/* To (POD) */}
                  <div
                    style={{
                      padding: "4px 6px",
                      borderRight: "1px solid #f0f2f7",
                    }}
                  >
                    <Select
                      size="small"
                      placeholder="(~ Select/None ~)"
                      value={r.toPod}
                      onChange={(v) => handleRouteChange(idx, "toPod", v)}
                      style={{ width: "100%" }}
                    >
                      <Option value="Antwerp">Antwerp</Option>
                      <Option value="Felixstowe">Felixstowe</Option>
                    </Select>
                  </div>

                  {/* Date */}
                  <div
                    style={{
                      padding: "4px 6px",
                      borderRight: "1px solid #f0f2f7",
                    }}
                  >
                    <DatePicker
                      size="small"
                      style={{ width: "100%" }}
                      value={r.date}
                      onChange={(v) => handleRouteChange(idx, "date", v)}
                      format="DD/MM/YYYY"
                      suffixIcon={<CalendarOutlined />}
                    />
                  </div>

                  {/* Action */}
                  <div
                    style={{
                      padding: "4px 6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      danger
                      type="text"
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => setDeleteIndex(idx)} // 🔻 এখানে modal open
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add Row button */}
            <div style={{ marginTop: 8 }}>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                style={{
                  backgroundColor: "#28a745",
                  borderColor: "#28a745",
                  fontWeight: 500,
                }}
                onClick={addRouteRow}
              >
                Add Row
              </Button>
            </div>

            {/* Footer: required + submit */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 16,
                alignItems: "center",
              }}
            >
              <Text type="secondary" style={{ fontSize: 11 }}>
                * Required Fields
              </Text>

              <Button type="primary" htmlType="submit" size="small">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Card>

      {/* 🔻 Delete Modal */}
      <DeleteModal
       
      />
    </div>
  );
};

export default AddMasterBL;
