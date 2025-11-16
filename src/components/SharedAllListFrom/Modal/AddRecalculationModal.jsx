// File: AddRecalculationModal.jsx
import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Radio,
  Button,
} from "antd";
import {
  PercentageOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const { TextArea } = Input;
const { Option } = Select;

const AddRecalculationModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  // 📱 responsive width
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const modalWidth = isMobile ? "96%" : isTablet ? "75%" : 600;

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

  return (
    <Modal
      centered
      open={open}
      onCancel={handleClose}
      footer={null}
      width={modalWidth}
      destroyOnClose
      maskClosable={false}
      bodyStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
        padding: 12,
       
      }}
    >
      {/* 🔹 Header (unique, compact) */}
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
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#e6f7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1890ff",
            fontSize: 18,
          }}
        >
          <PercentageOutlined />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Add Recalculation
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#8c8c8c",
              marginTop: 2,
            }}
          >
            Configure adjustment method and posting account for recalculation.
          </div>
        </div>
       
      </div>

      {/* 🔹 Card container */}
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 14,
          boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ rowGap: 0 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6, // 👈 সব ফিল্ডের মাঝে ছোট gap
            }}
          >
            {/* Module */}
            <Form.Item
              label="Module *"
              name="module"
              rules={[{ required: true, message: "Module is required" }]}
              style={{ marginBottom: 6 }}
            >
              <Select
                placeholder="-- Select / None --"
                allowClear
                size="middle"
              >
                <Option value="export-sea">Export Sea</Option>
                <Option value="export-air">Export Air</Option>
                <Option value="import-sea">Import Sea</Option>
                <Option value="import-air">Import Air</Option>
              </Select>
            </Form.Item>

            {/* Name */}
            <Form.Item
              label="Name *"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
              style={{ marginBottom: 6 }}
            >
              <Input size="middle" />
            </Form.Item>

            {/* Adjust */}
            <Form.Item
              label="Adjust *"
              name="adjust"
              rules={[
                { required: true, message: "Adjust type is required" },
              ]}
              style={{ marginBottom: 6 }}
            >
              <Radio.Group
                style={{ display: "flex", gap: 16 }}
              >
                <Radio value="addition"> (+) Addition</Radio>
                <Radio value="deduction"> (-) Deduction</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Method */}
            <Form.Item
              label="Method *"
              name="method"
              rules={[
                { required: true, message: "Method is required" },
              ]}
              style={{ marginBottom: 6 }}
            >
              <Radio.Group
                style={{ display: "flex", gap: 16 }}
              >
                <Radio value="percentage"> (%) Percentage</Radio>
                <Radio value="fixed"> (Tk.) Fixed</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Number / Amount */}
            <Form.Item
              label="Number/Amount *"
              name="amount"
              rules={[
                { required: true, message: "Amount is required" },
              ]}
              style={{ marginBottom: 6 }}
            >
              <Input size="middle" />
            </Form.Item>

            {/* Account Chart */}
            <Form.Item
              label="Account Chart *"
              name="accountChart"
              rules={[
                {
                  required: true,
                  message: "Account chart is required",
                },
              ]}
              style={{ marginBottom: 6 }}
            >
              <Select
                placeholder="Select account"
                allowClear
                size="middle"
              >
                <Option value="bank">Bank Account</Option>
                <Option value="cash">Cash in Hand</Option>
                <Option value="inventory">Inventory</Option>
              </Select>
            </Form.Item>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              style={{ marginBottom: 4 }}
            >
              <TextArea rows={3} />
            </Form.Item>
          </div>

          {/* 🔹 Footer buttons (compact) */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 8,
              gap: 8,
            }}
          >
            <Button
              size="middle"
              icon={<CloseOutlined />}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              size="middle"
              type="primary"
              icon={<CheckOutlined />}
              loading={confirmLoading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddRecalculationModal;
