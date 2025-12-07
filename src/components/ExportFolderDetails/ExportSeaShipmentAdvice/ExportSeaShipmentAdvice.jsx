import React, { useState, useMemo } from "react";
import {
  Layout,
  Table,
  DatePicker,
  Input,
  Space,
  Button,
  Select,
  Dropdown,
  Menu,
  Pagination,
  Typography,
  Modal,
  Form,
} from "antd";
import dayjs from "dayjs";
import EditShipmentPackageModal from "./EditShipmentPackageModal";
import ViewShipmentPackageModal from "./ViewShipmentPackageModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CopyShipmentAdviceForm from "./CopyShipmentAdviceForm"

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;

// Mock Data
const mockData = [
  { key: "1", sl: 1, reference: "EAFI#2500005", date: "10/08/2025", shippingLine: "ECU Worldwide" },
  { key: "2", sl: 2, reference: "EAFI#2500003", date: "08/08/2025", shippingLine: "MSC" },
  { key: "3", sl: 3, reference: "EAFI#2500004", date: "08/08/2025", shippingLine: "MSC" },
  { key: "4", sl: 4, reference: "EAFI#2500002", date: "07/08/2025", shippingLine: "ONE Line" },
  { key: "5", sl: 5, reference: "EAFI#2500001", date: "06/08/2025", shippingLine: "MSC" },
];

// Toolbar Component
const Toolbar = ({ range, setRange, filter, setFilter, pageSize, setPageSize }) => (
  <div style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>
    <Space wrap>
      <div>
        <Text strong style={{ marginRight: 8 }}>Start Date *</Text>
        <RangePicker value={range} onChange={setRange} allowClear={false} style={{ width: 320 }} />
      </div>
      <Input
        placeholder="Type to filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: 220 }}
      />
    </Space>
    <div style={{ float: "right" }}>
      <Space>
        <Text>Show:</Text>
        <Select
          value={pageSize}
          onChange={setPageSize}
          style={{ width: 80 }}
          options={[10, 25, 50, 100].map((v) => ({ value: v, label: String(v) }))}
        />
      </Space>
    </div>
  </div>
);




// Action Menu
const ActionMenu = ({ onActionClick }) => (
  <Menu
    onClick={(info) => onActionClick(info.key)}
    items={[
      { key: "view", label: "View" },
      { key: "edit", label: "Edit" },
      { type: "divider" },
      { key: "delete", label: <span style={{ color: "#ef4444" }}>Delete</span> },
      { key: "copy", label: "copy" },
    ]}
  />
);

export default function ExportSeaShipmentAdvice() {
  const [range, setRange] = useState([dayjs("2025-07-10"), dayjs("2025-10-10")]);
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  const [modalType, setModalType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const data = useMemo(() => {
    if (!filter) return mockData;
    const f = filter.toLowerCase();
    return mockData.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(f)));
  }, [filter]);

  const handleActionClick = (type, record) => {
    setModalType(type);
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCancel = () => setModalVisible(false);
  const handleSubmit = (values) => { console.log("Edited:", values); setModalVisible(false); };
  const handleDelete = (record) => { console.log("Deleted:", record); setModalVisible(false); };

  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, sorter: (a, b) => a.sl - b.sl },
    { title: "Reference", dataIndex: "reference", render: (val) => <Link>{val}</Link>, sorter: (a, b) => a.reference.localeCompare(b.reference) },
    { title: "Date *", dataIndex: "date", sorter: (a, b) => dayjs(a.date, "DD/MM/YYYY").unix() - dayjs(b.date, "DD/MM/YYYY").unix() },
    { title: "Shipping Line", dataIndex: "shippingLine", sorter: (a, b) => a.shippingLine.localeCompare(b.shippingLine) },
    {
      title: "Action",
      key: "actions",
      align: "center",
      width: 90,
      render: (_, record) => (
        <Dropdown overlay={<ActionMenu onActionClick={(type) => handleActionClick(type, record)} />} trigger={["click"]} placement="bottomRight">
          <Button type="text">Actions</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout style={{ background: "transparent", padding: 16 }}>
      <Content>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Toolbar range={range} setRange={setRange} filter={filter} setFilter={setFilter} pageSize={pageSize} setPageSize={setPageSize} />
          <Table columns={columns} dataSource={data} pagination={false} rowKey="key" size="middle" style={{ border: "1px solid #e5e7eb", borderRadius: 8 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", border: "1px solid #e5e7eb", borderTop: 0, borderRadius: 8, marginTop: 8 }}>
            <Text type="secondary">Showing {Math.min((current-1)*pageSize+1, data.length)} to {Math.min(current*pageSize, data.length)} of {data.length} entries</Text>
            <Pagination current={current} pageSize={pageSize} total={data.length} onChange={setCurrent} showSizeChanger={false} />
          </div>
        </div>
      </Content>

      {modalType === "edit" && <EditShipmentPackageModal visible={modalVisible} onCancel={handleCancel} onSubmit={handleSubmit} initialValues={selectedRecord} />}
      {modalType === "view" && <ViewShipmentPackageModal visible={modalVisible} onCancel={handleCancel} data={selectedRecord} />}
      {modalType === "delete" && <DeleteConfirmModal visible={modalVisible} onCancel={handleCancel} onConfirm={handleDelete} data={selectedRecord} />}
      {modalType === "copy" && <CopyShipmentAdviceForm visible={modalVisible} onCancel={handleCancel} onConfirm={handleDelete} data={selectedRecord} />}
    </Layout>
  );
}
