// File: AddExpenseBill.jsx
import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Col,
  Select,
  Typography,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";



const { TextArea } = Input;
const { Text } = Typography;

const PARTY_TYPES = ["Shipper", "Consignee", "Agent", "3rd Party"].map((v) => ({
  label: v,
  value: v,
}));

const ACCOUNT_HEADS = [
  "Select/None",
  "Freight",
  "Documentation",
  "Handling",
  "Other",
].map((v) => ({ label: v, value: v }));

const UNIT_NAMES = ["Cartons", "Kg", "CBM", "TEU"].map((v) => ({
  label: v,
  value: v,
}));

const CURRENCIES = ["BDT", "USD", "EUR"].map((v) => ({
  label: v,
  value: v,
}));

const STAFF = [
  "NZN Supply Chain Solutions Ltd.",
  "User A",
  "User B",
].map((v) => ({ label: v, value: v }));

const money = (n) =>
  n == null || isNaN(n)
    ? "0.00"
    : n.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

export default function AddExpenseBill() {
  const [form] = Form.useForm();
  const [items, setItems] = useState([
    {
      partyType: "Shipper",
      unit: 0,
      unitName: "Cartons",
      charge: 0,
      currency: "BDT",
      exchangeRate: 1,
      amount: 0,
      exchangeAmount: 0,
    },
  ]);

  // 🔹 কোন row ডিলিট করব সেটা ধরার জন্য state
  const [deleteIndex, setDeleteIndex] = useState(null);

  const recalcItems = (currentItems) => {
    const rows = currentItems.map((row) => {
      const unit = Number(row.unit || 0);
      const charge = Number(row.charge || 0);
      const exRate = Number(row.exchangeRate || 1);
      const amount = unit * charge;
      const exchangeAmount = amount * exRate;
      return { ...row, amount, exchangeAmount };
    });
    setItems(rows);
  };

  const handleItemChange = (index, key, value) => {
    const clone = [...items];
    clone[index] = { ...clone[index], [key]: value };
    recalcItems(clone);
  };

  const addRow = () => {
    const clone = [
      ...items,
      {
        partyType: "Shipper",
        unit: 0,
        unitName: "Cartons",
        charge: 0,
        currency: "BDT",
        exchangeRate: 1,
        amount: 0,
        exchangeAmount: 0,
      },
    ];
    recalcItems(clone);
  };

  // 🔹 আসল ডিলিট লজিক (মডাল Ok চাপলে চলবে)
  const confirmRemoveRow = () => {
    if (deleteIndex === null) return;
    const clone = items.filter((_, idx) => idx !== deleteIndex);
    // অন্তত ১টা row যেন থাকে — চাইলে এই লজিক তুমি কাস্টমাইজ করতে পারো
    recalcItems(clone.length ? clone : items);
    setDeleteIndex(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f7fb",
      }}
    >
      <Card
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        {/* ── FORM BODY ───────────────────────────── */}
        <div style={{ padding: "10px 14px 14px" }}>
          <Form
            form={form}
            layout="vertical"
            size="small"
            initialValues={{
              date: dayjs(),
              hblType: "HBL",
              status: "Draft",
            }}
          >
            {/* ===== HEADER AREA ===== */}
            <Row gutter={12} style={{ marginBottom: 8 }}>
              <Col xs={24} md={14}>
                <Row gutter={8}>
                  <Col span={24}>
                    <Form.Item label="Date" name="date">
                      <DatePicker
                        style={{ width: "100%" }}
                        format="DD MMMM, YYYY"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="HBL / MBL" name="hblType">
                      <Radio.Group>
                        <Radio value="HBL" style={{ marginRight: 20 }}>
                          HBL
                        </Radio>
                        <Radio value="1st MBL" style={{ marginRight: 20 }}>
                          1st MBL
                        </Radio>
                        <Radio value="2nd MBL" style={{ marginRight: 20 }}>
                          2nd MBL
                        </Radio>
                        <Radio value="3rd MBL">3rd MBL</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label=" "
                      name="hblNo"
                      style={{ marginBottom: 6 }}
                    >
                      <Select
                        placeholder="(~ Select/None 1st MBL ~)"
                        options={[
                          {
                            label: "MBL#2500001",
                            value: "MBL#2500001",
                          },
                          {
                            label: "MBL#2500002",
                            value: "MBL#2500002",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Bank" name="bank">
                      <Select
                        placeholder="(~ Select/None ~)"
                        options={[
                          {
                            label: "Eastern Bank PLC",
                            value: "Eastern Bank PLC",
                          },
                          { label: "City Bank", value: "City Bank" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              {/* right side blank textbox */}
              <Col xs={24} md={10}>
                <Form.Item label=" " name="topNote">
                  <TextArea
                    rows={5}
                    style={{
                      resize: "none",
                      borderColor: "#d0d7e2",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* ===== BILLING ITEMS TABLE ===== */}
            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                border: "1px solid #cfd8e3",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {/* table header */}
              <div
                style={{
                  background: "#e9f7fb",
                  borderBottom: "1px solid #cfd8e3",
                  padding: "4px 8px",
                  fontWeight: 600,
                }}
              >
                BILLING ITEMS
              </div>

              {/* column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "120px 160px 170px 70px 110px 110px 110px 90px 120px 60px",
                  background: "#f6fbfe",
                  borderBottom: "1px solid #dae2ee",
                  fontWeight: 500,
                }}
              >
                {[
                  "Party Type",
                  "Pay to Party",
                  "Account Head",
                  "Unit",
                  "Unit Name",
                  "Charge/ Unit",
                  "Amount",
                  "Currency",
                  "Exchange Amount",
                  "Action",
                ].map((h) => (
                  <div
                    key={h}
                    style={{
                      padding: "4px 6px",
                      borderRight: "1px solid #dae2ee",
                      textAlign:
                        h === "Unit" ||
                        h === "Charge/ Unit" ||
                        h === "Amount" ||
                        h === "Exchange Amount"
                          ? "right"
                          : "left",
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* rows */}
              <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                {items.map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "120px 160px 170px 70px 110px 110px 110px 90px 120px 60px",
                      borderBottom: "1px solid #edf0f6",
                    }}
                  >
                    {/* Party Type */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <Select
                        size="small"
                        options={PARTY_TYPES}
                        value={row.partyType}
                        onChange={(v) =>
                          handleItemChange(idx, "partyType", v)
                        }
                      />
                    </div>

                    {/* Pay to Party */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <Select
                        size="small"
                        placeholder="Select Shipper"
                        value={row.payToParty}
                        onChange={(v) =>
                          handleItemChange(idx, "payToParty", v)
                        }
                        options={[
                          {
                            label: "Select Shipper",
                            value: "Select Shipper",
                          },
                          {
                            label: "TEX ZONE KNITWEAR LTD.",
                            value: "TEX ZONE KNITWEAR LTD.",
                          },
                        ]}
                      />
                    </div>

                    {/* Account Head */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <Select
                        size="small"
                        options={ACCOUNT_HEADS}
                        value={row.accountHead}
                        onChange={(v) =>
                          handleItemChange(idx, "accountHead", v)
                        }
                      />
                    </div>

                    {/* Unit */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <InputNumber
                        size="small"
                        min={0}
                        value={row.unit}
                        onChange={(v) => handleItemChange(idx, "unit", v)}
                        style={{ width: "100%", textAlign: "right" }}
                      />
                    </div>

                    {/* Unit Name */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <Select
                        size="small"
                        options={UNIT_NAMES}
                        value={row.unitName}
                        onChange={(v) =>
                          handleItemChange(idx, "unitName", v)
                        }
                      />
                    </div>

                    {/* Charge / Unit */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <InputNumber
                        size="small"
                        min={0}
                        value={row.charge}
                        onChange={(v) =>
                          handleItemChange(idx, "charge", v)
                        }
                        style={{ width: "100%", textAlign: "right" }}
                      />
                    </div>

                    {/* Amount (read-only) */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <Input
                        size="small"
                        value={money(row.amount)}
                        readOnly
                        style={{ textAlign: "right" }}
                      />
                    </div>

                    {/* Currency */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <Select
                        size="small"
                        options={CURRENCIES}
                        value={row.currency}
                        onChange={(v) =>
                          handleItemChange(idx, "currency", v)
                        }
                      />
                    </div>

                    {/* Exchange Amount (read-only) */}
                    <div
                      style={{
                        padding: "4px 6px",
                        borderRight: "1px solid #edf0f6",
                      }}
                    >
                      <Input
                        size="small"
                        value={money(row.exchangeAmount)}
                        readOnly
                        style={{ textAlign: "right" }}
                      />
                    </div>

                    {/* Action */}
                    <div
                      style={{
                        padding: "4px 6px",
                        textAlign: "center",
                      }}
                    >
                      {/* 🔹 Delete বাটন এখন DeleteModal দিয়ে wrap করা */}
                      <DeleteModal
                        open={deleteIndex === idx}
                        onOk={confirmRemoveRow}
                        onCancel={() => setDeleteIndex(null)}
                      >
                        <Button
                          type="text"
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => setDeleteIndex(idx)}
                        />
                      </DeleteModal>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Item Button under table */}
            <div style={{ marginTop: 6 }}>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                style={{
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  color: "#fff",
                  fontWeight: 500,
                }}
                onClick={addRow}
              >
                Add Item
              </Button>
            </div>

            {/* ===== REMARK + ATTACHMENT ===== */}
            <Row gutter={12} style={{ marginTop: 16 }}>
              <Col xs={24} md={16}>
                <Form.Item label="Remark" name="remark">
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ marginTop: 24 }}>
                  <Checkbox defaultChecked>
                    <span style={{ fontSize: 11 }}>
                      ATTACHMENT (NOTE: IF YOU REMOVE THIS, IT WILL BE
                      PERMANENTLY DELETED.)
                    </span>
                  </Checkbox>
                </div>
              </Col>
            </Row>

            {/* Prepared / Checked / Status */}
            <Row gutter={12}>
              <Col xs={24} md={8}>
                <Form.Item label="Prepared By" name="preparedBy">
                  <Select
                    placeholder="(~ Select/None ~)"
                    options={STAFF}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Checked By" name="checkedBy">
                  <Select
                    placeholder="(~ Select/None ~)"
                    options={STAFF}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Status" name="status">
                  <Radio.Group>
                    <Radio value="Draft">Draft</Radio>
                    <Radio value="Final">Final</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            {/* footer line */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Text type="secondary" style={{ fontSize: 11 }}>
                * Required Fields
              </Text>
              <Button type="primary" size="small">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
