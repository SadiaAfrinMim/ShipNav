// File: AddSystemPrefixModal.jsx
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
} from "antd";
import {
  NumberOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const { Option } = Select;

const AddSystemPrefixModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  initialValues, // edit করলে ডাটা পাঠাবে
  mode = "create", // "create" | "edit"
}) => {
  const [form] = Form.useForm();

  // 🔹 responsive width
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const modalWidth = isMobile ? "96%" : isTablet ? "80%" : 600;

  // 🔹 edit হলে মান প্রি-ফিল
  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      form.setFieldsValue({
        module: initialValues.module,
        prefix: initialValues.prefix,
        type: initialValues.type || "Auto",
        start: initialValues.start || 1,
        increment: initialValues.inc || 1,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        type: "Auto",
        start: 1,
        increment: 1,
      });
    }
  }, [open, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit && onSubmit(values);
      form.resetFields();
    });
  };

  const handleClose = () => {
    form.resetFields();
    onCancel && onCancel();
  };

  const titleText =
    mode === "edit" ? "Edit System Prefix" : "Add System Prefix";

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={handleClose}
      destroyOnClose
      maskClosable={false}
      width={modalWidth}
      bodyStyle={{
        maxHeight: "75vh",
        overflowY: "auto",
        padding: 14,
      
      }}
    >
      {/* 🔹 Header (same format as previous card-style modals) */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#e6f7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1890ff",
            fontSize: 18,
          }}
        >
          <NumberOutlined />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{titleText}</div>
          <div
            style={{
              fontSize: 12,
              color: "#8c8c8c",
              marginTop: 2,
            }}
          >
            Define module-wise prefix, type and numbering rules.
          </div>
        </div>
        
      </div>

      {/* 🔹 Inner card with form */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ rowGap: 0 }}
        >
          <Form.Item
            label="Module *"
            name="module"
            rules={[{ required: true, message: "Module is required" }]}
            style={{ marginBottom: 8 }}
          >
            <Select
              placeholder="(-- Select/None --)"
              allowClear
              size="middle"
            >
              {/* demo options */}
              <Option value="Receive Voucher">Receive Voucher</Option>
              <Option value="Purchase Return">Purchase Return</Option>
              <Option value="Export Sea Credit Note">
                Export Sea Credit Note
              </Option>
              <Option value="Payment Journal">Payment Journal</Option>
              <Option value="Contra Voucher">Contra Voucher</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Prefix"
            name="prefix"
            style={{ marginBottom: 8 }}
          >
            <Input size="middle" placeholder="e.g. RV#" />
          </Form.Item>

          <Form.Item
            label="Type *"
            name="type"
            rules={[{ required: true, message: "Type is required" }]}
            style={{ marginBottom: 8 }}
          >
            <Select
              placeholder="(-- Select/None --)"
              allowClear
              size="middle"
            >
              <Option value="Auto">Auto</Option>
              <Option value="Manual">Manual</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Start *"
            name="start"
            rules={[{ required: true, message: "Start is required" }]}
            style={{ marginBottom: 8 }}
          >
            <Input type="number" min={1} size="middle" />
          </Form.Item>

          <Form.Item
            label="Increment *"
            name="increment"
            rules={[{ required: true, message: "Increment is required" }]}
            style={{ marginBottom: 4 }}
          >
            <Input type="number" min={1} size="middle" />
          </Form.Item>

          {/* 🔹 Footer buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
              gap: 10,
            }}
          >
            <Button
              icon={<CloseOutlined />}
              onClick={handleClose}
              size="middle"
            >
              Close
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              loading={confirmLoading}
              onClick={handleSubmit}
              size="middle"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddSystemPrefixModal;
