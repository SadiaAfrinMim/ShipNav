// File: src/pages/settings/container/Modal/AddContainerModal.jsx

import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const AddContainerModal = ({
  open,
  onCancel,
  onSubmit,
  initialValues = null,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={430}
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
    >
      {/* TOP TEAL HEADER – same style as screenshot */}
      <div
        style={{
          background: "#00BCD4",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#fff",
          borderRadius: "4px 4px 0 0",
          fontSize: 14,
        }}
      >
        <MenuOutlined />
        <span style={{ fontWeight: 500 }}>Add Container</span>
      </div>

      {/* WHITE BODY AREA */}
      <div className="bg-white px-6 py-5">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name *"
            name="name"
            rules={[{ required: true, message: "Please enter container name" }]}
          >
            <Input />
          </Form.Item>

          {/* FOOTER BUTTONS (Close / Submit) */}
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <Button onClick={onCancel}>✕ Close</Button>
            <Button type="primary" htmlType="submit">
              ✔ Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddContainerModal;
