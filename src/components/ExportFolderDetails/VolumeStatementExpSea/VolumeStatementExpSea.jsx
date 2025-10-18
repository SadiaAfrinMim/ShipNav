import React, { useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Space,
  Table,
  Typography,
  Input,
} from "antd";
import {
  ReloadOutlined,
  PrinterOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export default function VolumeStatementExpSea() {
  const [form] = Form.useForm();
  const printRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // inline palette
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";
  const headBg = "#f5f9fb";

  // ---- filter options (mock) ----
  const all = useMemo(() => [{ label: "ALL", value: "ALL" }], []);
  const parties = useMemo(
    () => [
      { label: "ALL", value: "ALL" },
      { label: "Consignee A", value: "Consignee A" },
      { label: "Consignee B", value: "Consignee B" },
    ],
    []
  );
  const agents = useMemo(
    () => [
      { label: "ALL", value: "ALL" },
      { label: "Agent X", value: "Agent X" },
      { label: "Agent Y", value: "Agent Y" },
    ],
    []
  );
  const commodities = useMemo(
    () => [{ label: "ALL", value: "ALL" }, { label: "Knitwear", value: "Knitwear" }, { label: "Garments", value: "Garments" }],
    []
  );
  const pols = useMemo(
    () => [{ label: "ALL", value: "ALL" }, { label: "Chattogram", value: "Chattogram" }, { label: "Dhaka ICD", value: "Dhaka ICD" }],
    []
  );

  // ---- table columns ----
  const columns = [
    { title: "SL", dataIndex: "sl", width: 70, align: "center" },
    { title: "HBL No.", dataIndex: "hbl", width: 140 },
    { title: "MBL", dataIndex: "mbl", width: 140 },
    { title: "Consignee", dataIndex: "consignee", width: 200 },
    { title: "Shipper", dataIndex: "shipper", width: 200 },
    { title: "Carrier", dataIndex: "carrier", width: 140 },
    { title: "Commodity", dataIndex: "commodity", width: 160 },
    { title: "Origin Agent", dataIndex: "originAgent", width: 160 },
    { title: "Destination Agent", dataIndex: "destAgent", width: 180 },
    { title: "CNTR No.", dataIndex: "cntrNo", width: 140 },
    { title: "CNTR Size.", dataIndex: "cntrSize", width: 120 },
    { title: "ETD Date", dataIndex: "etd", width: 120 },
    { title: "ETA Date", dataIndex: "eta", width: 120 },
    { title: "POL", dataIndex: "pol", width: 120 },
    { title: "POD", dataIndex: "pod", width: 120 },
    { title: "TOS", dataIndex: "tos", width: 100 },
    { title: "Total Carton", dataIndex: "totalCarton", width: 130, align: "right" },
    { title: "Total CBM", dataIndex: "totalCbm", width: 120, align: "right" },
    { title: "Total GWT", dataIndex: "totalGwt", width: 120, align: "right" },

    // Group: Freight Invoice
    {
      title: "Freight Invoice",
      children: [
        { title: "Inv. No.", dataIndex: ["freight", "inv"], width: 140 },
        { title: "USD", dataIndex: ["freight", "usd"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
        { title: "BDT", dataIndex: ["freight", "bdt"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
      ],
    },

    // Group: Debit Note
    {
      title: "Debit Note",
      children: [
        { title: "DN. No.", dataIndex: ["debit", "dn"], width: 140 },
        { title: "USD", dataIndex: ["debit", "usd"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
        { title: "BDT", dataIndex: ["debit", "bdt"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
      ],
    },

    // Group: Total Income
    {
      title: "Total Income",
      children: [
        { title: "USD", dataIndex: ["income", "usd"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
        { title: "BDT", dataIndex: ["income", "bdt"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
      ],
    },

    // Group: Expense Bill
    {
      title: "Expense Bill",
      children: [
        { title: "EB. No.", dataIndex: ["expense", "eb"], width: 140 },
        { title: "USD", dataIndex: ["expense", "usd"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
        { title: "BDT", dataIndex: ["expense", "bdt"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
      ],
    },

    // Group: Credit Note
    {
      title: "Credit Note",
      children: [
        { title: "CN. No.", dataIndex: ["credit", "cn"], width: 140 },
        { title: "USD", dataIndex: ["credit", "usd"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
        { title: "BDT", dataIndex: ["credit", "bdt"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
      ],
    },

    // Group: Net Profit
    {
      title: "Net Profit",
      children: [
        { title: "USD", dataIndex: ["net", "usd"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
        { title: "BDT", dataIndex: ["net", "bdt"], width: 110, align: "right", render: v => (v ? Number(v).toFixed(2) : "0.00") },
      ],
    },

    { title: "Sales Type", dataIndex: "salesType", width: 140 },
    { title: "Sales Person", dataIndex: "salesPerson", width: 160 },
  ];

  // empty to match screenshot state
  const dataSource = [];

  // ---- actions ----
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600); // replace with API call
  };

  const handleReset = () => {
    form.resetFields();
  };

  const printToPdf = () => {
    const el = printRef.current;
    if (!el) return;
    const w = window.open("", "PRINT", "height=800,width=1200");
    if (!w) return;

    w.document.write(`
      <html>
        <head>
          <title>Volume Statement / Exp. Sea</title>
          <style>
            body{ font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 16px; }
            .hdr { background: ${teal}; color:#fff; padding:10px 12px; border-radius:3px; font-weight:700; }
            .box { border: 1px solid ${border}; border-radius:3px; margin-top:10px; }
            .box-inner{ padding:10px; }
            .title { text-align:center; margin:6px 0 2px; font-weight:700; }
            .sub { text-align:center; margin:0; font-size:12px; }
            .meta { display:flex; justify-content:space-between; margin:6px 0; }
            table{ width:100%; border-collapse: collapse; }
            th,td{ border:1px solid ${border}; padding:6px 8px; font-size:12px; }
            th{ background:${headBg}; }
            .right{ text-align:right; }
          </style>
        </head>
        <body>
          ${el.innerHTML}
        </body>
      </html>
    `);
    w.document.close();
    w.focus();
    w.print();
  };

  const printDateStr = () =>
    new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div style={{ background: "#f3f6f7", minHeight: "100vh", padding: 12 }}>
      {/* Title bar */}
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
        <Space size={8}>
          <span style={{ display: "inline-block", width: 10, height: 10, border: "2px solid #fff", transform: "rotate(45deg)" }} />
          <span>Volume Statement / Exp. Sea Filter</span>
        </Space>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Reset
          </Button>
          <Button icon={<PrinterOutlined />} onClick={printToPdf}>
            Print
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card
        style={{ marginTop: 8, border: `2px solid ${cyanLine}`, borderRadius: 3 }}
        bodyStyle={{ padding: 12 }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            consignee: "ALL",
            destAgent: "ALL",
            commodity: "ALL",
            pol: "ALL",
          }}
        >
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Consignee" name="consignee">
                <Select options={parties} showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Commodity" name="commodity">
                <Select options={commodities} showSearch />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={12}>
              <Form.Item label="Destination Agent" name="destAgent">
                <Select options={agents} showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="POL" name="pol">
                <Select options={pols} showSearch />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={12}>
              <Form.Item label="ETD Date From" name="etdFrom">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label="ETD Date To" name="etdTo">
                <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
          </Row>

          <Text style={{ color: "#6b7b7e", fontSize: 12 }}>* Required Fields</Text>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              style={{ background: "#1b8fff", borderColor: "#1b8fff" }}
              loading={loading}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </Form>
      </Card>

      {/* Printable block */}
      <Card
        style={{ marginTop: 12, border: `1px solid ${border}`, borderRadius: 3 }}
        bodyStyle={{ padding: 12 }}
        ref={printRef}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ lineHeight: 1.7 }}>
            <div>
              <Text>Generated By:</Text>{" "}
              <Text>nahidridwanul@gmail.com</Text>
            </div>
          </div>
          <div style={{ lineHeight: 1.7 }}>
            <div>
              <Text strong>Print Date:</Text> {printDateStr()}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <Title level={4} style={{ margin: 0 }}>
            N2N Supply Chain Solutions Ltd.
          </Title>
          <Text style={{ display: "block", marginBottom: 4 }}>
            House# 7 (4th Floor), Road# 2/1, Banani, Dhaka, Bangladesh
          </Text>
          <Text strong style={{ display: "block", textDecoration: "underline" }}>
            VOLUME STATEMENT / EXP. SEA
          </Text>
        </div>

        <Table
          size="small"
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          rowKey={(r, i) => i}
          scroll={{ x: 2800 }} // wide grid, horizontal scroll enabled
          locale={{ emptyText: "" }}
        />
      </Card>
    </div>
  );
}
