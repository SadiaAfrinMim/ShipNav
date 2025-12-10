// File: HeaderEditFromTitle.jsx  

import React from "react";
import { ReloadOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useLocation } from "react-router-dom";

// 🧩 JSON-based route → EDIT title mapping
const routeTitles = {
  // EXPORT SEA
  "/export-sea/edit-booking": "Edit Sea Booking",
  "/export-sea/edit-shipping-order": "Edit Shipping Order",
  "/export-sea/edit-cargo-receive": "Edit Cargo Receive",
  "/export-sea/edit-stuffing-plan": "Edit Stuffing Plan",
  "/export-sea/edit-stuffing-package": "Edit Stuffing Package",
  "/export-sea/edit-shipment-advice": "Edit Shipment Advice",
  "/export-sea/edit-hbl": "Edit HBL (House Bill)",
  "/export-sea/edit-mbl": "Edit MBL (Master Bill)",
  "/export-sea/edit-freight-invoice": "Edit Freight Invoice",
  "/export-sea/edit-debit-note": "Edit Debit Note",
  "/export-sea/edit-credit-note": "Edit Credit Note",
  "/export-sea/report/edit-profit-loss": "Edit Profit & Loss Report",
  "/export-sea/report/edit-volume": "Edit Volume Report",

  // EXPORT AIR
  "/export-air/edit-booking": "Edit Air Booking",
  "/export-air/edit-shipping-order": "Edit Shipping Order",
  "/export-air/edit-cargo-receive": "Edit Cargo Receive",
  "/export-air/edit-mawb": "Edit MAWB",
  "/export-air/edit-freight-invoice": "Edit Freight Invoice",
  "/export-air/edit-debit-note": "Edit Debit Note",
  "/export-air/edit-credit-note": "Edit Credit Note",
  "/export-air/report/edit-profit-loss": "Edit Profit & Loss Report",
  "/export-air/report/edit-volume": "Edit Volume Report",

  // IMPORT SEA
  "/import-sea/edit-booking": "Edit Sea Booking",
  "/import-sea/edit-master-bl": "Edit Master BL",
  "/import-sea/edit-arrival-notice": "Edit Arrival Notice",
  "/import-sea/edit-forward-letter": "Edit Forward Letter",
  "/import-sea/edit-freight-invoice": "Edit Freight Invoice",
  "/import-sea/edit-debit-note": "Edit Debit Note",
  "/import-sea/edit-credit-note": "Edit Credit Note",
  "/import-sea/report/edit-profit-loss": "Edit Profit & Loss Report",
  "/import-sea/report/edit-volume": "Edit Volume Report",

  // IMPORT AIR
  "/import-air/edit-booking": "Edit Air Booking",
  "/import-air/edit-master-bl": "Edit Master BL",
  "/import-air/edit-request-letter": "Edit Request Letter",
  "/import-air/edit-forward-letter": "Edit Forward Letter",
  "/import-air/edit-freight-invoice": "Edit Freight Invoice",
  "/import-air/edit-debit-note": "Edit Debit Note",
  "/import-air/edit-credit-note": "Edit Credit Note",
  "/import-air/report/edit-profit-loss": "Edit Profit & Loss Report",
  "/import-air/report/edit-volume": "Edit Volume Report",
};

// 🧠 Fallback title generator if route is not in JSON
const generateTitle = (path) => {
  if (!path) return "Edit Page";

  const parts = path.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";

  // "edit-hbl" → "hbl"
  const cleaned = last.startsWith("edit-") ? last.replace(/^edit-/, "") : last;

  const formatted = cleaned
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return `Edit ${formatted}`;
};

const HeaderEditFromTitle = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if path exists in JSON, else fallback
  const title = routeTitles[currentPath] || generateTitle(currentPath);

  return (
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
          fontSize: 24,
          color: "#1890ff",
        }}
      >
        <UnorderedListOutlined /> {title}
      </h2>

      {/* 🔹 Right Buttons Section */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Tooltip title="Reset Form">
          <Button
            icon={<ReloadOutlined />}
            style={{
              background: "#faad14",
              color: "#fff",
              border: "none",
            }}
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default HeaderEditFromTitle;
