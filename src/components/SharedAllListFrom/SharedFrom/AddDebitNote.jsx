import React, { useCallback, useMemo } from "react";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Typography,
  Upload,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  CloseOutlined,
  BorderOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { TextArea } = Input;

/* ===========================
   Color/Style Tokens (match)
   =========================== */
const C = {
  teal: "#00aeb7", // top bar
  tealDark: "#0096a0",
  cyanLine: "#0bb7c1", // outer border line
  headBg: "#e8f8fa", // section header bg
  tableHeadBg: "#dff4f7", // grid header bg
  border: "#cfe7ea",
  label: "#2d3f42",
  addGreen: "#2ea44f",
  addGreenHover: "#278a43",
  submitBlue: "#1b8fff",
  submitBlueHover: "#0d7eea",
  requiredNote: "#6b7b7e",
};

/* 9 Columns layout like screenshot */
const gridCols =
  "260px 100px 160px 160px 130px 120px 140px 160px 80px";

const rowStyle = {
  display: "grid",
  gridTemplateColumns: gridCols,
  gap: 8,
  alignItems: "center",
};

const headerRowStyle = {
  ...rowStyle,
  background: C.tableHeadBg,
  borderTop: `1px solid ${C.border}`,
  borderBottom: `1px solid ${C.border}`,
  padding: "8px 8px",
  fontWeight: 600,
  color: C.label,
};

const cellNum = { width: "100%", textAlign: "right" };

/* ------------------ Grid Item ------------------ */
const DynamicItem = ({
  idx,
  remove,
  listKey,
  onCalc,
  accountHeads,
  unitNames,
  currencies,
}) => {
  const onChange = () => onCalc(listKey);

  return (
    <div style={{ ...rowStyle, padding: "6px 8px" }}>
      <Form.Item
        name={[idx, "accountHead"]}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Required" }]}
      >
        <Select placeholder="Select/None" options={accountHeads} showSearch />
      </Form.Item>

      <Form.Item name={[idx, "unit"]} style={{ marginBottom: 0 }}>
        <InputNumber min={0} style={cellNum} onChange={onChange} />
      </Form.Item>

      <Form.Item
        name={[idx, "unitName"]}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Required" }]}
        initialValue="Cartons"
      >
        <Select options={unitNames} />
      </Form.Item>

      <Form.Item name={[idx, "chargePerUnit"]} style={{ marginBottom: 0 }}>
        <InputNumber min={0} style={cellNum} onChange={onChange} />
      </Form.Item>

      <Form.Item name={[idx, "amount"]} style={{ marginBottom: 0 }}>
        <Input readOnly className="text-right" placeholder="0.00" />
      </Form.Item>

      <Form.Item
        name={[idx, "currency"]}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Required" }]}
        initialValue="BDT"
      >
        <Select options={currencies} onChange={onChange} />
      </Form.Item>

      <Form.Item name={[idx, "exRate"]} style={{ marginBottom: 0 }}>
        <InputNumber min={0} style={cellNum} onChange={onChange} defaultValue={1} />
      </Form.Item>

      <Form.Item name={[idx, "exAmount"]} style={{ marginBottom: 0 }}>
        <Input readOnly className="text-right" placeholder="0.00" />
      </Form.Item>

      <Button
        danger
        icon={<DeleteOutlined />}
        onClick={() => remove(idx)}
        style={{ borderRadius: 2 }}
      />
    </div>
  );
};

/* ---------------------- Helpers ---------------------- */
const n = (v) => (typeof v === "number" && !Number.isNaN(v) ? v : 0);
const m2 = (x) => (Number.isFinite(+x) ? (+x).toFixed(2) : "0.00");

/* ===========================
   Main Component
   =========================== */
