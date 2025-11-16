// File: AddHeaderTemplateModal.jsx
import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Radio,
  Button,
} from "antd";
import {
  FileTextOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const { TextArea } = Input;
const { Option } = Select;

const AddHeaderTemplateModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const modalWidth = isMobile ? "98%" : isTablet ? "92%" : 1000;

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
      footer={null}
      onCancel={handleClose}
      destroyOnClose
      maskClosable={false}
      width={modalWidth}
      bodyStyle={{
        maxHeight: "82vh",
        overflowY: "auto",
        padding: 14,
        background: "#f5f7fb",
      }}
    >
      {/* Header */}
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
          <FileTextOutlined />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            Add Header Template
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#8c8c8c",
              marginTop: 2,
            }}
          >
            Configure printable header, footer and page settings for reports.
          </div>
        </div>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClose}
          style={{ color: "#999" }}
        />
      </div>

      {/* Card body */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
        }}
      >
        <Form form={form} layout="vertical">
          {/* Name */}
          <Form.Item
            label="Name *"
            name="name"
            rules={[{ required: true, message: "Template name is required" }]}
            style={{ marginBottom: 10 }}
          >
            <Input placeholder="Enter template name" size="large" />
          </Form.Item>

          {/* Header editor (placeholder – later replace with rich editor) */}
          <Form.Item
            label="Header"
            name="header"
            style={{ marginBottom: 10 }}
          >
            <TextArea
              rows={5}
              placeholder="Header content (you can use rich editor here)..."
            />
          </Form.Item>

          {/* Footer editor */}
          <Form.Item
            label="Footer"
            name="footer"
            style={{ marginBottom: 10 }}
          >
            <TextArea
              rows={5}
              placeholder="Footer content (you can use rich editor here)..."
            />
          </Form.Item>

          {/* Orientation */}
          <Row gutter={12}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Orientation"
                name="orientation"
                initialValue="portrait"
                style={{ marginBottom: 10 }}
              >
                <Select>
                  <Option value="portrait">Portrait</Option>
                  <Option value="landscape">Landscape</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Margin summary */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Margin (in)"
                name="margin"
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="e.g. 1.00 x 1.00" />
              </Form.Item>
            </Col>
          </Row>

          {/* L / R / T / B */}
          <Row gutter={12}>
            <Col xs={12} md={6}>
              <Form.Item
                label="L (in)"
                name={["lrtb", "left"]}
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="1.00" />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item
                label="R (in)"
                name={["lrtb", "right"]}
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="1.00" />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item
                label="T (in)"
                name={["lrtb", "top"]}
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="1.00" />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item
                label="B (in)"
                name={["lrtb", "bottom"]}
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="1.00" />
              </Form.Item>
            </Col>
          </Row>

          {/* HF Spacing + Page Size */}
          <Row gutter={12}>
            <Col xs={24} md={12}>
              <Form.Item
                label="H/F Spacing"
                name="hfSpacing"
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="e.g. 10" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Page Size"
                name="pageSize"
                initialValue="A4"
                style={{ marginBottom: 10 }}
              >
                <Select>
                  <Option value="A4">A4</Option>
                  <Option value="Letter">Letter</Option>
                  <Option value="Legal">Legal</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* WH (in) */}
          <Row gutter={12}>
            <Col xs={24} md={12}>
              <Form.Item
                label="W (in)"
                name="widthIn"
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="8.27" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="H (in)"
                name="heightIn"
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="11.69" />
              </Form.Item>
            </Col>
          </Row>

          {/* Is Default */}
          <Form.Item
            label="Is Default?"
            name="isDefault"
            initialValue={false}
            style={{ marginBottom: 4 }}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Footer buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 8,
              gap: 10,
            }}
          >
            <Button
              icon={<CloseOutlined />}
              onClick={handleClose}
            >
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

export default AddHeaderTemplateModal;
