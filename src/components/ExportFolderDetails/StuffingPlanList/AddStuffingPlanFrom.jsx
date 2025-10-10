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
  Typography,
} from "antd";
import {
  EditOutlined,
  CloseSquareOutlined,
  CheckOutlined,
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

  // single editable row to match screenshot
  const [row, setRow] = useState({
    bookingNo: "",
    cntrType: "",
    cntrNo: "",
    sealNo: "",
    po: "",
    style: "",
    color: "",
    so: "",
    totalCarton: 0,
    pkg: 0,
    receiveCarton: 0,
    cbm: 0,
    gwt: 0,
  });

  const balanceCarton = useMemo(
    () => (Number(row.totalCarton) || 0) - (Number(row.receiveCarton) || 0),
    [row.totalCarton, row.receiveCarton]
  );

  const onSubmit = (values) => {
    const payload = {
      ...values,
      date: values.date?.format("YYYY-MM-DD"),
      line: { ...row, balanceCarton },
      totals: {
        receiveCarton: row.receiveCarton || 0,
        balanceCarton,
        cbm: row.cbm || 0,
        gwt: row.gwt || 0,
      },
    };
    console.log("SUBMIT >>>", payload);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 4 }}>
      {/* Header */}
      <div
        style={{
          background: "#06b6d4",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <EditOutlined />
          <strong>Add Stuffing Package</strong>
        </div>
        <Button
          icon={<CloseSquareOutlined />}
          onClick={() => navigate(-1)}
          style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none" }}
        >
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
        {/* Top two-column form */}
        <Row gutter={[16, 8]}>
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

        {/* Light-blue header row */}
        <div
          style={{
            background: "#e6f7ff",
            borderTop: "1px solid #dbeafe",
            borderBottom: "1px solid #dbeafe",
            padding: "6px 8px",
            fontWeight: 600,
            display: "grid",
            gridTemplateColumns:
              "130px 130px 140px 120px 100px 110px 110px 80px 120px 100px 140px 140px 120px 120px",
            columnGap: 8,
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
        </div>

        {/* Editable row */}
        <div
          style={{
            padding: "8px 8px",
            display: "grid",
            gridTemplateColumns:
              "130px 130px 140px 120px 100px 110px 110px 80px 120px 100px 140px 140px 120px 120px",
            columnGap: 8,
            alignItems: "center",
          }}
        >
          <Select
            options={bookingOptions}
            value={row.bookingNo}
            onChange={(v) => setRow({ ...row, bookingNo: v })}
          />
          <Select
            options={cntrTypes}
            value={row.cntrType}
            onChange={(v) => setRow({ ...row, cntrType: v })}
          />
          <Input
            placeholder="Container No."
            value={row.cntrNo}
            onChange={(e) => setRow({ ...row, cntrNo: e.target.value })}
          />
          <Input
            placeholder="Seal No."
            value={row.sealNo}
            onChange={(e) => setRow({ ...row, sealNo: e.target.value })}
          />
          <Input value={row.po} onChange={(e) => setRow({ ...row, po: e.target.value })} />
          <Input
            value={row.style}
            onChange={(e) => setRow({ ...row, style: e.target.value })}
          />
          <Input
            value={row.color}
            onChange={(e) => setRow({ ...row, color: e.target.value })}
          />
          <Input value={row.so} onChange={(e) => setRow({ ...row, so: e.target.value })} />
          <InputNumber
            min={0}
            value={row.totalCarton}
            onChange={(v) => setRow({ ...row, totalCarton: v || 0 })}
            style={{ width: "100%" }}
          />
          <InputNumber
            min={0}
            value={row.pkg}
            onChange={(v) => setRow({ ...row, pkg: v || 0 })}
            style={{ width: "100%" }}
          />
          <InputNumber
            min={0}
            value={row.receiveCarton}
            onChange={(v) => setRow({ ...row, receiveCarton: v || 0 })}
            style={{ width: "100%" }}
          />
          <InputNumber value={balanceCarton} disabled style={{ width: "100%" }} />
          <InputNumber
            min={0}
            value={row.cbm}
            onChange={(v) => setRow({ ...row, cbm: v || 0 })}
            style={{ width: "100%" }}
          />
          <InputNumber
            min={0}
            value={row.gwt}
            onChange={(v) => setRow({ ...row, gwt: v || 0 })}
            style={{ width: "100%" }}
          />
        </div>

        {/* Summary row (zeros like screenshot, disabled) */}
        <div
          style={{
            borderTop: "1px solid #dbeafe",
            padding: "8px 8px",
            display: "grid",
            gridTemplateColumns:
              "1068px 140px 120px", // spacer + CBM + GWT
            columnGap: 8,
            alignItems: "center",
          }}
        >
          <div />
          <InputNumber value={row.cbm || 0} disabled style={{ width: "100%" }} />
          <InputNumber value={row.gwt || 0} disabled style={{ width: "100%" }} />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e5e7eb",
            padding: 8,
          }}
        >
          <Text type="secondary">* Required Fields</Text>
          <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
