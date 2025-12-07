import React from "react";
import { Modal, Typography, Row, Col, Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Summary } = Table;

const DeleteConfirmModal = ({ visible, onCancel, onConfirm, data }) => {
  // Table columns
  const columns = [
    { title: "Booking No.", dataIndex: "bookingNo", key: "bookingNo" },
    { title: "CNTR Type", dataIndex: "cntrType", key: "cntrType" },
    { title: "CNTR No.", dataIndex: "cntrNo", key: "cntrNo" },
    { title: "Seal No.", dataIndex: "sealNo", key: "sealNo" },
    { title: "PO#", dataIndex: "po", key: "po" },
    { title: "Style", dataIndex: "style", key: "style" },
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "S/O", dataIndex: "so", key: "so" },
    { title: "Total Carton", dataIndex: "totalCarton", key: "totalCarton", align: "right" },
    { title: "Package", dataIndex: "package", key: "package" },
    { title: "Receive Carton", dataIndex: "receiveCarton", key: "receiveCarton", align: "right" },
    { title: "Balance Carton", dataIndex: "balanceCarton", key: "balanceCarton", align: "right" },
    { title: "CBM", dataIndex: "cbm", key: "cbm", align: "right" },
    { title: "GWT", dataIndex: "gwt", key: "gwt", align: "right" },
  ];

  const dataSource = data
    ? [
        {
          key: "1",
          bookingNo: data.bookingNo,
          cntrType: data.cntrType,
          cntrNo: data.cntrNo,
          sealNo: data.sealNo,
          po: data.po,
          style: data.style,
          color: data.color,
          so: data.so,
          totalCarton: data.totalCarton,
          package: data.package,
          receiveCarton: data.receiveCarton,
          balanceCarton: data.balanceCarton,
          cbm: data.cbm,
          gwt: data.gwt,
        },
      ]
    : [];

  const totalRow = dataSource[0] || {};

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
    >
      {/* Top colored header bar */}
      <div
        style={{
         
        
          padding: "10px 24px",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        Stuffing Package Deletion - Are you sure you want to delete this item?
      </div>

      {/* Main content wrapper */}
      <div style={{ padding: 20 }}>
        {/* Shipment info */}
        <div style={{ marginBottom: 20 }}>
          <Row gutter={[16, 8]}>
            <Col xs={24} md={12}>
              <Text>
                <strong>Stuffing Plan No.</strong> : {data?.stuffingPlanNo || "-"}
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <Text>
                <strong>Mode</strong> : {data?.mode || "-"}
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <Text>
                <strong>Date</strong> : {data?.date || "-"}
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <Text>
                <strong>Remark</strong> : {data?.remark || "-"}
              </Text>
            </Col>
          </Row>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          size="middle"
          className="mb-6"
          summary={() => (
            <Summary.Row>
              <Summary.Cell index={0} colSpan={8} align="right">
                <Text strong>TOTAL =</Text>
              </Summary.Cell>
              <Summary.Cell index={1} align="right">
                <Text strong>{totalRow.totalCarton}</Text>
              </Summary.Cell>
              <Summary.Cell index={2} />
              <Summary.Cell index={3} align="right">
                <Text strong>{totalRow.receiveCarton}</Text>
              </Summary.Cell>
              <Summary.Cell index={4} align="right">
                <Text strong>{totalRow.cbm}</Text>
              </Summary.Cell>
              <Summary.Cell index={5} align="right">
                <Text strong>{totalRow.gwt}</Text>
              </Summary.Cell>
            </Summary.Row>
          )}
        />

        {/* Footer buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 10 }}>
          <Button onClick={onCancel}>Close</Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onConfirm(data)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
