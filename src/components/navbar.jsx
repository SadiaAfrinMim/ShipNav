import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Input,
  Drawer,
  Typography,
  Divider,
} from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  DownOutlined,
  RightOutlined,
  GlobalOutlined,
  CloudOutlined,
  ToolOutlined,
  AuditOutlined,
  DollarOutlined,
  BookOutlined,
  InboxOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  RocketOutlined,
  KeyOutlined,
  ApartmentOutlined,
  ClusterOutlined,
  SafetyCertificateOutlined,
  ApiOutlined,
  DatabaseOutlined,
  BranchesOutlined,
  HomeOutlined,
  BuildOutlined,
  MailOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { SubMenu } = Menu;

/* ---------- Soft Blue / White Palette ---------- */
const C = {
  headerBg: "#F5FAFF",
  headerBorder: "#DDEBFF",
  text: "#0D47A1",
  textMute: "#3468B5",
  linkHover: "rgba(13,71,161,.08)",
  active: "#64B5F6",
  popBg: "linear-gradient(180deg,#FFFFFF 0%,#F7FAFF 100%)",
  popBorder: "#E1ECFF",
  popHover: "#F1F6FF",
  searchBg: "#FFFFFF",
  searchBorder: "#DDEBFF",
};

/* ---------- Only confirmed routes ---------- */
const routeMap = {
  "/": "/",

  // EXPORT SEA
  "exp-sea:booking": "/export-sea/add-booking",
  "exp-sea:shipping-order": "/export-sea/add-shipping-order",
  "exp-sea:cargo-receive": "/export-sea/add-cargo-receive",
  "exp-sea:stuffing-plan": "/export-sea/add-stuffing-plan",
  "exp-sea:stuffing-package": "/export-sea/add-stuffing-package",
  "exp-sea:shipment-advice": "/export-sea/add-shipment-advice",
  "exp-sea:hbl": "/export-sea/add-hbl",
  "exp-sea:mbl": "/export-sea/add-mbl",
  "exp-sea:freight-invoice": "/export-sea/add-freight-invoice",
  "exp-sea:debit-note": "/export-sea/add-debit-note",
  "exp-sea:credit-note": "/export-sea/add-credit-note",

  // ✅ EXPORT SEA REPORTS
  "exp-sea:report:pl": "/export-sea/report/profit-loss",
  "exp-sea:report:volume": "/export-sea/report/volume",

  // EXPORT AIR
  "exp-air:booking": "/export-air/add-booking",
  "exp-air:shipping-order": "/export-air/add-shipping-order",
  "exp-air:cargo-receive": "/export-air/add-cargo-receive",
  "exp-air:mawb": "/export-air/add-mawb",
  "exp-air:freight-invoice": "/export-air/add-freight-invoice",
  "exp-air:debit-note": "/export-air/add-debit-note",
  "exp-air:credit-note": "/export-air/add-credit-note",

  // ✅ EXPORT AIR REPORTS
  "exp-air:report:pl": "/export-air/report/profit-loss",
  "exp-air:report:volume": "/export-air/report/volume",

  // IMPORT SEA
  "imp-sea:booking": "/import-sea/add-booking",
  "imp-sea:master-bl": "/import-sea/add-master-bl",
  "imp-sea:arrival-notice": "/import-sea/add-arrival-notice",
  "imp-sea:forward-letter": "/import-sea/add-forward-letter",
  "imp-sea:freight-invoice": "/import-sea/add-freight-invoice",
  "imp-sea:debit-note": "/import-sea/add-debit-note",
  "imp-sea:credit-note": "/import-sea/add-credit-note",

  // ✅ IMPORT SEA REPORTS
  "imp-sea:report:pl": "/import-sea/report/profit-loss",
  "imp-sea:report:volume": "/import-sea/report/volume",

  // IMPORT AIR
  "imp-air:booking": "/import-air/add-booking",
  "imp-air:master-bl": "/import-air/add-master-bl",
  "imp-air:request-letter": "/import-air/add-request-letter",
  "imp-air:forward-letter": "/import-air/add-forward-letter",
  "imp-air:freight-invoice": "/import-air/add-freight-invoice",
  "imp-air:debit-note": "/import-air/add-debit-note",
  "imp-air:credit-note": "/import-air/add-credit-note",

  // ✅ IMPORT AIR REPORTS
  "imp-air:report:pl": "/import-air/report/profit-loss",
  "imp-air:report:volume": "/import-air/report/volume",

  // ACCOUNTS
  "acc:receive-voucher": "/accounts/add-receive-voucher",
  "acc:receive-journal": "/accounts/add-receive-journal",
  "acc:payment-voucher": "/accounts/add-payment-voucher",
  "acc:payment-journal": "/accounts/add-payment-journal",
  "acc:journal-voucher": "/accounts/add-journal-voucher",
  "acc:contra-voucher": "/accounts/add-contra-voucher",
  "acc:customer-receipt": "/accounts/add-customer-receipt",
  "acc:supplier-payment": "/accounts/add-supplier-payment",
  "acc:setting-account-head": "/accounts/setting/account-head",
  "acc:setting-voucher-type": "/accounts/setting/voucher-type",
  "acc:setting-cost-center": "/accounts/setting/cost-center",

  // ORDERS
  "ord:sale-order": "/orders/sale-order",
  "ord:sale-return": "/orders/sale-return",
  "ord:purchase-order": "/orders/purchase-order",
  "ord:purchase-return": "/orders/purchase-return",
  "ord:adjustments": "/orders/adjustments",
  "ord:setting-order-type": "/orders/setting/order-type",
  "ord:setting-return-type": "/orders/setting/return-type",
  "ord:setting-supplier": "/orders/setting/supplier",

  // reports main
  "rep:all": "/reports",

  // essential
  "ess:masters": "/essential/masters",
  "ess:utilities": "/essential/utilities",

  // settings
  "set:users": "/settings/users",
  "set:preferences": "/settings/preferences",

  // admin
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
};

