import React, { useState, useEffect } from "react";
import {
  Layout, Menu, Button, Dropdown, Avatar, Input, Badge, Drawer, Typography, Divider
} from "antd";
import {
  SearchOutlined, BellOutlined, MessageOutlined, UserOutlined, SettingOutlined,
  LogoutOutlined, MenuOutlined, BarChartOutlined, ShoppingCartOutlined,
  CloseOutlined, DownOutlined, RightOutlined, GlobalOutlined, CloudOutlined,
  ToolOutlined, AuditOutlined, FileTextOutlined, DollarOutlined, BookOutlined,
  InboxOutlined, FileDoneOutlined, AppstoreOutlined, RocketOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { SubMenu } = Menu;

/* ---------------- BLUE + WHITE ONLY ---------------- */
const C = {
  headerStart: "#0D47A1",
  headerMid:   "#1565C0",
  headerEnd:   "#1E88E5",
  white: "#FFFFFF",
  whiteDim: "rgba(255,255,255,.92)",
  hoverFilm: "rgba(255,255,255,.14)",
  active: "#90CAF9",               // pale blue for underline (still blue)
  popBg: "linear-gradient(180deg,#FFFFFF 0%,#F7FAFF 100%)",
  popBorder: "#E1ECFF",
  popHover: "#F3F8FF",
  searchBg: "rgba(255,255,255,.18)",
  searchBorder: "rgba(255,255,255,.30)",
};

/* ---------------- ROUTES (unchanged) ---------------- */
const routeMap = {
  "/": "/",
  "exp-sea:booking": "/export-sea/booking",
  "exp-sea:shipping-order": "/export-sea/shipping-order",
  "exp-sea:cargo-receive": "/export-sea/cargo-receive",
  "exp-sea:stuffing-plan": "/export-sea/stuffing-plan",
  "exp-sea:stuffing-package": "/export-sea/stuffing-package",
  "exp-sea:shipment-advice": "/export-sea/shipment-advice",
  "exp-sea:hbl": "/export-sea/hbl",
  "exp-sea:mbl": "/export-sea/mbl",
  "exp-sea:freight-invoice": "/export-sea/freight-invoice",
  "exp-sea:debit-note": "/export-sea/debit-note",
  "exp-sea:credit-note": "/export-sea/credit-note",
  "exp-sea:report:pl": "/export-sea/report/profit-loss",
  "exp-sea:report:volume": "/export-sea/report/volume",

  "exp-air:booking": "/export-air/booking",
  "exp-air:shipping-order": "/export-air/shipping-order",
  "exp-air:cargo-receive": "/export-air/cargo-receive",
  "exp-air:mawb": "/export-air/mawb",
  "exp-air:freight-invoice": "/export-air/freight-invoice",
  "exp-air:debit-note": "/export-air/debit-note",
  "exp-air:credit-note": "/export-air/credit-note",
  "exp-air:report:pl": "/export-air/report/profit-loss",
  "exp-air:report:volume": "/export-air/report/volume",

  "imp-sea:booking": "/import-sea/booking",
  "imp-sea:master-bl": "/import-sea/master-bl",
  "imp-sea:arrival-notice": "/import-sea/arrival-notice",
  "imp-sea:forward-letter": "/import-sea/forward-letter",
  "imp-sea:freight-invoice": "/import-sea/freight-invoice",
  "imp-sea:debit-note": "/import-sea/debit-note",
  "imp-sea:credit-note": "/import-sea/credit-note",
  "imp-sea:report:pl": "/import-sea/report/profit-loss",
  "imp-sea:report:volume": "/import-sea/report/volume",

  "imp-air:booking": "/import-air/booking",
  "imp-air:master-bl": "/import-air/master-bl",
  "imp-air:request-letter": "/import-air/request-letter",
  "imp-air:forward-letter": "/import-air/forward-letter",
  "imp-air:freight-invoice": "/import-air/freight-invoice",
  "imp-air:debit-note": "/import-air/debit-note",
  "imp-air:credit-note": "/import-air/credit-note",
  "imp-air:report:pl": "/import-air/report/profit-loss",
  "imp-air:report:volume": "/import-air/report/volume",

  profile: "/profile",
  settings: "/settings",
  logout: "/logout",
};

/* --------------- MENU GROUPS (unchanged items) --------------- */
const seaExportMenu = {
  key: "export-sea",
  label: "EXPORT SEA",
  icon: <GlobalOutlined />,
  submenu: [
    { key: "exp-sea:booking", label: "Booking", icon: <BookOutlined /> },
    { key: "exp-sea:shipping-order", label: "Shipping Order", icon: <FileDoneOutlined /> },
    { key: "exp-sea:cargo-receive", label: "Cargo Receive", icon: <InboxOutlined /> },
    { key: "exp-sea:stuffing", label: "Cargo Stuffing", icon: <AppstoreOutlined />, submenu: [
      { key: "exp-sea:stuffing-plan", label: "Stuffing Plan" },
      { key: "exp-sea:stuffing-package", label: "Stuffing Package" },
    ]},
    { key: "exp-sea:shipment-advice", label: "Shipment Advice", icon: <FileTextOutlined /> },
    { key: "exp-sea:hbl", label: "HBL", icon: <FileTextOutlined /> },
    { key: "exp-sea:mbl", label: "MBL", icon: <FileTextOutlined /> },
    { key: "exp-sea:accounts", label: "Accounting", icon: <DollarOutlined />, submenu: [
      { key: "exp-sea:freight-invoice", label: "Freight Invoice" },
      { key: "exp-sea:debit-note", label: "Debit Note" },
      { key: "exp-sea:credit-note", label: "Credit Note" },
    ]},
    { key: "exp-sea:reports", label: "Reports", icon: <BarChartOutlined />, submenu: [
      { key: "exp-sea:report:pl", label: "Profit & Loss" },
      { key: "exp-sea:report:volume", label: "Volume" },
    ]},
  ],
};

const airExportMenu = {
  key: "export-air",
  label: "EXPORT AIR",
  icon: <CloudOutlined />,
  submenu: [
    { key: "exp-air:booking", label: "Booking" },
    { key: "exp-air:shipping-order", label: "Shipping Order" },
    { key: "exp-air:cargo-receive", label: "Cargo Receive" },
    { key: "exp-air:mawb", label: "MAWB" },
    { key: "exp-air:accounts", label: "Accounting", submenu: [
      { key: "exp-air:freight-invoice", label: "Freight Invoice" },
      { key: "exp-air:debit-note", label: "Debit Note" },
      { key: "exp-air:credit-note", label: "Credit Note" },
    ]},
    { key: "exp-air:report:pl", label: "Profit & Loss" },
    { key: "exp-air:report:volume", label: "Volume" },
  ],
};

const seaImportMenu = {
  key: "import-sea",
  label: "IMPORT SEA",
  icon: <GlobalOutlined />,
  submenu: [
    { key: "imp-sea:booking", label: "Booking" },
    { key: "imp-sea:master-bl", label: "Master BL" },
    { key: "imp-sea:arrival-notice", label: "Arrival Notice" },
    { key: "imp-sea:forward-letter", label: "Forward Letter" },
    { key: "imp-sea:accounts", label: "Accounting", submenu: [
      { key: "imp-sea:freight-invoice", label: "Freight Invoice" },
      { key: "imp-sea:debit-note", label: "Debit Note" },
      { key: "imp-sea:credit-note", label: "Credit Note" },
    ]},
    { key: "imp-sea:report:pl", label: "Profit & Loss" },
    { key: "imp-sea:report:volume", label: "Volume" },
  ],
};

const airImportMenu = {
  key: "import-air",
  label: "IMPORT AIR",
  icon: <CloudOutlined />,
  submenu: [
    { key: "imp-air:booking", label: "Booking" },
    { key: "imp-air:master-bl", label: "Master BL" },
    { key: "imp-air:request-letter", label: "Request Letter" },
    { key: "imp-air:forward-letter", label: "Forward Letter" },
    { key: "imp-air:accounts", label: "Accounting", submenu: [
      { key: "imp-air:freight-invoice", label: "Freight Invoice" },
      { key: "imp-air:debit-note", label: "Debit Note" },
      { key: "imp-air:credit-note", label: "Credit Note" },
    ]},
    { key: "imp-air:report:pl", label: "Profit & Loss" },
    { key: "imp-air:report:volume", label: "Volume" },
  ],
};

const rightMenus = [
  { key: "accounts", label: "ACCOUNTS", icon: <DollarOutlined />, submenu: [
    { key: "acc:ledger", label: "Ledger" },
    { key: "acc:voucher", label: "Vouchers" },
  ]},
  { key: "orders", label: "ORDERS", icon: <ShoppingCartOutlined />, submenu: [
    { key: "ord:po", label: "Purchase Orders" },
    { key: "ord:so", label: "Sales Orders" },
  ]},
  { key: "reports", label: "REPORTS", icon: <BarChartOutlined />, submenu: [
    { key: "rep:kpi", label: "KPIs" },
    { key: "rep:ops", label: "Operations" },
  ]},
  { key: "essential", label: "ESSENTIAL", icon: <ToolOutlined />, submenu: [
    { key: "ess:masters", label: "Masters" },
    { key: "ess:utilities", label: "Utilities" },
  ]},
  { key: "settings", label: "SETTINGS", icon: <SettingOutlined />, submenu: [
    { key: "set:users", label: "Users & Roles" },
    { key: "set:preferences", label: "Preferences" },
  ]},
  { key: "admin", label: "ADMIN", icon: <AuditOutlined />, submenu: [
    { key: "adm:logs", label: "Audit Logs" },
    { key: "adm:backup", label: "Backup" },
  ]},
];

/* -------------------- NAVBAR -------------------- */
export default function ShipNavbar() {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [current, setCurrent] = useState("/");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [openSubMenuKeys, setOpenSubMenuKeys] = useState([]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1200);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const userMenuItems = [
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout", danger: true },
  ];

  const CustomSubTitle = ({ label, icon }) => (
    <span style={{ display: "flex", alignItems: "center", color: C.whiteDim }}>
      {icon}
      <span style={{ marginLeft: 6 }}>{label}</span>
      <DownOutlined style={{ fontSize: 10, marginLeft: 6 }} />
    </span>
  );

  const go = (key, closeDrawer = false) => {
    const path = routeMap[key] || key;
    if (path) {
      navigate(path);
      setCurrent(key);
      if (closeDrawer) setDrawerVisible(false);
    }
  };

  const render = (items, mobile = false) =>
    items.map((m) =>
      m.submenu ? (
        <SubMenu
          key={m.key}
          title={
            mobile ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                {m.icon}
                <span style={{ marginLeft: 6 }}>{m.label}</span>
              </span>
            ) : (
              <CustomSubTitle label={m.label} icon={m.icon} />
            )
          }
          icon={mobile ? m.icon : null}
          expandIcon={mobile && openSubMenuKeys.includes(m.key) ? <DownOutlined /> : <RightOutlined />}
        >
          {render(m.submenu, mobile)}
        </SubMenu>
      ) : (
        <Menu.Item key={m.key} icon={mobile ? m.icon : null}>
          {mobile ? (
            <span style={{ display: "flex", alignItems: "center" }}>
              {m.icon}
              <span style={{ marginLeft: 6 }}>{m.label}</span>
            </span>
          ) : (
            m.label
          )}
        </Menu.Item>
      )
    );

  return (
    <>
      <Header
        style={{
          background: `linear-gradient(90deg, ${C.headerStart}, ${C.headerMid} 45%, ${C.headerEnd})`,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 6px 18px rgba(21,101,192,.28)",
        }}
      >
        {/* Brand: ShipNav (blue/white only) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <RocketOutlined style={{ color: C.white, fontSize: 18, marginRight: 8 }} />
            <Title
              level={4}
              style={{
                color: C.white,
                margin: 0,
                fontWeight: 800,
                letterSpacing: 0.6,
              }}
            >
              ShipNav
            </Title>
          </Link>

          {!isMobile && (
            <Menu
              mode="horizontal"
              theme="dark"
              selectedKeys={[current]}
              onClick={(e) => go(e.key)}
              style={{
                background: "transparent",
                border: "none",
                marginLeft: 10,
                flex: 1,
                minWidth: 0,
                textTransform: "uppercase",
                letterSpacing: ".02em",
                fontWeight: 600,
              }}
            >
              {render([seaExportMenu, airExportMenu, seaImportMenu, airImportMenu])}
              {render(rightMenus)}
            </Menu>
          )}
        </div>

        {/* Tools (blue/white only) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isMobile && (
            <Search
              placeholder="Search…"
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              style={{ width: 230, borderRadius: 10 }}
              className="sn-search"
            />
          )}

          <Badge count={4} size="small">
            <Button type="text" icon={<BellOutlined />} style={{ color: C.white }} />
          </Badge>
          <Badge count={8} size="small">
            <Button type="text" icon={<MessageOutlined />} style={{ color: C.white }} />
          </Badge>

          <Dropdown
            menu={{ items: userMenuItems, onClick: ({ key }) => go(key) }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="sn-dropdown"
          >
            <Avatar size="small" icon={<UserOutlined />} style={{ cursor: "pointer", border: "2px solid #fff" }} />
          </Dropdown>

          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ color: C.white, display: isMobile ? "block" : "none" }}
          />
        </div>
      </Header>

      {/* Drawer (mobile) */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>Menu</span>
            <Button type="text" icon={<CloseOutlined />} onClick={() => setDrawerVisible(false)} />
          </div>
        }
        placement="right"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={320}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: 12 }}>
          <Search placeholder="Search…" allowClear enterButton={<SearchOutlined />} />
        </div>
        <Divider style={{ margin: 0 }} />
        <Menu
          mode="inline"
          selectedKeys={[current]}
          openKeys={openSubMenuKeys}
          onOpenChange={setOpenSubMenuKeys}
          onClick={(e) => go(e.key, true)}
          style={{ border: "none" }}
        >
          {render([seaExportMenu, airExportMenu, seaImportMenu, airImportMenu, ...rightMenus], true)}
        </Menu>
      </Drawer>

      {/* Blue/White Polish */}
      <style jsx global>{`
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-item,
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu {
          color: ${C.whiteDim};
        }
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover,
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu:hover {
          background: ${C.hoverFilm};
          border-radius: 10px;
        }

        .ant-menu-dark.ant-menu-horizontal > .ant-menu-item-selected::after,
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu-selected::after {
          border-bottom: 2px solid ${C.active};
        }
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-item-selected,
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu-selected {
          color: ${C.white};
        }

        .ant-menu-submenu-popup,
        .sn-dropdown .ant-dropdown-menu {
          background: ${C.popBg};
          border: 1px solid ${C.popBorder};
          box-shadow: 0 14px 30px rgba(13, 71, 161, 0.15);
          border-radius: 12px;
          overflow: hidden;
        }
        .ant-menu-submenu-popup .ant-menu,
        .sn-dropdown .ant-dropdown-menu { background: transparent; }
        .ant-menu-submenu-popup .ant-menu-item,
        .ant-menu-submenu-popup .ant-menu-submenu-title,
        .sn-dropdown .ant-dropdown-menu-item {
          transition: background .18s ease, padding-left .18s ease;
        }
        .ant-menu-submenu-popup .ant-menu-item:hover,
        .ant-menu-submenu-popup .ant-menu-submenu-title:hover,
        .sn-dropdown .ant-dropdown-menu-item:hover {
          background: ${C.popHover};
          padding-left: 8px;
        }

        .sn-search .ant-input-affix-wrapper,
        .sn-search .ant-input {
          background: ${C.searchBg} !important;
          border-color: ${C.searchBorder} !important;
          color: ${C.white};
        }
        .sn-search .ant-btn { border-color: transparent; }

        .ant-menu-submenu-title .anticon-down { font-size: 10px; margin-left: 6px; }
        .ant-menu-submenu-open .ant-menu-submenu-title .anticon-down { transform: rotate(180deg); }

        @media (max-width: 1199px) {
          .ant-menu-horizontal { display: none !important; }
        }
      `}</style>
    </>
  );
}
