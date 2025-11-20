import React from "react";
import { Modal, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ViewShipperModal = ({ open, onCancel, data }) => {
  const d = data || {};

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width="70%"
      centered
      title={null}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
    >
      {/* 🔹 Modern Fancy Header (same pattern as Opening Balance header) */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "16px 20px",
          borderBottom: "1px solid #f0f0f0",
          background: "#ffffff",
        }}
      >
        {/* Icon Circle */}
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
          <UserOutlined />
        </div>

        {/* Title + Subtitle */}
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            View Shipper
          </div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            Review all stored information related to this shipper.
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="bg-white px-6 py-6 text-sm">
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <p><strong>Name:</strong> {d.name || "-"}</p>
            <p><strong>Phone:</strong> {d.phone || "-"}</p>
            <p><strong>Email:</strong> {d.email || "-"}</p>
            <p><strong>Address:</strong> {d.address || "-"}</p>
            <p><strong>VAT No.:</strong> {d.vatNo || "-"}</p>
          </Col>

          <Col xs={24} md={12}>
            <p><strong>EIN No.:</strong> {d.einNo || "-"}</p>
            <p><strong>Country:</strong> {d.country || "-"}</p>
            <p><strong>Website:</strong> {d.website || "-"}</p>
            <p><strong>Category:</strong> {d.category || "-"}</p>
            <p><strong>Status:</strong> {d.status || "-"}</p>
          </Col>
        </Row>

        <div className="flex justify-end mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 rounded border border-gray-300 hover:bg-gray-100 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewShipperModal;
