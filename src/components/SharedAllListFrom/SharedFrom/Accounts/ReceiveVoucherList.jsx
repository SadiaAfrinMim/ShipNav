import React, { useState } from "react";
import {
  Select,
  DatePicker,
  Input,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const ReceiveVoucherList = () => {
  const [branch, setBranch] = useState("all");
  const [fromDate, setFromDate] = useState(dayjs("2025-10-05"));
  const [toDate, setToDate] = useState(dayjs("2025-11-05"));
  const [filterText, setFilterText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // demo data empty
  const data = []; // put rows here later

  const styles = {
    
    header: {
      background: "#0ea5e9",
      padding: "8px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "#fff",
      fontWeight: 600,
    },
    filterBar: {
      display: "flex",
      gap: 12,
      padding: "12px 16px 4px",
      alignItems: "center",
    },
    secondBar: {
      display: "flex",
      gap: 12,
      padding: "16px 16px 8px",
      alignItems: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: 4,
    },
    th: {
      background: "#f5f9fb",
      borderBottom: "1px solid #d3e3ef",
      padding: "6px 8px",
      fontWeight: 600,
      fontSize: 13,
      color: "#0f172a",
    },
    td: {
      borderBottom: "1px solid #e5edf3",
      padding: "6px 8px",
      fontSize: 13,
      color: "#374151",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "6px 16px 10px",
    },
  };

  return (
    <div >
      {/* top header */}
     

    {/* filter bar */}
<div
  style={{
    display: "flex",
    gap: 12,
    padding: "12px 16px 4px",
  }}
>
  {["Branch", "From", "To"].map((label, idx) => (
    <div
      key={label}
      style={{
        flex: 1,                     // 👈 সমান ভাগ
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span style={{ fontSize: 12, color: "#374151" }}>{label}</span>
      {label === "Branch" ? (
        <Select
          value={branch}
          onChange={setBranch}
          style={{ width: "100%" }}
          size="middle"
        >
          <Option value="all">All</Option>
          <Option value="banani">Banani</Option>
          <Option value="dhanmondi">Dhanmondi</Option>
        </Select>
      ) : label === "From" ? (
        <DatePicker
          value={fromDate}
          onChange={setFromDate}
          format="DD MMMM, YYYY"
          style={{ width: "100%" }}
        />
      ) : (
        <DatePicker
          value={toDate}
          onChange={setToDate}
          format="DD MMMM, YYYY"
          style={{ width: "100%" }}
        />
      )}
    </div>
  ))}
</div>


      {/* filter + show */}
      <div  style={styles.secondBar}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Filter:</span>
          <Input
            placeholder="Type to filter..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            prefix={<span className="anticon anticon-search" />}
            style={{ width: 220 }}
          />
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Show:</span>
          <Select
            value={pageSize}
            onChange={setPageSize}
            style={{ width: 70 }}
            size="small"
          >
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>
      </div>

      {/* table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: 70 }}>S/L No.</th>
            <th style={styles.th}>Number</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Party Name</th>
            <th style={styles.th}>Branch</th>
            <th style={styles.th}>Payment Method</th>
            <th style={styles.th}>Total Amount</th>
            <th style={styles.th}>Submitted</th>
            <th style={{ ...styles.th, width: 80 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ ...styles.td, textAlign: "center" }}>
                No data available in table
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row.id}>
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{row.number}</td>
                <td style={styles.td}>{row.date}</td>
                <td style={styles.td}>{row.partyName}</td>
                <td style={styles.td}>{row.branch}</td>
                <td style={styles.td}>{row.paymentMethod}</td>
                <td style={styles.td}>{row.totalAmount}</td>
                <td style={styles.td}>{row.submitted ? "Yes" : "No"}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  <Button size="small" type="link">
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* footer / pagination */}
      <div style={styles.footer}>
        <div style={{ fontSize: 12, color: "#4b5563" }}>
          Showing 1 to 5 entries (filtered from 0 total entries)
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {/* fake pagination like screenshot */}
          <Button
            size="small"
            disabled
            style={{ borderRadius: 0, border: "1px solid #d4e2ed" }}
          >
            ←
          </Button>
          <Button
            size="small"
            type="primary"
            style={{ borderRadius: 0, background: "#0ea5e9", border: "none" }}
          >
            1
          </Button>
          <Button
            size="small"
            disabled
            style={{ borderRadius: 0, border: "1px solid #d4e2ed" }}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveVoucherList;
