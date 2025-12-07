// CopyShipmentAdviceForm.jsx
import React from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Table,
  Button,
  Typography,
  Space,
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const CopyShipmentAdviceForm = ({ visible, onCancel, record, onCopy }) => {
  const [form] = Form.useForm();

  // টেবিল কলাম (Stuffing Package table’র মতো)
  const columns = [
    { title: "Booking No.", dataIndex: "bookingNo", key: "bookingNo" },
    { title: "CNTR Type", dataIndex: "cntrType", key: "cntrType" },
    { title: "CNTR No.", dataIndex: "cntrNo", key: "cntrNo" },
    { title: "Seal No.", dataIndex: "sealNo", key: "sealNo" },
    { title: "PO#", dataIndex: "po", key: "po" },
    { title: "Style", dataIndex: "style", key: "style" },
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "S/O", dataIndex: "so", key: "so" },
    {
      title: "Total Carton",
      dataIndex: "totalCarton",
      key: "totalCarton",
      align: "right",
    },
    { title: "Package", dataIndex: "package", key: "package" },
    {
      title: "Receive Carton",
      dataIndex: "receiveCarton",
      key: "receiveCarton",
      align: "right",
    },
    {
      title: "Balance Carton",
      dataIndex: "balanceCarton",
      key: "balanceCarton",
      align: "right",
    },
    { title: "CBM", dataIndex: "cbm", key: "cbm", align: "right" },
    { title: "GWT", dataIndex: "gwt", key: "gwt", align: "right" },
  ];

  // একটাই row দেখাচ্ছি – selected record থেকে
  const tableData = [
    {
      key: "1",
      bookingNo: record?.bookingNo,
      cntrType: record?.cntrType,
      cntrNo: record?.cntrNo,
      sealNo: record?.sealNo,
      po: record?.po,
      style: record?.style,
      color: record?.color,
      so: record?.so,
      totalCarton: record?.totalCarton,
      package: record?.package,
      receiveCarton: record?.receiveCarton,
      balanceCarton: record?.balanceCarton,
      cbm: record?.cbm,
      gwt: record?.gwt,
    },
  ];

  const handleFinish = (values) => {
    const payload = {
      ...record,
      ...values,
      date: values.date ? values.date.format("DD/MM/YYYY") : record?.date,
    };
    onCopy && onCopy(payload);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1100}
      destroyOnClose
    >
      {/* টপ বার / টাইটেল */}
      <div
        style={{
          
        
          padding: "10px 24px",
          margin: "-24px -24px 16px -24px",
          fontWeight: 600,
        }}
      >
        Copy Stuffing Package
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          stuffingPlanNo: record?.reference,
          mode: record?.mode || "CFS-CY",
          date: record?.date
            ? dayjs(record.date, "DD/MM/YYYY")
            : dayjs(),
          remark: record?.remark,
        }}
        onFinish={handleFinish}
      >
        {/* উপরের ৪টি ফিল্ড */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Stuffing Plan No."
              name="stuffingPlanNo"
              rules={[{ required: true, message: "Please select plan no." }]}
            >
              <Input placeholder="EAFI#25000001" />
            </Form.Item>

            <Form.Item
              label="Mode"
              name="mode"
              rules={[{ required: true, message: "Please select mode" }]}
            >
              <Select placeholder="(-- Select Mode --)">
                <Option value="CFS-CY">CFS-CY</Option>
                <Option value="CY-CY">CY-CY</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Remark" name="remark">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        {/* টেবিল অংশ */}
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
          size="middle"
          style={{ marginTop: 8 }}
        />

        {/* নিচের Required + Submit */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginTop: 16 }}
        >
          <Col>
            <Text type="secondary" style={{ fontSize: 12 }}>
              * Required Fields
            </Text>
          </Col>
          <Col>
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit Copy
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CopyShipmentAdviceForm;
