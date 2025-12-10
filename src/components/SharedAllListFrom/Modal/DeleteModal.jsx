import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";

const DeleteModal = () => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Item Deleted!");
    setOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <Button
        type="link"
        danger
        className="!text-red-600 hover:!text-red-700 font-medium"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Modal
        open={open}
        footer={null}
        centered
        closable={false}
        destroyOnClose
        width={420}
        className="rounded-xl"
        bodyStyle={{ padding: 0, borderRadius: 16, background: "#fff" }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-6 py-5 border-b border-gray-200">
          <div className="relative">
            <div className="w-11 h-11 bg-red-500/10 rounded-full flex items-center justify-center">
              <ExclamationCircleOutlined className="text-red-600 text-xl" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-[17px] font-semibold text-gray-700">
              Delete Item?
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              This action cannot be undone.
            </p>
          </div>

          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
            className="!text-gray-400 hover:!text-red-500 hover:!bg-red-50"
          />
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-[13px] text-gray-700">
            Are you sure you want to delete this item?
          </p>

          <p className="text-[11px] text-red-500 mt-1">
            Once deleted, the data cannot be recovered.
          </p>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => setOpen(false)}
              className="!border-gray-300 !text-gray-600 hover:!border-gray-400 hover:!text-gray-800"
            >
              Cancel
            </Button>

            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              className="!bg-red-500 !border-none hover:!bg-red-600 shadow-sm hover:shadow-md transition-all"
              onClick={handleConfirm}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
