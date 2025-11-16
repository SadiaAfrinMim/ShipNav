// File: HeaderAdminList.jsx

import React, { useState } from "react";
import {
  PlusOutlined,
  ReloadOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import AddBusinessModal from "./../Modal/AddBusinessModal";
import AddBranchModal from "./../Modal/AddBranchModal"; // 🔹 NEW
import AddRecalculationModal from "../Modal/AddRecalculationModal";
import AddHeaderTemplateModal from "../Modal/AddHeaderTemplateModal";
import AddSystemPrefixModal from "../Modal/AddSystemPrefixModal";
import AddUserModal from "../Modal/AddUserModal";

// 🧩 JSON-based route → title & label mapping
const adminRouteConfig = {
  "/admin/business": {
    title: "Business List",
    addLabel: "Business",
  },
  "/admin/branch": {
    title: "Branch List",
    addLabel: "Branch",
  },
  "/admin/configuration": {
    title: "Configuration List",
    addLabel: "Configuration",
  },
  "/admin/recalculation": {
    title: "Recalculation List",
    addLabel: "Recalculation",
  },
  "/admin/template": {
    title: "Template List",
    addLabel: "Template",
  },
  "/admin/system-prefix": {
    title: "System Prefix List",
    addLabel: "Prefix",
  },
  "/admin/users": {
    title: "User List",
    addLabel: "User",
  },
  "/admin/user-groups": {
    title: "User Group List",
    addLabel: "User Group",
  },
  "/admin/user-activity": {
    title: "User Activity Logs",
    addLabel: "Activity",
  },
};

// 🧠 Fallback title generator if route is not in JSON
const generateTitle = (path) => {
  if (!path) return "Admin List";
  const parts = path.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  const formatted = last
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `${formatted} List`;
};

const AdminHeaderWithModal = ({ onCreateBusiness, onCreateBranch,onCreateRecalculation,onCreateTemplate,onCreateSystemPrefix ,onCreateUser}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const config = adminRouteConfig[currentPath] || {};
  const title = config.title || generateTitle(currentPath);
  const addLabel = config.addLabel || "Item";

  // 🔹 modal state
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleReset = () => {
    window.location.reload();
  };

  const handleOpenModal = () => {
    // এখন business আর branch দুইটারই modal খুলব
    if (
      currentPath === "/admin/business" ||
      currentPath === "/admin/branch"|| currentPath === "/admin/recalculation"|| currentPath === "/admin/template"||currentPath === "/admin/system-prefix"||currentPath === "/admin/users"
    ) {
      setOpen(true);
    }
  };

  const handleCancelModal = () => {
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleSubmit = async (values) => {
    try {
      setConfirmLoading(true);

      if (currentPath === "/admin/business" && onCreateBusiness) {
        await onCreateBusiness(values);
      } else if (currentPath === "/admin/branch" && onCreateBranch) {
        await onCreateBranch(values);
      }else if (currentPath === "/admin/recalculation" && onCreateBranch) {
        await onCreateRecalculation(values);
      }
      else if (currentPath === "/admin/template" && onCreateBranch) {
        await onCreateTemplate(values);
      }
      else if (currentPath === "/admin/system-prefix" && onCreateBranch) {
        await onCreateSystemPrefix(values);
      }
       else if (currentPath === "/admin/users" && onCreateBranch) {
        await onCreateUser(values);
      }


      setOpen(false);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 24,
          padding: "16px 20px",
          background: "#f0f5ff",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* 🔹 Left Title Section */}
        <h2
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            color: "#1890ff",
          }}
        >
          <UnorderedListOutlined /> {title}
        </h2>

        {/* 🔹 Right Buttons Section */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {/* Reset Button */}
          <Tooltip title="Reset Filters / Refresh">
            <Button
              icon={<ReloadOutlined />}
              style={{
                background: "#faad14",
                color: "#fff",
                border: "none",
              }}
              onClick={handleReset}
            />
          </Tooltip>

          {/* Add Button */}
          <Tooltip title={`Add New ${addLabel}`}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenModal}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Add {addLabel}
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* 🔹 Add Business Modal */}
      {currentPath === "/admin/business" && (
        <AddBusinessModal
          open={open}
          onCancel={handleCancelModal}
          onSubmit={handleSubmit}
          confirmLoading={confirmLoading}
        />
      )}

      {/* 🔹 Add Branch Modal */}
      {currentPath === "/admin/branch" && (
        <AddBranchModal
          open={open}
          onCancel={handleCancelModal}
          onSubmit={handleSubmit}
          confirmLoading={confirmLoading}
        />
      )}
       {currentPath === "/admin/recalculation" && (
        <AddRecalculationModal
          open={open}
          onCancel={handleCancelModal}
          onSubmit={handleSubmit}
          confirmLoading={confirmLoading}
        />
      )}
       {currentPath === "/admin/template" && (
        <AddHeaderTemplateModal
          open={open}
          onCancel={handleCancelModal}
          onSubmit={handleSubmit}
          confirmLoading={confirmLoading}
        />
      )}
       {currentPath === "/admin/system-prefix" && (
        <AddSystemPrefixModal
          open={open}
          onCancel={handleCancelModal}
          onSubmit={handleSubmit}
          confirmLoading={confirmLoading}
        />
      )}
       {currentPath === "/admin/users" && (
        <AddUserModal
          open={open}
          onCancel={handleCancelModal}
          onSubmit={handleSubmit}
          confirmLoading={confirmLoading}
        />
      )}
    </>
  );
};

export default AdminHeaderWithModal;