/* --------- auto builder: jodi routeMap e na thake --------- */
const autoBuildPath = (key) => {
  const parts = key.split(":");
  const root = parts[0];

  const rootMap = {
    "exp-sea": "export-sea",
    "exp-air": "export-air",
    "imp-sea": "import-sea",
    "imp-air": "import-air",
    acc: "accounts",
    ord: "orders",
    ess: "essential",
    set: "settings",
    admin: "admin",
    rep: "reports",
  };

  // short code -> real slug
  const reportSlugMap = {
    pl: "profit-loss",
    volume: "volume",
    "cnf-pl": "cnf-profit-loss",
    "cnf-volume": "cnf-volume",
  };

  const base = rootMap[root];
  if (!base) return null;

  /* ✅ CASE 1: central report keys like rep:exp-sea:pl */
  if (root === "rep") {
    const section = parts[1];  // exp-sea / exp-air / imp-sea / imp-air / fin ...
    const reportKey = parts[2];

    // export / import হলে -> তোমার format
    const exportImportSections = ["exp-sea", "exp-air", "imp-sea", "imp-air"];
    if (exportImportSections.includes(section)) {
      const sectionMap = {
        "exp-sea": "export-sea",
        "exp-air": "export-air",
        "imp-sea": "import-sea",
        "imp-air": "import-air",
      };
      const sectionBase = sectionMap[section];
      if (!reportKey) {
        return `/${sectionBase}/report`;
      }
      const slug = reportSlugMap[reportKey] || reportKey;
      return `/${sectionBase}/report/${slug}`;
    }

    // অন্য report (financial/inventory) আগের মতো /reports/...
    if (!section) return "/reports";
    if (!reportKey) return `/reports/${section}`;
    const slug = reportSlugMap[reportKey] || reportKey;
    return `/reports/${section}/${slug}`;
  }

  const action = parts[1];

  // no action -> just go to module
  if (!action) {
    return `/${base}`;
  }

  // ✅ CASE 2: direct export/import report
  // exp-sea:report:pl -> /export-sea/report/profit-loss
  if (action === "report" || action === "reports") {
    const reportKey = parts[2];
    if (!reportKey) {
      return `/${base}/report`;
    }
    const slug = reportSlugMap[reportKey] || reportKey;
    return `/${base}/report/${slug}`;
  }

  // default
  return `/${base}/add-${action}`;
};

