import React, { useState } from "react";
import {
  Select,
  DatePicker,
  Input,
  Button,
  InputNumber,
} from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

const partyTypes = [
  { label: "Management", value: "management" },
  { label: "Supplier", value: "supplier" },
  { label: "Staff", value: "staff" },
];

const parties = [
  { label: "Saiful Islam", value: "saiful" },
  { label: "Quazi Asif NEWAZ", value: "asif" },
  { label: "Shagufttha NEWAZ", value: "shagufta" },
  { label: "Abdul Mobin", value: "moin" },
  { label: "Mahfuzunnabi", value: "mahfuz" },
];

const paymentSources = [
  { label: "(-- Select Cash/Bank --)", value: "" },
  { label: "Petty Cash", value: "petty" },
  { label: "Bank A/C 001", value: "bank1" },
];

const branches = [
  { label: "(-- Select/None --)", value: "" },
  { label: "Banani", value: "banani" },
  { label: "Dhanmondi", value: "dhanmondi" },
];

const accountGroups = [
  { label: "All", value: "all" },
  { label: "Expense", value: "expense" },
  { label: "Salary", value: "salary" },
];

const accountNames = [
  { label: "(-- Select/None --)", value: "" },
  { label: "Fuel Expense", value: "fuel" },
  { label: "Office Rent", value: "rent" },
  { label: "TA/DA", value: "tada" },
];

