import React, { useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Radio,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Table,
} from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export default function PLExpSea() {
  const [form] = Form.useForm();
  const printRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // UI palette inline (no external CSS)
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";
  const headBg = "#f5f9fb";

  const hblOptions = useMemo(
    () => [
      { label: "(-- Select/None 1st MBL --)", value: "" },
      { label: "ES#25000001", value: "ES#25000001" },
      { label: "ES#25000002", value: "ES#25000002" },
    ],
    []
  );

  const columnsTop = [
    { title: "HBL", dataIndex: "hbl", width: 140 },
    { title: "SHIPPER", dataIndex: "shipper", width: 200 },
    { title: "CONSIGNEE", dataIndex: "consignee", width: 200 },
    { title: "POL", dataIndex: "pol", width: 120 },
    { title: "POD", dataIndex: "pod", width: 120 },
    { title: "QTY", dataIndex: "qty", width: 80, align: "right" },
    { title: "CBM", dataIndex: "cbm", width: 100, align: "right" },
    { title: "GWT", dataIndex: "gwt", width: 100, align: "right" },
  ];

  const columnsDetail = [
    { title: "REFERENCE", dataIndex: "reference", width: 140 },
    { title: "PARTY", dataIndex: "party", width: 200 },
    { title: "ACCOUNT HEAD", dataIndex: "accountHead", width: 200 },
    { title: "UNIT", dataIndex: "unit", width: 80, align: "right" },
    { title: "CHARGE/UNIT", dataIndex: "chargePerUnit", width: 120, align: "right",
      render: v => (v ? Number(v).toFixed(2) : "0.00") },
    { title: "CURRENCY", dataIndex: "currency", width: 100 },
    { title: "CHARGE AMOUNT", dataIndex: "chargeAmount", width: 140, align: "right",
      render: v => (v ? Number(v).toFixed(2) : "0.00") },
    { title: "EXCHANGE RATE", dataIndex: "exRate", width: 140, align: "right",
      render: v => (v ? Number(v).toFixed(2) : "1.00") },
    { title: "TOTAL AMOUNT (IN BDT.)", dataIndex: "totalBdt", width: 200, align: "right",
      render: v => (v ? Number(v).toFixed(2) : "0.00") },
  ];

  // keep empty to mirror your screenshot
  const headerDataSource = [];
  const detailDataSource = [];

  const onSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500); // stub
  };

  const onReset = () => {
    form.resetFields();
  };

  const printToPdf = () => {
    // Open a clean window with just the printable content
    const printContent = printRef.current;
    if (!printContent) return;

    const w = window.open("", "PRINT", "height=800,width=1100");
    if (!w) return;

    w.document.write(`
      <html>
        <head>
          <title>P&L Statement</title>
          <style>
            body{ font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 16px; }
            .hdr { background: ${teal}; color: #fff; padding: 10px 12px; border-radius: 3px; font-weight: 700; }
            .box { border: 1px solid ${border}; border-radius: 3px; margin-top: 10px; }
            .box-inner { padding: 10px; }
            .row { display: grid; grid-template-columns: 1fr 1fr; }
            .muted { color: #6b7b7e; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid ${border}; padding: 6px 8px; font-size: 12px; }
            th { background: ${headBg}; text-align: left; }
            .right { text-align: right; }
            .center { text-align: center; }
            .title { text-align: center; margin: 6px 0 2px; font-weight: 700; }
            .sub { text-align: center; margin: 0; font-size: 12px; }
            .line { display: grid; grid-template-columns: 160px 1fr 220px 200px; column-gap: 8px; margin: 2px 0; }
            .label { color: #666; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    w.document.close();
    w.focus();
    w.print();
    // w.close(); // you can close automatically, but some browsers block it
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
      {/* Top teal bar (title) */}
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
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              border: "2px solid #fff",
              transform: "rotate(45deg)",
            }}
          />
          <span>Profit & Loss Statement / Exp. Sea Filter</span>
        </Space>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Button icon={<ReloadOutlined />} onClick={onReset}>
            Reset
          </Button>
          <Button icon={<PrinterOutlined />} onClick={printToPdf} type="default">
            Print
          </Button>
        </div>
      </div>

      {/* Filter card */}
      <Card
        style={{
          marginTop: 8,
          border: `2px solid ${cyanLine}`,
          borderRadius: 3,
        }}
        bodyStyle={{ padding: 12 }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ mblSeq: "1", hbl: "" }}
        >
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label=" " colon={false} name="mblSeq">
                <Radio.Group>
                  <Space size="large">
                    <Radio value="1">1st MBL</Radio>
                    <Radio value="2">2nd MBL</Radio>
                    <Radio value="3">3rd MBL</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item label=" " colon={false} name="hbl">
                <Select options={hblOptions} />
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
              onClick={onSearch}
            >
              Search
            </Button>
          </div>
        </Form>
      </Card>

      {/* Printable Area */}
      <Card
        style={{
          marginTop: 12,
          border: `1px solid ${border}`,
          borderRadius: 3,
        }}
        bodyStyle={{ padding: 12 }}
        ref={printRef}
      >
        {/* Header (company block) */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <Title level={4} style={{ margin: 0 }}>
            N2N Supply Chain Solutions Ltd.
          </Title>
          <Text style={{ display: "block", marginBottom: 4 }}>
            House# 7 (4th Floor), Road# 2/1, Banani, Dhaka, Bangladesh
          </Text>
          <Text strong style={{ display: "block", textDecoration: "underline" }}>
            PROFIT & LOSS STATEMENT / EXP. SEA
          </Text>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ lineHeight: 1.7 }}>
            <div><Text className="label">Generated By:</Text> nahidridwanul@gmail.com</div>
          </div>
          <div style={{ lineHeight: 1.7 }}>
            <div><Text strong>Print Date:</Text> {printDateStr()}</div>
          </div>
        </div>

        {/* Meta lines */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 16, marginBottom: 8 }}>
          <div style={{ lineHeight: 1.6 }}>
            <div>MBL NO. : </div>
            <div>ORIGIN AGENT : </div>
            <div>ETD DATE : </div>
            <div>CONTAINER NO. : </div>
          </div>
          <div style={{ lineHeight: 1.6 }}>
            <div>JOB NO. : </div>
            <div>DESTINATION AGENT : </div>
            <div>ETA DATE : </div>
          </div>
        </div>

        {/* Top table (HBL/summary row) */}
        <Table
          size="small"
          bordered
          pagination={false}
          dataSource={headerDataSource}
          columns={columnsTop}
          rowKey={(r, i) => `t${i}`}
          locale={{ emptyText: "" }}
          style={{ marginBottom: 10 }}
        />

        {/* Detail table */}
        <Table
          size="small"
          bordered
          pagination={false}
          dataSource={detailDataSource}
          columns={columnsDetail}
          rowKey={(r, i) => `d${i}`}
          locale={{ emptyText: "" }}
        />
      </Card>
    </div>
  );
}
