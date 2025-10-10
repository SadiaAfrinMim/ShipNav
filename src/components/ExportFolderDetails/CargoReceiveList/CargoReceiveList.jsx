import React, { useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Table,
  Tag,
  Space,
  Dropdown,
  Select,
  Tooltip,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  MoreOutlined,
  LinkOutlined,
  SearchOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// Mock data for design preview
const initialRows = [
  { key: 1, sl: 1, bookingNo: "ES#2500005", date: "10/08/2025", cargoReceive: "10/08/2025", totalCbm: 0, totalGwt: 1950, status: "Opened" },
  { key: 2, sl: 2, bookingNo: "ES#2500004", date: "08/08/2025", cargoReceive: "08/08/2025", totalCbm: 3.402, totalGwt: 360, status: "Opened" },
  { key: 3, sl: 3, bookingNo: "ES#2500003", date: "07/08/2025", cargoReceive: "07/08/2025", totalCbm: 0, totalGwt: 22323, status: "Opened" },
  { key: 4, sl: 4, bookingNo: "ES#2500001", date: "06/08/2025", cargoReceive: "06/08/2025", totalCbm: 0, totalGwt: 172.24, status: "Opened" },
  { key: 5, sl: 5, bookingNo: "ES#2500002", date: "06/08/2025", cargoReceive: "06/08/2025", totalCbm: 0, totalGwt: 155.9, status: "Opened" },
];

export default function CargoReceiveList() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [dateRange, setDateRange] = useState({
    start: dayjs("2025-07-10"),
    end: dayjs("2025-10-10"),
  });

  const data = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) =>
      [r.bookingNo, r.status, r.date, r.cargoReceive].join(" ").toLowerCase().includes(q)
    );
  }, [rows, search]);

  const menuItems = [
    { key: "open", label: "Open details" },
    { key: "edit", label: "Edit" },
    { key: "issue", label: "Issue" },
  ];

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 90,
      sorter: (a, b) => a.sl - b.sl,
    },
    {
      title: "Booking No.",
      dataIndex: "bookingNo",
      render: (val) => (
        <Space>
          <LinkOutlined />
          <a href="#">{val}</a>
        </Space>
      ),
      ellipsis: true,
    },
    {
      title: (
        <Space>
          <Text>Date *</Text>
        </Space>
      ),
      dataIndex: "date",
      width: 130,
      sorter: (a, b) =>
        dayjs(a.date, "DD/MM/YYYY", true).unix() - dayjs(b.date, "DD/MM/YYYY", true).unix(),
    },
    {
      title: "Cargo Receive",
      dataIndex: "cargoReceive",
      width: 140,
    },
    {
      title: "Total CBM",
      dataIndex: "totalCbm",
      align: "right",
      width: 120,
      sorter: (a, b) => a.totalCbm - b.totalCbm,
    },
    {
      title: "Total GWT",
      dataIndex: "totalGwt",
      align: "right",
      width: 140,
      sorter: (a, b) => a.totalGwt - b.totalGwt,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      filters: [
        { text: "Opened", value: "Opened" },
        { text: "Issued", value: "Issued" },
        { text: "Reopened", value: "Reopened" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (val) => <Tag color="green">{val}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      width: 90,
      align: "center",
      render: () => (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
   <div>
      <div className="p-4 border-b border-gray-100">
            <Row gutter={[12, 12]} align="middle">
              <Col xs={24} md={12} lg={8}>
                <div className="flex items-center gap-2 mb-1">
                  <Text strong>Filter:</Text>
                </div>
                <Space.Compact className="w-full">
                  <Input
                    allowClear
                    prefix={<SearchOutlined />}
                    placeholder="Type to filter..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Space.Compact>
              </Col>

              <Col xs={24} lg={6}>
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-gray-400" />
                  <Text strong>Start Date *</Text>
                </div>
                <DatePicker
                  className="w-full mt-1"
                  value={dateRange.start}
                  onChange={(d) => setDateRange((r) => ({ ...r, start: d }))}
                />
              </Col>

              <Col xs={24} lg={6}>
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-gray-400" />
                  <Text strong>End Date *</Text>
                </div>
                <DatePicker
                  className="w-full mt-1"
                  value={dateRange.end}
                  onChange={(d) => setDateRange((r) => ({ ...r, end: d }))}
                />
              </Col>

              <Col xs={24} lg={4} className="text-right">
                <Space>
                  <Text>Show:</Text>
                  <Select
                    value={pageSize}
                    className="w-[90px]"
                    onChange={(v) => setPageSize(v)}
                    options={[10, 25, 50, 100].map((n) => ({ value: n, label: n }))}
                  />
                </Space>
              </Col>
            </Row>
          </div>

          {/* Table */}
          <Table
            rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize }}
            size="middle"
            scroll={{ x: 900 }}
          />
        </div>
  
  );
}
