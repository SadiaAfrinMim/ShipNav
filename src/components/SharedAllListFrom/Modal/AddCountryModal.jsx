// File: AddCountryModal.jsx 
import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const AddCountryModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values); // parent এ save / API call করবে
    form.resetFields();
  };

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={700}
      destroyOnClose
      closeIcon={null}
      className="add-country-modal"
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 16,
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: 12,
        }}
      >
        {/* round icon */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "999px",
            background: "#e6f7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1890ff",
            fontSize: 20,
          }}
        >
          <MenuOutlined />
        </div>

        {/* title + subtitle */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            Add Country
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#8c8c8c",
              marginTop: 4,
            }}
          >
            Create and configure a new country with name and code.
          </div>
        </div>

        {/* top-right close button */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#8c8c8c",
            fontSize: 18,
          }}
        >
          <CloseOutlined />
        </button>
      </div>

      {/* FORM BODY */}
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* Name */}
        <Form.Item
          label="Name *"
          name="name"
          rules={[{ required: true, message: "Please enter country name" }]}
        >
          <Input />
        </Form.Item>

        {/* Code */}
        <Form.Item label="Code" name="code">
          <Input />
        </Form.Item>

        {/* FOOTER BUTTONS */}
        <div className="mt-4 flex justify-end gap-3">
          <Button onClick={handleClose}>✖ Close</Button>
          <Button type="primary" htmlType="submit">
            ✔ Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddCountryModal;
