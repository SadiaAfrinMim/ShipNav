import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Divider,
} from "antd";
import { useMediaQuery } from "react-responsive";
import { BankOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddBusinessModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  // 📱 Detect screen sizes
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ maxWidth: 768 });

  // 📏 Responsive modal width
  const modalWidth = isMobile ? "96%" : isTablet ? "85%" : 900;

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.foundedOn) {
          values.foundedOn = values.foundedOn.format("YYYY-MM-DD");
        }
        onSubmit && onSubmit(values);
        form.resetFields();
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel && onCancel();
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={handleCancel}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
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
            <BankOutlined />
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              Add Business
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#8c8c8c",
              }}
            >
              Add core business details, contacts and description.
            </div>
          </div>
        </div>
      }
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Close
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
      width={modalWidth}
      destroyOnClose
      maskClosable={false}
      bodyStyle={{
        maxHeight: "75vh",
        overflowY: "auto",
        padding: 16,
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: isMobile ? 12 : 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
      >
        <Form form={form} layout="vertical">
          {/* Section: Basic Info */}
          <div
            style={{
              marginBottom: 8,
              fontWeight: 600,
              color: "#595959",
              fontSize: 14,
            }}
          >
            Basic Information
          </div>

          <Row gutter={[16, 8]}>
            {/* LEFT COLUMN */}
            <Col span={isMobile ? 24 : 12}>
              <Form.Item
                label="Full Name *"
                name="fullName"
                rules={[
                  { required: true, message: "Full Name is required" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter business full name"
                />
              </Form.Item>

              <Form.Item label="Print As" name="printAs">
                <Input
                  size="large"
                  placeholder="Name to show on reports"
                />
              </Form.Item>

              <Form.Item label="Code" name="code">
                <Input
                  size="large"
                  placeholder="Short business code (e.g. N2N)"
                />
              </Form.Item>

              <Form.Item label="Founded On" name="foundedOn">
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="Registration No." name="registrationNo">
                <Input
                  size="large"
                  placeholder="Trade / registration number"
                />
              </Form.Item>

              <Form.Item label="Website" name="website">
                <Input
                  size="large"
                  placeholder="https://example.com"
                />
              </Form.Item>

              <Form.Item label="Fax" name="fax">
                <Input size="large" placeholder="Fax number (optional)" />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <TextArea
                  rows={3}
                  placeholder="Office address..."
                />
              </Form.Item>
            </Col>

            {/* RIGHT COLUMN */}
            <Col span={isMobile ? 24 : 12}>
              <div
                style={{
                  marginBottom: 8,
                  fontWeight: 600,
                  color: "#595959",
                  fontSize: 14,
                }}
              >
                Contact & Others
              </div>

              <Form.Item label="Phone" name="phone">
                <Input
                  size="large"
                  placeholder="+8801XXXXXXXXX"
                />
              </Form.Item>

              <Form.Item label="Alt. Phone" name="altPhone">
                <Input
                  size="large"
                  placeholder="Alternate phone (optional)"
                />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input
                  size="large"
                  placeholder="Official email address"
                />
              </Form.Item>

              <Form.Item label="Alt. Email" name="altEmail">
                <Input
                  size="large"
                  placeholder="Alternate email (optional)"
                />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <TextArea
                  rows={6}
                  placeholder="Short description about this business..."
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default AddBusinessModal;
