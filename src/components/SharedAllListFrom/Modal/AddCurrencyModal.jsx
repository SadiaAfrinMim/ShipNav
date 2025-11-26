// File: AddCurrencyModal.jsx
import React from "react";
import { Modal, Form, Input, Select, Radio, Button } from "antd";
import { DollarOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddCurrencyModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const payload = {
      ...values,
      isDefault: values.isDefault, // "YES" | "NO"
    };
    onSubmit(payload);
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
      width={900}
      className="add-currency-modal"
      destroyOnClose
      closeIcon={null}
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
          <DollarOutlined />
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
            Add Currency
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#8c8c8c",
              marginTop: 4,
            }}
          >
            Create and configure a new currency with name, sign, country and default option.
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
        initialValues={{ isDefault: "NO" }}
      >
        {/* Name */}
        <Form.Item
          label="Name *"
          name="name"
          rules={[{ required: true, message: "Please enter currency name" }]}
        >
          <Input placeholder="BDT, USD, EURO ..." />
        </Form.Item>

        {/* Sign */}
        <Form.Item label="Sign" name="sign">
          <Input placeholder="$, €, ৳ ..." />
        </Form.Item>

        {/* Country */}
        <Form.Item
          label="Country *"
          name="country"
          rules={[{ required: true, message: "Please select country" }]}
        >
          <Select placeholder="(-- Select/None --)">
            <Option value="Bangladesh">Bangladesh</Option>
            <Option value="China">China</Option>
            <Option value="Japan">Japan</Option>
            <Option value="United States">United States</Option>
            <Option value="American Samoa">American Samoa</Option>
            <Option value="Singapore">Singapore</Option>
            <Option value="United Kingdom">United Kingdom</Option>
            <Option value="India">India</Option>
          </Select>
        </Form.Item>

        {/* Is Default? */}
        <Form.Item label="Is Default?" name="isDefault">
          <Radio.Group>
            <Radio value="YES" style={{ marginRight: 24 }}>
              Yes
            </Radio>
            <Radio value="NO">No</Radio>
          </Radio.Group>
        </Form.Item>

        {/* FOOTER BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={handleClose}>✖ Close</Button>
          <Button type="primary" htmlType="submit">
            ✔ Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddCurrencyModal;
