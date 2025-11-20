// src/pages/shipper/Modal/DeleteConfirmModal.jsx
import React from "react";
import { Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteConfirmModal = ({ open, onCancel, onConfirm, data }) => {
  const name = data?.name || "this shipper";

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={420}
      centered
      title={null}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
    >
      {/* 🔹 Fancy Header (Same Style as Other Modals) */}
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
            background: "#fff1f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff4d4f",
            fontSize: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <DeleteOutlined />
        </div>

        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#ff4d4f" }}>
            Delete Shipper
          </div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            This action is permanent and cannot be undone.
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white px-6 py-6 text-sm">
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold">{name}</span>?
        </p>

        <p className="text-red-500 mt-2">
          Deleted data cannot be recovered later.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel}>Cancel</Button>

          <Button danger type="primary" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
