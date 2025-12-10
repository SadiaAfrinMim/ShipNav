// File: MasterBLList.jsx   
import React, { useMemo, useState } from "react";
import {
  Table,
  Select,
  DatePicker,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Space,
  Dropdown,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  AlignRightOutlined,
  SearchOutlined,
  CalendarOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";

const { Text } = Typography;
const { Option } = Select;

const MasterBLList = () => {
  const navigate = useNavigate();

  const [data] = useState([
    {
      key: 1,
      sl: 1,
      number: "ESMBI#25000001",
      mbl: "ONEYDACF27869400",
      date: "2025-12-02",
      carrier: "ONE Line",
      originAgent: "N2N Supply Chain Solutions Ltd",
      etd: "2025-12-09",
      eta: "2026-01-29",
      referenceNo: "ES#25000001",
    },
    {
      key: 2,
      sl: 2,
      number: "ESMBI#25000002",
      mbl: "MSCUDEMO123456",
      date: "2025-11-25",
      carrier: "MSC",
      originAgent: "N2N Supply Chain Solutions Ltd",
      etd: "2025-12-03",
      eta: "2026-01-20",
      referenceNo: "ES#25000002, ES#25000003",
    },
    {
      key: 3,
      sl: 3,
      number: "ESMBI#25000003",
      mbl: "ECUWW99999999",
      date: "2025-11-18",
      carrier: "ECU Worldwide",
      originAgent: "N2N Supply Chain Solutions Ltd",
      etd: "2025-11-25",
      eta: "2026-01-10",
      referenceNo: "ES#25000004",
    },
  ]);

  const [filterText, setFilterText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const [carrier, setCarrier] = useState("All");
  const [originAgent, setOriginAgent] = useState("All");
  const [destinationAgent, setDestinationAgent] = useState("All");
  const [startDate, setStartDate] = useState(dayjs("2025-09-10"));
  const [endDate, setEndDate] = useState(dayjs("2025-12-10"));

  // --- action click handler (view/edit/copy) ---
  const handleActionClick = (key, record) => {
    if (key === "view") {
      navigate("/import-sea/view-master-bl", {
        state: record,
      });
    }

    if (key === "edit") {
      navigate("/import-sea/edit-master-bl", {
        state: record,
      });
    }

    if (key === "copy") {
      navigate("/import-sea/copy-master-bl", {
        state: record,
      });
    }

    // "delete-modal" এর কিছু করার দরকার নেই,
    // ওর label এ থাকা <DeleteModal /> নিজেই modal handle করবে
  };

  // Delete option সহ সব action item (label এ icon + text)
  const baseActionItems = [
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
    {
      key: "copy",
      label: (
        <Space>
          <CopyOutlined /> Copy
        </Space>
      ),
    },
    { type: "divider" },
    // শেষ item: DeleteModal component (নিজের button + modal সহ)
    {
      key: "delete-modal",
      label: <DeleteModal />,
    },
  ];

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "Number",
      dataIndex: "number",
      width: 130,
    },
    {
      title: "MBL",
      dataIndex: "mbl",
      width: 160,
    },
    {
      title: "Date *",
      dataIndex: "date",
      width: 110,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      width: 140,
    },
    {
      title: "Origin Agent",
      dataIndex: "originAgent",
      width: 200,
    },
    {
      title: "ETD Date",
      dataIndex: "etd",
      width: 110,
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
    {
      title: "ETA Date",
      dataIndex: "eta",
      width: 110,
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
    {
      title: "Reference No.",
      dataIndex: "referenceNo",
      width: 220,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 80,
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: baseActionItems,
            onClick: ({ key }) => handleActionClick(key, record),
          }}
        >
          <Button type="text" size="small" icon={<AlignRightOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const text = filterText.trim().toLowerCase();
    if (!text) return data;

    return data.filter((row) => {
      const hay = [
        row.number,
        row.mbl,
        row.carrier,
        row.originAgent,
        row.referenceNo,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(text);
    });
  }, [data, filterText]);

  const handleReset = () => {
    setCarrier("All");
    setOriginAgent("All");
    setDestinationAgent("All");
    setStartDate(dayjs("2025-09-10"));
    setEndDate(dayjs("2025-12-10"));
    setFilterText("");
  };

  return (
    <div
      className="m-4"
      style={{
        background: "#fff",
        border: "1px solid #e6e6e6",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Filter row (Carrier / Agents / Date range) */}
      <div
        style={{
          padding: 16,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Row gutter={[16, 8]} align="middle">
          <Col xs={24} md={6}>
            <label>Carrier</label>
            <Select
              value={carrier}
              onChange={setCarrier}
              style={{ width: "100%" }}
              size="small"
            >
              <Option value="All">All</Option>
              <Option value="ONE Line">ONE Line</Option>
              <Option value="MSC">MSC</Option>
              <Option value="ECU Worldwide">ECU Worldwide</Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <label>Origin Agent</label>
            <Select
              value={originAgent}
              onChange={setOriginAgent}
              style={{ width: "100%" }}
              size="small"
            >
              <Option value="All">All</Option>
              <Option value="N2N Supply Chain Solutions Ltd">
                N2N Supply Chain Solutions Ltd
              </Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <label>Destination Agent</label>
            <Select
              value={destinationAgent}
              onChange={setDestinationAgent}
              style={{ width: "100%" }}
              size="small"
            >
              <Option value="All">All</Option>
              <Option value="One Container Line GmbH">
                One Container Line GmbH
              </Option>
            </Select>
          </Col>

          <Col xs={24} md={3}>
            <label>Start Date *</label>
            <DatePicker
              size="small"
              style={{ width: "100%" }}
              value={startDate}
              onChange={setStartDate}
              format="DD MMMM, YYYY"
              suffixIcon={<CalendarOutlined />}
            />
          </Col>

          <Col xs={24} md={3}>
            <label>End Date *</label>
            <DatePicker
              size="small"
              style={{ width: "100%" }}
              value={endDate}
              onChange={setEndDate}
              format="DD MMMM, YYYY"
              suffixIcon={<CalendarOutlined />}
            />
          </Col>
        </Row>
      </div>

      {/* Filter input + page size */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Space>
          <span>Filter:</span>
          <Input
            size="small"
            placeholder="Type to filter..."
            prefix={<SearchOutlined style={{ color: "#999" }} />}
            style={{ width: 220 }}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Space>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>Show:</span>
          <Select
            size="small"
            value={pageSize}
            onChange={setPageSize}
            style={{ width: 80 }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
        }}
        size="middle"
        bordered={false}
        style={{ padding: "0 16px 8px" }}
        rowKey="key"
        locale={{ emptyText: "No data available in table" }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default MasterBLList;
