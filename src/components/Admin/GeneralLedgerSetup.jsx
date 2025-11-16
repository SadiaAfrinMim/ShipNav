import React from "react";
import {
  Form,
  Select,
  Row,
  Col,
  Button,
  Card,
  Typography,
  Divider,
} from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const GeneralLedgerSetup = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("GL Setup values:", values);
    // API call here
  };

  return (
    <Card
      style={{ margin: 16 }}
      bodyStyle={{ padding: 0 }}
    >
      {/* ─── Header ──────────────────────────────────────── */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid #e8e8e8",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <EditOutlined style={{ color: "#1890ff" }} />
        <Title level={4} style={{ margin: 0 }}>
          General Ledger Setup
        </Title>
      </div>

      {/* ─── Section Title ───────────────────────────────── */}
      <div
        style={{
          padding: "8px 20px",
          background: "#fafafa",
          borderBottom: "1px solid #e8e8e8",
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        ACCOUNT JOIN INFORMATION
      </div>

      {/* ─── Form Body ───────────────────────────────────── */}
      <div style={{ padding: "16px 20px 8px" }}>
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={handleSubmit}
        >
          <Row gutter={24}>
            {/* LEFT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Accounts Payable"
                name="accountsPayable"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Accounts Payable">
                  <Option value="ap">Accounts Payable</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Purchase Return"
                name="purchaseReturn"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Purchases of Materials">
                  <Option value="pom">Purchases of Materials</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Sales Account"
                name="salesAccount"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Sales">
                  <Option value="sales">Sales</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Sales Return"
                name="salesReturn"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Sales">
                  <Option value="sales">Sales</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Advance to Supplier"
                name="advanceToSupplier"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Bank Account">
                  <Option value="bank">Bank Account</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Cost of Goods Sold"
                name="cogs"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Cost of Goods Sold">
                  <Option value="cogs">Cost of Goods Sold</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Share Capital"
                name="shareCapital"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Owner Equity">
                  <Option value="equity">Owner Equity</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Purchase / GRN Clearing"
                name="purchaseGrn"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Purchases of Materials">
                  <Option value="pom">Purchases of Materials</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Accounts Receivable"
                name="accountsReceivable"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Accounts Receivables">
                  <Option value="ar">Accounts Receivables</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Bank Account"
                name="bankAccount"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Bank Account">
                  <Option value="bank">Bank Account</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Advance in Customer"
                name="advanceCustomer"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Bank Account">
                  <Option value="bank">Bank Account</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Inventory Account"
                name="inventoryAccount"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Inventory">
                  <Option value="inventory">Inventory</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Purchase Price Variance / Inventory"
                name="ppvInventory"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Purchase price Variance">
                  <Option value="ppv">Purchase price Variance</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Petty Cash"
                name="pettyCash"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Cash in Hand">
                  <Option value="cash">Cash in Hand</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ margin: "8px 0 12px" }} />

          {/* bottom bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text type="secondary" style={{ fontSize: 12 }}>
              * Required Fields
            </Text>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckOutlined />}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default GeneralLedgerSetup;
