import { Row, Col, Card } from "antd";
import {
  FileOutlined,
  FileAddOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// 🔹 Dynamic Card Renderer
const renderCards = (cards) => {
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const container = cardContainerRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 1;

    const scrollInterval = setInterval(() => {
      if (container) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
        }
        container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      ref={cardContainerRef}
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        padding: "8px 4px",
        scrollbarWidth: "thin",
        scrollbarColor: "#38b2ac #e6f0fa",
        scrollBehavior: "smooth",
      }}
    >
      {cards.map((item, index) => (
        <Link key={index} to={item.link} style={{ textDecoration: "none" }}>
          <Card
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              height: "112px",
              width: "144px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#38bdf8",
              color: "#fff",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.backgroundColor = "#0284c7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#38bdf8";
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "24px", lineHeight: "1" }}>
                {item.icon}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {item.label}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const DashBoard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        backgroundColor: "#fff",
        gap: "24px",
      }}
    >
      {/* EXPORT SEA */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="EXPORT SEA" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileOutlined />, label: "Booking", link: "/export-sea/booking" },
              { icon: <FileAddOutlined />, label: "Shipping Order", link: "/export-sea/shipping-order" },
              { icon: <FileTextOutlined />, label: "Cargo Receive", link: "/export-sea/cargo-receive" },
              { icon: <FileDoneOutlined />, label: "Stuffing Plan", link: "/export-sea/stuffing-plan" },
              { icon: <FileProtectOutlined />, label: "Stuffing Package", link: "/export-sea/stuffing-package" },
              { icon: <FileSearchOutlined />, label: "Shipment Advice", link: "/export-sea/shipment-advice" },
              { icon: <FilePdfOutlined />, label: "HBL", link: "/export-sea/hbl" },
              { icon: <FileExcelOutlined />, label: "MBL", link: "/export-sea/mbl" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="EXPORT SEA - Accounts" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/export-sea/freight-invoice" },
              { icon: <FileAddOutlined />, label: "Debit Note", link: "/export-sea/debit-note" },
              { icon: <FileDoneOutlined />, label: "Credit Note", link: "/export-sea/credit-note" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Card title="EXPORT SEA - Reports" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/export-sea/report/profit-loss" },
              { icon: <FileExcelOutlined />, label: "Volume", link: "/export-sea/report/volume" },
            ])}
          </Card>
        </Col>
      </Row>

      {/* EXPORT AIR */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="EXPORT AIR" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileOutlined />, label: "Booking", link: "/export-air/booking" },
              { icon: <FileAddOutlined />, label: "Shipping Order", link: "/export-air/shipping-order" },
              { icon: <FileTextOutlined />, label: "Cargo Receive", link: "/export-air/cargo-receive" },
              { icon: <FilePdfOutlined />, label: "MAWB", link: "/export-air/mawb" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="EXPORT AIR - Accounts" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/export-air/freight-invoice" },
              { icon: <FileAddOutlined />, label: "Debit Note", link: "/export-air/debit-note" },
              { icon: <FileDoneOutlined />, label: "Credit Note", link: "/export-air/credit-note" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Card title="EXPORT AIR - Reports" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/export-air/report/profit-loss" },
              { icon: <FileExcelOutlined />, label: "Volume", link: "/export-air/report/volume" },
            ])}
          </Card>
        </Col>
      </Row>

      {/* IMPORT SEA */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="IMPORT SEA" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileOutlined />, label: "Booking", link: "/import-sea/booking" },
              { icon: <FilePdfOutlined />, label: "Master B/L", link: "/import-sea/master-bl" },
              { icon: <FileTextOutlined />, label: "Arrival Notice", link: "/import-sea/arrival-notice" },
              { icon: <FileSearchOutlined />, label: "Forward Letter", link: "/import-sea/forward-letter" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="IMPORT SEA - Accounts" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/import-sea/freight-invoice" },
              { icon: <FileAddOutlined />, label: "Debit Note", link: "/import-sea/debit-note" },
              { icon: <FileDoneOutlined />, label: "Credit Note", link: "/import-sea/credit-note" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Card title="IMPORT SEA - Reports" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/import-sea/report/profit-loss" },
              { icon: <FileExcelOutlined />, label: "Volume", link: "/import-sea/report/volume" },
            ])}
          </Card>
        </Col>
      </Row>

      {/* IMPORT AIR */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="IMPORT AIR" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileOutlined />, label: "Booking", link: "/import-air/booking" },
              { icon: <FilePdfOutlined />, label: "Master B/L", link: "/import-air/master-bl" },
              { icon: <FileTextOutlined />, label: "Request Letter", link: "/import-air/request-letter" },
              { icon: <FileTextOutlined />, label: "Forward Letter", link: "/import-air/forward-letter" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="IMPORT AIR - Accounts" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/import-air/freight-invoice" },
              { icon: <FileAddOutlined />, label: "Debit Note", link: "/import-air/debit-note" },
              { icon: <FileDoneOutlined />, label: "Credit Note", link: "/import-air/credit-note" },
            ])}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Card title="IMPORT AIR - Reports" bordered={false} style={cardStyle}>
            {renderCards([
              { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/import-air/report/profit-loss" },
              { icon: <FileExcelOutlined />, label: "Volume", link: "/import-air/report/volume" },
            ])}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// 🔹 Common card style
const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  height: "100%",
  borderTop: "4px solid #38bdf8",
};

export default DashBoard;
