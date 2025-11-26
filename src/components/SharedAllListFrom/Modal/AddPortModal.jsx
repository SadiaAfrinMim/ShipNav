// File: AddPortModal.jsx
import React from "react";
import { Modal, Form, Input, Radio, Select, Button } from "antd";
import { PercentageOutlined, CloseOutlined } from "@ant-design/icons"; // ✅ IMPORTANT

const { Option } = Select;

const AddPortModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  // Submit handler
  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  // Close handler
  const handleClose = () => {
    form.resetFields();
    onCancel(); // ✅ prop ঠিকমতো ব্যবহার
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={800}
      className="add-port-modal"
      destroyOnClose
      closeIcon={null} // নিজের custom close icon ব্যবহার করবো
    >
      {/* HEADER AREA */}
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
          <PercentageOutlined />
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
            Add Port
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#8c8c8c",
              marginTop: 4,
            }}
          >
            Create and configure a new seaport or airport with category, code and country.
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ category: "Air" }}
      >
        {/* Category */}
        <Form.Item
          label="Category *"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Radio.Group>
            <Radio value="Air" style={{ marginRight: 24 }}>
              Air
            </Radio>
            <Radio value="Sea">Sea</Radio>
          </Radio.Group>
        </Form.Item>

        {/* 3 fields in a grid style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Form.Item
            label="Name *"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter port name" />
          </Form.Item>

          {/* Code */}
          <Form.Item label="Code" name="code">
            <Input placeholder="Enter code" />
          </Form.Item>
        </div>

        {/* Country full width */}
        <Form.Item
          label="Country *"
          name="country"
          rules={[{ required: true, message: "Please select country" }]}
        >
          <Select placeholder="(-- Select / None --)">
            <Option value="Bangladesh">Bangladesh</Option>
            <Option value="France">France</Option>
            <Option value="Belgium">Belgium</Option>
            <Option value="Germany">Germany</Option>
            <Option value="Netherlands">Netherlands</Option>
            <Option value="Sri Lanka">Sri Lanka</Option>
            <Option value="United Kingdom">United Kingdom</Option>
            <Option value="United States">United States</Option>
          </Select>
        </Form.Item>

        {/* FOOTER BUTTONS */}
        <div className="mt-4 flex justify-end gap-3">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save Port
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPortModal;
