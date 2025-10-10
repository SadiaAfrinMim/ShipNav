import React, { useState } from "react";
import { Form, Row, Col, Divider, Button, message } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import BookingHeader from "../components/BookingHeader";

// Use your real path to the details form component:
import BookingDetails from "../components/BookingDetails/BookingDetailsForm";
// Use the ItemsTable you shared:

export default function BookingForm() {
  const [form] = Form.useForm();

  // Force-remount key to visually clear any internal input/select state
  const [formKey, setFormKey] = useState(0);

  // BookingDetails needs this in your project
  const [radioValue, setRadioValue] = useState("LC");

  // ItemsTable rows (keys only; fields are under Form via Form.Item)
  const [items, setItems] = useState([{ key: 1 }]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Log booking inputs + item details separately
      console.log("Booking inputs:", values);
      const itemDetails = items.map(({ key, ...rest }) => rest);
      console.log("Item details:", itemDetails);
      message.success("Booking saved!");
    } catch (err) {
      message.error("Please check the form for errors.");
      console.log("Validation failed:", err);
    }
  };

  const handleReset = () => {
    message.info("✅ All values cleared");
    form.resetFields();
    setItems([{ key: 1 }]);
    setRadioValue("LC");
    setFormKey((k) => k + 1); // remount Form tree to fully clear visuals
  };

  return (
    <div
      style={{
        padding: 24,
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #bbdefb 50%, #90caf9 100%)",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: 20,
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        <BookingHeader />

        <Form key={formKey} form={form} layout="vertical" size="middle">
          <div style={{ padding: 28 }}>
            {/* Booking inputs (single details block) */}
            <Row gutter={28}>
              <Col xs={24}>
                <BookingDetails
                  radioValue={radioValue}
                  setRadioValue={setRadioValue}
                />
              </Col>
            </Row>

            {/* Single combined actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 18,
                marginTop: 32,
                paddingTop: 28,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Button
                onClick={handleReset}
                size="large"
                icon={<ReloadOutlined />}
              >
                Reset
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<SaveOutlined />}
                onClick={handleSave}
              >
                Save Booking
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
