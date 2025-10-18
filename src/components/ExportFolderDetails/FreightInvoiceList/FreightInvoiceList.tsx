import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const { Text } = Typography;

// -----------------------------
// Types
// -----------------------------

type InvoiceRow = {
  key: string;
  sl: number;
  reference: string;
  date: string; // ISO date string
  hbl: string;
  attention: string;
  billTo: string;
  mbl: string;
  bank?: string;
  totalAmount: number; // BDT shown as 0,000.00
  excAmount?: number; // e.g., 20.49
  preparedBy: string;
};

// -----------------------------
// Mock options
// -----------------------------

const HBL_OPTIONS = ["All", "ES#25000005", "ES#25000001"].map((v) => ({
  label: v,
  value: v === "All" ? undefined : v,
}));

const simpleOptions = (arr: string[]) => [
  { label: "All", value: undefined },
  ...arr.map((v) => ({ label: v, value: v })),
];

const SHIPPER_OPTIONS = simpleOptions(["TEX ZONE KNITWEAR LTD."]); // demo
const CONSIGNEE_OPTIONS = simpleOptions(["Consignee A", "Consignee B"]);
const AGENT_OPTIONS = simpleOptions(["NZN Logistics", "Agent X"]);
const THIRD_PARTY_OPTIONS = simpleOptions(["ThirdCo", "Delta Forwarders"]);
const BANK_OPTIONS = simpleOptions(["Eastern Bank PLC", "City Bank"]);

// -----------------------------
// Mock data
// -----------------------------

const MOCK_DATA: InvoiceRow[] = [
  {
    key: "1",
    sl: 1,
    reference: "ESFI#25000002",
    date: "2025-08-10",
    hbl: "ES#25000005",
    attention: "TEX ZONE KNITWEAR LTD.",
    billTo: "TEX ZONE KNITWEAR LTD.",
    mbl: "ESMB#25000004",
    bank: "Eastern Bank PLC",
    totalAmount: 2500,
    excAmount: 20.49,
    preparedBy: "NZN Supply Chain Solutions Ltd.",
  },
  {
    key: "2",
    sl: 2,
    reference: "ESFI#25000001",
    date: "2025-08-07",
    hbl: "ES#25000001",
    attention: "TEX ZONE KNITWEAR LTD.",
    billTo: "TEX ZONE KNITWEAR LTD.",
    mbl: "ESMB#25000001",
    bank: undefined,
    totalAmount: 2500,
    excAmount: 2500,
    preparedBy: "NZN Supply Chain Solutions Ltd.",
  },
];

// -----------------------------
// Utilities
// -----------------------------

const fmtBDT = (n?: number) =>
  n === undefined ? "" : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// -----------------------------
// Component
// -----------------------------

