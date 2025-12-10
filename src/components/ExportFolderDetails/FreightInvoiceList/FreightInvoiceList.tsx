// File: FreightInvoiceList.jsx
import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Dropdown,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";

// 🆕 DELETE MODAL IMPORT


const { RangePicker } = DatePicker;
const { Text } = Typography;

const HBL_OPTIONS = ["All", "ES#25000005", "ES#25000001"].map((v) => ({
  label: v,
  value: v === "All" ? undefined : v,
}));

const simpleOptions = (arr) => [
  { label: "All", value: undefined },
  ...arr.map((v) => ({ label: v, value: v })),
];

const SHIPPER_OPTIONS = simpleOptions(["TEX ZONE KNITWEAR LTD."]);
const CONSIGNEE_OPTIONS = simpleOptions(["Consignee A", "Consignee B"]);
const AGENT_OPTIONS = simpleOptions(["NZN Logistics", "Agent X"]);
const THIRD_PARTY_OPTIONS = simpleOptions(["ThirdCo", "Delta Forwarders"]);
const BANK_OPTIONS = simpleOptions(["Eastern Bank PLC", "City Bank"]);

const MOCK_DATA = [
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

const fmtBDT = (n) =>
  n?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function FreightInvoiceList() {
  const [form] = Form.useForm();
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const defaultDates = [dayjs("2025-07-16"), dayjs("2025-10-16")];

  const initialValues = {
    hbl: undefined,
    shipper: undefined,
    consignee: undefined,
    agent: undefined,
    thirdParty: undefined,
    bank: undefined,
    dateRange: defaultDates,
  };

  // 🔥 UPDATED DROPDOWN ACTIONS WITH DeleteModal
  const actionMenu = (row) => ({
    items: [
      {
        key: "view",
        label: (
          <Space>
            <EyeOutlined /> View
          </Space>
        ),
        onClick: () =>
          navigate("/export-sea/view-freight-invoice", { state: { record: row } }),
      },
      {
        key: "edit",
        label: (
          <Space>
            <EditOutlined /> Edit
          </Space>
        ),
        onClick: () =>
          navigate("/export-sea/edit-freight-invoice", { state: { record: row } }),
      },
      {
        key: "copy",
        label: (
          <Space>
            <CopyOutlined /> Copy
          </Space>
        ),
        onClick: () =>
          navigate("/export-sea/copy-freight-invoice", { state: { record: row } }),
      },
      { type: "divider" },

      // 🆕 DeleteModal Attached Here
      {
        key: "delete",
        danger: true,
        label: <DeleteModal />,
      },
    ],
  });

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 90,
      sorter: (a, b) => a.sl - b.sl,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (v) => <Tag color="blue">{v}</Tag>,
      width: 160,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
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
      render: (n) => fmtBDT(n),
    },
    {
      title: <div className="text-right">Total Amount (EXC)</div>,
      dataIndex: "excAmount",
      align: "right",
      width: 170,
      render: (n) => (n !== undefined ? fmtBDT(n) : "-"),
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
    const range = values.dateRange;

    return MOCK_DATA.filter((row) => {
      const text = query.trim().toLowerCase();
      if (text) {
        const haystack =
          [
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
        if (!haystack.includes(text)) return false;
      }

      if (range && range.length === 2) {
        const d = dayjs(row.date);
        if (d.isBefore(range[0], "day") || d.isAfter(range[1], "day"))
          return false;
      }

      if (values.hbl && row.hbl !== values.hbl) return false;

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
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item label="Filter">
            <Input.Search
              placeholder="Type to filter..."
              allowClear
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Item>
        </Form>

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
          }}
        />
      </Card>
    </div>
  );
}
