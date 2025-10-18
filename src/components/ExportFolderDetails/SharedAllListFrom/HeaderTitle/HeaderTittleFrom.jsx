import React from "react";
import {
  PlusOutlined,
  ReloadOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

// ✅ All routes (optional - for reference, not mandatory)
const routeList = [
  "/export-sea/booking",
  "/export-sea/shipping-order",
  "/export-sea/cargo-receive",
  "/export-sea/stuffing-plan",
  "/export-sea/stuffing-package",
  "/export-sea/shipment-advice",
  "/export-sea/hbl",
  "/export-sea/mbl",
  "/export-sea/freight-invoice",
  "/export-sea/debit-note",
  "/export-sea/credit-note",
  "/export-sea/report/profit-loss",
  "/export-sea/report/volume",

  "/export-air/booking",
  "/export-air/shipping-order",
  "/export-air/cargo-receive",
  "/export-air/mawb",
  "/export-air/freight-invoice",
  "/export-air/debit-note",
  "/export-air/credit-note",
  "/export-air/report/profit-loss",
  "/export-air/report/volume",

  "/import-sea/booking",
  "/import-sea/master-bl",
  "/import-sea/arrival-notice",
  "/import-sea/forward-letter",
  "/import-sea/freight-invoice",
  "/import-sea/debit-note",
  "/import-sea/credit-note",
  "/import-sea/report/profit-loss",
  "/import-sea/report/volume",

  "/import-air/booking",
  "/import-air/master-bl",
  "/import-air/request-letter",
  "/import-air/forward-letter",
  "/import-air/freight-invoice",
  "/import-air/debit-note",
  "/import-air/credit-note",
  "/import-air/report/profit-loss",
  "/import-air/report/volume",
];

// ✅ Helper: convert path → readable title
const generateTitle = (path) => {
  if (!path) return "";
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2) return path;

  // e.g. "export-sea" → "Export Sea"
  const section = parts[0]
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());
  // e.g. "cargo-receive" → "Cargo Receive"
  const name = parts[1]
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  return `${section} - ${name}`;
};

// ✅ Helper: generate Add button link dynamically
const generateAddLink = (path) => {
  if (!path) return "/";
  const parts = path.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  const isBooking = last?.toLowerCase() === "booking";

  // For booking, return same route
  if (isBooking) return path;

  // Otherwise add prefix: same parent + "add-" + last
  const parent = parts.slice(0, -1).join("/");
  return `/${parent}/add-${last}`;
};

// ✅ Header Component
const HeaderTittleFrom = () => {
  const { pathname } = useLocation();

  const title = generateTitle(pathname);
  const addLink = generateAddLink(pathname);

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
      {/* 🔹 Dynamic Page Title */}
      <h2
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 22,
          color: "#1890ff",
          textTransform: "capitalize",
        }}
      >
        <UnorderedListOutlined /> {title || "Page"}
      </h2>

      {/* 🔹 Right Buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Button
          icon={<ReloadOutlined />}
          style={{ background: "#faad14", color: "#fff", border: "none" }}
          onClick={() => window.location.reload()}
        >
          Reset
        </Button>

        <Link to={addLink}>
          <Button type="primary" icon={<PlusOutlined />}>
            {title?.split(" - ")[1]
              ? `Add ${title.split(" - ")[1]}`
              : "Add New"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderTittleFrom;
