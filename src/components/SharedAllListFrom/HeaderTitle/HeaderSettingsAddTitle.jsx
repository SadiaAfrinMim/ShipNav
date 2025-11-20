// File: HeaderAddFromTitle.jsx

import React, { useState } from "react";
import {
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import AddShipperModal from "../Modal/party/AddShipperModal";



// ---------------- MASTER MENU ROUTES ----------------
export const masterMenuRoutes = [
  {
    key: "party",
    label: "Party",
    basePath: "/party",
    children: [
      { key: "shipper", label: "Shipper", path: "/party/shipper", title: "Add Shipper" },
      { key: "consignee", label: "Consignee", path: "/party/consignee", title: "Add Consignee" },
      { key: "agent", label: "Agent", path: "/party/agent", title: "Add Agent" },
      { key: "cf-agent", label: "C&F Agent", path: "/party/cf-agent", title: "Add C&F Agent" },
      { key: "carrier", label: "Carrier", path: "/party/carrier", title: "Add Carrier" },
      { key: "third-party", label: "3rd Party", path: "/party/third-party", title: "Add 3rd Party" },
      { key: "cfs", label: "CFS", path: "/party/cfs", title: "Add CFS" },
      { key: "customer", label: "Customer", path: "/party/customer", title: "Add Customer" },
      { key: "supplier", label: "Supplier", path: "/party/supplier", title: "Add Supplier" },
      { key: "employee", label: "Employee", path: "/party/employee", title: "Add Employee" },
      { key: "management", label: "Management", path: "/party/management", title: "Add Management" },
      { key: "others-party", label: "Others Party", path: "/party/others-party", title: "Add Others Party" },
      { key: "department", label: "Department", path: "/party/department", title: "Add Department" },
      { key: "designation", label: "Designation", path: "/party/designation", title: "Add Designation" },
    ],
  },
];

// ---------------- TITLE MERGE ----------------
const masterRouteTitleMap = masterMenuRoutes.reduce((acc, item) => {
  if (item.basePath && item.title) acc[item.basePath] = item.title;

  if (Array.isArray(item.children)) {
    item.children.forEach((child) => {
      if (child.path && child.title) acc[child.path] = child.title;
    });
  }

  return acc;
}, {});

const allRouteTitles = { ...masterRouteTitleMap };

// ---------------- FALLBACK TITLE ----------------
const generateTitle = (path) => {
  if (!path) return "Add Page";
  const last = path.split("/").filter(Boolean).pop();
  return `Add ${last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`;
};

// ---------------- COMPONENT ----------------
const HeaderAddFromTitle = () => {
  const { pathname } = useLocation();
  const title = allRouteTitles[pathname] || generateTitle(pathname);

  // ⬇ modal state
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER UI */}
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
        <h2
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 24,
            color: "#1890ff",
          }}
        >
          <UnorderedListOutlined /> {title}
        </h2>

        {/* Add Button */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            background: "#1890ff",
            border: "none",
            padding: "4px 14px",
          }}
          onClick={() => setOpen(true)}
        >
          {title}
        </Button>
      </div>

      {/* REAL MODAL */}
      <AddShipperModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={(values) => {
          console.log("Submitted:", values);
          setOpen(false);
        }}
      />
    </>
  );
};

export default HeaderAddFromTitle;