/* ---------- Menu Groups ---------- */
const seaExportMenu = {
  key: "export-sea",
  label: "EXPORT SEA",
  icon: <GlobalOutlined />,
  submenu: [
    { key: "exp-sea:booking", label: "Booking", icon: <BookOutlined /> },
    { key: "exp-sea:shipping-order", label: "Shipping Order", icon: <FileDoneOutlined /> },
    { key: "exp-sea:cargo-receive", label: "Cargo Receive", icon: <InboxOutlined /> },
    {
      key: "exp-sea:stuffing",
      label: "Cargo Stuffing",
      icon: <AppstoreOutlined />,
      submenu: [
        { key: "exp-sea:stuffing-plan", label: "Stuffing Plan" },
        { key: "exp-sea:stuffing-package", label: "Stuffing Package" },
      ],
    },
    { key: "exp-sea:shipment-advice", label: "Shipment Advice", icon: <FileDoneOutlined /> },
    { key: "exp-sea:hbl", label: "HBL", icon: <FileDoneOutlined /> },
    { key: "exp-sea:mbl", label: "MBL", icon: <FileDoneOutlined /> },
    {
      key: "exp-sea:accounts",
      label: "Accounting",
      icon: <DollarOutlined />,
      submenu: [
        { key: "exp-sea:freight-invoice", label: "Freight Invoice" },
        { key: "exp-sea:debit-note", label: "Debit Note" },
        { key: "exp-sea:credit-note", label: "Credit Note" },
      ],
    },
    {
      key: "exp-sea:reports",
      label: "Reports",
      icon: <BarChartOutlined />,
      submenu: [
        { key: "exp-sea:report:pl", label: "Profit & Loss" },
        { key: "exp-sea:report:volume", label: "Volume" },
      ],
    },
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
    {
      key: "exp-air:accounts",
      label: "Accounting",
      submenu: [
        { key: "exp-air:freight-invoice", label: "Freight Invoice" },
        { key: "exp-air:debit-note", label: "Debit Note" },
        { key: "exp-air:credit-note", label: "Credit Note" },
      ],
    },
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
    {
      key: "imp-sea:accounts",
      label: "Accounting",
      submenu: [
        { key: "imp-sea:freight-invoice", label: "Freight Invoice" },
        { key: "imp-sea:debit-note", label: "Debit Note" },
        { key: "imp-sea:credit-note", label: "Credit Note" },
      ],
    },
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
    {
      key: "imp-air:accounts",
      label: "Accounting",
      submenu: [
        { key: "imp-air:freight-invoice", label: "Freight Invoice" },
        { key: "imp-air:debit-note", label: "Debit Note" },
        { key: "imp-air:credit-note", label: "Credit Note" },
      ],
    },
    { key: "imp-air:report:pl", label: "Profit & Loss" },
    { key: "imp-air:report:volume", label: "Volume" },
  ],
};

