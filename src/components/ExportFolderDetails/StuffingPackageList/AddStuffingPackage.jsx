// File: AddStuffingPackage.jsx
import React, { useMemo, useState } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  InputNumber,
  Button,
  Table,
  Typography,
  Space,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  RollbackOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Text } = Typography;

const planOptions = [
  { value: "", label: "(-- Select/None --)" },
  { value: "EAFI#25000005", label: "EAFI#25000005" },
  { value: "EAFI#25000004", label: "EAFI#25000004" },
  { value: "EAFI#25000002", label: "EAFI#25000002" },
  { value: "EAFI#25000001", label: "EAFI#25000001" },
];

const modeOptions = [
  { value: "", label: "(-- Select/None --)" },
  { value: "LCL-LCL", label: "LCL-LCL" },
  { value: "CFS-CY", label: "CFS-CY" },
  { value: "CY-CY", label: "CY-CY" },
];

const bookingOptions = [
  { value: "", label: "Select/None" },
  { value: "ES#2500005", label: "ES#2500005" },
  { value: "ES#2500004", label: "ES#2500004" },
  { value: "ES#2500001", label: "ES#2500001" },
];

const cntrTypes = [
  { value: "", label: "Select/None" },
  { value: "20GP", label: "20' GP" },
  { value: "40GP", label: "40' GP" },
  { value: "40HQ", label: "40' HQ" },
];

