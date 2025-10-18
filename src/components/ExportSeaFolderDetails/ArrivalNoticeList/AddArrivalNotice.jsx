import React, { useMemo } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import {
  BorderOutlined,
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { TextArea } = Input;

export default function AddArrivalNotice() {
  const [form] = Form.useForm();

  // palette (inline only)
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const border = "#cfe7ea";
  const soft = "#e9f6f8";

  const hblOptions = useMemo(
    () => [
      { label: "(-- Select/None --)", value: "" },
      { label: "HBL#24000001", value: "HBL#24000001" },
      { label: "HBL#24000002", value: "HBL#24000002" },
    ],
    []
  );

  const cntrTypes = useMemo(
    () => ["20GP", "40GP", "40HC", "45HC"].map((x) => ({ label: x, value: x })),
    []
  );

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("SUBMIT:", values);
    } catch {
      // AntD shows validation errors automatically
    }
  };

  return (
    <div className="px-4">
      {/* Top teal header */}
     

      {/* Outer card */}
      <Card
       
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            containers: [],
          }}
        >
          {/* HBL + Date */}
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12}>
              <Form.Item label="HBL" name="hbl" rules={[{ required: true, message: "HBL is required" }]}>
                <Select options={hblOptions} showSearch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Date *" name="date" rules={[{ required: true, message: "Date is required" }]}>
                <DatePicker style={{ width: "100%" }} format="D MMMM, YYYY" />
              </Form.Item>
            </Col>
          </Row>

          {/* Remark */}
          <Form.Item label="Remark" name="remark">
            <Input />
          </Form.Item>

          {/* Notify / Consignee / Shipper (name + address each) */}
          <Row gutter={[12, 8]}>
            <Col xs={24} md={8}>
              <Form.Item label="Notify Party" name={["notify", "name"]}>
                <Input />
              </Form.Item>
              <Form.Item name={["notify", "address"]} style={{ marginTop: -6 }}>
                <TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Consignee" name={["consignee", "name"]}>
                <Input />
              </Form.Item>
              <Form.Item name={["consignee", "address"]} style={{ marginTop: -6 }}>
                <TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Shipper" name={["shipper", "name"]}>
                <Input />
              </Form.Item>
              <Form.Item name={["shipper", "address"]} style={{ marginTop: -6 }}>
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          {/* Info panel */}
          <div
            style={{
              background: soft,
              border: `1px solid ${border}`,
              borderRadius: 3,
              padding: "10px 12px",
              marginBottom: 10,
            }}
          >
            <Row gutter={[12, 4]}>
              <Col xs={24} md={12} lg={12}>
                <div style={{ lineHeight: 1.7 }}>
                  <div>HBL/ L Nos : <Text type="secondary"> </Text></div>
                  <div>POL : <Text type="secondary"> </Text></div>
                  <div>POD : <Text type="secondary"> </Text></div>
                </div>
              </Col>
              <Col xs={24} md={12} lg={12}>
                <div style={{ lineHeight: 1.7 }}>
                  <div>VSL : <Text type="secondary"> </Text></div>
                  <div>ETD : <Text type="secondary"> </Text></div>
                  <div>ETA : <Text type="secondary"> </Text></div>
                  <div>TOS : <Text type="secondary"> </Text></div>
                  <div>Carrier : <Text type="secondary"> </Text></div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Container header row */}
          <div
            style={{
              background: "#e8f8fa",
              border: `1px solid ${border}`,
              borderBottom: "none",
              padding: "6px 10px",
              fontWeight: 600,
              color: "#2d3f42",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 1.2fr 1.2fr 90px",
                gap: 8,
              }}
            >
              <span>Cntr. Type</span>
              <span>Cntr. No.</span>
              <span>Mode</span>
              <span>Volume (in)</span>
              <span>Package Quantity (in)</span>
              <span>Gross Weight (in)</span>
              <span style={{ textAlign: "center" }}>Action</span>
            </div>
          </div>

          {/* Container rows */}
          <div style={{ border: `1px solid ${border}`, borderTop: "none", padding: 8 }}>
            <Form.List name="containers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <div
                      key={key}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "1.2fr 1.2fr 1fr 1fr 1.2fr 1.2fr 90px",
                        gap: 8,
                        alignItems: "center",
                        padding: "4px 2px",
                      }}
                    >
                      <Form.Item name={[name, "type"]} style={{ marginBottom: 0 }}>
                        <Select options={cntrTypes} placeholder="Select" />
                      </Form.Item>

                      <Form.Item name={[name, "number"]} style={{ marginBottom: 0 }}>
                        <Input placeholder="Container No." />
                      </Form.Item>

                      <Form.Item name={[name, "mode"]} style={{ marginBottom: 0 }}>
                        <Select
                          placeholder="Mode"
                          options={[
                            { label: "FCL", value: "FCL" },
                            { label: "LCL", value: "LCL" },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item name={[name, "volume"]} style={{ marginBottom: 0 }}>
                        <Input placeholder="CBM" />
                      </Form.Item>

                      <Form.Item name={[name, "packageQty"]} style={{ marginBottom: 0 }}>
                        <Input placeholder="Pkgs" />
                      </Form.Item>

                      <Form.Item name={[name, "grossWt"]} style={{ marginBottom: 0 }}>
                        <Input placeholder="Kgs" />
                      </Form.Item>

                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button danger icon={<DeleteOutlined />} onClick={() => remove(name)} />
                      </div>
                    </div>
                  ))}

                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => add({})}
                    style={{
                      background: "#2ea44f",
                      color: "#fff",
                      border: "none",
                      marginTop: 4,
                    }}
                  >
                    Add Row
                  </Button>
                </>
              )}
            </Form.List>
          </div>

          {/* Footer line + Submit */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `1px solid ${border}`,
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
                  onClick={onSubmit}
                  style={{ background: "#1b8fff", borderColor: "#1b8fff", borderRadius: 3, padding: "0 18px" }}
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
