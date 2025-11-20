import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Row,
  Col,
  Button,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Option } = Select;

const partyTypeOptions = [
  "Shipper",
  "Consignee",
  "Agent",
  "Carrier",
  "3rd Party",
  "CFS",
  "Customer",
  "Supplier",
];

const AddShipperModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading = false,
  initialValues = null,
}) => {
  const [form] = Form.useForm();

  const isEdit = !!initialValues;
  const headerTitle = isEdit ? "Edit Shipper" : "Add Shipper";

  // reset / set values when open
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
        form.setFieldsValue({
          category: "ALL",
          partyType: ["Shipper"],
        });
      }
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    onSubmit && onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width="96%"
      style={{ top: 40 }}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
      maskClosable={false}
      title={null}
    >
      {/* White form area */}
      <div className="bg-white px-6 py-6">
        {/* 🔹 Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 16,
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#e6f7ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1890ff",
              fontSize: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <MenuOutlined />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {headerTitle}
            </div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {isEdit
                ? "Update the shipper information and save changes."
                : "Create a new shipper and set basic contact details."}
            </div>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            {/* LEFT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Name *"
                name="name"
                rules={[{ required: true, message: "Please enter shipper name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>

              <Form.Item label="Address (3/4 Lines)" name="address">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item label="VAT No." name="vatNo">
                <Input />
              </Form.Item>

              <Form.Item label="Category" name="category">
                <Select>
                  <Option value="ALL">ALL</Option>
                  <Option value="LOCAL">LOCAL</Option>
                  <Option value="FOREIGN">FOREIGN</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item label="EIN No." name="einNo">
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>

              <Form.Item label="Country" name="country">
                <Select
                  showSearch
                  placeholder="(-- Select/None --)"
                  optionFilterProp="children"
                >
                  <Option value="">(-- Select/None --)</Option>
                  <Option value="Bangladesh">Bangladesh</Option>
                  <Option value="India">India</Option>
                  <Option value="China">China</Option>
                  {/* চাইলে country list আলাদা JSON থেকে আনতে পারো */}
                </Select>
              </Form.Item>

              <Form.Item label="Website" name="website">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Party Type row */}
          <Row gutter={24} className="mt-2">
            <Col span={24}>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm text-gray-700 font-medium">
                  Party Type
                </span>
                <Form.Item name="partyType" noStyle>
                  <Checkbox.Group>
                    {partyTypeOptions.map((label) => (
                      <Checkbox
                        key={label}
                        value={label}
                        style={{ marginRight: 16 }}
                      >
                        {label}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </Col>
          </Row>

          {/* Footer buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button onClick={onCancel}>Close</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={confirmLoading}
            >
              {isEdit ? "Update" : "Submit"}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddShipperModal;
