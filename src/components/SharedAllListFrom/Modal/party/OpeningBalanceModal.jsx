import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Radio,
  Row,
  Col,
  Button,
} from "antd";
import { BranchesOutlined } from "@ant-design/icons";

const OpeningBalanceModal = ({
  open,
  onCancel,
  onSubmit,
  data,
  confirmLoading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({
        date: null,
        description: "",
        amount: 0,
        type: "AP", // default
      });
    }
  }, [open, form]);

  const handleFinish = (values) => {
    if (onSubmit) onSubmit(values);
  };

  const partyName = data?.name || "Shipper";

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onCancel}
      width="98%"
      style={{ top: 20 }}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
      title={null}
    >
      {/* Body (with custom header at top) */}
      <div className="bg-white px-6 py-6">
        {/* 🔹 Fancy header like your example */}
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
            <BranchesOutlined />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {partyName} – Opening Balance
            </div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              Set the opening balance date, amount and account type for this party.
            </div>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={24}>
            {/* DATE */}
            <Col span={6}>
              <Form.Item
                label="DATE"
                name="date"
                rules={[{ required: true, message: "Select date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            {/* DESCRIPTION */}
            <Col span={8}>
              <Form.Item label="DESCRIPTION" name="description">
                <Input placeholder="Description" />
              </Form.Item>
            </Col>

            {/* AMOUNT */}
            <Col span={5}>
              <Form.Item
                label="AMOUNT (Tk.)"
                name="amount"
                rules={[{ required: true, message: "Enter amount" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>

            {/* DEBIT / CREDIT */}
            <Col span={5}>
              <Form.Item
                label="DEBIT / CREDIT"
                name="type"
                rules={[{ required: true, message: "Select Type" }]}
              >
                <Radio.Group>
                  <Radio value="AP">Accounts Payable</Radio>
                  <Radio value="ADV">Advance in Supplier</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Footer Buttons */}
          <div className="flex justify-end items-center gap-4 mt-4">
            <Button onClick={onCancel}>Close</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={confirmLoading}
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default OpeningBalanceModal;