export default function AddStuffingPackage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    // start with one empty row (optional)
    {
      key: Date.now(),
      bookingNo: "",
      cntrType: "",
      cntrNo: "",
      sealNo: "",
      po: "",
      style: "",
      color: "",
      so: "",
      totalCarton: 0,
      package: 0,
      receiveCarton: 0,
      cbm: 0,
      gwt: 0,
    },
  ]);

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        key: Date.now(),
        bookingNo: "",
        cntrType: "",
        cntrNo: "",
        sealNo: "",
        po: "",
        style: "",
        color: "",
        so: "",
        totalCarton: 0,
        package: 0,
        receiveCarton: 0,
        cbm: 0,
        gwt: 0,
      },
    ]);

  const removeRow = (key) => setRows((prev) => prev.filter((r) => r.key !== key));

  // update helper
  const updateCell = (key, field, value) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));

  // totals
  const totals = useMemo(() => {
    const sum = (f) => rows.reduce((acc, r) => acc + (Number(r[f]) || 0), 0);
    return {
      totalCarton: sum("totalCarton"),
      package: sum("package"),
      receiveCarton: sum("receiveCarton"),
      balanceCarton: sum("totalCarton") - sum("receiveCarton"),
      cbm: sum("cbm"),
      gwt: sum("gwt"),
    };
  }, [rows]);

  const columns = [
    {
      title: "Booking No.",
      dataIndex: "bookingNo",
      width: 150,
      render: (v, record) => (
        <Select
          options={bookingOptions}
          value={v}
          onChange={(val) => updateCell(record.key, "bookingNo", val)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "CNTR Type",
      dataIndex: "cntrType",
      width: 140,
      render: (v, record) => (
        <Select
          options={cntrTypes}
          value={v}
          onChange={(val) => updateCell(record.key, "cntrType", val)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "CNTR No.",
      dataIndex: "cntrNo",
      width: 140,
      render: (v, record) => (
        <Input
          placeholder="Container No."
          value={v}
          onChange={(e) => updateCell(record.key, "cntrNo", e.target.value)}
        />
      ),
    },
    {
      title: "Seal No.",
      dataIndex: "sealNo",
      width: 120,
      render: (v, record) => (
        <Input
          placeholder="Seal No."
          value={v}
          onChange={(e) => updateCell(record.key, "sealNo", e.target.value)}
        />
      ),
    },
    {
      title: "PO#",
      dataIndex: "po",
      width: 120,
      render: (v, record) => (
        <Input value={v} onChange={(e) => updateCell(record.key, "po", e.target.value)} />
      ),
    },
    {
      title: "Style",
      dataIndex: "style",
      width: 120,
      render: (v, record) => (
        <Input
          value={v}
          onChange={(e) => updateCell(record.key, "style", e.target.value)}
        />
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      width: 120,
      render: (v, record) => (
        <Input
          value={v}
          onChange={(e) => updateCell(record.key, "color", e.target.value)}
        />
      ),
    },
    {
      title: "S/O",
      dataIndex: "so",
      width: 100,
      render: (v, record) => (
        <Input value={v} onChange={(e) => updateCell(record.key, "so", e.target.value)} />
      ),
    },
    {
      title: "Total Carton",
      dataIndex: "totalCarton",
      width: 130,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "totalCarton", val || 0)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Package",
      dataIndex: "package",
      width: 110,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "package", val || 0)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Receive Carton",
      dataIndex: "receiveCarton",
      width: 140,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "receiveCarton", val || 0)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Balance Carton",
      dataIndex: "balanceCarton",
      width: 140,
      align: "right",
      render: (_, record) => {
        const bal = (Number(record.totalCarton) || 0) - (Number(record.receiveCarton) || 0);
        return <div>{bal}</div>;
      },
    },
    {
      title: "CBM",
      dataIndex: "cbm",
      width: 110,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "cbm", val || 0)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "GWT",
      dataIndex: "gwt",
      width: 110,
      align: "right",
      render: (v, record) => (
        <InputNumber
          min={0}
          value={v}
          onChange={(val) => updateCell(record.key, "gwt", val || 0)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 110,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Button danger type="text" icon={<DeleteOutlined />} onClick={() => removeRow(record.key)}>
          Remove
        </Button>
      ),
    },
  ];

  const onSubmit = (values) => {
    const payload = {
      ...values,
      date: values.date?.format("YYYY-MM-DD"),
      items: rows.map((r) => ({
        ...r,
        balanceCarton: (Number(r.totalCarton) || 0) - (Number(r.receiveCarton) || 0),
      })),
      totals,
    };
    console.log("SUBMIT >>>", payload);
    message.success("Stuffing Package saved.");
  };

  const onCancel = () => navigate(-1);

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6 }}>
      {/* Header Bar */}
      <div
        style={{
          background: "#06b6d4",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <EditOutlined />
          <strong>Add Stuffing Package</strong>
        </div>
        <Button icon={<RollbackOutlined />} onClick={onCancel}>
          Cancel Page
        </Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ date: dayjs(), planNo: "", mode: "", remark: "" }}
        style={{ padding: 12 }}
      >
        {/* Top form area */}
        <Row gutter={[12, 8]}>
          <Col xs={24} lg={12}>
            <Form.Item label="Stuffing Plan No." name="planNo">
              <Select options={planOptions} />
            </Form.Item>
            <Form.Item label="Mode" name="mode">
              <Select options={modeOptions} />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Remark" name="remark">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        {/* Grid header mimic (light blue) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "150px 140px 140px 120px 120px 120px 120px 100px 130px 110px 140px 140px 110px 110px 110px",
            gap: 8,
            background: "#e6f7ff",
            padding: "8px 8px",
            border: "1px solid #e5e7eb",
            borderBottom: "none",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            fontWeight: 600,
          }}
        >
          <div>Booking No.</div>
          <div>CNTR Type</div>
          <div>CNTR No.</div>
          <div>Seal No.</div>
          <div>PO#</div>
          <div>Style</div>
          <div>Color</div>
          <div>S/O</div>
          <div>Total Carton</div>
          <div>Package</div>
          <div>Receive Carton</div>
          <div>Balance Carton</div>
          <div>CBM</div>
          <div>GWT</div>
          <div style={{ textAlign: "center" }}>Action</div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={rows}
          pagination={false}
          size="small"
          rowKey="key"
          style={{
            border: "1px solid #e5e7eb",
            borderTop: "none",
            marginBottom: 8,
          }}
          scroll={{ x: 1400 }}
        />

        {/* Add row + summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            padding: 8,
            border: "1px solid #e5e7eb",
            borderTop: "none",
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            marginBottom: 12,
          }}
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={addRow}>
            Add Row
          </Button>

          <div style={{ display: "flex", gap: 24 }}>
            <Stat label="Receive Carton" value={totals.receiveCarton} />
            <Stat label="Balance Carton" value={totals.balanceCarton} />
            <Stat label="CBM" value={totals.cbm} />
            <Stat label="GWT" value={totals.gwt} />
          </div>
        </div>

        {/* Footer actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 8,
          }}
        >
          <Text type="secondary">* Required Fields</Text>
          <Space>
            <Button onClick={onCancel} icon={<RollbackOutlined />}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
              Submit
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}

// small stat chip
const Stat = ({ label, value }) => (
  <div style={{ minWidth: 110 }}>
    <div style={{ fontSize: 12, color: "#64748b" }}>{label}</div>
    <div style={{ fontWeight: 600 }}>{Number(value || 0).toLocaleString()}</div>
  </div>
);
