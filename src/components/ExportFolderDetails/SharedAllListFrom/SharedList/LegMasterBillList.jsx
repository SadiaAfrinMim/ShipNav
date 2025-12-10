import React, { useState } from "react";
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
import { FilterOutlined, AlignRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../SharedAllListFrom/Modal/DeleteModal";

const { Option } = Select;
const { Title } = Typography;

const LegMasterBillList = () => {
  const [data] = useState([
    {
      key: 1,
      reference: "ESMB#25000001",
      carrier: "ONE Line",
      originAgent: "N2N Supply Chain Solutions Ltd",
      etd: "10/08/2025",
      eta: "31/08/2025",
      referenceNo: "ES#25000003",
      status: "Opened",
    },
    {
      key: 2,
      reference: "ESMB#25000002",
      carrier: "MSC",
      originAgent: "N2N Supply Chain Solutions Ltd",
      etd: "06/08/2025",
      eta: "31/08/2025",
      referenceNo: "ES#25000001, ES#25000002",
      status: "Opened",
    },
    {
      key: 3,
      reference: "ESMB#25000003",
      carrier: "MSC",
      originAgent: "N2N Supply Chain Solutions Ltd",
      etd: "11/08/2025",
      eta: "31/08/2025",
      referenceNo: "ES#25000004",
      status: "Opened",
    },
    {
      key: 4,
      reference: "ESMB#25000004",
      carrier: "ECU Worldwide",
      originAgent: "N2N Supply Chain Solutions Ltd",
      etd: "13/08/2025",
      eta: "31/08/2025",
      referenceNo: "ES#25000005",
      status: "Opened",
    },
  ]);

  const navigate = useNavigate();

  const handleActionClick = (key, record) => {
    if (key === "view") {
      navigate("/export-sea/view-mbl", {
        state: { record },
      });
    }

    if (key === "edit") {
      navigate("/export-sea/edit-mbl", {
        state: { record },
      });
    }

    if (key === "copy") {
      navigate("/export-sea/copy-mbl", {
        state: { record },
      });
    }

    
  };

  // Delete option ছাড়া সব action এখানে
  const baseActionItems = [
    { key: "view", label: "View" },
    { key: "edit", label: "Edit" },
    { key: "copy", label: "Copy" },
    { type: "divider" },
    // last item: DeleteModal component (nijer button + modal niye)
    {
      key: "delete-modal",
      label: <DeleteModal />,
    },
  ];

  const columns = [
    {
      title: "S/L No.",
      dataIndex: "key",
      width: 70,
      align: "center",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text) => (
        <a href="#" style={{ color: "#00b4ff", textDecoration: "none" }}>
          {text}
        </a>
      ),
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
    },
    {
      title: "Origin Agent",
      dataIndex: "originAgent",
    },
    {
      title: "ETD Date",
      dataIndex: "etd",
    },
    {
      title: "ETA Date",
      dataIndex: "eta",
    },
    {
      title: "Reference No.",
      dataIndex: "referenceNo",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => <span style={{ color: "#00b4ff" }}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 90,
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{
            items: baseActionItems,
            onClick: ({ key }) => {
              // DeleteModal er nijer trigger button click hole handleActionClick call dorkar nai
              if (key === "delete-modal") return;
              handleActionClick(key, record);
            },
          }}
        >
          <Button icon={<AlignRightOutlined />} type="text" size="small" />
        </Dropdown>
      ),
    },
  ];

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
      {/* Filter Section */}
      <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <label>Carrier</label>
            <Select
              placeholder="All"
              style={{ width: "100%" }}
              showSearch
              defaultValue="All"
            >
              <Option value="All">All</Option>
              <Option value="MSC">MSC</Option>
              <Option value="ONE Line">ONE Line</Option>
              <Option value="ETIHAD AIRWAYS">ETIHAD AIRWAYS</Option>
              <Option value="CMA CGM">CMA CGM</Option>
              <Option value="HMM">HMM</Option>
              <Option value="COSCO">COSCO</Option>
            </Select>
          </Col>

          <Col xs={24} sm={8}>
            <label>Origin Agent</label>
            <Select
              placeholder="All"
              style={{ width: "100%" }}
              defaultValue="All"
            >
              <Option value="All">All</Option>
            </Select>
          </Col>

          <Col xs={24} sm={8}>
            <label>Destination Agent</label>
            <Select
              placeholder="All"
              style={{ width: "100%" }}
              defaultValue="All"
            >
              <Option value="All">All</Option>
            </Select>
          </Col>

          <Col xs={24} sm={6}></Col>
          <Col xs={24} sm={6}>
            <label>Start Date *</label>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="11 July, 2025"
            />
          </Col>

          <Col xs={24} sm={6}>
            <label>End Date *</label>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="11 October, 2025"
            />
          </Col>
          <Col xs={24} sm={6}></Col>
        </Row>
      </div>

      {/* Filter Input */}
      <div style={{ padding: "8px 16px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <FilterOutlined />
              <span>Filter:</span>
              <Input
                placeholder="Type to filter..."
                size="small"
                style={{ width: 200 }}
              />
            </Space>
          </Col>
          <Col>
            <Select size="small" defaultValue={10} style={{ width: 80 }}>
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={50}>50</Option>
            </Select>
          </Col>
        </Row>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        size="middle"
        bordered={false}
        style={{ padding: "0 16px" }}
      />
    </div>
  );
};

export default LegMasterBillList;
