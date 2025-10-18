import React, { useCallback, useMemo } from "react";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import {
  BorderOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { TextArea } = Input;

/* ---- palette (inline only) ---- */
const C = {
  teal: "#00aeb7",
  cyan: "#0bb7c1",
  headBg: "#e8f8fa",
  border: "#cfe7ea",
  label: "#2d3f42",
  green: "#2ea44f",
  blue: "#1b8fff",
};

/* helpers */
const n = (v) => (typeof v === "number" && !Number.isNaN(v) ? v : 0);
const m2 = (x) => (Number.isFinite(+x) ? (+x).toFixed(2) : "0.00");

/* row grid like screenshot */
const gridCols =
  "220px 100px 140px 140px 120px 100px 140px 160px 70px";
const rowStyle = {
  display: "grid",
  gridTemplateColumns: gridCols,
  gap: 8,
  alignItems: "center",
};
const headRowStyle = {
  ...rowStyle,
  background: C.headBg,
  borderTop: `1px solid ${C.border}`,
  borderBottom: `1px solid ${C.border}`,
  padding: "6px 8px",
  fontWeight: 600,
  color: C.label,
};
const numInput = { width: "100%", textAlign: "right" };

/* single line item */
const LineItem = ({
  name,
  remove,
  listKey,
  onCalc,
  heads,
  units,
  currencies,
}) => {
  const recalc = () => onCalc(listKey);

  return (
    <div style={{ ...rowStyle, padding: "6px 8px" }}>
      <Form.Item
        name={[name, "accountHead"]}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Required" }]}
      >
        <Select placeholder="Select/None" options={heads} showSearch />
      </Form.Item>

      <Form.Item name={[name, "unit"]} style={{ marginBottom: 0 }}>
        <InputNumber min={0} style={numInput} onChange={recalc} />
      </Form.Item>

      <Form.Item
        name={[name, "unitName"]}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Required" }]}
      >
        <Select options={units} />
      </Form.Item>

      <Form.Item name={[name, "chargePerUnit"]} style={{ marginBottom: 0 }}>
        <InputNumber min={0} style={numInput} onChange={recalc} />
      </Form.Item>

      <Form.Item name={[name, "amount"]} style={{ marginBottom: 0 }}>
        <Input readOnly placeholder="0.00" />
      </Form.Item>

      <Form.Item
        name={[name, "currency"]}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Required" }]}
      >
        <Select options={currencies} onChange={recalc} />
      </Form.Item>

      <Form.Item name={[name, "exRate"]} style={{ marginBottom: 0 }}>
        <InputNumber min={0} style={numInput} onChange={recalc} />
      </Form.Item>

      <Form.Item name={[name, "exAmount"]} style={{ marginBottom: 0 }}>
        <Input readOnly placeholder="0.00" />
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => remove(name)}
        />
      </div>
    </div>
  );
};

