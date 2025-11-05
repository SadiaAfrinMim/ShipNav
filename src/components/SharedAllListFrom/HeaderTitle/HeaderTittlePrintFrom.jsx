import React from "react";
import {
  PrinterOutlined,
  ReloadOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useLocation } from "react-router-dom";

// ✅ Helper: convert path → readable title
const generateTitle = (path) => {
  if (!path) return "";
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2) return path;

  const section = parts[0]
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());
  const name = parts[1]
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  return `${section} - ${name}`;
};

// ✅ Header Component
const HeaderTittlePrintFrom = () => {
  const { pathname } = useLocation();
  const title = generateTitle(pathname);

  const handlePrint = () => {
    window.print();
  };

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

        <Button
          type="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrint}
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default HeaderTittlePrintFrom;