const PaymentVoucherForm = () => {
  const [partyType, setPartyType] = useState("management");
  const [partyName, setPartyName] = useState();
  const [paymentFrom, setPaymentFrom] = useState();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [branch, setBranch] = useState();
  const [date, setDate] = useState(dayjs("2025-11-05"));
  const [partyDetails, setPartyDetails] = useState("");

  const [rowAccountGroup, setRowAccountGroup] = useState("all");
  const [rowAccountCode, setRowAccountCode] = useState("");
  const [rowAccountName, setRowAccountName] = useState("");
  const [rowDesc, setRowDesc] = useState("");
  const [rowAmount, setRowAmount] = useState(0);

  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (!rowAccountName || !rowAmount) return;
    const newItem = {
      id: Date.now(),
      accountGroup: accountGroups.find((a) => a.value === rowAccountGroup)?.label,
      accountCode: rowAccountCode || "",
      accountName: accountNames.find((a) => a.value === rowAccountName)?.label,
      description: rowDesc,
      amount: Number(rowAmount) || 0,
    };
    setItems((prev) => [...prev, newItem]);
    setRowAccountCode("");
    setRowDesc("");
    setRowAmount(0);
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const totalAmount = items.reduce((sum, i) => sum + i.amount, 0);

  const handleSubmit = () => {
    const payload = {
      partyType,
      partyName,
      partyDetails,
      paymentFrom,
      paymentMethod,
      branch,
      date,
      items,
      // note will be added from state if you want later
    };
    console.log("submit:", payload);
  };

  // sky palette
  const styles = {
    wrapper: { border: "1px solid #d9e8f5", background: "#fff" },
    header: {
      background: "#0ea5e9",
      padding: "8px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: { color: "#fff", fontWeight: 600, fontSize: 16 },
    miniTh: {
      background: "#0284c7",
      color: "#fff",
      fontWeight: 600,
      fontSize: 13,
      padding: "6px 8px",
      borderRight: "1px solid #0272aa",
    },
    miniTd: { padding: "6px 8px", borderRight: "1px solid #e0edf5" },
  };

  return (
    <div style={styles.wrapper}>
     
      {/* Header Form */}
      <div style={{ padding: 12 }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ padding: "4px 6px" }}>Party Type</td>
              <td style={{ padding: "4px 6px" }}>
                <Select
                  value={partyType}
                  onChange={setPartyType}
                  options={partyTypes}
                  style={{ width: 200 }}
                />
              </td>
              <td style={{ padding: "4px 6px" }}>Payment From *</td>
              <td style={{ padding: "4px 6px" }}>
                <Select
                  value={paymentFrom}
                  onChange={setPaymentFrom}
                  options={paymentSources}
                  style={{ width: 200 }}
                />
              </td>
              <td style={{ padding: "4px 6px" }}>Date</td>
              <td style={{ padding: "4px 6px" }}>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  format="DD MMMM, YYYY"
                  style={{ width: 200 }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 6px" }}>Party Name</td>
              <td style={{ padding: "4px 6px" }}>
                <Select
                  showSearch
                  placeholder="(-- Select/None --)"
                  value={partyName}
                  onChange={setPartyName}
                  optionFilterProp="label"
                  options={parties}
                  allowClear
                  style={{ width: 200 }}
                />
              </td>
              <td style={{ padding: "4px 6px" }}>Payment Method</td>
              <td style={{ padding: "4px 6px" }}>
                <Select
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={[
                    { label: "Cash", value: "Cash" },
                    { label: "Bank Transfer", value: "Bank" },
                  ]}
                  style={{ width: 200 }}
                />
              </td>
              <td style={{ padding: "4px 6px" }}>Branch</td>
              <td style={{ padding: "4px 6px" }}>
                <Select
                  placeholder="(-- Select/None --)"
                  value={branch}
                  onChange={setBranch}
                  options={branches}
                  allowClear
                  style={{ width: 200 }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 6px" }}>Party Details</td>
              <td colSpan={5} style={{ padding: "4px 6px" }}>
                <Input
                  value={partyDetails}
                  onChange={(e) => setPartyDetails(e.target.value)}
                  style={{ width: 300 }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Item Entry Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 8,
        }}
      >
        <thead>
          <tr>
            <th style={{ ...styles.miniTh, width: 140 }}>Account Group</th>
            <th style={{ ...styles.miniTh, width: 120 }}>Account Code</th>
            <th style={styles.miniTh}>Account Name</th>
            <th style={styles.miniTh}>Description</th>
            <th style={{ ...styles.miniTh, width: 120, textAlign: "right" }}>
              Amount
            </th>
            <th style={{ ...styles.miniTh, textAlign: "center", width: 120 }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.miniTd}>
              <Select
                value={rowAccountGroup}
                onChange={setRowAccountGroup}
                options={accountGroups}
                style={{ width: "100%" }}
                size="small"
              />
            </td>
            <td style={styles.miniTd}>
              <Input
                value={rowAccountCode}
                onChange={(e) => setRowAccountCode(e.target.value)}
                size="small"
              />
            </td>
            <td style={styles.miniTd}>
              <Select
                value={rowAccountName}
                onChange={setRowAccountName}
                options={accountNames}
                style={{ width: "100%" }}
                size="small"
              />
            </td>
            <td style={styles.miniTd}>
              <Input
                value={rowDesc}
                onChange={(e) => setRowDesc(e.target.value)}
                size="small"
              />
            </td>
            <td style={{ ...styles.miniTd, textAlign: "right" }}>
              <InputNumber
                min={0}
                value={rowAmount}
                onChange={setRowAmount}
                size="small"
                style={{ width: "100%" }}
              />
            </td>
            <td style={{ textAlign: "center", padding: 4 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddItem}
                size="small"
                style={{
                  background: "#0ea5e9",
                  border: "none",
                }}
              >
                Add Item
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Added Items */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 8,
        }}
      >
        <thead>
          <tr>
            <th style={{ ...styles.miniTh, width: 60 }}>S/L</th>
            <th style={{ ...styles.miniTh, width: 140 }}>Account Group</th>
            <th style={{ ...styles.miniTh, width: 120 }}>Account Code</th>
            <th style={styles.miniTh}>Account Name / Description</th>
            <th style={{ ...styles.miniTh, width: 140, textAlign: "right" }}>
              Amount Tk.
            </th>
            <th style={{ ...styles.miniTh, textAlign: "center", width: 100 }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: 8, fontSize: 12 }}>
                No item added.
              </td>
            </tr>
          ) : (
            items.map((it, idx) => (
              <tr key={it.id}>
                <td style={styles.miniTd}>{idx + 1}</td>
                <td style={styles.miniTd}>{it.accountGroup}</td>
                <td style={styles.miniTd}>{it.accountCode}</td>
                <td style={styles.miniTd}>
                  <div style={{ fontWeight: 500 }}>{it.accountName}</div>
                  {it.description && (
                    <div style={{ fontSize: 11, color: "#4b5563" }}>
                      {it.description}
                    </div>
                  )}
                </td>
                <td style={{ ...styles.miniTd, textAlign: "right" }}>
                  {it.amount.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Button danger size="small" onClick={() => handleRemove(it.id)}>
                    X
                  </Button>
                </td>
              </tr>
            ))
          )}
          <tr style={{ background: "#e2f3fb" }}>
            <td style={styles.miniTd}></td>
            <td style={styles.miniTd}></td>
            <td style={styles.miniTd}></td>
            <td style={{ ...styles.miniTd, textAlign: "right", fontWeight: 600 }}>
              Total:
            </td>
            <td style={{ ...styles.miniTd, textAlign: "right", fontWeight: 600 }}>
              {totalAmount.toFixed(2)}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Note section (added) */}
      <div style={{ padding: "10px 16px 0" }}>
        <div style={{ marginBottom: 4, fontSize: 13, color: "#0f172a" }}>
          Note
        </div>
        <TextArea rows={3} />
        <div style={{ marginTop: 6, fontSize: 11, color: "#6b7280" }}>
          * Required Fields
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 16px", textAlign: "right" }}>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={handleSubmit}
          style={{ background: "#0ea5e9", border: "none" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PaymentVoucherForm;
