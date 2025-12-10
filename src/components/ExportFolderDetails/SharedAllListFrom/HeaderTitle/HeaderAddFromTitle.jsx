// File: HeaderAddFromTitle.jsx

import React from "react";
import {
  ReloadOutlined,
  RestFilled,
  UnorderedListOutlined,
  ArrowLeftOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

// 🧩 JSON-based route → title mapping
const routeTitles = {
  // 🌊 Export Sea
  "/export-sea/booking": "Add Sea Booking",
  "/export-sea/shipping-order": "Add Shipping Order",
  "/export-sea/cargo-receive": "Add Cargo Receive",
  "/export-sea/stuffing-plan": "Add Stuffing Plan",
  "/export-sea/stuffing-package": "Add Stuffing Package",
  "/export-sea/shipment-advice": "Add Shipment Advice",
  "/export-sea/hbl": "Add HBL (House Bill)",
  "/export-sea/mbl": "Add MBL (Master Bill)",
  "/export-sea/freight-invoice": "Add Freight Invoice",
  "/export-sea/debit-note": "Add Debit Note",
  "/export-sea/credit-note": "Add Credit Note",
  "/export-sea/report/profit-loss": "Add Profit & Loss Report",
  "/export-sea/report/volume": "Add Volume Report",

  // ✈️ Export Air
  "/export-air/booking": "Add Air Booking",
  "/export-air/shipping-order": "Add Shipping Order",
  "/export-air/cargo-receive": "Add Cargo Receive",
  "/export-air/mawb": "Add MAWB",
  "/export-air/freight-invoice": "Add Freight Invoice",
  "/export-air/debit-note": "Add Debit Note",
  "/export-air/credit-note": "Add Credit Note",
  "/export-air/report/profit-loss": "Add Profit & Loss Report",
  "/export-air/report/volume": "Add Volume Report",

  // 🚢 Import Sea
  "/import-sea/booking": "Add Sea Booking",
  "/import-sea/master-bl": "Add Master BL",
  "/import-sea/arrival-notice": "Add Arrival Notice",
  "/import-sea/forward-letter": "Add Forward Letter",
  "/import-sea/freight-invoice": "Add Freight Invoice",
  "/import-sea/debit-note": "Add Debit Note",
  "/import-sea/credit-note": "Add Credit Note",
  "/import-sea/report/profit-loss": "Add Profit & Loss Report",
  "/import-sea/report/volume": "Add Volume Report",

  // ✈️ Import Air
  "/import-air/booking": "Add Air Booking",
  "/import-air/master-bl": "Add Master BL",
  "/import-air/request-letter": "Add Request Letter",
  "/import-air/forward-letter": "Add Forward Letter",
  "/import-air/freight-invoice": "Add Freight Invoice",
  "/import-air/debit-note": "Add Debit Note",
  "/import-air/credit-note": "Add Credit Note",
  "/import-air/report/profit-loss": "Add Profit & Loss Report",
  "/import-air/report/volume": "Add Volume Report",
};

// 🔧 fallback title (generic)
const generateFallbackTitle = (path) => {
  if (!path) return "Add Page";
  const parts = path.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  const formatted = last
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `Add ${formatted || "Page"}`;
};

// 🔧 optional: /add/..., /route/... pattern
const generateTitleByPrefix = (path) => {
  if (!path) return null;

  let prefixLabel = "Add";
  let trimmedPath = path;

  if (path.startsWith("/add")) {
    prefixLabel = "Add";
    trimmedPath = path.replace(/^\/add/, "");
  } else if (path.startsWith("/route")) {
    prefixLabel = "Route";
    trimmedPath = path.replace(/^\/route/, "");
  } else {
    return null;
  }

  const parts = trimmedPath.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  if (!last) return `${prefixLabel} Page`;

  const formatted = last
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return `${prefixLabel} ${formatted}`;
};

// ⭐ main: route ভিত্তিক title resolver
const resolveTitleFromRoute = (path) => {
  if (!path) return "Add Page";

  // 1) exact match ache naki?
  if (routeTitles[path]) return routeTitles[path];

  // 2) action-route pattern: /something/edit-xxx , /something/copy-xxx , /something/view-xxx
  const parts = path.split("/").filter(Boolean);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    const [actionPart, ...slugParts] = last.split("-");
    const actionMap = { edit: "Edit", copy: "Copy", view: "View" };
    const actionLabel = actionMap[actionPart];

    if (actionLabel && slugParts.length) {
      const baseSlug = slugParts.join("-");
      const basePath = "/" + [...parts.slice(0, -1), baseSlug].join("/");

      const baseTitle = routeTitles[basePath];

      if (baseTitle) {
        // baseTitle: "Add Shipping Order" → remove first word
        const words = baseTitle.split(" ");
        const restTitle =
          words.length > 1 ? words.slice(1).join(" ") : baseTitle;
        return `${actionLabel} ${restTitle}`;
      }

      // base route mapping na thakle generic banabo
      const prettyName = baseSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return `${actionLabel} ${prettyName}`;
    }
  }

  // 3) prefix-based logic (optional)
  const prefixTitle = generateTitleByPrefix(path);
  if (prefixTitle) return prefixTitle;

  // 4) final fallback
  return generateFallbackTitle(path);
};

// 🔧 route theke module label (Export Sea / Export Air / Import Sea / Import Air)
const getModuleLabel = (path) => {
  if (!path) return "";
  const parts = path.split("/").filter(Boolean);
  const first = parts[0] || "";

  switch (first) {
    case "export-sea":
      return "Export Sea";
    case "export-air":
      return "Export Air";
    case "import-sea":
      return "Import Sea";
    case "import-air":
      return "Import Air";
    default:
      return "";
  }
};

const HeaderAddFromTitle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const parts = currentPath.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  let mode = "add";
  if (last.startsWith("view-")) mode = "view";
  else if (last.startsWith("edit-")) mode = "edit";
  else if (last.startsWith("copy-")) mode = "copy";

  const baseTitle = resolveTitleFromRoute(currentPath);
  const moduleLabel = getModuleLabel(currentPath);

  const title = moduleLabel ? `${moduleLabel} - ${baseTitle}` : baseTitle;

  const handleBack = () => navigate(-1);
  const handleReset = () => window.location.reload();
  const handlePrint = () => window.print();

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
        {/* Back button */}
        <Tooltip title="Back">
          <Button
            icon={<ArrowLeftOutlined />}
            style={{ background: "#1890ff", color: "#fff", border: "none" }}
            onClick={handleBack}
          />
        </Tooltip>

        {mode === "view" ? (
          // VIEW MODE → Print + Back
          <Tooltip title="Print">
            <Button
              icon={<PrinterOutlined />}
              style={{ background: "#52c41a", color: "#fff", border: "none" }}
              onClick={handlePrint}
            />
          </Tooltip>
        ) : (
          // ADD / EDIT / COPY → Reset button
          <Tooltip title="Reset Form">
            <Button
              icon={<ReloadOutlined />}
              style={{
                background: "#faad14",
                color: "#fff",
                border: "none",
              }}
              onClick={handleReset}
            >
              <RestFilled />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default HeaderAddFromTitle;
