import React, { useMemo, useState } from "react";
import {
  Layout,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Radio,
  Card,
  Button,
  Table,
  Space,
  Typography,
  Tooltip,
  Divider,
  Tag,
} from "antd";
import {
  CloseOutlined,
  CalendarOutlined,
  PlusOutlined,
  SaveOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;







// --- Item table helpers
const emptyItem = (idx) => ({
  key: String(idx),
  type: "Cm",
  po: "",
  style: "",
  color: "",
  so: "",
  carton: 0,
  pkg: "Select/None",
  pcs: 0,
  len: 0,
  wid: 0,
  hei: 0,
  cbm: 0,
  gwt: 0,
});

export default function AddCargoReceive() {
  const [form] = Form.useForm();
  const [items, setItems] = useState([emptyItem(1)]);

  const totals = useMemo(() => {
    const cbm = items.reduce((s, r) => s + Number(r.cbm || 0), 0);
    const gwt = items.reduce((s, r) => s + Number(r.gwt || 0), 0);
    return { cbm, gwt };
  }, [items]);

  const updateItem = (key, field, value) => {
    setItems((prev) => prev.map((it) => (it.key === key ? { ...it, [field]: value } : it)));
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem(prev.length + 1)]);

  const columns = [
    {
      title: "Type *",
      dataIndex: "type",
      width: 100,
      render: (_, r) => (
        <Select
          value={r.type}
          onChange={(v) => updateItem(r.key, "type", v)}
          options={[
            { value: "Cm", label: "Cm" },
            { value: "Inch", label: "Inch" },
          ]}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "PO# *",
      dataIndex: "po",
      width: 120,
      render: (_, r) => (
        <Input value={r.po} onChange={(e) => updateItem(r.key, "po", e.target.value)} />
      ),
    },
    {
      title: "Style *",
      dataIndex: "style",
      width: 120,
      render: (_, r) => (
        <Input value={r.style} onChange={(e) => updateItem(r.key, "style", e.target.value)} />
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      width: 120,
      render: (_, r) => (
        <Input value={r.color} onChange={(e) => updateItem(r.key, "color", e.target.value)} />
      ),
    },
    {
      title: "S/O",
      dataIndex: "so",
      width: 120,
      render: (_, r) => (
        <Input value={r.so} onChange={(e) => updateItem(r.key, "so", e.target.value)} />
      ),
    },
    {
      title: "Carton *",
      dataIndex: "carton",
      width: 110,
      render: (_, r) => (
        <Input
          type="number"
          value={r.carton}
          onChange={(e) => updateItem(r.key, "carton", Number(e.target.value))}
        />
      ),
    },
    {
      title: "Package",
      dataIndex: "pkg",
      width: 140,
      render: (_, r) => (
        <Select
          value={r.pkg}
          onChange={(v) => updateItem(r.key, "pkg", v)}
          options={[
            { value: "Select/None", label: "Select/None" },
            { value: "Pack A", label: "Pack A" },
            { value: "Pack B", label: "Pack B" },
          ]}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Pcs",
      dataIndex: "pcs",
      width: 90,
      render: (_, r) => (
        <Input
          type="number"
          value={r.pcs}
          onChange={(e) => updateItem(r.key, "pcs", Number(e.target.value))}
        />
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Dimension</div>,
      children: [
        {
          title: "Length",
          dataIndex: "len",
          width: 110,
          render: (_, r) => (
            <Input
              type="number"
              value={r.len}
              onChange={(e) => updateItem(r.key, "len", Number(e.target.value))}
            />
          ),
        },
        {
          title: "Width",
          dataIndex: "wid",
          width: 110,
          render: (_, r) => (
            <Input
              type="number"
              value={r.wid}
              onChange={(e) => updateItem(r.key, "wid", Number(e.target.value))}
            />
          ),
        },
        {
          title: "Height",
          dataIndex: "hei",
          width: 110,
          render: (_, r) => (
            <Input
              type="number"
              value={r.hei}
              onChange={(e) => updateItem(r.key, "hei", Number(e.target.value))}
            />
          ),
        },
      ],
    },
    {
      title: "CBM *",
      dataIndex: "cbm",
      width: 110,
      render: (_, r) => (
        <Input
          type="number"
          value={r.cbm}
          onChange={(e) => updateItem(r.key, "cbm", Number(e.target.value))}
        />
      ),
    },
    {
      title: "GWT *",
      dataIndex: "gwt",
      width: 110,
      render: (_, r) => (
        <Input
          type="number"
          value={r.gwt}
          onChange={(e) => updateItem(r.key, "gwt", Number(e.target.value))}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 90,
      render: (_, r) => (
        <Button
          danger
          size="small"
          onClick={() => setItems((prev) => prev.filter((x) => x.key !== r.key))}
        >
          <DeleteFilled />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
            <Form
              layout="vertical"
              form={form}
              initialValues={{ date: dayjs("2025-10-10"), status: "Opened" }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Booking No." name="bookingNo">
                    <Select
                      placeholder="(~ Select/None ~)"
                      options={[{ value: "", label: "(~ Select/None ~)" }]}
                    />
                  </Form.Item>
                  <Form.Item label="Cargo Receive" name="cargoDate">
                    <DatePicker
                      style={{ width: "100%" }}
                      suffixIcon={<CalendarOutlined />}
                      defaultValue={dayjs("2025-10-10")}
                    />
                  </Form.Item>
                  <Form.Item label="Remark" name="remark">
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date *" name="date" rules={[{ required: true }]}>
                    <DatePicker
                      style={{ width: "100%" }}
                      suffixIcon={<CalendarOutlined />}
                    />
                  </Form.Item>
                  <Form.Item label="Status" name="status">
                    <Radio.Group>
                      <Radio value="Opened">Opened</Radio>
                      <Radio value="Issued">Issued</Radio>
                      <Radio value="Reopened">Reopened</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              {/* Info Panel */}
              <Card
                size="small"
                style={{ background: "#e6f7ff", borderColor: "#91d5ff", marginBottom: 16 }}
                bodyStyle={{ padding: 12 }}
              >
                <Row>
                  <Col span={12}>
                    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", rowGap: 6 }}>
                      <Text>Shipper :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Carrier :</Text>
                      <Text type="secondary"> </Text>
                      <Text>LC No. :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Exp No. :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Com. Invoice No. :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Place of Receipt :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Port of Discharge :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Marks & No. :</Text>
                      <Text type="secondary"> </Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", rowGap: 6 }}>
                      <Text>Consignee :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Agent :</Text>
                      <Text type="secondary"> </Text>
                      <Text>LC Date :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Exp Date :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Com. Invoice Date :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Port of Loading :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Final Destination :</Text>
                      <Text type="secondary"> </Text>
                      <Text>Description of Goods :</Text>
                      <Text type="secondary"> </Text>
                    </div>
                  </Col>
                </Row>
              </Card>

              {/* Table */}
              <Table
                dataSource={items}
                columns={columns}
                size="small"
                pagination={false}
                bordered
                scroll={{ x: 1200 }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>
                  Add Item
                </Button>
                <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
                  <Space>
                    <Text>CBM Total</Text>
                    <Input value={totals.cbm} style={{ width: 100 }} disabled />
                  </Space>
                  <Space>
                    <Text>GWT Total</Text>
                    <Input value={totals.gwt} style={{ width: 100 }} disabled />
                  </Space>
                </div>
              </div>

              <Divider />
              <Text italic type="secondary">
                * Required Fields
              </Text>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <Space>
                  <Button icon={<CloseOutlined />}>Cancel</Button>
                  <Button type="primary" icon={<SaveOutlined />}>
                    Submit
                  </Button>
                </Space>
              </div>
            </Form>
          </div>
  );
}
