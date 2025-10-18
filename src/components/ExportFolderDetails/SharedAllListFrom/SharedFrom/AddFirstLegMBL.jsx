import React, { useMemo } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import {
  BorderOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

export default function AddFirstLegMBL() {
  const [form] = Form.useForm();

  // Palette (inline only)
  const teal = "#00aeb7";
  const cyanLine = "#0bb7c1";
  const tableHeadBg = "#e8f8fa";
  const border = "#cfe7ea";

  // Mock options
  const simpleOpts = (arr) => arr.map((x) => ({ label: x, value: x }));
  const carriers = useMemo(() => simpleOpts(["— Select/None —","Qatar Airways","Emirates","Turkish Airlines"]),[]);
  const agents = useMemo(() => simpleOpts(["— Select/None —","Agent X","Agent Y"]),[]);
  const ports  = useMemo(() => simpleOpts(["— Select/None —","DAC","CGP","SIN","DXB","LHR"]),[]);
  const weights = useMemo(() => simpleOpts(["— Select/None —","KG","LB"]),[]);
  const hawbs   = useMemo(() => simpleOpts(["None selected","HAWB-001","HAWB-002"]),[]);

  const submit = async () => {
    try {
      const values = await form.validateFields();
      console.log("SUBMIT:", values);
      message.success("Submitted");
    } catch (e) {
      // validation errors auto-shown
    }
  };

  return (
    <div style={{ background: "#f7fbfc", minHeight: "100vh", padding: 10 }}>
     
      {/* Outer card */}
      <Card
        
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: "Opened",
            routes: [
              {
                flightNo: "",
                from: undefined,
                to: undefined,
                etd: null,
                eta: null,
              },
            ],
          }}
        >
          <Row gutter={[16, 8]}>
            {/* LEFT COLUMN */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Date *"
                name="date"
                rules={[{ required: true, message: "Date is required" }]}
              >
                <DatePicker style={{ width: "100%" }} format="D MMMM, YYYY" />
              </Form.Item>

              <Form.Item label="Carrier" name="carrier">
                <Select options={carriers} />
              </Form.Item>

              <Form.Item label="Destination Agent" name="destAgent">
                <Select options={agents} />
              </Form.Item>

              <Form.Item label="POL" name="pol">
                <Select options={ports} />
              </Form.Item>

              <Form.Item label="ETD Date" name="etd">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="Quantity" name="qty">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label=" " colon={false} name="qtyUom">
                    <Select options={weights} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="Chargeable Weight" name="chgWt">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label=" " colon={false} name="chgWtUom">
                    <Select options={weights} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="HAWB" name="hawb">
                <Select options={hawbs} />
              </Form.Item>
            </Col>

            {/* RIGHT COLUMN */}
            <Col xs={24} md={12}>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="MAWB" name="mawb">
                    <Select
                      options={simpleOpts(["— Select/None —","MAWB-001","MAWB-002"])}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label=" " colon={false} name="mawbNo">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Origin Agent" name="originAgent">
                <Select options={agents} />
              </Form.Item>

              <Form.Item label="POD" name="pod">
                <Select options={ports} />
              </Form.Item>

              <Form.Item label="ETA Date" name="eta">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="Gross Weight" name="gwt">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label=" " colon={false} name="gwtUom">
                    <Select options={weights} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Remark" name="remark">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          {/* Status */}
          <Form.Item label="Status" name="status" style={{ marginTop: 4 }}>
            <Radio.Group>
              <Space size="large">
                <Radio value="Opened">Opened</Radio>
                <Radio value="Issued">Issued</Radio>
                <Radio value="Reopened">Reopened</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {/* Routing Table-like Row */}
          <div
            style={{
              background: tableHeadBg,
              border: `1px solid ${border}`,
              borderBottom: "none",
              padding: "6px 10px",
              fontWeight: 600,
              marginTop: 6,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 140px 140px 90px", gap: 8 }}>
              <span style={{ textAlign: "left" }}>Flight No.</span>
              <span>From (POL)</span>
              <span>To (POD)</span>
              <span>ETD</span>
              <span>ETA</span>
              <span style={{ textAlign: "center" }}>Action</span>
            </div>
          </div>

          <div style={{ border: `1px solid ${border}`, borderTop: "none", padding: 8 }}>
            <Form.List name="routes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...rest }) => (
                    <div
                      key={key}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "1fr 1fr 1fr 140px 140px 90px",
                        gap: 8,
                        alignItems: "center",
                        padding: "4px 2px",
                      }}
                    >
                      <Form.Item name={[name, "flightNo"]} style={{ marginBottom: 0 }}>
                        <Input placeholder="Flight No." />
                      </Form.Item>

                      <Form.Item name={[name, "from"]} style={{ marginBottom: 0 }}>
                        <Select options={ports} placeholder="— Select/None —" />
                      </Form.Item>

                      <Form.Item name={[name, "to"]} style={{ marginBottom: 0 }}>
                        <Select options={ports} placeholder="— Select/None —" />
                      </Form.Item>

                      <Form.Item name={[name, "etd"]} style={{ marginBottom: 0 }}>
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item name={[name, "eta"]} style={{ marginBottom: 0 }}>
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>

                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    icon={<PlusOutlined />}
                    style={{
                      background: "#28a745",
                      color: "#fff",
                      border: "none",
                      marginTop: 4,
                    }}
                    onClick={() => add({})}
                  >
                    Add Row
                  </Button>
                </>
              )}
            </Form.List>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              borderTop: `1px solid ${border}`,
              paddingTop: 10,
            }}
          >
            <Text style={{ color: "#6b7b7e", fontSize: 12 }}>* Required Fields</Text>
            <div style={{ marginLeft: "auto" }}>
              <Space>
                <Button>Cancel</Button>
                <Button
                  type="primary"
                  onClick={submit}
                  style={{ background: "#1b8fff", borderColor: "#1b8fff" }}
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