export default function AddDebitNote() {
  const [form] = Form.useForm();

  // options
  const unitNames = useMemo(
    () => ["Cartons", "Kg", "CBM", "Pcs"].map((x) => ({ label: x, value: x })),
    []
  );
  const currencies = useMemo(
    () => ["BDT", "USD", "EUR", "INR"].map((x) => ({ label: x, value: x })),
    []
  );
  const accountHeads = useMemo(
    () =>
      ["Select/None", "Freight", "Handling", "Documentation", "Other"].map(
        (x) => ({ label: x, value: x })
      ),
    []
  );
  const parties = useMemo(
    () => [
      { label: "— Select/None Shipper —", value: "" },
      { label: "TEX ZONE KNITWEAR LTD.", value: "TEX ZONE KNITWEAR LTD." },
      { label: "LINIAGE Logistics", value: "LINIAGE Logistics" },
      { label: "Consignee A", value: "Consignee A" },
      { label: "Agent X", value: "Agent X" },
    ],
    []
  );
  const banks = useMemo(
    () => [
      { label: "— Select/None —", value: "" },
      { label: "Eastern Bank PLC", value: "Eastern Bank PLC" },
      { label: "City Bank", value: "City Bank" },
    ],
    []
  );
  const staff = useMemo(
    () => [
      { label: "— Select/None —", value: "" },
      { label: "NZN Supply Chain Solutions Ltd.", value: "NZN Supply Chain Solutions Ltd." },
      { label: "User A", value: "User A" },
      { label: "User B", value: "User B" },
    ],
    []
  );

  // calculator
  const calcList = useCallback(
    (key) => {
      const items = form.getFieldValue(key) || [];
      const updated = items.map((it) => {
        const unit = n(it?.unit);
        const cpu = n(it?.chargePerUnit);
        const rate = it?.exRate === 0 ? 0 : n(it?.exRate) || 1;
        const amount = unit * cpu;
        const ex = amount * rate;
        return { ...it, amount: m2(amount), exAmount: m2(ex) };
      });
      form.setFieldsValue({ [key]: updated });
    },
    [form]
  );

  const submit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      console.log("SUBMIT:", values);
    } catch {}
  }, [form]);

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: 10,
      }}
    >
      {/* Top Teal Bar */}
   

      {/* Outer bordered card to match screenshot */}
      <Card
        
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            revenueItems: [
              {
                unit: 0,
                unitName: "Cartons",
                chargePerUnit: 0,
                currency: "BDT",
                exRate: 1,
                amount: "0.00",
                exAmount: "0.00",
              },
            ],
            deductionItems: [],
            status: "Draft",
          }}
          onValuesChange={(chg, all) => {
            if ("revenueItems" in chg) calcList("revenueItems");
            if ("deductionItems" in chg) calcList("deductionItems");
          }}
        >
          {/* --------- Top Filters Row (Date + big Ref box right) --------- */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                columnGap: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: C.label }}>Date</Text>
              <Form.Item name="date" style={{ margin: 0 }} rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} format="D MMM, YYYY" />
              </Form.Item>
            </div>

            <Form.Item name="ref" style={{ margin: 0 }}>
              <Input placeholder="" />
            </Form.Item>
          </div>

          {/* HBL / MBL row */}
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 10, marginTop: 10 }}>
            <Text style={{ color: C.label }}>HBL / MBL</Text>
            <Form.Item name="hblMbl" style={{ margin: 0 }}>
              <Radio.Group>
                <Space size="large">
                  <Radio value="HBL">HBL</Radio>
                  <Radio value="1st MBL">1st MBL</Radio>
                  <Radio value="2nd MBL">2nd MBL</Radio>
                  <Radio value="3rd BL">3rd BL</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "120px 460px", gap: 10 }}>
            <div />
            <Form.Item name="hbl" style={{ marginTop: -4 }}>
              <Select
                placeholder="(→ Select/None HBL ←)"
                options={[
                  { label: "ES#25000001", value: "ES#25000001" },
                  { label: "ES#25000002", value: "ES#25000002" },
                ]}
                allowClear
              />
            </Form.Item>
          </div>

          {/* Bill to Party */}
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 10 }}>
            <Text style={{ color: C.label }}>Bill to Party</Text>
            <Form.Item name="billTo" style={{ marginTop: -6 }}>
              <Radio.Group>
                <Space size="large">
                  <Radio value="Shipper">Shipper</Radio>
                  <Radio value="Consignee">Consignee</Radio>
                  <Radio value="Agent">Agent</Radio>
                  <Radio value="3rd Party">3rd Party</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Party Select */}
          <div style={{ display: "grid", gridTemplateColumns: "120px 520px", gap: 10 }}>
            <Text style={{ color: C.label }}>Consignee</Text>
            <Form.Item name="billPartyName" style={{ marginTop: -6 }}>
              <Select options={parties} />
            </Form.Item>
          </div>

          {/* Share Type + Pct */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 520px 80px 160px",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: C.label }}>Share Type</Text>
            <Form.Item name="shareType" style={{ marginTop: -6 }}>
              <Select
                options={[
                  { label: "— Select/None —", value: "" },
                  { label: "Company", value: "Company" },
                  { label: "Agent", value: "Agent" },
                  { label: "Vendor", value: "Vendor" },
                ]}
              />
            </Form.Item>
            <Text style={{ textAlign: "right", color: C.label }}>Pct. (%)</Text>
            <Form.Item name="pct" style={{ marginTop: -6 }}>
              <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {/* Bank */}
          <div style={{ display: "grid", gridTemplateColumns: "120px 520px", gap: 10 }}>
            <Text style={{ color: C.label }}>Bank</Text>
            <Form.Item name="bank" style={{ marginTop: -6 }}>
              <Select options={banks} />
            </Form.Item>
          </div>

          <Divider style={{ margin: "8px 0 12px" }} />

          {/* ---------- REVENUE ITEMS ---------- */}
          <div
            style={{
              background: C.headBg,
              color: C.label,
              fontWeight: 600,
              padding: "6px 10px",
              border: `1px solid ${C.border}`,
              borderBottom: "none",
            }}
          >
            REVENUE ITEMS
          </div>

          <div style={{ border: `1px solid ${C.border}`, borderTop: "none", paddingBottom: 8 }}>
            <div style={headerRowStyle}>
              <Text>Account Head</Text>
              <Text style={{ textAlign: "right" }}>Unit</Text>
              <Text>Unit Name</Text>
              <Text style={{ textAlign: "right" }}>Charge/ Unit</Text>
              <Text style={{ textAlign: "right" }}>Amount</Text>
              <Text>Currency</Text>
              <Text style={{ textAlign: "right" }}>Exchange Rate</Text>
              <Text style={{ textAlign: "right" }}>Exchange Amount</Text>
              <Text>Action</Text>
            </div>

            <Form.List name="revenueItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((f) => (
                    <DynamicItem
                      key={f.key}
                      idx={f.name}
                      remove={remove}
                      listKey="revenueItems"
                      onCalc={calcList}
                      accountHeads={accountHeads}
                      unitNames={unitNames}
                      currencies={currencies}
                    />
                  ))}

                  <div style={{ paddingLeft: 10 }}>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() =>
                        add({
                          unit: 0,
                          unitName: "Cartons",
                          chargePerUnit: 0,
                          currency: "BDT",
                          exRate: 1,
                          amount: "0.00",
                          exAmount: "0.00",
                        })
                      }
                      style={{
                        background: C.addGreen,
                        color: "#fff",
                        borderColor: C.addGreen,
                        borderRadius: 3,
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = C.addGreenHover)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = C.addGreen)
                      }
                    >
                      Add Item
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </div>

          {/* ---------- DEDUCTION ITEMS ---------- */}
          <div
            style={{
              marginTop: 14,
              background: C.headBg,
              color: C.label,
              fontWeight: 600,
              padding: "6px 10px",
              border: `1px solid ${C.border}`,
              borderBottom: "none",
            }}
          >
            DEDUCTION ITEMS
          </div>

          <div style={{ border: `1px solid ${C.border}`, borderTop: "none", paddingBottom: 8 }}>
            <div style={headerRowStyle}>
              <Text>Account Head</Text>
              <Text style={{ textAlign: "right" }}>Unit</Text>
              <Text>Unit Name</Text>
              <Text style={{ textAlign: "right" }}>Charge/ Unit</Text>
              <Text style={{ textAlign: "right" }}>Amount</Text>
              <Text>Currency</Text>
              <Text style={{ textAlign: "right" }}>Exchange Rate</Text>
              <Text style={{ textAlign: "right" }}>Exchange Amount</Text>
              <Text>Action</Text>
            </div>

            <Form.List name="deductionItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((f) => (
                    <DynamicItem
                      key={f.key}
                      idx={f.name}
                      remove={remove}
                      listKey="deductionItems"
                      onCalc={calcList}
                      accountHeads={accountHeads}
                      unitNames={unitNames}
                      currencies={currencies}
                    />
                  ))}

                  <div style={{ paddingLeft: 10 }}>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() =>
                        add({
                          unit: 0,
                          unitName: "Cartons",
                          chargePerUnit: 0,
                          currency: "BDT",
                          exRate: 1,
                          amount: "0.00",
                          exAmount: "0.00",
                        })
                      }
                      style={{
                        background: C.addGreen,
                        color: "#fff",
                        borderColor: C.addGreen,
                        borderRadius: 3,
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = C.addGreenHover)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = C.addGreen)
                      }
                    >
                      Add Item
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </div>

          {/* ---------- Footer ---------- */}
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "120px 1fr", gap: 10 }}>
            <Text style={{ color: C.label }}>Remark</Text>
            <Form.Item name="remark" style={{ marginTop: -6 }}>
              <TextArea rows={3} />
            </Form.Item>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 320px 120px 220px",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox />
              <Text style={{ fontSize: 12, color: "#333" }}>
                ATTACHMENT (NOTE: IF YOU REMOVE THIS, IT WILL BE PERMANENTLY DELETED)
              </Text>
              <Form.Item name="attachment" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList} style={{ margin: 0 }}>
                <Upload beforeUpload={() => false} multiple>
                  <Button icon={<UploadOutlined />}>Browse</Button>
                </Upload>
              </Form.Item>
            </div>

            <Text style={{ color: C.label, textAlign: "right" }}>Prepared By</Text>
            <Form.Item name="preparedBy" style={{ marginTop: -6 }}>
              <Select options={staff} />
            </Form.Item>

            <div />
            <div />

            <Text style={{ color: C.label, textAlign: "right" }}>Checked By</Text>
            <Form.Item name="checkedBy" style={{ marginTop: -6 }}>
              <Select options={staff} />
            </Form.Item>

            <div />
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Form.Item name="status" style={{ margin: 0 }}>
                <Radio.Group>
                  <Radio value="Draft">Draft</Radio>
                  <Radio value="Final">Final</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          {/* bottom line: required + submit */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderTop: `1px solid ${C.border}`,
              paddingTop: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: C.requiredNote, fontSize: 12 }}>* Required Fields</Text>

            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <Button
                type="primary"
                onClick={submit}
                style={{
                  background: C.submitBlue,
                  borderColor: C.submitBlue,
                  borderRadius: 3,
                  padding: "0 18px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = C.submitBlueHover)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = C.submitBlue)
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}
