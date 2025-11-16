// File: AddUserModal.jsx
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Radio,
  Checkbox,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const { Option } = Select;

const AddUserModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  initialValues = null,
  mode = "create", // create | edit
}) => {
  const [form] = Form.useForm();

  // 🔹 responsive width
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const modalWidth = isMobile ? "96%" : isTablet ? "85%" : 880;

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
        form.setFieldsValue({
          dataType: "All Data",
          authorization: [],
          groups: [],
        });
      }
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

  const titleText = mode === "edit" ? "Edit User" : "Add User";

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
        maxHeight: "80vh",
        overflowY: "auto",
        padding: 16,
        
      }}
    >
      {/* 🔹 Header (same pattern as others) */}
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
          <UserOutlined />
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
            Configure user access, authorization and group permissions.
          </div>
        </div>
       
      </div>

      {/* 🔹 Inner card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
      >
        <Form form={form} layout="vertical">
          {/* Self / All Data */}
          <Form.Item
            label="Self / All Data"
            name="dataType"
            style={{ marginBottom: 8 }}
          >
            <Radio.Group>
              <Radio value="All Data">All Data</Radio>
              <Radio value="Self Data">Self Data</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Authorization */}
          <Form.Item
            label="Authorization"
            name="authorization"
            style={{ marginBottom: 12 }}
          >
            <Checkbox.Group>
              <Checkbox value="prepared">Prepared By</Checkbox>
              <Checkbox value="checked" style={{ marginLeft: 16 }}>
                Checked By
              </Checkbox>
              <Checkbox value="approved" style={{ marginLeft: 16 }}>
                Approved By
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Row gutter={16}>
            {/* LEFT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Party Type"
                name="partyType"
                style={{ marginBottom: 8 }}
              >
                <Select
                  placeholder="(-- Select/None --)"
                  allowClear
                  size="middle"
                >
                  <Option value="shipper">Shipper</Option>
                  <Option value="client">Client</Option>
                  <Option value="vendor">Vendor</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Party Name"
                name="partyName"
                style={{ marginBottom: 8 }}
              >
                <Select
                  placeholder="(-- Select/None --)"
                  allowClear
                  size="middle"
                >
                  <Option value="N2N">N2N Supply Chain</Option>
                  <Option value="ABC">ABC Logistics</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Full Name is required" }]}
                style={{ marginBottom: 8 }}
              >
                <Input size="middle" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                style={{ marginBottom: 8 }}
              >
                <Input size="middle" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Enter a valid email address",
                  },
                ]}
                style={{ marginBottom: 4 }}
              >
                <Input size="middle" />
              </Form.Item>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Password"
                name="password"
                style={{ marginBottom: 8 }}
              >
                <Input.Password size="middle" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                style={{ marginBottom: 8 }}
              >
                <Input.Password size="middle" />
              </Form.Item>

              <Form.Item
                label="Belongs to Following Groups"
                name="groups"
                style={{ marginBottom: 4 }}
              >
                <Checkbox.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <Checkbox value="Master">Master</Checkbox>
                  <Checkbox value="Shipper">Shipper</Checkbox>
                  <Checkbox value="Accounts & Finance">
                    Accounts &amp; Finance
                  </Checkbox>
                  <Checkbox value="Admin">Admin</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Footer buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
              gap: 10,
            }}
          >
            <Button
              onClick={handleClose}
              icon={<CloseOutlined />}
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

export default AddUserModal;
