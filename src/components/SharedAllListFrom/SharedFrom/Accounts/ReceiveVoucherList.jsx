import React, { useMemo, useState } from "react";
import { Select, DatePicker, Input, Button, Dropdown, Space } from "antd";
import { PlusOutlined, AlignRightOutlined, EyeOutlined, EditOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../Modal/DeleteModal";


const { Option } = Select;

const ReceiveVoucherList = () => {
  const navigate = useNavigate();

  const [branch, setBranch] = useState("all");
  const [fromDate, setFromDate] = useState(dayjs("2025-10-05"));
  const [toDate, setToDate] = useState(dayjs("2025-11-05"));
  const [filterText, setFilterText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // ✅ fake json data
  const data = [
    {
      id: 1,
      number: "RV-25000001",
      date: "2025-10-06",
      partyName: "Rahman Traders",
      branch: "Banani",
      paymentMethod: "Cash",
      totalAmount: 85000,
      submitted: true,
    },
    {
      id: 2,
      number: "RV-25000002",
      date: "2025-10-10",
      partyName: "N2N Supply Chain Solutions Ltd",
      branch: "Dhanmondi",
      paymentMethod: "Bank",
      totalAmount: 129500,
      submitted: false,
    },
    {
      id: 3,
      number: "RV-25000003",
      date: "2025-10-14",
      partyName: "Alpha Garments BD",
      branch: "Banani",
      paymentMethod: "Cheque",
      totalAmount: 45200,
      submitted: true,
    },
    {
      id: 4,
      number: "RV-25000004",
      date: "2025-10-20",
      partyName: "Metro Mart Superstore",
      branch: "Dhanmondi",
      paymentMethod: "Cash",
      totalAmount: 9800,
      submitted: false,
    },
    {
      id: 5,
      number: "RV-25000005",
      date: "2025-10-28",
      partyName: "Sunrise Electronics",
      branch: "Banani",
      paymentMethod: "Bank",
      totalAmount: 210000,
      submitted: true,
    },
  ];

  // ✅ routes (আগেরগুলার মতো)
  const handleView = (record) => {
    navigate("/accounts/view-receive-voucher", { state: record });
  };

  const handleEdit = (record) => {
    navigate("/accounts/edit-receive-voucher", { state: record });
  };

  const handleCopy = (record) => {
    navigate("/accounts/copy-receive-voucher", { state: record });
  };

  const handleAdd = () => {
    navigate("/accounts/receive-voucher/add");
  };

  // ✅ filter
  const filteredData = useMemo(() => {
    const t = filterText.trim().toLowerCase();

    return data.filter((row) => {
      // branch filter
      if (branch !== "all" && row.branch.toLowerCase() !== branch) return false;

      // date range filter
      const d = dayjs(row.date);
      if (fromDate && d.isBefore(fromDate, "day")) return false;
      if (toDate && d.isAfter(toDate, "day")) return false;

      // text filter
      if (!t) return true;
      const hay = [
        row.number,
        row.partyName,
        row.branch,
        row.paymentMethod,
        String(row.totalAmount),
        row.submitted ? "yes" : "no",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(t);
    });
  }, [data, branch, fromDate, toDate, filterText]);

  const styles = {
    header: {
      background: "#0ea5e9",
      padding: "8px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 6,
      color: "#fff",
    },
    headerTitle: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "#fff",
      fontWeight: 700,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: 6,
    },
    th: {
      background: "#f5f9fb",
      borderBottom: "1px solid #d3e3ef",
      padding: "7px 8px",
      fontWeight: 600,
      fontSize: 13,
      color: "#0f172a",
      whiteSpace: "nowrap",
    },
    td: {
      borderBottom: "1px solid #e5edf3",
      padding: "7px 8px",
      fontSize: 13,
      color: "#374151",
      verticalAlign: "middle",
      whiteSpace: "nowrap",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 16px 10px",
    },
  };

  // ✅ action dropdown (আগেরগুলোর মতো)
  const actionMenu = (record) => ({
    items: [
      {
        key: "view",
        label: (
          <Space>
            <EyeOutlined /> View
          </Space>
        ),
        onClick: () => handleView(record),
      },
      {
        key: "edit",
        label: (
          <Space>
            <EditOutlined /> Edit
          </Space>
        ),
        onClick: () => handleEdit(record),
      },
      {
        key: "copy",
        label: (
          <Space>
            <CopyOutlined /> Copy
          </Space>
        ),
        onClick: () => handleCopy(record),
      },
      { type: "divider" },
      {
        key: "delete-modal",
        danger: true,
        label: (
          <Space>
            <DeleteOutlined /> <DeleteModal />
          </Space>
        ),
      },
    ],
  });

  return (
    <div>
    

      {/* filter bar (3 equal fields) */}
      <div style={{ display: "flex", gap: 12, padding: "12px 16px 4px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Branch</span>
          <Select value={branch} onChange={setBranch} style={{ width: "100%" }} size="middle">
            <Option value="all">All</Option>
            <Option value="banani">Banani</Option>
            <Option value="dhanmondi">Dhanmondi</Option>
          </Select>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>From</span>
          <DatePicker
            value={fromDate}
            onChange={setFromDate}
            format="DD MMMM, YYYY"
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>To</span>
          <DatePicker
            value={toDate}
            onChange={setToDate}
            format="DD MMMM, YYYY"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* filter + show */}
      <div style={{ display: "flex", gap: 12, padding: "16px 16px 8px", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Filter:</span>
          <Input
            placeholder="Type to filter..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ width: 260 }}
          />
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Show:</span>
          <Select value={pageSize} onChange={setPageSize} style={{ width: 80 }} size="small">
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
            <th style={{ ...styles.th, width: 80, textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ ...styles.td, textAlign: "center" }}>
                No data available in table
              </td>
            </tr>
          ) : (
            filteredData.slice(0, pageSize).map((row, idx) => (
              <tr key={row.id}>
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{row.number}</td>
                <td style={styles.td}>{dayjs(row.date).format("DD/MM/YYYY")}</td>
                <td style={styles.td}>{row.partyName}</td>
                <td style={styles.td}>{row.branch}</td>
                <td style={styles.td}>{row.paymentMethod}</td>
                <td style={styles.td}>{row.totalAmount.toLocaleString()}</td>
                <td style={styles.td}>{row.submitted ? "Yes" : "No"}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  <Dropdown trigger={["click"]} menu={actionMenu(row)}>
                    <Button type="text" size="small" icon={<AlignRightOutlined />} />
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* footer / pagination (simple) */}
      <div style={styles.footer}>
        <div style={{ fontSize: 12, color: "#4b5563" }}>
          Showing {filteredData.length === 0 ? 0 : 1} to{" "}
          {Math.min(filteredData.length, pageSize)} of {filteredData.length} entries
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          <Button size="small" disabled style={{ borderRadius: 0, border: "1px solid #d4e2ed" }}>
            ←
          </Button>
          <Button
            size="small"
            type="primary"
            style={{ borderRadius: 0, background: "#0ea5e9", border: "none" }}
          >
            1
          </Button>
          <Button size="small" disabled style={{ borderRadius: 0, border: "1px solid #d4e2ed" }}>
            →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveVoucherList;