const rightMenus = [
  {
    key: "accounts",
    label: "ACCOUNTS",
    icon: <DollarOutlined />,
    submenu: [
      { key: "acc:receive-voucher", label: "Receive Voucher" },
      { key: "acc:receive-journal", label: "Receive Journal" },
      { key: "acc:payment-voucher", label: "Payment Voucher" },
      { key: "acc:payment-journal", label: "Payment Journal" },
      { key: "acc:journal-voucher", label: "Journal Voucher" },
      { key: "acc:contra-voucher", label: "Contra Voucher" },
      { key: "acc:customer-receipt", label: "Customer Receipt" },
      { key: "acc:supplier-payment", label: "Supplier Payment" },
      {
        key: "acc:setting",
        label: "Setting",
        icon: <SettingOutlined />,
        submenu: [
          { key: "acc:setting-account-head", label: "Account Head" },
          { key: "acc:setting-voucher-type", label: "Voucher Type" },
          { key: "acc:setting-cost-center", label: "Cost Center" },
        ],
      },
    ],
  },
  {
    key: "orders",
    label: "ORDERS",
    icon: <ShoppingCartOutlined />,
    submenu: [
      { key: "ord:sale-order", label: "Sale Order" },
      { key: "ord:sale-return", label: "Sale Return" },
      { key: "ord:purchase-order", label: "Purchase Order" },
      { key: "ord:purchase-return", label: "Purchase Return" },
      { key: "ord:adjustments", label: "Adjustments" },
      {
        key: "ord:setting",
        label: "Setting",
        icon: <SettingOutlined />,
        submenu: [
          { key: "ord:setting-order-type", label: "Order Type" },
          { key: "ord:setting-return-type", label: "Return Type" },
          { key: "ord:setting-supplier", label: "Supplier Setup" },
        ],
      },
    ],
  },
  {
    key: "reports",
    label: "REPORTS",
    icon: <BarChartOutlined />,
    submenu: [
      { key: "rep:all", label: "All Reports (Grid)" },

      {
        key: "rep:financial",
        label: "Financial",
        icon: <FileDoneOutlined />,
        submenu: [
          { key: "rep:fin:bank-statement", label: "Bank Statement" },
          { key: "rep:fin:general-ledger", label: "General Ledger" },
          { key: "rep:fin:exp-summary", label: "Expenditure Summary" },
          { key: "rep:fin:journal-list", label: "Journal List" },
          { key: "rep:fin:trial-balance", label: "Trial Balance" },
          { key: "rep:fin:pl", label: "Profit & Loss" },
          { key: "rep:fin:balance-sheet", label: "Balance Sheet" },
        ],
      },
      {
        key: "rep:inventory",
        label: "Inventory",
        icon: <InboxOutlined />,
        submenu: [
          { key: "rep:inv:stock-balance", label: "Stock Balance" },
          { key: "rep:inv:product-ledger", label: "Product Ledger" },
          { key: "rep:inv:product-pl", label: "Product wise Profit & Loss" },
          { key: "rep:inv:adj-register", label: "Adjustment Register" },
          { key: "rep:inv:reorder", label: "Stock Re-Order" },
        ],
      },
      {
        key: "rep:sale",
        label: "Sale",
        icon: <DollarOutlined />,
        submenu: [
          { key: "rep:sale:details", label: "Sale Details" },
          { key: "rep:sale:summary", label: "Sale Summary" },
          { key: "rep:sale:product-wise", label: "Product Wise Sales" },
          { key: "rep:sale:party-wise", label: "Party Wise Sales" },
          { key: "rep:sale:credit-note", label: "Credit Note" },
        ],
      },
      {
        key: "rep:party",
        label: "Party",
        icon: <UserOutlined />,
        submenu: [
          { key: "rep:party:ledger", label: "Party Ledger" },
          { key: "rep:party:order", label: "Party Order" },
          { key: "rep:party:balance", label: "Party Balance" },
        ],
      },
      {
        key: "rep:purchase",
        label: "Purchase",
        icon: <ShoppingCartOutlined />,
        submenu: [
          { key: "rep:pur:details", label: "Purchase Details" },
          { key: "rep:pur:summary", label: "Purchase Summary" },
          { key: "rep:pur:product-wise", label: "Product wise Purchases" },
          { key: "rep:pur:party-wise", label: "Party wise Purchases" },
          { key: "rep:pur:debit-note", label: "Debit Note" },
        ],
      },
      {
        key: "rep:exp-sea",
        label: "Export Sea",
        icon: <GlobalOutlined />,
        submenu: [
          { key: "rep:exp-sea:pl", label: "Profit and Loss Statement" },
          { key: "rep:exp-sea:volume", label: "Volume Report" },
        ],
      },
      {
        key: "rep:exp-air",
        label: "Export Air",
        icon: <CloudOutlined />,
        submenu: [
          { key: "rep:exp-air:pl", label: "Profit and Loss Statement" },
          { key: "rep:exp-air:volume", label: "Volume Report" },
        ],
      },
      {
        key: "rep:imp-sea",
        label: "Import Sea",
        icon: <GlobalOutlined />,
        submenu: [
          { key: "rep:imp-sea:pl", label: "Profit and Loss Statement" },
          { key: "rep:imp-sea:volume", label: "Volume Report" },
          { key: "rep:imp-sea:cnf-pl", label: "C&F Profit and Loss Statement" },
          { key: "rep:imp-sea:cnf-volume", label: "C&F Volume Report" },
        ],
      },
      {
        key: "rep:imp-air",
        label: "Import Air",
        icon: <CloudOutlined />,
        submenu: [
          { key: "rep:imp-air:pl", label: "Profit and Loss Statement" },
          { key: "rep:imp-air:volume", label: "Volume Report" },
          { key: "rep:imp-air:cnf-pl", label: "C&F Profit and Loss Statement" },
          { key: "rep:imp-air:cnf-volume", label: "C&F Volume Report" },
        ],
      },
    ],
  },
  {
    key: "essential",
    label: "ESSENTIAL",
    icon: <ToolOutlined />,
    submenu: [
      { key: "ess:masters", label: "Masters" },
      { key: "ess:utilities", label: "Utilities" },
    ],
  },
  {
    key: "settings",
    label: "SETTINGS",
    icon: <SettingOutlined />,
    submenu: [
      { key: "set:users", label: "Users & Roles" },
      { key: "set:preferences", label: "Preferences" },
    ],
  },
  {
    key: "admin",
    label: "ADMIN",
    icon: <AuditOutlined />,
    submenu: [
      { key: "admin:users", label: "Users", icon: <UserOutlined /> },
      { key: "admin:roles", label: "Roles", icon: <SafetyCertificateOutlined /> },
      { key: "admin:permissions", label: "Permissions", icon: <KeyOutlined /> },
      { key: "admin:companies", label: "Companies", icon: <HomeOutlined /> },
      { key: "admin:branches", label: "Branches", icon: <BranchesOutlined /> },
      { key: "admin:departments", label: "Departments", icon: <ApartmentOutlined /> },
      { key: "admin:audit-logs", label: "Audit Logs", icon: <AuditOutlined /> },
      { key: "admin:activity", label: "Activity Monitor", icon: <ClusterOutlined /> },
      { key: "admin:login-history", label: "Login History", icon: <SafetyCertificateOutlined /> },
      { key: "admin:backups", label: "Backups", icon: <DatabaseOutlined /> },
      { key: "admin:db-tools", label: "Database Tools", icon: <BuildOutlined /> },
      { key: "admin:api-keys", label: "API Keys", icon: <ApiOutlined /> },
      { key: "admin:webhooks", label: "Webhooks", icon: <ApiOutlined /> },
      { key: "admin:preferences", label: "System Preferences", icon: <SettingOutlined /> },
      { key: "admin:numbering", label: "Document Numbering", icon: <FileDoneOutlined /> },
      { key: "admin:email", label: "Email Settings", icon: <MailOutlined /> },
      { key: "admin:sms", label: "SMS Settings", icon: <MailOutlined /> },
      { key: "admin:i18n", label: "Translations", icon: <GlobalOutlined /> },
    ],
  },
];

