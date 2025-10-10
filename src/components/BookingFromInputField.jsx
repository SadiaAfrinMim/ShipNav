import React, { useState } from "react";
import { Form, Card, Row, Col, Divider, Typography, Button, message } from "antd";
import { SaveOutlined, FileAddOutlined, InfoCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import useLinearFocus from "../utils/useLinearFocus";
import { makeEmptyItem } from "../utils/itemHelpers";
import BookingDetails from "./BookingDetails/BookingDetailsForm";
import ItemsTable from "./BookingDetails/ItemsTable";
import apiClient from "../api/ApiClient";
import { addBooking } from "../api/booking/AddBooking";

const { Title, Text } = Typography;

export default function BookingImportGlassForm() {
  const [form] = Form.useForm();
  const [formKey, setFormKey] = useState(0);       // force-remount on reset (visual clear)
  const [items, setItems] = useState([makeEmptyItem()]);

  // Any defaults previously inside child form should be provided here:
  const initialValues = {
    status: "on_review",
    // date/hoDate defaults can be set here if you want dayjs() prefill
    // date: dayjs(), hoDate: dayjs(), ...
  };

  const normalizeItems = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    return Object.keys(raw)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => ({ _rowKey: k, ...(raw[k] || {}) }));
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const combined = { ...values, items: normalizeItems(values.items) };
      console.log("Booking payload:", combined);
      await addBooking(combined);
      message.success("Booking saved successfully!");
    } catch (err) {
      if (err.isAxiosError) {
        console.log("API Error:", err.response);
        message.error(
          err.response?.data?.message ||
          "There was an error saving your booking. Please try again."
        );
      } else {
        console.log("Validation Error:", err);
        message.error("Please check all required fields before saving.");
      }
    }
  };

  const handleReset = () => {
    message.info("✅ All values cleared");
    form.resetFields();
    setItems([makeEmptyItem()]);
    setFormKey((k) => k + 1); // remount form to wipe internal state
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <Form key={formKey} form={form} layout="vertical" size="middle" initialValues={initialValues}>
          <Card
            className="rounded-xl shadow-md border-0"
            styles={{ body: { padding: 0 } }}
            title={
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileAddOutlined className="mr-3 text-xl" />
                  <Title level={3} className="text-white m-0">Add Booking</Title>
                </div>
                <Text className="text-blue-200">
                  <InfoCircleOutlined className="mr-1" /> Fields marked with * are required <br />
                  Use Tab, Enter, or Shift+Tab keys to navigate fields
                </Text>
              </div>
            }
          >
            <div className="p-6">
              <Row gutter={24}>
                <Col xs={24}>
                  {/* 👉 Fields-only component, now part of THIS form context */}
                  <BookingDetails />
                </Col>
              </Row>

              <Divider orientation="left" style={{ fontSize: 16, fontWeight: 600 }}>Item Details</Divider>

              {/* Items table uses the same form context (Form.Item name paths) */}
              <ItemsTable items={items} setItems={setItems} />

              {/* Single combined Actions for Booking + Items */}
              <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200">
                <Button htmlType="button" onClick={handleReset} className="px-6" size="large" icon={<ReloadOutlined />}>
                  Reset
                </Button>
                <Button type="primary" icon={<SaveOutlined />} className="px-6 bg-blue-600 hover:bg-blue-700 border-blue-600" size="large" onClick={handleSave}>
                  Save Booking
                </Button>
              </div>
            </div>
          </Card>
        </Form>
      </div>
    </div>
  );
}
