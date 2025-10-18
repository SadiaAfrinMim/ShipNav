import React, { useMemo } from "react";
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
  Typography,
} from "antd";
import { BorderOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function AddForwardLetter() {
  const [form] = Form.useForm();

  // inline palette
  const teal = "#00aeb7";
  const cyan = "#0bb7c1";
  const border = "#cfe7ea";
  const soft = "#e9f6f8";

  // options
  const hblOptions = useMemo(
    () => [
      { label: "(~ Select/None ~)", value: "" },
      { label: "HBL#25000001", value: "HBL#25000001" },
      { label: "HBL#25000002", value: "HBL#25000002" },
    ],
    []
  );
  const toOptions = useMemo(
    () => [
      { label: "(~ Select/None ~)", value: "" },
      { label: "C&F Agent A", value: "C&F Agent A" },
      { label: "C&F Agent B", value: "C&F Agent B" },
    ],
    []
  );
  const cnfAgents = useMemo(
    () => [
      { label: "(~ Select/None ~)", value: "" },
      { label: "C&F Agent A", value: "C&F Agent A" },
      { label: "C&F Agent B", value: "C&F Agent B" },
    ],
    []
  );

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("SUBMIT:", values);
    } catch { /* AntD shows validation errors */ }
  };

  return (
    <div style={{ background: "#f3f6f7", minHeight: "100vh", padding: 10 }}>
      {/* Top teal header */}
    

      {/* Outer card */}
      <Card
       
      >
        <Form form={form} layout="vertical">
          <Row gutter={[12, 8]}>
            {/* LEFT form column */}
            <Col xs={24} lg={12}>
              <Form.Item label="HBL" name="hbl" rules={[{ required: true, message: "HBL is required" }]}>
                <Select options={hblOptions} showSearch />
              </Form.Item>

              <Form.Item label="Date *" name="date" rules={[{ required: true, message: "Date is required" }]}>
                <DatePicker style={{ width: "100%" }} format="D MMMM, YYYY" />
              </Form.Item>

              <Form.Item label="To" name="to">
                <Select options={toOptions} showSearch />
              </Form.Item>

              <Form.Item label="Imp. Reg. No." name="impRegNo">
                <Input />
              </Form.Item>

              <Form.Item label="Line No." name="lineNo">
                <Input />
              </Form.Item>

              <Form.Item label="Valid Upto" name="validUpto">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="C&F Agent" name="cnfAgent">
                <Select options={cnfAgents} showSearch />
              </Form.Item>
            </Col>

            {/* RIGHT info panel */}
          <Col xs={24} lg={12}>
  <div className="bg-cyan-50 border border-cyan-200 rounded-md p-3">
    {/* MBL / VSL / ETA */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="text-sm">
        <span className="font-medium">MBL :</span>{" "}
        <span className="text-slate-500"></span>
      </div>
      <div className="text-sm">
        <span className="font-medium">VSL :</span>{" "}
        <span className="text-slate-500"></span>
      </div>
      <div className="text-sm">
        <span className="font-medium">ETA :</span>{" "}
        <span className="text-slate-500"></span>
      </div>
    </div>

    {/* Container header grid */}
    <div className="mt-3 bg-cyan-100/60 border border-cyan-200 rounded-sm px-3 py-2 text-slate-700 font-semibold">
      <div className="grid grid-cols-6 gap-2 text-xs md:text-sm">
        <span>Cntr. Type</span>
        <span>Cntr. No.</span>
        <span>Mode</span>
        <span>Volume (in)</span>
        <span>Package Quantity (in)</span>
        <span>Gross Weight (in)</span>
      </div>
    </div>
  </div>
</Col>

          </Row>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `1px solid ${border}`,
              paddingTop: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#6b7b7e", fontSize: 12 }}>* Required Fields</Text>

            <div style={{ marginLeft: "auto" }}>
              <Space>
                <Button>Cancel</Button>
                <Button
                  type="primary"
                  onClick={onSubmit}
                  style={{ background: "#1b8fff", borderColor: "#1b8fff", borderRadius: 3, padding: "0 18px" }}
                >
                  Submit
                </Button>
              </Space>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}
