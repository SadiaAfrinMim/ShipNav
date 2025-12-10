import { Row, Col, Card, Typography, Drawer, Space, Divider, Input } from "antd";
import {
  FileOutlined,
  FileAddOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * ShipNav Dashboard — Minimalistic Drill-Down (Ant Design)
 *
 * What changed:
 * - Clean, minimal **category cards** grid.
 * - Click a category → **Drawer** opens with all inner cards (Operations, Accounts, Reports).
 * - Keyboard-friendly + responsive. Tiny search inside the Drawer.
 * - Pure AntD, no custom scrolling magic; crisp, focused UI.
 */

const { Title, Text } = Typography;

/* ────────────────────────────────────────────────────────────────────────────
   THEME (Only colors)
   ──────────────────────────────────────────────────────────────────────────── */
const PRIMARY = "#00b4ff";
const PRIMARY_DARK = "#0ea5e9";
const ACCENT = "#22d3ee";
const BG_GRADIENT = `linear-gradient(180deg, #f6fbff 0%, #f9feff 35%, #f5fbff 100%)`;
const CARD_BORDER = "#e6f0f8";
const CARD_SHADOW = "0 6px 24px rgba(0, 180, 255, 0.08)";
const TEXT_DARK = "#0f172a";

/* ────────────────────────────────────────────────────────────────────────────
   Data model
   ──────────────────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    key: "export-sea",
    title: "EXPORT SEA",
    groups: [
      {
        title: "Operations",
        items: [
          { icon: <FileOutlined />, label: "Booking", link: "/export-sea/booking" },
          { icon: <FileAddOutlined />, label: "Shipping Order", link: "/export-sea/shipping-order" },
          { icon: <FileTextOutlined />, label: "Cargo Receive", link: "/export-sea/cargo-receive" },
          { icon: <FileDoneOutlined />, label: "Stuffing Plan", link: "/export-sea/stuffing-plan" },
          { icon: <FileProtectOutlined />, label: "Stuffing Package", link: "/export-sea/stuffing-package" },
          { icon: <FileSearchOutlined />, label: "Shipment Advice", link: "/export-sea/shipment-advice" },
          { icon: <FilePdfOutlined />, label: "HBL", link: "/export-sea/hbl" },
          { icon: <FileExcelOutlined />, label: "MBL", link: "/export-sea/mbl" },
        ],
      },
      {
        title: "Accounts",
        items: [
          { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/export-sea/freight-invoice" },
          { icon: <FileAddOutlined />, label: "Debit Note", link: "/export-sea/debit-note" },
          { icon: <FileDoneOutlined />, label: "Credit Note", link: "/export-sea/credit-note" },
          { icon: <FileDoneOutlined />, label: "Expense Bill", link: "/export-sea/expense-bill" },
        ],
      },
      {
        title: "Reports",
        items: [
          { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/export-sea/report/profit-loss" },
          { icon: <FileExcelOutlined />, label: "Volume", link: "/export-sea/report/volume" },
        ],
      },
    ],
  },
  {
    key: "export-air",
    title: "EXPORT AIR",
    groups: [
      {
        title: "Operations",
        items: [
          { icon: <FileOutlined />, label: "Booking", link: "/export-air/booking" },
          { icon: <FileAddOutlined />, label: "Shipping Order", link: "/export-air/shipping-order" },
          { icon: <FileTextOutlined />, label: "Cargo Receive", link: "/export-air/cargo-receive" },
          { icon: <FilePdfOutlined />, label: "MAWB", link: "/export-air/mawb" },
         { icon: <FileSearchOutlined />, label: "Shipment Advice", link: "/export-air/shipment-advice" }
          
        ],
      },
      {
        title: "Accounts",
        items: [
          { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/export-air/freight-invoice" },
          { icon: <FileAddOutlined />, label: "Debit Note", link: "/export-air/debit-note" },
          { icon: <FileDoneOutlined />, label: "Credit Note", link: "/export-air/credit-note" },
          { icon: <FileDoneOutlined />, label: "Expense Bill", link: "/export-air/expense-bill" },
        ],
      },
      {
        title: "Reports",
        items: [
          { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/export-air/report/profit-loss" },
          { icon: <FileExcelOutlined />, label: "Volume", link: "/export-air/report/volume" },
        ],
      },
    ],
  },
  {
    key: "import-sea",
    title: "IMPORT SEA",
    groups: [
      {
        title: "Operations",
        items: [
          { icon: <FileOutlined />, label: "Booking", link: "/import-sea/booking" },
          { icon: <FilePdfOutlined />, label: "Master B/L", link: "/import-sea/master-bl" },
          { icon: <FileTextOutlined />, label: "Arrival Notice", link: "/import-sea/arrival-notice" },
          { icon: <FileSearchOutlined />, label: "Forward Letter", link: "/import-sea/forward-letter" },
          { icon: <FileSearchOutlined />, label: "Delivery Order", link: "/import-sea/Delivery-order" },
          
        ],
      },
      {
        title: "Accounts",
        items: [
          { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/import-sea/freight-invoice" },
          { icon: <FileAddOutlined />, label: "Debit Note", link: "/import-sea/debit-note" },
          { icon: <FileDoneOutlined />, label: "Credit Note", link: "/import-sea/credit-note" },
           { icon: <FileDoneOutlined />, label: "Expense Bill", link: "/import-sea/expense-bill" },
        ],
      },
      {
        title: "Reports",
        items: [
          { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/import-sea/report/profit-loss" },
          { icon: <FileExcelOutlined />, label: "Volume", link: "/import-sea/report/volume" },
          { icon: <FileExcelOutlined />, label: "cnf-profit-loss", link: "/import-sea/report/cnf-profit-loss" },
          { icon: <FileExcelOutlined />, label: "cnf-volume", link: "/import-sea/report/cnf-volume" },
        ],
      },
    ],
  },
  {
    key: "import-air",
    title: "IMPORT AIR",
    groups: [
      {
        title: "Operations",
        items: [
          
          { icon: <FileOutlined />, label: "Booking", link: "/import-air/booking" },
          { icon: <FilePdfOutlined />, label: "Master B/L", link: "/import-air/master-bl" },
          { icon: <FileTextOutlined />, label: "Arrival Notice", link: "/import-sea/arrival-notice" },
          { icon: <FileTextOutlined />, label: "request Letter", link: "/import-sea/request-letter" },
        ],
      },
      {
        title: "Accounts",
        items: [
          { icon: <FileTextOutlined />, label: "Freight Invoice", link: "/import-air/freight-invoice" },
          { icon: <FileAddOutlined />, label: "Debit Note", link: "/import-air/debit-note" },
          { icon: <FileDoneOutlined />, label: "Credit Note", link: "/import-air/credit-note" },
          { icon: <FileDoneOutlined />, label: "Expense Bill", link: "/import-air/expense-bill" },
        ],
      },
      {
        title: "Reports",
        items: [
          { icon: <FilePdfOutlined />, label: "Profit & Loss", link: "/import-air/report/profit-loss" },
          { icon: <FileExcelOutlined />, label: "Volume", link: "/import-air/report/volume" },
        ],
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   UI bits
   ──────────────────────────────────────────────────────────────────────────── */
const shellCardStyle = {
  borderRadius: 14,
  border: `1px solid ${CARD_BORDER}`,
  boxShadow: CARD_SHADOW,
  background: "#fff",
};

const CategoryTile = ({ title, count, onClick }) => (
  <Card
    hoverable
    onClick={onClick}
    style={{
      ...shellCardStyle,
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      cursor: "pointer",
      // color-only change ↓
      background: `linear-gradient(145deg, ${PRIMARY}10, #ffffff 55%, ${ACCENT}08)`,
      borderColor: `${PRIMARY}33`,
    }}
    bodyStyle={{ width: "100%", padding: 0 }}
  >
    <Space align="center" style={{ width: "100%", justifyContent: "space-between" }}>
      <div>
        <Title
          level={4}
          style={{
            margin: 0,
            letterSpacing: 0.3,
            color: TEXT_DARK,
            textShadow: "0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {title}
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>{count} quick actions</Text>
      </div>
      <ArrowRightOutlined style={{ color: PRIMARY }} />
    </Space>
  </Card>
);

const ItemCard = ({ icon, label, link }) => (
  <Link to={link} style={{ textDecoration: "none" }}>
    <Card
      hoverable
      size="small"
      style={{
        ...shellCardStyle,
        height: 104,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "transform .15s ease",
        // color-only tweak ↓
        borderColor: `${PRIMARY}22`,
      }}
      bodyStyle={{ padding: 12 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.background = `${PRIMARY}08`;
        e.currentTarget.style.borderColor = `${PRIMARY}55`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.borderColor = `${PRIMARY}22`;
      }}
    >
      <Space direction="vertical" align="center" size={6}>
        <span style={{ fontSize: 20, lineHeight: 1, color: PRIMARY }}>{icon}</span>
        <Text style={{ fontWeight: 600, color: TEXT_DARK }}>{label}</Text>
      </Space>
    </Card>
  </Link>
);

/* ────────────────────────────────────────────────────────────────────────────
   Main
   ──────────────────────────────────────────────────────────────────────────── */
const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");

  const openCategory = (cat) => {
    setActive(cat);
    setQuery("");
    setOpen(true);
  };

  const closeCategory = () => setOpen(false);

  const filteredGroups = useMemo(() => {
    if (!active) return [];
    if (!query) return active.groups;
    const q = query.toLowerCase();
    return active.groups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => it.label.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length);
  }, [active, query]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        // color-only change ↓
        background: BG_GRADIENT,
      }}
    >
      <Space direction="vertical" size={6} style={{ display: "block", marginBottom: 8 }}>
        <Title level={3} style={{ margin: 0, color: PRIMARY }}>
          ShipNav
        </Title>
        <Text type="secondary" style={{ color: PRIMARY_DARK }}>
          Quick modules · Export/Import · Sea/Air
        </Text>
      </Space>

      <Row gutter={[16, 16]}>
        {CATEGORIES.map((cat) => (
          <Col key={cat.key} xs={24} sm={12} md={12} lg={8} xl={6}>
            <CategoryTile
              title={cat.title}
              count={cat.groups.reduce((n, g) => n + g.items.length, 0)}
              onClick={() => openCategory(cat)}
            />
          </Col>
        ))}
      </Row>

      {/* Drill-down Drawer */}
      <Drawer
        open={open}
        onClose={closeCategory}
        width={Math.min(720, typeof window !== "undefined" ? window.innerWidth - 64 : 720)}
        title={
          <Space>
            <ArrowLeftOutlined onClick={closeCategory} style={{ cursor: "pointer", color: PRIMARY }} />
            <span style={{ color: PRIMARY }}>{active?.title}</span>
          </Space>
        }
        bodyStyle={{ paddingBottom: 24, background: "#fbfeff" }} // subtle tint
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Input.Search
            allowClear
            placeholder="Search actions in this module..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              // color-only tweak ↓
              borderColor: `${PRIMARY}44`,
              boxShadow: "0 0 0 2px rgba(0,180,255,0.08)",
            }}
          />

          {filteredGroups.length === 0 && (
            <Text type="secondary">No matches. Try a different keyword.</Text>
          )}

          {filteredGroups.map((group) => (
            <div key={group.title}>
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <Title level={5} style={{ margin: 0, color: PRIMARY }}>{group.title}</Title>
                <Text type="secondary">{group.items.length}</Text>
              </Space>
              <Divider style={{ margin: "8px 0 16px", borderColor: `${PRIMARY}22` }} />
              <Row gutter={[12, 12]}>
                {group.items.map((it) => (
                  <Col key={it.label} xs={12} sm={8} md={8} lg={6}>
                    <ItemCard icon={it.icon} label={it.label} link={it.link} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Space>
      </Drawer>
    </div>
  );
};

export default DashBoard;
