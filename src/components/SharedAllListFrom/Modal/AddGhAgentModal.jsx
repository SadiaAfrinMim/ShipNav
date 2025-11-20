// File: src/pages/settings/gh-agent/Modal/AddGhAgentModal.jsx  

import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const AddGhAgentModal = ({
  open,
  onCancel,
  onSubmit,
  initialValues = null,
  title = "Add GH Agent", // আগের টাইটেল ফলো করবে
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) form.setFieldsValue(initialValues);
      else form.resetFields();
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    onSubmit && onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width="70%"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
    >
      {/* HEADER (previous style অনুযায়ী) */}
      <div
        style={{
          
          padding: "10px 18px",
         
          borderRadius: "4px 4px 0 0",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          <MenuOutlined />
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span style={{ fontSize: 16, fontWeight: 600 }}>{title}</span>
          <span style={{ fontSize: 11, opacity: 0.9 }}>
            Create or update ground handling agent information.
          </span>
        </div>
      </div>

      {/* FORM AREA */}
      <div className="bg-white px-6 py-6">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name *"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input.TextArea rows={3} />
          </Form.Item>

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 20,
            }}
          >
            <Button onClick={onCancel}>Close</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddGhAgentModal;