export default function AddFreightInvoice() {
  const [form] = Form.useForm();

  /* options */
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
      ["Freight", "Handling", "Documentation", "Other"].map((x) => ({
        label: x,
        value: x,
      })),
    []
  );
  const parties = useMemo(
    () => [
      { label: "(~ Select/None Shipper ~)", value: "" },
      { label: "TEX ZONE KNITWEAR LTD.", value: "TEX ZONE KNITWEAR LTD." },
      { label: "Consignee A", value: "Consignee A" },
      { label: "Agent X", value: "Agent X" },
    ],
    []
  );
  const banks = useMemo(
    () => [
      { label: "(~ Select/None ~)", value: "" },
      { label: "Eastern Bank PLC", value: "Eastern Bank PLC" },
      { label: "City Bank", value: "City Bank" },
    ],
    []
  );
  const staff = useMemo(
    () => [
      { label: "(~ Select/None ~)", value: "" },
      { label: "NZN Supply Chain Solutions Ltd.", value: "NZN Supply Chain Solutions Ltd." },
      { label: "User A", value: "User A" },
      { label: "User B", value: "User B" },
    ],
    []
  );
  const houseBills = useMemo(
    () => [
      { label: "(~ Select/None ~)", value: "" },
      { label: "HBL#25000001", value: "HBL#25000001" },
      { label: "HBL#25000002", value: "HBL#25000002" },
    ],
    []
  );

  /* calculations */
  const calcList = useCallback(
    (key) => {
      const items = form.getFieldValue(key) || [];
      const upd = items.map((it) => {
        const unit = n(it?.unit);
        const cpu = n(it?.chargePerUnit);
        const rate = it?.exRate === 0 ? 0 : n(it?.exRate) || 1;
        const amount = unit * cpu;
        const ex = amount * rate;
        return { ...it, amount: m2(amount), exAmount: m2(ex) };
      });
      form.setFieldsValue({ [key]: upd });
    },
    [form]
  );

  const submit = useCallback(async () => {
    try {
      const v = await form.validateFields();
      console.log("SUBMIT:", v);
    } catch {}
  }, [form]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 10 }}>
      {/* top teal title bar */}
      <div
        style={{
          background: C.teal,
          color: "#fff",
          height: 38,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          fontWeight: 600,
        }}
      >
        <Space>
          <BorderOutlined />
          <span>Add Freight Invoice</span>
        </Space>
        <div style={{ marginLeft: "auto" }}>
          <Button
            icon={<CloseOutlined />}
            size="small"
            style={{ color: "#fff", borderColor: "#fff", background: "transparent" }}
          >
            Cancel Page
          </Button>
        </div>
      </div>

      {/* outer framed card */}
      <Card
        style={{
          marginTop: 8,
          border: `2px solid ${C.cyan}`,
          borderRadius: 3,
        }}
        bodyStyle={{ padding: 12 }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            date: null,
            billTo: "Shipper",
            status: "Draft",
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
          }}
          onValuesChange={(chg) => {
            if ("revenueItems" in chg) calcList("revenueItems");
            if ("deductionItems" in chg) calcList("deductionItems");
          }}
        >
          {/* top fields (two columns like screenshot) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 10,
            }}
          >
            <div>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date required" }]}
              >
                <DatePicker style={{ width: "100%" }} format="D MMM, YYYY" />
              </Form.Item>
              <Form.Item label="House Bill" name="hbl">
                <Select options={houseBills} allowClear />
              </Form.Item>
              <Form.Item label="Attention" name="attention">
                <Input />
              </Form.Item>
              <Form.Item label="Customer Reference" name="customerRef">
                <Input />
              </Form.Item>
              <Form.Item label="Accounts Reference" name="accountsRef">
                <Input />
              </Form.Item>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 10 }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 10 }}>
                <Text style={{ color: C.label }} />
                <Form.Item name="billPartyName" style={{ marginTop: -6 }}>
                  <Select placeholder="(~ Select/None Shipper ~)" options={parties} />
                </Form.Item>
              </div>
              <Form.Item label="Bank" name="bank">
                <Select placeholder="(~ Select/None ~)" options={banks} />
              </Form.Item>
            </div>

            <div>
              <Form.Item label="Reference / Title" name="ref">
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* REVENUE */}
          <div
            style={{
              marginTop: 6,
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
            <div style={headRowStyle}>
              <Text>Account Head</Text>
              <Text style={{ textAlign: "right" }}>Unit</Text>
              <Text>Unit Name</Text>
              <Text style={{ textAlign: "right" }}>Charge/ Unit</Text>
              <Text style={{ textAlign: "right" }}>Amount</Text>
              <Text>Currency</Text>
              <Text style={{ textAlign: "right" }}>Exchange Rate</Text>
              <Text style={{ textAlign: "right" }}>Exchange Amount</Text>
              <Text style={{ textAlign: "center" }}>Action</Text>
            </div>

            <Form.List name="revenueItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((f) => (
                    <LineItem
                      key={f.key}
                      name={f.name}
                      remove={remove}
                      listKey="revenueItems"
                      onCalc={calcList}
                      heads={accountHeads}
                      units={unitNames}
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
                        background: C.green,
                        color: "#fff",
                        border: "none",
                        borderRadius: 3,
                      }}
                    >
                      Add Item
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </div>

          {/* DEDUCTION */}
          <div
            style={{
              marginTop: 12,
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
            <div style={headRowStyle}>
              <Text>Account Head</Text>
              <Text style={{ textAlign: "right" }}>Unit</Text>
              <Text>Unit Name</Text>
              <Text style={{ textAlign: "right" }}>Charge/ Unit</Text>
              <Text style={{ textAlign: "right" }}>Amount</Text>
              <Text>Currency</Text>
              <Text style={{ textAlign: "right" }}>Exchange Rate</Text>
              <Text style={{ textAlign: "right" }}>Exchange Amount</Text>
              <Text style={{ textAlign: "center" }}>Action</Text>
            </div>

            <Form.List name="deductionItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((f) => (
                    <LineItem
                      key={f.key}
                      name={f.name}
                      remove={remove}
                      listKey="deductionItems"
                      onCalc={calcList}
                      heads={accountHeads}
                      units={unitNames}
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
                        background: C.green,
                        color: "#fff",
                        border: "none",
                        borderRadius: 3,
                      }}
                    >
                      Add Item
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </div>

          {/* footer fields */}
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "140px 1fr", gap: 10 }}>
            <Text style={{ color: C.label }}>Credit Terms</Text>
            <Form.Item name="creditTerms" style={{ marginTop: -6 }}>
              <TextArea rows={3} />
            </Form.Item>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox />
              <Text style={{ fontSize: 12 }}>
                ATTACHMENT (NOTE: IF YOU REMOVE THIS, IT WILL BE PERMANENTLY DELETED)
              </Text>
              <Form.Item
                name="attachment"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                style={{ margin: 0 }}
              >
                <Upload beforeUpload={() => false} multiple>
                  <Button icon={<UploadOutlined />}>Attach Files</Button>
                </Upload>
              </Form.Item>
            </div>

            <Text style={{ color: C.label, textAlign: "right" }}>Prepared By</Text>
            <Form.Item name="preparedBy" style={{ marginTop: -6 }}>
              <Select options={staff} />
            </Form.Item>

            <Text style={{ color: C.label, textAlign: "right" }}>Checked By</Text>
            <Form.Item name="checkedBy" style={{ marginTop: -6 }}>
              <Select options={staff} />
            </Form.Item>

            <Text style={{ color: C.label, textAlign: "right" }}>Status</Text>
            <Form.Item name="status" style={{ marginTop: -6 }}>
              <Radio.Group>
                <Radio value="Draft">Draft</Radio>
                <Radio value="Final">Final</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* bottom bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `1px solid ${C.border}`,
              paddingTop: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#6b7b7e", fontSize: 12 }}>* Required Fields</Text>

            <div style={{ marginLeft: "auto" }}>
              <Space>
                <Button>Cancel</Button>
                <Button
                  type="primary"
                  onClick={submit}
                  style={{ background: C.blue, borderColor: C.blue, borderRadius: 3, padding: "0 18px" }}
                >
                  Submit
                </Button>
              </Space>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}
