import React, { useMemo, useState } from "react";
import {
  Layout,
  Table,
  DatePicker,
  Input,
  Space,
  Button,
  Select,
  Tag,
  Dropdown,
  Menu,
  Pagination,
  Typography,
} from "antd";
import dayjs from "dayjs";

const { Header, Content } = Layout;
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;

const mockData = [
  {
    key: "1",
    sl: 1,
    reference: "EAFI#2500005",
    date: "10/08/2025",
    shippingLine: "ECU Worldwide",
    status: "Opened",
  },
  {
    key: "2",
    sl: 2,
    reference: "EAFI#2500003",
    date: "08/08/2025",
    shippingLine: "MSC",
    status: "Opened",
  },
  {
    key: "3",
    sl: 3,
    reference: "EAFI#2500004",
    date: "08/08/2025",
    shippingLine: "MSC",
    status: "Opened",
  },
  {
    key: "4",
    sl: 4,
    reference: "EAFI#2500002",
    date: "07/08/2025",
    shippingLine: "ONE Line",
    status: "Opened",
  },
  {
    key: "5",
    sl: 5,
    reference: "EAFI#2500001",
    date: "06/08/2025",
    shippingLine: "MSC",
    status: "Opened",
  },
];

const Toolbar = ({ range, setRange, onReset, filter, setFilter, pageSize, setPageSize }) => {
  const teal = "#06b6d4"; // teal header
  const headerStyle = {
    background: teal,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  };

  return (
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
};

const ActionMenu = (
  <Menu
    items={[
      { key: "view", label: "View" },
      { key: "edit", label: "Edit" },
      { type: "divider" },
      { key: "delete", label: <span style={{ color: "#ef4444" }}>Delete</span> },
      { key: "export", label: "Export" },
    ]}
  />
);

export default function StuffingPlanList() {
  const [range, setRange] = useState([dayjs("2025-07-10"), dayjs("2025-10-10")]);
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  const data = useMemo(() => {
    if (!filter) return mockData;
    const f = filter.toLowerCase();
    return mockData.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(f)));
  }, [filter]);

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 90,
      sorter: (a, b) => a.sl - b.sl,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (val) => <Link>{val}</Link>,
      sorter: (a, b) => a.reference.localeCompare(b.reference),
    },
    {
      title: "Date *",
      dataIndex: "date",
      sorter: (a, b) => dayjs(a.date, "DD/MM/YYYY").unix() - dayjs(b.date, "DD/MM/YYYY").unix(),
    },
    {
      title: "Shipping Line",
      dataIndex: "shippingLine",
      sorter: (a, b) => a.shippingLine.localeCompare(b.shippingLine),
    },
    {
      title: "Action",
      key: "actions",
      align: "center",
      width: 90,
      render: () => (
        <Dropdown overlay={ActionMenu} trigger={["click"]} placement="bottomRight">
          <Button type="text">Actions</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout style={{ background: "transparent", padding: 16 }}>
      <Content>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Toolbar
            range={range}
            setRange={setRange}
            onReset={() => {
              setRange([dayjs("2025-07-10"), dayjs("2025-10-10")]);
              setFilter("");
              setCurrent(1);
            }}
            filter={filter}
            setFilter={setFilter}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />

          <Table
            style={{ border: "1px solid #e5e7eb", borderTop: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
            columns={columns}
            dataSource={data}
            pagination={false}
            size="middle"
            rowKey="key"
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", border: "1px solid #e5e7eb", borderTop: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <Text type="secondary">Showing {Math.min((current - 1) * pageSize + 1, data.length)} to {Math.min(current * pageSize, data.length)} of {data.length} entries</Text>
            <Pagination
              current={current}
              pageSize={pageSize}
              total={data.length}
              onChange={(p) => setCurrent(p)}
              showSizeChanger={false}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
}
