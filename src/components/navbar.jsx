import React, { useEffect, useState } from "react";
import {
  Layout, Menu, Button, Dropdown, Avatar, Input, Badge, Drawer, Typography, Divider
} from "antd";
import {
  SearchOutlined, BellOutlined, MessageOutlined, UserOutlined, SettingOutlined,
  LogoutOutlined, MenuOutlined, BarChartOutlined, ShoppingCartOutlined,
  CloseOutlined, DownOutlined, RightOutlined, GlobalOutlined, CloudOutlined,
  ToolOutlined, AuditOutlined, FileTextOutlined, DollarOutlined, BookOutlined,
  InboxOutlined, FileDoneOutlined, AppstoreOutlined, RocketOutlined, KeyOutlined,
  ApartmentOutlined, ClusterOutlined, SafetyCertificateOutlined, ApiOutlined,
  DatabaseOutlined, BranchesOutlined, HomeOutlined, BuildOutlined, MailOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { SubMenu } = Menu;

/* ---------- Soft Blue / White Palette ---------- */
const C = {
  headerBg: "#F5FAFF",         // soft background
  headerBorder: "#DDEBFF",     // subtle bottom border
  text: "#0D47A1",             // deep blue text
  textMute: "#3468B5",         // softer blue text
  linkHover: "rgba(13,71,161,.08)",
  active: "#64B5F6",
  popBg: "linear-gradient(180deg,#FFFFFF 0%,#F7FAFF 100%)",
  popBorder: "#E1ECFF",
  popHover: "#F1F6FF",
  searchBg: "#FFFFFF",
  searchBorder: "#DDEBFF",
};

/* ---------- Routes (add/replace with your real routes) ---------- */
const routeMap = {
  "/": "/",

  // Export Sea
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

  // Export Air
  "exp-air:booking": "/export-air/booking",
  "exp-air:shipping-order": "/export-air/shipping-order",
  "exp-air:cargo-receive": "/export-air/cargo-receive",
  "exp-air:mawb": "/export-air/mawb",
  "exp-air:freight-invoice": "/export-air/freight-invoice",
  "exp-air:debit-note": "/export-air/debit-note",
  "exp-air:credit-note": "/export-air/credit-note",
  "exp-air:report:pl": "/export-air/report/profit-loss",
  "exp-air:report:volume": "/export-air/report/volume",

  // Import Sea
  "imp-sea:booking": "/import-sea/booking",
  "imp-sea:master-bl": "/import-sea/master-bl",
  "imp-sea:arrival-notice": "/import-sea/arrival-notice",
  "imp-sea:forward-letter": "/import-sea/forward-letter",
  "imp-sea:freight-invoice": "/import-sea/freight-invoice",
  "imp-sea:debit-note": "/import-sea/debit-note",
  "imp-sea:credit-note": "/import-sea/credit-note",
  "imp-sea:report:pl": "/import-sea/report/profit-loss",
  "imp-sea:report:volume": "/import-sea/report/volume",

  // Import Air
  "imp-air:booking": "/import-air/booking",
  "imp-air:master-bl": "/import-air/master-bl",
  "imp-air:request-letter": "/import-air/request-letter",
  "imp-air:forward-letter": "/import-air/forward-letter",
  "imp-air:freight-invoice": "/import-air/freight-invoice",
  "imp-air:debit-note": "/import-air/debit-note",
  "imp-air:credit-note": "/import-air/credit-note",
  "imp-air:report:pl": "/import-air/report/profit-loss",
  "imp-air:report:volume": "/import-air/report/volume",

  // ACCOUNTS / ORDERS / REPORTS / ESSENTIAL / SETTINGS (examples)
  "acc:receive-voucher": "/accounts/receive-voucher",
"acc:receive-journal": "/accounts/receive-journal",
"acc:payment-voucher": "/accounts/payment-voucher",
"acc:payment-journal": "/accounts/payment-journal",
"acc:journal-voucher": "/accounts/journal-voucher",
"acc:contra-voucher": "/accounts/contra-voucher",
"acc:customer-receipt": "/accounts/customer-receipt",
"acc:supplier-payment": "/accounts/supplier-payment",
"acc:setting-account-head": "/accounts/setting/account-head",
"acc:setting-voucher-type": "/accounts/setting/voucher-type",
"acc:setting-cost-center": "/accounts/setting/cost-center",

  "ord:po": "/orders/purchase",
  "ord:so": "/orders/sales",
  "rep:kpi": "/reports/kpis",
  "rep:ops": "/reports/operations",
  "ess:masters": "/essential/masters",
  "ess:utilities": "/essential/utilities",
  "set:users": "/settings/users",
  "set:preferences": "/settings/preferences",

  // ADMIN (rich)
  "admin:users": "/admin/users",
  "admin:roles": "/admin/roles",
  "admin:permissions": "/admin/permissions",
  "admin:companies": "/admin/companies",
  "admin:branches": "/admin/branches",
  "admin:departments": "/admin/departments",
  "admin:audit-logs": "/admin/audit-logs",
  "admin:activity": "/admin/activity",
  "admin:login-history": "/admin/login-history",
  "admin:backups": "/admin/backups",
  "admin:db-tools": "/admin/db-tools",
  "admin:api-keys": "/admin/api-keys",
  "admin:webhooks": "/admin/webhooks",
  "admin:preferences": "/admin/preferences",
  "admin:numbering": "/admin/numbering",
  "admin:email": "/admin/email",
  "admin:sms": "/admin/sms",
  "admin:i18n": "/admin/translations",

  profile: "/profile",
  settings: "/settings",
  logout: "/logout",
};

/* ---------- Menu Groups (same as before, ADMIN expanded) ---------- */
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

/* Right side (kept) */
const rightMenus = [
  {
  key: "accounts",
  label: "ACCOUNTS",
  icon: <DollarOutlined />,
  submenu: [
    { key: "acc:receive-voucher", label: "Receive Voucher", path: "/accounts/receive-voucher" },
    { key: "acc:receive-journal", label: "Receive Journal", path: "/accounts/receive-journal" },
    { key: "acc:payment-voucher", label: "Payment Voucher", path: "/accounts/payment-voucher" },
    { key: "acc:payment-journal", label: "Payment Journal", path: "/accounts/payment-journal" },
    { key: "acc:journal-voucher", label: "Journal Voucher", path: "/accounts/journal-voucher" },
    { key: "acc:contra-voucher", label: "Contra Voucher", path: "/accounts/contra-voucher" },
    { key: "acc:customer-receipt", label: "Customer Receipt", path: "/accounts/customer-receipt" },
    { key: "acc:supplier-payment", label: "Supplier Payment", path: "/accounts/supplier-payment" },
    {
      key: "acc:setting",
      label: "Setting",
      icon: <SettingOutlined />,
      submenu: [
        { key: "acc:setting-account-head", label: "Account Head", path: "/accounts/setting/account-head" },
        { key: "acc:setting-voucher-type", label: "Voucher Type", path: "/accounts/setting/voucher-type" },
        { key: "acc:setting-cost-center", label: "Cost Center", path: "/accounts/setting/cost-center" },
      ],
    },
  ],
},

  {
  key: "orders",
  label: "ORDERS",
  icon: <ShoppingCartOutlined />,
  submenu: [
    { key: "ord:sale-order", label: "Sale Order", path: "/orders/sale-order" },
    { key: "ord:sale-return", label: "Sale Return", path: "/orders/sale-return" },
    { key: "ord:purchase-order", label: "Purchase Order", path: "/orders/purchase-order" },
    { key: "ord:purchase-return", label: "Purchase Return", path: "/orders/purchase-return" },
    { key: "ord:adjustments", label: "Adjustments", path: "/orders/adjustments" },
    {
      key: "ord:setting",
      label: "Setting",
      icon: <SettingOutlined />,
      submenu: [
        { key: "ord:setting-order-type", label: "Order Type", path: "/orders/setting/order-type" },
        { key: "ord:setting-return-type", label: "Return Type", path: "/orders/setting/return-type" },
        { key: "ord:setting-supplier", label: "Supplier Setup", path: "/orders/setting/supplier" },
      ],
    },
  ],
},

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

  /* ---------- ADMIN (rich & organized) ---------- */
  {
    key: "admin",
    label: "ADMIN",
    icon: <AuditOutlined />,
    submenu: [
      // User Management
      { key: "admin:users", label: "Users", icon: <UserOutlined /> },
      { key: "admin:roles", label: "Roles", icon: <SafetyCertificateOutlined /> },
      { key: "admin:permissions", label: "Permissions", icon: <KeyOutlined /> },

      // Organization
      { key: "admin:companies", label: "Companies", icon: <HomeOutlined /> },
      { key: "admin:branches", label: "Branches", icon: <BranchesOutlined /> },
      { key: "admin:departments", label: "Departments", icon: <ApartmentOutlined /> },

      // Security & Monitoring
      { key: "admin:audit-logs", label: "Audit Logs", icon: <AuditOutlined /> },
      { key: "admin:activity", label: "Activity Monitor", icon: <ClusterOutlined /> },
      { key: "admin:login-history", label: "Login History", icon: <SafetyCertificateOutlined /> },

      // Maintenance
      { key: "admin:backups", label: "Backups", icon: <DatabaseOutlined /> },
      { key: "admin:db-tools", label: "Database Tools", icon: <BuildOutlined /> },

      // Integrations
      { key: "admin:api-keys", label: "API Keys", icon: <ApiOutlined /> },
      { key: "admin:webhooks", label: "Webhooks", icon: <ApiOutlined /> },

      // System Settings
      { key: "admin:preferences", label: "System Preferences", icon: <SettingOutlined /> },
      { key: "admin:numbering", label: "Document Numbering", icon: <FileTextOutlined /> },
      { key: "admin:email", label: "Email Settings", icon: <MailOutlined /> },
      { key: "admin:sms", label: "SMS Settings", icon: <MessageOutlined /> },
      { key: "admin:i18n", label: "Translations", icon: <GlobalOutlined /> },
    ],
  },
];

/* ---------------- NAVBAR ---------------- */
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
    <span style={{ display: "flex", alignItems: "center", color: C.textMute }}>
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
      {/* FULL WIDTH WRAPPER */}
      <div className="w-full">
        <Header
          style={{
            background: C.headerBg,                               // soft color (no dark gradient)
            height: 60,
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            borderBottom: `1px solid ${C.headerBorder}`,          // subtle separator
          }}
        >
          <div className="w-full flex items-center justify-between px-3 lg:px-4">
            {/* Brand + mega menu */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Link to="/" className="flex items-center no-underline">
                <RocketOutlined style={{ color: C.text, fontSize: 18, marginRight: 8 }} />
                <Title level={4} style={{ color: C.text, margin: 0, fontWeight: 800, letterSpacing: 0.6 }}>
                  ShipNav
                </Title>
              </Link>

              {!isMobile && (
                <Menu
                  mode="horizontal"
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
                    color: C.textMute,
                  }}
                >
                  {/* Left groups */}
                  {render([seaExportMenu, airExportMenu, seaImportMenu, airImportMenu])}
                  {/* Right groups (includes ADMIN enriched) */}
                  {render(rightMenus)}
                </Menu>
              )}
            </div>

            
          </div>
        </Header>
      </div>

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

      {/* Soft theme polish */}
      <style jsx global>{`
        .ant-menu-horizontal > .ant-menu-item,
        .ant-menu-horizontal > .ant-menu-submenu {
          color: ${C.textMute};
        }
        .ant-menu-horizontal > .ant-menu-item:hover,
        .ant-menu-horizontal > .ant-menu-submenu:hover {
          background: ${C.linkHover};
          border-radius: 10px;
        }
        .ant-menu-horizontal > .ant-menu-item-selected::after,
        .ant-menu-horizontal > .ant-menu-submenu-selected::after {
          border-bottom: 2px solid ${C.active};
        }
        .ant-menu-horizontal > .ant-menu-item-selected,
        .ant-menu-horizontal > .ant-menu-submenu-selected {
          color: ${C.text};
        }

        /* White dropdowns */
        .ant-menu-submenu-popup,
        .sn-dropdown .ant-dropdown-menu {
          background: ${C.popBg};
          border: 1px solid ${C.popBorder};
          box-shadow: 0 14px 30px rgba(13, 71, 161, 0.12);
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

        /* Search field */
        .sn-search .ant-input-affix-wrapper,
        .sn-search .ant-input {
          background: ${C.searchBg} !important;
          border-color: ${C.searchBorder} !important;
          color: ${C.text};
        }
        .sn-search .ant-btn { border-color: transparent; color: ${C.text}; }

        .ant-menu-submenu-title .anticon-down { font-size: 10px; margin-left: 6px; }
        .ant-menu-submenu-open .ant-menu-submenu-title .anticon-down { transform: rotate(180deg); }

        @media (max-width: 1199px) {
          .ant-menu-horizontal { display: none !important; }
        }
      `}</style>
    </>
  );
}
