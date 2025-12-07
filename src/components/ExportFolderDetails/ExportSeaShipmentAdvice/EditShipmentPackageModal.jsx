import React from "react";
import { Modal, Form, Input, DatePicker, Button, Row, Col, Typography, Table, Select, Space } from "antd";
import dayjs from "dayjs";


const { Title } = Typography;
const { Option } = Select;

const EditShipmentPackageModal = ({ visible, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form submitted:", values);
    onCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // Columns for the table
  const columns = [
    { title: "Booking No.", dataIndex: "bookingNo", key: "bookingNo" },
    { title: "CNTR Type", dataIndex: "cntrType", key: "cntrType" },
    { title: "CNTR No.", dataIndex: "cntrNo", key: "cntrNo" },
    { title: "Seal No.", dataIndex: "sealNo", key: "sealNo" },
    { title: "PO#", dataIndex: "po", key: "po" },
    { title: "Style", dataIndex: "style", key: "style" },
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "S/O", dataIndex: "so", key: "so" },
    { title: "Total Carton", dataIndex: "totalCarton", key: "totalCarton" },
    { title: "Package", dataIndex: "package", key: "package" },
    { title: "Receive Carton", dataIndex: "receiveCarton", key: "receiveCarton" },
    { title: "Balance Carton", dataIndex: "balanceCarton", key: "balanceCarton" },
    { title: "CBM", dataIndex: "cbm", key: "cbm" },
    { title: "GWT", dataIndex: "gwt", key: "gwt" },
  ];

  const data = [
    {
      key: "1",
      bookingNo: "ES#25000014",
      cntrType: "40'HC",
      cntrNo: "HMMU644352",
      sealNo: "24H0261013",
      po: "R327X",
      style: "R327X",
      color: "Red",
      so: "510",
      totalCarton: "510.00",
      package: "Cartons",
      receiveCarton: "510.00",
      balanceCarton: "0.00",
      cbm: "37.940",
      gwt: "5321.50",
    },
  ];

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      title="Edit Shipment Package"
      width={1100}
      className="rounded-lg bg-white shadow-lg" // Tailwind styling for modal
    >
     

      <Form 
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          date: initialValues?.date ? dayjs(initialValues.date, "DD/MM/YYYY") : null,
        }}
        onFinish={handleFinish}
        className=""
      >
        <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} sm={12}>
            <Form.Item label="Stuffing Plan No." name="stuffingPlanNo" className="mb-4">
              <Input disabled placeholder="Stuffing Plan No." className="border rounded-lg p-3" />
            </Form.Item>

            <Form.Item label="Mode" name="mode" className="mb-4">
              <Select placeholder="Select Mode" className="border rounded-lg p-3">
                <Option value="CFS-CY">CFS-CY</Option>
                <Option value="CY-CY">CY-CY</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Date" name="date" className="mb-4">
              <DatePicker style={{ width: "100%" }} className="border rounded-lg p-3" />
            </Form.Item>

            <Form.Item label="Remark" name="remark" className="mb-4">
              <Input.TextArea rows={3} className="border rounded-lg p-3" />
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col xs={24} sm={12}>
            <Form.Item label="Booking No." name="bookingNo" className="mb-4">
              <Input disabled placeholder="Booking No." className="border rounded-lg p-3" />
            </Form.Item>

            <Form.Item label="Container Type" name="containerType" className="mb-4">
              <Input placeholder="Container Type" className="border rounded-lg p-3" />
            </Form.Item>

            <Form.Item label="Seal No." name="sealNo" className="mb-4">
              <Input placeholder="Seal No." className="border rounded-lg p-3" />
            </Form.Item>

            <Form.Item label="PO#" name="po" className="mb-4">
              <Input placeholder="PO#" className="border rounded-lg p-3" />
            </Form.Item>
          </Col>
        </Row>

      
      
      </Form>

      {/* Table for Shipment Info */}
      <div className="mt-6 overflow-x-auto">
        <Table columns={columns} dataSource={data} pagination={false} className="rounded-lg" />
      </div>
        <Row justify="end" className="pt-4" gutter={16}>
          <Col xs={12} sm={8}>
            <Button
              onClick={handleCancel}
              className="w-full rounded-lg border bg-gray-300 text-black p-3"
            >
              Cancel
            </Button>
          </Col>
          <Col xs={12} sm={8}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-lg bg-blue-500 text-white p-3"
            >
              Save Changes
            </Button>
          </Col>
        </Row>
    </Modal>
  );
};

export default EditShipmentPackageModal;
