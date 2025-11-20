// src/pages/product/Modal/AddProductModal.jsx
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
} from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

const { Option } = Select;

const unitOptions = [
  "Cartons",
  "KG",
  "CBM",
  "20GP",
  "40GP",
  "HBL",
];
const categoryOptions = [
  "Finished Goods",
  "Raw Materials",
  "Service",
];
const countryOptions = [
  "Afghanistan",
  "Bangladesh",
  "India",
  "China",
  "USA",
];

const AddProductModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading = false,
  initialValues = null,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  // when modal open – set / reset values
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
        form.setFieldsValue({
          productType: [],
          hasOpeningBalance: false,
        });
      }
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    if (onSubmit) onSubmit(values);
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
      title={null}
      maskClosable={false}
    >
      <div className="bg-white px-6 py-6">
        {/* 🔹 Header (smart আধুনিক style) */}
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
            <AppstoreOutlined />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {isEdit ? "Edit Product" : "Add Product"}
            </div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {isEdit
                ? "Update product information and save changes."
                : "Create a new product and set unit, pricing and category."}
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
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter product name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Unit" name="unit">
                <Select
                  placeholder="(-- Select/None --)"
                  showSearch
                  optionFilterProp="children"
                  allowClear
                >
                  <Option value="">(-- Select/None --)</Option>
                  {unitOptions.map((u) => (
                    <Option key={u} value={u}>
                      {u}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Purchase Price" name="purchasePrice">
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="0.00"
                />
              </Form.Item>

              <Form.Item label="Sales Price (MRP)" name="salesPrice">
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="0.00"
                />
              </Form.Item>

              {/* Product Type */}
              <Form.Item label="Product Type" name="productType">
                <Checkbox.Group>
                  <Checkbox value="Resalable" style={{ marginRight: 24 }}>
                    Resalable
                  </Checkbox>
                  <Checkbox value="Asset">Asset</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item label="Code" name="code">
                <Input />
              </Form.Item>

              <Form.Item label="Category" name="category">
                <Select
                  placeholder="(-- Select/None --)"
                  showSearch
                  optionFilterProp="children"
                  allowClear
                >
                  <Option value="">(-- Select/None --)</Option>
                  {categoryOptions.map((c) => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Standard Cost (Average)" name="standardCost">
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="0.00"
                />
              </Form.Item>

              <Form.Item label="Country" name="country">
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="(-- Select/None --)"
                >
                  <Option value="">(-- Select/None --)</Option>
                  {countryOptions.map((c) => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          {/* Opening Balance line (bottom full width) */}
          <Row gutter={24} className="mt-2">
            <Col span={24}>
              <Form.Item
                name="hasOpeningBalance"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Checkbox>OPENING BALANCE</Checkbox>
              </Form.Item>
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

export default AddProductModal;