export default function FreightInvoiceList() {
  const [form] = Form.useForm();
  const [query, setQuery] = useState("");

  // default filter dates (match screenshot: 16 Jul 2025 - 16 Oct 2025)
  const defaultDates: [Dayjs, Dayjs] = [
    dayjs("2025-07-16"),
    dayjs("2025-10-16"),
  ];

  // Keep local state for pagination as AntD Table manages it well
  const [pageSize, setPageSize] = useState(10);

  const initialValues = {
    hbl: undefined,
    shipper: undefined,
    consignee: undefined,
    agent: undefined,
    thirdParty: undefined,
    bank: undefined,
    dateRange: defaultDates,
  } as const;

  const actionMenu = (row: InvoiceRow): MenuProps => ({
    items: [
      {
        key: "view",
        label: (
          <Space>
            <EyeOutlined /> View
          </Space>
        ),
        onClick: () => message.info(`Viewing ${row.reference}`),
      },
      {
        key: "edit",
        label: (
          <Space>
            <EditOutlined /> Edit
          </Space>
        ),
        onClick: () => message.info(`Editing ${row.reference}`),
      },
      {
        type: "divider",
      },
      {
        key: "delete",
        danger: true,
        label: (
          <Space>
            <DeleteOutlined /> Delete
          </Space>
        ),
        onClick: () => message.warning(`Deleted ${row.reference} (demo)`),
      },
    ],
  });

  const columns: ColumnsType<InvoiceRow> = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 90,
      sorter: (a, b) => a.sl - b.sl,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (v: string) => <Tag color="blue">{v}</Tag>,
      width: 160,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (v: string) => dayjs(v).format("DD/MM/YYYY"),
    },
    { title: "HBL", dataIndex: "hbl", width: 140 },
    { title: "Attention", dataIndex: "attention", width: 260 },
    { title: "Bill to Party", dataIndex: "billTo", width: 220 },
    { title: "MBL", dataIndex: "mbl", width: 160 },
    { title: "Bank", dataIndex: "bank", width: 180 },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      align: "right",
      width: 140,
      render: (n: number) => fmtBDT(n),
    },
    {
      title: (
        <div className="text-right">Total Amount (EXC)</div>
      ),
      dataIndex: "excAmount",
      align: "right",
      width: 170,
      render: (n?: number) => (n !== undefined ? fmtBDT(n) : "-"),
    },
    { title: "Prepared By", dataIndex: "preparedBy", width: 280 },
    {
      title: "Action",
      fixed: "right",
      width: 80,
      render: (_, row) => (
        <Dropdown menu={actionMenu(row)} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const values = form.getFieldsValue();
    const range: [Dayjs, Dayjs] | undefined = values.dateRange;

    return MOCK_DATA.filter((row) => {
      // Quick text filter on most columns
      const text = query.trim().toLowerCase();
      if (text) {
        const hay = [
          row.reference,
          row.hbl,
          row.attention,
          row.billTo,
          row.mbl,
          row.bank,
          row.preparedBy,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(text)) return false;
      }

      // Date range filter
      if (range && range.length === 2) {
        const d = dayjs(row.date);
        if (d.isBefore(range[0], "day") || d.isAfter(range[1], "day")) {
          return false;
        }
      }

      // Select filters (only check when value is set)
      if (values.hbl && row.hbl !== values.hbl) return false;
      if (values.agent && !row.preparedBy.toLowerCase().includes(String(values.agent).toLowerCase())) return false;
      if (values.bank && row.bank !== values.bank) return false;
      // shipper/consignee/thirdParty demo – assuming they relate to attention/billTo
      if (values.shipper && row.attention !== values.shipper) return false;
      if (values.consignee && row.billTo !== values.consignee) return false;
      if (values.thirdParty && !row.preparedBy.includes(values.thirdParty)) return false;

      return true;
    });
  }, [form, query]);

  const onReset = () => {
    form.resetFields();
    form.setFieldsValue({ dateRange: defaultDates });
    setQuery("");
  };

  return (
    <div className="p-4">
      <Card className="shadow-sm rounded-2xl">
        

        {/* Filters */}
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Form.Item label="HBL" name="hbl">
            <Select options={HBL_OPTIONS} allowClear placeholder="All" />
          </Form.Item>
          <Form.Item label="Shipper" name="shipper">
            <Select options={SHIPPER_OPTIONS} allowClear placeholder="All" />
          </Form.Item>
          <Form.Item label="Consignee" name="consignee">
            <Select options={CONSIGNEE_OPTIONS} allowClear placeholder="All" />
          </Form.Item>
          <Form.Item label="Agent" name="agent">
            <Select options={AGENT_OPTIONS} allowClear placeholder="All" />
          </Form.Item>
          <Form.Item label="Third Party" name="thirdParty">
            <Select options={THIRD_PARTY_OPTIONS} allowClear placeholder="All" />
          </Form.Item>
          <Form.Item label="Bank" name="bank">
            <Select options={BANK_OPTIONS} allowClear placeholder="All" />
          </Form.Item>
          <Form.Item label="Start Date – End Date" name="dateRange">
            <RangePicker className="w-full" format="D MMM, YYYY" allowEmpty={[false, false]} />
          </Form.Item>
          <Form.Item label="Filter">
            <Input.Search
              placeholder="Type to filter..."
              allowClear
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Item>
        </Form>

        {/* Table */}
        <div className="mt-2">
          <Table
            size="middle"
            rowKey="key"
            columns={columns}
            dataSource={filteredData}
            scroll={{ x: 1400 }}
            pagination={{
              pageSize,
              showSizeChanger: true,
              onChange: (_, ps) => setPageSize(ps),
              showTotal: (total) => `Showing 1 to ${Math.min(total, pageSize)} of ${total} entries`,
            }}
          />
        </div>
      </Card>
    </div>
  );
}
