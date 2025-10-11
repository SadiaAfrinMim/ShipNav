import React from "react";
import {
  Row,
  Col,
  Form,
  Select,
  DatePicker,
  Input,
  Button,
  Typography,
  Radio,
  Divider,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const BillOfLadingForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
   <div className="p-4">
     <div
      style={{
        background: "#fff",
        border: "1px solid #e6e6e6",
        borderRadius: 4,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
     

      {/* ───────────────────────────── Form ───────────────────────────── */}
      <Form
        form={form}
        layout="vertical"
        style={{ padding: 24 }}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          {/* Left Column */}
          <Col span={12}>
            <Form.Item label="HBL" name="hbl">
              <Select placeholder="(-- Select Booking --)" />
            </Form.Item>

            <Form.Item label="Consignment Type" name="consignmentType">
              <Select placeholder="(-- Select/None --)" />
            </Form.Item>

            <Form.Item label="Shipper Name" name="shipperName">
              <Input />
            </Form.Item>

            <Form.Item label="Shipper Bank" name="shipperBank">
              <Input />
            </Form.Item>

            <Form.Item label="Consignee Name" name="consigneeName">
              <Input />
            </Form.Item>

            <Form.Item label="Notify Name" name="notifyName">
              <Input />
            </Form.Item>

            <Form.Item label="Also Notify Name" name="alsoNotifyName">
              <Input />
            </Form.Item>

            <Form.Item label="Agent Name" name="agentName">
              <Input />
            </Form.Item>

            <Form.Item label="Marka & No." name="markaNo">
              <TextArea rows={2} />
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Freight Payable At" name="freightPayableAt">
              <Input />
            </Form.Item>

            <Form.Item label="Shipper Address" name="shipperAddress">
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Shipper Bank Address" name="shipperBankAddress">
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Consignee Address" name="consigneeAddress">
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Notify Address" name="notifyAddress">
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Also Notify Address" name="alsoNotifyAddress">
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Agent Address" name="agentAddress">
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item label="Description of Goods" name="goodsDescription">
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>

        {/* ───────────────────────────── Blue Info Box ───────────────────────────── */}
        <div
          style={{
            background: "#e9f9fb",
            border: "1px solid #bce6ef",
            padding: 16,
            borderRadius: 4,
            marginBottom: 16,
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <p>Place of Receipt :</p>
              <p>Port of Discharge :</p>
              <p>FDR/VSL :</p>
              <p>FDR/VSL ETD :</p>
              <p>From FDR/VSL Port :</p>
              <p>MTR/VSL :</p>
              <p>MTR/VSL ETD :</p>
              <p>From MTR/VSL Port :</p>
            </Col>
            <Col span={12}>
              <p>Port of Loading :</p>
              <p>Final Destination :</p>
              <p>FDR/VSL Voyage :</p>
              <p>FDR/VSL ETA :</p>
              <p>To FDR/VSL Port :</p>
              <p>MTR/VSL Voyage :</p>
              <p>MTR/VSL ETA :</p>
              <p>To MTR/VSL Port :</p>
            </Col>
          </Row>
        </div>

        {/* ───────────────────────────── Totals Section ───────────────────────────── */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Total Carton" name="totalCarton">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Total CBM" name="totalCbm">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="On Board Date" name="onBoardDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Total GWT" name="totalGwt">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="No. of Bills of Lading" name="numBols">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Location" name="location">
              <Select placeholder="(-- Select/None --)" />
            </Form.Item>
          </Col>
        </Row>

        {/* ───────────────────────────── Status + Submit ───────────────────────────── */}
        <Row gutter={16} align="middle" justify="space-between">
          <Col>
            <Form.Item label="Status" name="status">
              <Radio.Group>
                <Radio value="opened">Opened</Radio>
                <Radio value="issued">Issued</Radio>
                <Radio value="reopened">Reopened</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" icon={<span>✔</span>}>
              Submit
            </Button>
          </Col>
        </Row>

        <Divider style={{ margin: "4px 0" }} />
        <p style={{ fontSize: 12, color: "#888" }}>* Required Fields</p>
      </Form>
    </div>
   </div>
  );
};

export default BillOfLadingForm;