export default function ShipNavbar() {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [current, setCurrent] = useState("/");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1200 : false
  );
  const [openSubMenuKeys, setOpenSubMenuKeys] = useState([]);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1200);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const CustomSubTitle = ({ label, icon }) => (
    <span style={{ display: "flex", alignItems: "center", color: C.textMute }}>
      {icon}
      <span style={{ marginLeft: 6 }}>{label}</span>
      <DownOutlined style={{ fontSize: 10, marginLeft: 6 }} />
    </span>
  );

  // MAIN CLICK HANDLER
  const go = (key, closeDrawer = false) => {
    let path = routeMap[key];
    if (!path) {
      path = autoBuildPath(key);
    }
    if (!path) return;

    navigate(path);
    setCurrent(key);
    if (closeDrawer) setDrawerVisible(false);
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
          expandIcon={
            mobile && openSubMenuKeys.includes(m.key) ? (
              <DownOutlined />
            ) : (
              <RightOutlined />
            )
          }
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
      <div className="w-full">
        <Header
          style={{
            background: C.headerBg,
            height: 60,
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            borderBottom: `1px solid ${C.headerBorder}`,
          }}
        >
          <div className="w-full flex items-center justify-between px-3 lg:px-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Link to="/" className="flex items-center no-underline">
                <RocketOutlined
                  style={{ color: C.text, fontSize: 18, marginRight: 8 }}
                />
                <Title
                  level={4}
                  style={{
                    color: C.text,
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
                  {render([
                    seaExportMenu,
                    airExportMenu,
                    seaImportMenu,
                    airImportMenu,
                  ])}
                  {render(rightMenus)}
                </Menu>
              )}
            </div>

            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
              />
            )}
          </div>
        </Header>
      </div>

      {/* Drawer (mobile) */}
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Menu</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setDrawerVisible(false)}
            />
          </div>
        }
        placement="right"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={320}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: 12 }}>
          <Search
            placeholder="Search…"
            allowClear
            enterButton={<SearchOutlined />}
          />
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
          {render(
            [
              seaExportMenu,
              airExportMenu,
              seaImportMenu,
              airImportMenu,
              ...rightMenus,
            ],
            true
          )}
        </Menu>
      </Drawer>

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
        .ant-menu-submenu-popup {
          background: ${C.popBg};
          border: 1px solid ${C.popBorder};
          box-shadow: 0 14px 30px rgba(13, 71, 161, 0.12);
          border-radius: 12px;
          overflow: hidden;
        }
        @media (max-width: 1199px) {
          .ant-menu-horizontal {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
