import React, { useState } from "react";
import { Modal, Descriptions, Button, Row, Col, Table, Typography } from "antd";
import { PrinterOutlined, DeleteOutlined } from '@ant-design/icons';


const { Title } = Typography;

const ViewShipmentPackageModal = ({ visible, onCancel, data, onDelete }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

  const shipmentData = [
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

  const handleDelete = () => {
    setDeleteModalVisible(false);
    onDelete(data); // Trigger delete function from parent component
  };

  return (
    <>
      <Modal
        title="Details Stuffing Package"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={1000}
        className="rounded-lg bg-white shadow-lg"
      >
        {/* Action Buttons Positioned Above */}
        <div className="mt-4 flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
          <Button
            icon={<PrinterOutlined />}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md border border-blue-500"
          >
            Print
          </Button>
          <Button
            onClick={() => setDeleteModalVisible(true)}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md border border-red-500"
          >
            Delete
          </Button>
          <Button
            onClick={onCancel}
            className="bg-gray-300 text-black px-6 py-2 rounded-lg shadow-md border border-gray-400"
          >
            Close
          </Button>
        </div>

        {/* Header Section */}
        <div className="mb-6 text-center">
          <h3 className="text-3xl text-blue-500 font-semibold">STUFFING PACKAGE</h3>
        </div>

        {/* Descriptions for Shipment Info */}
        <Descriptions bordered column={1} className="mb-6">
          <Descriptions.Item label="Stuffing Plan No.">EAFI#25000001</Descriptions.Item>
          <Descriptions.Item label="Date">04 December, 2025</Descriptions.Item>
          <Descriptions.Item label="Mode">CFS-CY</Descriptions.Item>
        </Descriptions>

        {/* Table for Shipment Details */}
        <div className="mt-6 overflow-x-auto">
          <Table
            columns={columns}
            dataSource={shipmentData}
            pagination={false}
            className="rounded-lg"
          />
        </div>

        {/* Footer Section */}
        <Row justify="end" className="mt-6">
          <Col>
            <span className="font-bold">TOTAL =</span> 510.00
          </Col>
        </Row>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <Typography.Text>
          Are you sure you want to delete <strong>{data?.reference}</strong>?
        </Typography.Text>
      </Modal>
    </>
  );
};

export default ViewShipmentPackageModal;
