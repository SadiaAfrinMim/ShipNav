import React from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Typography,
  Divider,
  Upload,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;

export default function AddFreightInvoice() {
  const [form] = Form.useForm();

  const unitNames = ["Cartons", "Kg", "CBM", "TEU"].map((x) => ({
    label: x,
    value: x,
  }));
  const currencies = ["BDT", "USD", "EUR", "INR"].map((x) => ({
    label: x,
    value: x,
  }));
  const accountHeads = ["Freight", "Documentation", "Handling", "Other"].map(
    (x) => ({ label: x, value: x })
  );
  const staff = ["NZN Supply Chain Solutions Ltd.", "User A", "User B"].map(
    (x) => ({ label: x, value: x })
  );

  const calcRow = (row) => {
    const amount = (row.unit || 0) * (row.charge || 0);
    const exAmount = amount * (row.exRate || 1);
    return { ...row, amount, exAmount };
  };

  const onValuesChange = (_, all) => {
    ["revenueItems", "deductionItems"].forEach((k) => {
      const rows = all[k]?.map(calcRow);
      form.setFieldsValue({ [k]: rows });
    });
  };

  const money = (n) =>
    n == null || isNaN(n)
      ? "0.00"
      : n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div style={{ padding: 10 }}>
      <Card
        bordered
        bodyStyle={{ padding: 16 }}
        style={{
          borderRadius: 6,
          border: "1px solid #00b8c6",
        }}
      >
       

        <Form
          form={form}
          layout="vertical"
          size="small"
          initialValues={{
            date: dayjs(),
            revenueItems: [
              {
                accountHead: undefined,
                unit: 0,
                unitName: "Cartons",
                charge: 0,
                amount: 0,
                currency: "BDT",
                exRate: 1,
                exAmount: 0,
              },
            ],
            deductionItems: [],
          }}
          onValuesChange={onValuesChange}
        >
          {/* Header Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <Form.Item name="date" label="Date">
                <DatePicker className="w-full" format="D MMM, YYYY" />
              </Form.Item>
              <Form.Item name="hbl" label="HBL">
                <Select
                  placeholder="--Select/None--"
                  options={[
                    { label: "ES#25000005", value: "ES#25000005" },
                    { label: "ES#25000006", value: "ES#25000006" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="attention" label="Attention">
                <Input />
              </Form.Item>
              <Form.Item name="customerRef" label="Customer Reference">
                <Input />
              </Form.Item>
              <Form.Item name="accountsRef" label="Accounts Reference">
                <Input />
              </Form.Item>
              <Form.Item label="Bill To Party" name="billParty" initialValue="Shipper">
                <Radio.Group>
                  <Space>
                    <Radio value="Shipper">Shipper</Radio>
                    <Radio value="Consignee">Consignee</Radio>
                    <Radio value="Agent">Agent</Radio>
                    <Radio value="3rd Party">3rd Party</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="party" label="">
                <Select
                  placeholder="--Select/None Shipper--"
                  options={[
                    { label: "TEX ZONE KNITWEAR LTD.", value: "TEX ZONE KNITWEAR LTD." },
                    { label: "Consignee A", value: "Consignee A" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="bank" label="Bank">
                <Select
                  placeholder="--Select/None--"
                  options={[
                    { label: "Eastern Bank PLC", value: "Eastern Bank PLC" },
                    { label: "City Bank", value: "City Bank" },
                  ]}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item name="remarks" label="">
                <TextArea rows={7} />
              </Form.Item>
            </div>
          </div>

          {/* Revenue Items */}
          <Text strong>REVENUE ITEMS</Text>
          <Form.List name="revenueItems">
            {(fields, { add, remove }) => (
              <>
                <div
                  style={{
                    overflowX: "auto",
                    fontSize: 12,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "220px 100px 120px 140px 140px 120px 120px 160px 60px",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Text type="secondary">Account Head</Text>
                    <Text type="secondary">Unit</Text>
                    <Text type="secondary">Unit Name</Text>
                    <Text type="secondary">Charge/Unit</Text>
                    <Text type="secondary">Amount</Text>
                    <Text type="secondary">Currency</Text>
                    <Text type="secondary">Exchange Rate</Text>
                    <Text type="secondary">Exchange Amount</Text>
                    <Text type="secondary">Action</Text>
                  </div>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "220px 100px 120px 140px 140px 120px 120px 160px 60px",
                        gap: 6,
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "accountHead"]}
                        style={{ marginBottom: 0 }}
                      >
                        <Select options={accountHeads} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, "unit"]} style={{ marginBottom: 0 }}>
                        <InputNumber min={0} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, "unitName"]} style={{ marginBottom: 0 }}>
                        <Select options={unitNames} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, "charge"]} style={{ marginBottom: 0 }}>
                        <InputNumber min={0} />
                      </Form.Item>
                      <Form.Item noStyle shouldUpdate>
                        {() => (
                          <Input
                            readOnly
                            value={money(form.getFieldValue(["revenueItems", field.name, "amount"]))}
                          />
                        )}
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, "currency"]} style={{ marginBottom: 0 }}>
                        <Select options={currencies} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, "exRate"]} style={{ marginBottom: 0 }}>
                        <InputNumber min={0} />
                      </Form.Item>
                      <Form.Item noStyle shouldUpdate>
                        {() => (
                          <Input
                            readOnly
                            value={money(form.getFieldValue(["revenueItems", field.name, "exAmount"]))}
                          />
                        )}
                      </Form.Item>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(field.name)}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
                <Button
                  icon={<PlusOutlined />}
                  size="small"
                  style={{ marginTop: 6 }}
                  onClick={() =>
                    add({
                      unit: 0,
                      unitName: "Cartons",
                      charge: 0,
                      currency: "BDT",
                      exRate: 1,
                    })
                  }
                >
                  Add Item
                </Button>
              </>
            )}
          </Form.List>

          <Divider style={{ margin: "10px 0" }} />

          {/* Deduction Items */}
          <Text strong>DEDUCTION ITEMS</Text>
          <Form.List name="deductionItems">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "220px 100px 120px 140px 140px 120px 120px 160px 60px",
                      gap: 6,
                      alignItems: "center",
                      marginTop: 4,
                    }}
                  >
                    <Form.Item {...field} name={[field.name, "accountHead"]} style={{ marginBottom: 0 }}>
                      <Select options={accountHeads} />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, "unit"]} style={{ marginBottom: 0 }}>
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, "unitName"]} style={{ marginBottom: 0 }}>
                      <Select options={unitNames} />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, "charge"]} style={{ marginBottom: 0 }}>
                      <InputNumber min={0} />
                    </Form.Item>
                    <Input readOnly value="0.00" />
                    <Form.Item {...field} name={[field.name, "currency"]} style={{ marginBottom: 0 }}>
                      <Select options={currencies} />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, "exRate"]} style={{ marginBottom: 0 }}>
                      <InputNumber min={0} />
                    </Form.Item>
                    <Input readOnly value="0.00" />
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                      size="small"
                    />
                  </div>
                ))}
                <Button
                  icon={<PlusOutlined />}
                  size="small"
                  style={{ marginTop: 6 }}
                  onClick={() =>
                    add({
                      unit: 0,
                      unitName: "Cartons",
                      charge: 0,
                      currency: "BDT",
                      exRate: 1,
                    })
                  }
                >
                  Add Item
                </Button>
              </>
            )}
          </Form.List>

          <Divider style={{ margin: "10px 0" }} />

          {/* Footer */}
          <Form.Item name="creditTerms" label="Credit Terms">
            <TextArea rows={3} />
          </Form.Item>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              alignItems: "start",
            }}
          >
            <Form.Item name="preparedBy" label="Prepared By">
              <Select options={staff} />
            </Form.Item>
            <Form.Item name="checkedBy" label="Checked By">
              <Select options={staff} />
            </Form.Item>
            <div>
              <Checkbox checked>
                ATTACHMENT (NOTE: IF YOU REMOVE THIS, IT WILL BE PERMANENTLY
                DELETED)
              </Checkbox>
              <Upload beforeUpload={() => false} multiple>
                <Button
                  icon={<UploadOutlined />}
                  size="small"
                  style={{ marginTop: 4 }}
                >
                  Attach files
                </Button>
              </Upload>
            </div>
          </div>

          <Form.Item name="status" label="Status">
            <Radio.Group>
              <Radio value="Draft">Draft</Radio>
              <Radio value="Final">Final</Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button type="primary" size="small">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
