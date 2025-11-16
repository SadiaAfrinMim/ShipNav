// File: AddBranchModal.jsx
import React from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
} from "antd";
import { useMediaQuery } from "react-responsive";
import { BranchesOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const AddBranchModal = ({ open, onCancel, onSubmit, confirmLoading }) => {
  const [form] = Form.useForm();

  // 📱 Responsive width (same logic as AddBusinessModal)
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const modalWidth = isMobile ? "96%" : isTablet ? "85%" : 900;

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
        maxHeight: "75vh",
        overflowY: "auto",
        padding: 12,
       
      }}
    >
      {/* 🔹 Header (same style as AddBusinessModal, just different icon/text) */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#e6f7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1890ff",
            fontSize: 18,
          }}
        >
          <BranchesOutlined />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Add Branch</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            Create a new branch under a business and set contact details.
          </div>
        </div>
      </div>

      {/* 🔹 Card container */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[12, 0]}>
            {/* LEFT COLUMN */}
            <Col span={isMobile ? 24 : 12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Form.Item
                  label="Name *"
                  name="name"
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item label="Code" name="code">
                  <Input size="large" />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                  <Input size="large" />
                </Form.Item>

                <Form.Item label="Address" name="address">
                  <TextArea rows={4} />
                </Form.Item>
              </div>
            </Col>

            {/* RIGHT COLUMN */}
            <Col span={isMobile ? 24 : 12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Form.Item label="Business" name="business">
                  <Select
                    size="large"
                    placeholder="-- Select / None --"
                    allowClear
                  >
                    {/* demo options; later API data map করবে */}
                    <Option value="n2n">N2N Supply Chain</Option>
                    <Option value="abc">ABC Logistics</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Manager" name="manager">
                  <Input size="large" />
                </Form.Item>

                <Form.Item label="Email" name="email">
                  <Input size="large" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                  <TextArea rows={4} />
                </Form.Item>
              </div>
            </Col>
          </Row>

          {/* 🔹 Footer buttons (bottom-right, same style everywhere) */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 12,
              gap: 12,
            }}
          >
            <Button icon={<CloseOutlined />} onClick={handleClose}>
              Close
            </Button>
            <Button
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

export default AddBranchModal;
