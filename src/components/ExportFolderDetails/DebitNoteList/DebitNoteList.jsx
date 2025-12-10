import { useMemo, useState } from "react";
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
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";



const { RangePicker } = DatePicker;
const { Text } = Typography;

/* -----------------------------
   Helpers & Options
------------------------------*/
const toOpt = (v) => ({ label: v, value: v === "All" ? undefined : v });
const simpleOptions = (arr) => [toOpt("All"), ...arr.map((x) => ({ label: x, value: x }))];

const HBL_OPTIONS = ["All", "ES#25000001", "ES#25000002"].map(toOpt);
const SHIPPER_OPTIONS = simpleOptions(["LINIAGE Logistics", "Shipper B"]);
const CONSIGNEE_OPTIONS = simpleOptions(["Consignee A", "Consignee B"]);
const AGENT_OPTIONS = simpleOptions(["NZN Logistics", "Agent X"]);
const THIRD_PARTY_OPTIONS = simpleOptions(["ThirdCo"]);
const BANK_OPTIONS = simpleOptions(["Eastern Bank PLC", "City Bank"]);

const fmt = (n) =>
  n == null
    ? ""
    : n.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

/* -----------------------------
   Mock Data
------------------------------*/
const DATA = [
  {
    key: "1",
    sl: 1,
    reference: "ESDN#25000001",
    date: "2025-08-07",
    hbl: "ES#25000001, ES#25000002",
    billToParty: "LINIAGE Logistics",
    mbl: "ESMB#25000001",
    bank: "Eastern Bank PLC",
    totalAmount: 200,
    totalAmountExc: 24400,
    preparedBy: "NZN Supply Chain Solutions Ltd.",
  },
];

/* -----------------------------
   Component
------------------------------*/
export default function DebitNoteList() {
  const [form] = Form.useForm();
  const [q, setQ] = useState("");
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

  // 🔹 Action menu: View, Edit, Copy, DeleteModal
  const actionMenu = (row) => ({
    items: [
      {
        key: "view",
        label: (
          <Space>
            <EyeOutlined />
            View
          </Space>
        ),
        onClick: () => navigate("/export-sea/view-debit-note"),
      },
      {
        key: "edit",
        label: (
          <Space>
            <EditOutlined />
            Edit
          </Space>
        ),
        onClick: () => navigate("/export-sea/edit-debit-note"),
      },
      {
        key: "copy",
        label: (
          <Space>
            <CopyOutlined />
            Copy
          </Space>
        ),
        onClick: () => navigate("/export-sea/copy-debit-note"),
      },
      { type: "divider" },
      {
        key: "delete-modal",
        danger: true,
        // ⬇️ এখানে সরাসরি DeleteModal component বসানো হয়েছে
        label: <DeleteModal />,
      },
    ],
  });

  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, sorter: (a, b) => a.sl - b.sl },
    {
      title: "Reference",
      dataIndex: "reference",
      width: 170,
      render: (v) => <Tag color="cyan">{v}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
    { title: "HBL", dataIndex: "hbl", width: 240 },
    { title: "Bill to Party", dataIndex: "billToParty", width: 220 },
    { title: "MBL", dataIndex: "mbl", width: 160 },
    { title: "Bank", dataIndex: "bank", width: 180 },
    { title: "Total Amount", dataIndex: "totalAmount", width: 140, align: "right", render: fmt },
    {
      title: <div className="text-right">Total Amount (EXC)</div>,
      dataIndex: "totalAmountExc",
      width: 180,
      align: "right",
      render: fmt,
    },
    { title: "Prepared By", dataIndex: "preparedBy", width: 280 },
    {
      title: "Action",
      fixed: "right",
      width: 80,
      render: (_, r) => (
        <Dropdown menu={actionMenu(r)} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const data = useMemo(() => {
    const values = form.getFieldsValue();
    const range = values.dateRange;

    return DATA.filter((row) => {
      const text = q.trim().toLowerCase();
      if (text) {
        const hay = [
          row.reference,
          row.hbl,
          row.billToParty,
          row.mbl,
          row.bank,
          row.preparedBy,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(text)) return false;
      }

      if (range && range.length === 2) {
        const d = dayjs(row.date);
        if (d.isBefore(range[0], "day") || d.isAfter(range[1], "day")) return false;
      }

      if (values.hbl && !row.hbl.includes(values.hbl)) return false;
      if (values.bank && row.bank !== values.bank) return false;
      if (values.shipper && row.billToParty !== values.shipper) return false;
      if (
        values.agent &&
        !row.preparedBy.toLowerCase().includes(String(values.agent).toLowerCase())
      )
        return false;
      if (values.thirdParty && !row.preparedBy.includes(values.thirdParty)) return false;
      if (values.consignee) return false; // demo data te consulgee nai

      return true;
    });
  }, [form, q]);

  const onReset = () => {
    form.resetFields();
    form.setFieldsValue({ dateRange: defaultDates });
    setQ("");
  };

  return (
    <div className="px-4">
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
              onChange={(e) => setQ(e.target.value)}
            />
          </Form.Item>
        </Form>

        {/* Table */}
        <div className="mt-2">
          <Table
            size="middle"
            rowKey="key"
            columns={columns}
            dataSource={data}
            scroll={{ x: 1300 }}
            pagination={{
              pageSize,
              showSizeChanger: true,
              onChange: (_, ps) => setPageSize(ps),
              showTotal: (total) =>
                `Showing 1 to ${Math.min(total, pageSize)} of ${total} entries`,
            }}
          />
        </div>
      </Card>
    </div>
  );
}
