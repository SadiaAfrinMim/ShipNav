// File: BookingList.jsx
import { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Select,
  DatePicker,
  Input,
  Row,
  Col,
  Space,
  Dropdown,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../SharedAllListFrom/Modal/DeleteModal";


const { RangePicker } = DatePicker;

const data = [
  {
    key: "1",
    sl: 1,
    number: "ES#25000006",
    date: "10/09/2025",
    transport: "Sea",
    shipper: "ENRICH LIMITED",
    consignee: "OFFTEX AG",
    pol: "CHITTAGONG",
    pod: "CHITTAGONG",
    mbl: "ESMB#25000002",
    agent: "NZN Supply Chain Solutions Ltd",
    carton: 40,
    piece: 5031,
    cbm: 18.63,
    gwt: 2149,
    status: "Issued",
  },
  {
    key: "2",
    sl: 2,
    number: "ES#25000005",
    date: "08/08/2025",
    transport: "Sea",
    shipper: "TEX ZONE KNITWEAR LTD.",
    consignee: "S.G.P. PRODUCTIONS",
    pol: "CHITTAGONG",
    pod: "CHITTAGONG",
    mbl: "ESMB#25000004",
    agent: "OEC GROUP LOS ANGELES",
    carton: 165,
    piece: 100,
    cbm: 0,
    gwt: 1950,
    status: "Opened",
  },
  {
    key: "3",
    sl: 3,
    number: "ES#25000004",
    date: "08/08/2025",
    transport: "Sea",
    shipper: "CROWN WEARS (PVT) LTD.",
    consignee: "ASCENA RETAIL GROUP, INC.",
    pol: "CHITTAGONG",
    pod: "CHITTAGONG",
    mbl: "ESMB#25000003",
    agent: "LINIAGE Logistics",
    carton: 30,
    piece: 3000,
    cbm: 3.402,
    gwt: 360,
    status: "Opened",
  },
  {
    key: "4",
    sl: 4,
    number: "ES#25000003",
    date: "07/08/2025",
    transport: "Sea",
    shipper: "RBSR FASHIONS LTD.",
    consignee: "ALPHA APPARELS LTD.",
    pol: "CHITTAGONG",
    pod: "CHITTAGONG",
    mbl: "ESMB#25000002",
    agent: "PRECISION SUPPLY CHAIN INTERNATIONAL LTD.",
    carton: 680,
    piece: 0,
    cbm: 0,
    gwt: 22323,
    status: "Opened",
  },
  {
    key: "5",
    sl: 5,
    number: "ES#25000001",
    date: "06/08/2025",
    transport: "Sea",
    shipper: "BANGLADESH SPINNERS AND KNITTERS (PVT) LTD.",
    consignee: "ASCENA RETAIL GROUP, INC.",
    pol: "CHITTAGONG",
    pod: "CHITTAGONG",
    mbl: "ESMB#25000001",
    agent: "LINIAGE Logistics",
    carton: 19,
    piece: 0,
    cbm: 0,
    gwt: 172.24,
    status: "Issued",
  },
  {
    key: "6",
    sl: 6,
    number: "ES#25000002",
    date: "06/08/2025",
    transport: "Sea",
    shipper: "CROWN WEARS (PVT) LTD.",
    consignee: "PREMIUM BRANDS OPCO LLC",
    pol: "CHITTAGONG",
    pod: "CHITTAGONG",
    mbl: "ESMB#25000001",
    agent: "LINIAGE Logistics",
    carton: 22,
    piece: 0,
    cbm: 0,
    gwt: 155.9,
    status: "Issued",
  },
];

const BookingList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ---- route handlers (view / edit) ----
  const handleView = (record) => {
    navigate("/export-sea/view-booking", {
      state: record,
    });
  };

  const handleEdit = (record) => {
    navigate("/export-sea/edit-booking", {
      state: record,
    });
  };

  const handleActionClick = (key, record) => {
    if (key === "view") handleView(record);
    if (key === "edit") handleEdit(record);
    // key === "delete-modal" হলে DeleteModal নিজেই handle করবে
  };

  const actionItems = [
    {
      key: "view",
      label: (
        <Space>
          <EyeOutlined /> View
        </Space>
      ),
    },
    {
      key: "edit",
      label: (
        <Space>
          <EditOutlined /> Edit
        </Space>
      ),
    },
    { type: "divider" },
    {
      key: "delete-modal",
      label: <DeleteModal />, // button + modal (আগের মতোই)
    },
  ];

  const columns = [
    { title: "S/L No.", dataIndex: "sl", key: "sl" },
    { title: "Number", dataIndex: "number", key: "number" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Transport Mode", dataIndex: "transport", key: "transport" },
    { title: "Shipper", dataIndex: "shipper", key: "shipper" },
    { title: "Consignee", dataIndex: "consignee", key: "consignee" },
    { title: "POL", dataIndex: "pol", key: "pol" },
    { title: "POD", dataIndex: "pod", key: "pod" },
    { title: "MBL", dataIndex: "mbl", key: "mbl" },
    { title: "C&F Agent", dataIndex: "agent", key: "agent" },
    { title: "Total Carton", dataIndex: "carton", key: "carton" },
    { title: "Total Piece", dataIndex: "piece", key: "piece" },
    { title: "Total CBM", dataIndex: "cbm", key: "cbm" },
    { title: "Total GWT", dataIndex: "gwt", key: "gwt" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Opened" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: actionItems,
            onClick: ({ key }) => handleActionClick(key, record),
          }}
        >
          <MenuOutlined style={{ cursor: "pointer", fontSize: 18 }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* Filter row (top) */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 20,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Col xs={24} sm={12} md={4} lg={4}>
          <Select placeholder="Commodity" style={{ width: "100%" }} />
        </Col>
        <Col xs={24} sm={12} md={4} lg={4}>
          <Select placeholder="Freight Term" style={{ width: "100%" }} />
        </Col>
        <Col xs={24} sm={12} md={4} lg={4}>
          <Select placeholder="Consignee" style={{ width: "100%" }} />
        </Col>
        <Col xs={24} sm={12} md={4} lg={4}>
          <Select placeholder="Shipper" style={{ width: "100%" }} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <RangePicker style={{ width: "100%" }} />
        </Col>
      </Row>

      {/* Search */}
      <Space style={{ marginBottom: 20, width: "100%" }} direction="vertical">
        <Input.Search
          placeholder="Type to filter by Shipper..."
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </Space>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data.filter((d) =>
          d.shipper.toLowerCase().includes(search.toLowerCase())
        )}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
        }}
        rowClassName={() => "booking-row"}
        rowKey="key"
      />
    </div>
  );
};

export default BookingList;
