import React, { useState } from "react";
import {
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Button,
  InputNumber,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

const customers = [
  { label: "(-- Select/None --)", value: "" },
  { label: "ABC Company", value: "abc" },
  { label: "XYZ Traders", value: "xyz" },
];

const branches = [
  { label: "(-- Select/None --)", value: "" },
  { label: "Banani", value: "banani" },
  { label: "Dhanmondi", value: "dhanmondi" },
];

const salesTypes = [
  { label: "(-- Select/None --)", value: "" },
  { label: "Cash Sales", value: "cash" },
  { label: "Credit Sales", value: "credit" },
];

const employees = [
  { label: "(-- Select/None --)", value: "" },
  { label: "Saiful Islam", value: "saiful" },
  { label: "Mahfuzunnabi", value: "mahfuz" },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Electronics", value: "elec" },
  { label: "Stationary", value: "stat" },
];

const products = [
  { label: "(-- Select/None --)", value: "" },
  { label: "P-001 | Monitor", value: "p1" },
  { label: "P-002 | Mouse", value: "p2" },
];

const units = [
  { label: "Cartons", value: "cartons" },
  { label: "Pcs", value: "pcs" },
];

const currencies = [
  { label: "BDT", value: "bdt" },
  { label: "USD", value: "usd" },
];

const receivers = [
  { label: "(-- Select/None --)", value: "" },
  { label: "Main Store", value: "store" },
  { label: "Accounts Dept.", value: "acc" },
];

const receiveBy = [
  { label: "Cash", value: "cash" },
  { label: "Bank", value: "bank" },
];

const ReceiveVoucherForm = () => {
  // header
  const [customer, setCustomer] = useState("");
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState(dayjs("2025-11-05"));
  const [salesType, setSalesType] = useState("");
  const [employee, setEmployee] = useState("");
  const [partyDetails, setPartyDetails] = useState("");

  // item entry
  const [rowCategory, setRowCategory] = useState("all");
  const [rowProduct, setRowProduct] = useState("");
  const [rowDesc, setRowDesc] = useState("");
  const [rowQty, setRowQty] = useState(0);
  const [rowUnit, setRowUnit] = useState("cartons");
  const [rowPrice, setRowPrice] = useState(0);
  const [rowCurr, setRowCurr] = useState("bdt");
  const [rowRemark, setRowRemark] = useState("");

  const [items, setItems] = useState([]);
  const [receiveTo, setReceiveTo] = useState("");
  const [receiveByVal, setReceiveByVal] = useState("cash");
  const [note, setNote] = useState("");
  const [attach, setAttach] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [prevDue, setPrevDue] = useState(0);

  const lineAmount = Number(rowQty || 0) * Number(rowPrice || 0);

  const handleAddItem = () => {
    if (!rowProduct) return;
    const newItem = {
      id: Date.now(),
      category: categories.find((c) => c.value === rowCategory)?.label || "",
      product: products.find((p) => p.value === rowProduct)?.label || "",
      description: rowDesc,
      quantity: Number(rowQty || 0),
      unit: units.find((u) => u.value === rowUnit)?.label || "",
      price: Number(rowPrice || 0),
      amount: lineAmount,
      remark: rowRemark,
    };
    setItems((prev) => [...prev, newItem]);
    setRowProduct("");
    setRowDesc("");
    setRowQty(0);
    setRowPrice(0);
    setRowRemark("");
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const subTotal = items.reduce((sum, i) => sum + i.amount, 0);
  const grandTotal = subTotal;
  const dueAmount = grandTotal - Number(paidAmount || 0);

  const handleSubmit = () => {
    const payload = {
      customer,
      branch,
      date,
      partyDetails,
      salesType,
      employee,
      items,
      receiveTo,
      receiveBy: receiveByVal,
      note,
      subTotal,
      grandTotal,
      paidAmount,
      dueAmount,
      prevDue,
      attach,
    };
    console.log("submit:", payload);
  };

  return (
    <div
      style={{
        border: "1px solid #bae6fd",
        background: "#fff",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
     

      {/* top form */}
      <div style={{ padding: 14, background: "#f8fafc" }}>
        <Row gutter={12}>
          <Col span={6}>
            <div style={{ fontSize: 12, marginBottom: 4, color: "#0f172a" }}>
              Customer *
            </div>
            <Select
              value={customer}
              onChange={setCustomer}
              style={{ width: "100%" }}
              options={customers}
            />
          </Col>
          <Col span={6}>
            <div style={{ fontSize: 12, marginBottom: 4, color: "#0f172a" }}>
              Branch
            </div>
            <Select
              value={branch}
              onChange={setBranch}
              style={{ width: "100%" }}
              options={branches}
            />
          </Col>
          <Col span={6}>
            <div style={{ fontSize: 12, marginBottom: 4, color: "#0f172a" }}>
              Date
            </div>
            <DatePicker
              value={date}
              onChange={setDate}
              format="DD MMMM, YYYY"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6}>
            <div style={{ fontSize: 12, marginBottom: 4, color: "#0f172a" }}>
              Employee
            </div>
            <Select
              value={employee}
              onChange={setEmployee}
              style={{ width: "100%" }}
              options={employees}
            />
          </Col>
        </Row>

        <Row gutter={12} style={{ marginTop: 10 }}>
          <Col span={12}>
            <div style={{ fontSize: 12, marginBottom: 4, color: "#0f172a" }}>
              Party Details
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <TextArea
                rows={3}
                value={partyDetails}
                onChange={(e) => setPartyDetails(e.target.value)}
              />
              <Button icon={<EditOutlined />} />
            </div>
          </Col>
          <Col span={6}>
            <div style={{ fontSize: 12, marginBottom: 4, color: "#0f172a" }}>
              Sales Type
            </div>
            <Select
              value={salesType}
              onChange={setSalesType}
              style={{ width: "100%" }}
              options={salesTypes}
            />
          </Col>
          <Col span={6}></Col>
        </Row>
      </div>

      {/* item entry header */}
      <div
        style={{
          background: "#0284c7",
          color: "#fff",
          display: "grid",
          gridTemplateColumns:
            "160px 1fr 1.2fr 160px 160px 140px 110px",
          fontSize: 12,
          fontWeight: 600,
          alignItems: "center",
        }}
      >
        <div style={{ padding: "6px 8px" }}>Category / Stock</div>
        <div style={{ padding: "6px 8px" }}>Product / Code</div>
        <div style={{ padding: "6px 8px" }}>Description</div>
        <div style={{ padding: "6px 8px" }}>Quantity</div>
        <div style={{ padding: "6px 8px" }}>Price</div>
        <div style={{ padding: "6px 8px" }}>Total Amount</div>
        <div style={{ padding: "6px 8px", textAlign: "center" }}>Action</div>
      </div>

      {/* item entry row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "160px 1fr 1.2fr 160px 160px 140px 110px",
          borderBottom: "1px solid #e2e8f0",
          background: "#fff",
        }}
      >
        {/* category */}
        <div style={{ padding: 6 }}>
          <Select
            value={rowCategory}
            onChange={setRowCategory}
            options={categories}
            style={{ width: "100%" }}
            size="small"
          />
        </div>
        {/* product */}
        <div style={{ padding: 6 }}>
          <Select
            value={rowProduct}
            onChange={setRowProduct}
            options={products}
            style={{ width: "100%" }}
            size="small"
            showSearch
            placeholder="(-- Select/None --)"
          />
          <Input
            size="small"
            placeholder="Code"
            style={{ marginTop: 4 }}
            prefix={<span style={{ fontSize: 10 }}>🔍</span>}
          />
        </div>
        {/* description */}
        <div style={{ padding: 6 }}>
          <TextArea
            rows={2}
            value={rowDesc}
            onChange={(e) => setRowDesc(e.target.value)}
          />
        </div>
        {/* qty */}
        <div style={{ padding: 6, display: "flex", gap: 4 }}>
          <InputNumber
            min={0}
            value={rowQty}
            onChange={setRowQty}
            size="small"
            style={{ width: "50%" }}
          />
          <Select
            value={rowUnit}
            onChange={setRowUnit}
            options={units}
            size="small"
            style={{ width: "50%" }}
          />
        </div>
        {/* price */}
        <div style={{ padding: 6, display: "flex", gap: 4 }}>
          <InputNumber
            min={0}
            value={rowPrice}
            onChange={setRowPrice}
            size="small"
            style={{ width: "50%" }}
          />
          <Select
            value={rowCurr}
            onChange={setRowCurr}
            options={currencies}
            size="small"
            style={{ width: "50%" }}
          />
        </div>
        {/* total */}
        <div style={{ padding: 6 }}>
          <InputNumber
            value={lineAmount}
            readOnly
            size="small"
            style={{ width: "100%" }}
          />
          <Input
            size="small"
            placeholder="Remark"
            value={rowRemark}
            onChange={(e) => setRowRemark(e.target.value)}
            style={{ marginTop: 4 }}
          />
        </div>
        {/* action */}
        <div
          style={{
            padding: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            onClick={handleAddItem}
            style={{ background: "#0ea5e9", border: "none" }}
          >
            Add
          </Button>
        </div>
      </div>

      {/* items table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "70px 160px 1fr 1.2fr 110px 110px 110px 1fr 90px",
          background: "#0f98d1",
          color: "#fff",
          fontWeight: 600,
          fontSize: 12,
        }}
      >
        <div style={{ padding: "5px 6px" }}>S/L No.</div>
        <div style={{ padding: "5px 6px" }}>Category</div>
        <div style={{ padding: "5px 6px" }}>Code - Product</div>
        <div style={{ padding: "5px 6px" }}>Description</div>
        <div style={{ padding: "5px 6px", textAlign: "right" }}>Quantity</div>
        <div style={{ padding: "5px 6px", textAlign: "right" }}>Price</div>
        <div style={{ padding: "5px 6px", textAlign: "right" }}>Amount</div>
        <div style={{ padding: "5px 6px" }}>Remark</div>
        <div style={{ padding: "5px 6px", textAlign: "center" }}>Action</div>
      </div>

      {/* items list */}
      {items.length === 0 ? (
        <div style={{ padding: 12, fontSize: 12 }}>No data available.</div>
      ) : (
        items.map((it, idx) => (
          <div
            key={it.id}
            style={{
              display: "grid",
              gridTemplateColumns:
                "70px 160px 1fr 1.2fr 110px 110px 110px 1fr 90px",
              borderBottom: "1px solid #e2e8f0",
              fontSize: 12,
              background: "#fff",
            }}
          >
            <div style={{ padding: "4px 6px" }}>{idx + 1}</div>
            <div style={{ padding: "4px 6px" }}>{it.category}</div>
            <div style={{ padding: "4px 6px" }}>{it.product}</div>
            <div style={{ padding: "4px 6px" }}>{it.description}</div>
            <div style={{ padding: "4px 6px", textAlign: "right" }}>
              {it.quantity} {it.unit}
            </div>
            <div style={{ padding: "4px 6px", textAlign: "right" }}>
              {it.price.toFixed(2)}
            </div>
            <div style={{ padding: "4px 6px", textAlign: "right" }}>
              {it.amount.toFixed(2)}
            </div>
            <div style={{ padding: "4px 6px" }}>{it.remark}</div>
            <div style={{ padding: "4px 6px", textAlign: "center" }}>
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(it.id)}
              />
            </div>
          </div>
        ))
      )}

      {/* total row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "70px 160px 1fr 1.2fr 110px 110px 110px 1fr 90px",
          background: "#e0f2fe",
          fontWeight: 600,
        }}
      >
        <div />
        <div />
        <div />
        <div style={{ textAlign: "right", padding: "4px 6px" }}>Total:</div>
        <div />
        <div />
        <div style={{ textAlign: "right", padding: "4px 6px" }}>
          {subTotal.toFixed(2)}
        </div>
        <div />
        <div />
      </div>

      {/* bottom section */}
      <div style={{ padding: 14, background: "#fff" }}>
        <Row gutter={12}>
          <Col span={12}>
            <div style={{ fontSize: 12, marginBottom: 4 }}>Note</div>
            <TextArea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div style={{ marginTop: 12 }}>
              <Checkbox
                checked={attach}
                onChange={(e) => setAttach(e.target.checked)}
              >
                ATTACHMENT FILES (NOTE: IF YOU REMOVE THIS, IT WILL BE
                PERMANENTLY DELETED.)
              </Checkbox>
            </div>
          </Col>
          <Col span={12}>
            <Row gutter={8}>
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>
                  Receive To*
                </div>
                <Select
                  value={receiveTo}
                  onChange={setReceiveTo}
                  style={{ width: "100%" }}
                  options={receivers}
                />
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>
                  Receive By*
                </div>
                <Select
                  value={receiveByVal}
                  onChange={setReceiveByVal}
                  style={{ width: "100%" }}
                  options={receiveBy}
                />
              </Col>
            </Row>

            <Row gutter={8} style={{ marginTop: 8 }}>
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Sub-Total</div>
                <InputNumber
                  value={subTotal}
                  readOnly
                  style={{ width: "100%" }}
                  formatter={(v) => Number(v).toFixed(2)}
                />
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Grand Total</div>
                <InputNumber
                  value={grandTotal}
                  readOnly
                  style={{ width: "100%" }}
                  formatter={(v) => Number(v).toFixed(2)}
                />
              </Col>
            </Row>

            <Row gutter={8} style={{ marginTop: 8 }}>
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Paid Amount</div>
                <InputNumber
                  value={paidAmount}
                  onChange={setPaidAmount}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Due Amount</div>
                <InputNumber
                  value={dueAmount}
                  readOnly
                  style={{ width: "100%" }}
                  formatter={(v) => Number(v).toFixed(2)}
                />
              </Col>
            </Row>

            <Row gutter={8} style={{ marginTop: 8 }}>
              <Col span={12} />
              <Col span={12}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>
                  Previous Due Amount
                </div>
                <InputNumber
                  value={prevDue}
                  onChange={setPrevDue}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 14px 14px",
          background: "#fff",
        }}
      >
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={handleSubmit}
          style={{ background: "#0ea5e9", border: "none" }}
        >
          Submit
        </Button>
      </div>

      <div style={{ fontSize: 11, color: "#64748b", padding: "0 14px 10px" }}>
        * Required Fields
      </div>
    </div>
  );
};

export default ReceiveVoucherForm;
