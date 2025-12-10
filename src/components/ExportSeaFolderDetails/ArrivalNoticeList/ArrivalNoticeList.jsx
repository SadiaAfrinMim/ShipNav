import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
  Dropdown,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  CalendarOutlined,
  AlignRightOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../SharedAllListFrom/Modal/DeleteModal";

const { Text } = Typography;

export default function ArrivalNoticeList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const border = "#cfe7ea";

  // ---- ROUTE HANDLERS ----
  const handleView = (record) => {
    navigate("/import-sea/view-arrival-notice", {
      state: record,
    });
  };

  const handleEdit = (record) => {
    navigate("/import-sea/edit-arrival-notice", {
      state: record,
    });
  };

  const handleCopy = (record) => {
    navigate("/import-sea/copy-arrival-notice", {
      state: record,
    });
  };

  const addArrival = () => {
    navigate("/import-sea/arrival-notice/booking");
  };

  // ---- FAKE JSON DATA ----
  const data = [
    {
      sl: 1,
      hbl: "HBL-SEA-25000001",
      date: "2025-12-02",
      notify: "ABC Trading Co.",
      consignee: "Dhaka Importers Ltd.",
      shipper: "Ocean Star Logistics",
    },
    {
      sl: 2,
      hbl: "HBL-SEA-25000002",
      date: "2025-12-03",
      notify: "N2N Supply Chain Solutions Ltd",
      consignee: "Green Leaf Foods",
      shipper: "Evergreen Shipping Line",
    },
    {
      sl: 3,
      hbl: "HBL-SEA-25000003",
      date: "2025-12-05",
      notify: "One Container Line GmbH",
      consignee: "Royal garments BD",
      shipper: "MSC Mediterranean Shipping",
    },
    {
      sl: 4,
      hbl: "HBL-SEA-25000004",
      date: "2025-11-28",
      notify: "Global Freight Forwarders",
      consignee: "Chittagong Steel Works",
      shipper: "Maersk Line",
    },
    {
      sl: 5,
      hbl: "HBL-SEA-25000005",
      date: "2025-11-25",
      notify: "Oceanic Logistics Ltd.",
      consignee: "Sunrise Electronics",
      shipper: "ONE Line",
    },
    {
      sl: 6,
      hbl: "HBL-SEA-25000006",
      date: "2025-11-22",
      notify: "N2N Supply Chain Solutions Ltd",
      consignee: "Prime Agro Industries",
      shipper: "CMA CGM",
    },
    {
      sl: 7,
      hbl: "HBL-SEA-25000007",
      date: "2025-11-18",
      notify: "Blue Wave Logistics",
      consignee: "Metro Mart Superstore",
      shipper: "Hapag-Lloyd",
    },
    {
      sl: 8,
      hbl: "HBL-SEA-25000008",
      date: "2025-11-15",
      notify: "Delta Shipping Agency",
      consignee: "Smart Textile Mills",
      shipper: "ECU Worldwide",
    },
  ];

  // ---- ACTION CLICK HANDLER (for dropdown) ----
  const handleActionClick = (key, record) => {
    if (key === "view") {
      handleView(record);
    }

    if (key === "edit") {
      handleEdit(record);
    }

    if (key === "copy") {
      handleCopy(record);
    }

    // "delete-modal" এর জন্য এখানে কিছু করার দরকার নেই
    // label এর ভেতরের <DeleteModal /> নিজে নিজে handle করবে
  };

  // ---- DROPDOWN ITEMS (View / Edit / Copy / Delete) ----
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
    {
      key: "delete-modal",
      label: <DeleteModal />, // Delete button + modal
    },
  ];

  // ---- TABLE COLUMNS ----
  const columns = [
    { title: "S/L No.", dataIndex: "sl", width: 90, align: "center" },
    { title: "HBL", dataIndex: "hbl", width: 160 },
    {
      title: "Date *",
      dataIndex: "date",
      width: 140,
      sorter: (a, b) => new Date(a.date || 0) - new Date(b.date || 0),
    },
    {
      title: "Notify Party",
      dataIndex: "notify",
      width: 220,
      sorter: (a, b) => (a.notify || "").localeCompare(b.notify || ""),
    },
    {
      title: "Consignee",
      dataIndex: "consignee",
      width: 220,
      sorter: (a, b) => (a.consignee || "").localeCompare(b.consignee || ""),
    },
    {
      title: "Shipper",
      dataIndex: "shipper",
      width: 220,
      sorter: (a, b) => (a.shipper || "").localeCompare(b.shipper || ""),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 80,
      align: "center",
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

  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const reset = () => form.resetFields();

  return (
    <div className="px-4">
     
   

      {/* Filter card */}
      <Card>
        <Form form={form} layout="vertical">
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12}>
              <Form.Item label="Start Date *" name="startDate">
                <DatePicker
                  style={{ width: "100%" }}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="End Date *" name="endDate">
                <DatePicker
                  style={{ width: "100%" }}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Filter + Show */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderTop: `1px solid ${border}`,
              paddingTop: 8,
              marginTop: 4,
              marginBottom: 8,
            }}
          >
            <Space>
              <Text strong>Filter:</Text>
              <Input
                placeholder="Type to filter..."
                allowClear
                style={{ width: 260 }}
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
              <Text>Show:</Text>
              <Select
                value={pageSize}
                style={{ width: 80 }}
                onChange={(v) => setPageSize(v)}
                options={[10, 25, 50, 100].map((n) => ({
                  label: n,
                  value: n,
                }))}
              />
            </div>
          </div>

          {/* Table */}
          <Table
            bordered
            size="middle"
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey={(r, i) => i}
            pagination={{
              pageSize,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            }}
            locale={{ emptyText: "No data available in table" }}
            scroll={{ x: 1200 }}
          />
        </Form>
      </Card>
    </div>
  );
}
