"use client";
import { useState } from "react";
import {
  Table,
  Button,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Card,
  Pagination,
} from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ShippingOrderList = () => {
  const [carrier, setCarrier] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // ✅ Missing state added

  const data = [
    {
      key: "1",
      number: "ESSO#25000005",
      booking: "ES#25000005",
      date: "10/08/2025",
      cfs: "Golden Containers ltd",
      carrier: "ECU Worldwide",
    },
    {
      key: "2",
      number: "ESSO#25000004",
      booking: "ES#25000004",
      date: "08/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "MSC",
    },
    {
      key: "3",
      number: "ESSO#25000003",
      booking: "ES#25000003",
      date: "07/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "ONE Line",
    },
    {
      key: "4",
      number: "ESSO#25000001",
      booking: "ES#25000001",
      date: "06/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "MSC",
    },
    {
      key: "5",
      number: "ESSO#25000002",
      booking: "ES#25000002",
      date: "06/08/2025",
      cfs: "Esack Brothers Industries Limited",
      carrier: "MSC",
    },
  ];

  const columns = [
    { title: "S/L No.", dataIndex: "key", width: 80 },
    { title: "Number", dataIndex: "number" },
    { title: "Booking No.", dataIndex: "booking" },
    { title: "Date", dataIndex: "date" },
    { title: "CFS", dataIndex: "cfs" },
    { title: "Carrier", dataIndex: "carrier" },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Button type="link" icon={<FilterOutlined />}>
          Details
        </Button>
      ),
    },
  ];

  // ✅ Slice data according to page + pageSize
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
   <div>
         <Row
  gutter={[16, 16]}
  className="mb-4"
  justify="center"   // ✅ center align row items
>
  <Col xs={24} md={4}>
    <Select
      value={carrier}
      onChange={(val) => setCarrier(val)}
      style={{ width: "100%" }}
    >
      <Option value="All">All Carriers</Option>
      <Option value="MSC">MSC</Option>
      <Option value="ONE Line">ONE Line</Option>
      <Option value="ECU Worldwide">ECU Worldwide</Option>
    </Select>
  </Col>

  <Col xs={24} md={6}>
    <RangePicker style={{ width: "100%" }} />
  </Col>

  <Col xs={24} md={6}>
    <Input placeholder="🔍 Type to filter..." />
  </Col>

  {/* Show Entries Dropdown Center */}
  <Col xs={24} md={4} className="flex justify-center items-center gap-2">
    
    <Select
      value={pageSize}
      onChange={(val) => {
        setPageSize(val);
        setCurrentPage(1);
      }}
      style={{ width: 90 }}
    >
      <Option value={5}>5</Option>
      <Option value={10}>10</Option>
      <Option value={20}>20</Option>
      <Option value={50}>50</Option>
    </Select>
   
  </Col>
</Row>


        {/* Table */}
        <Table
          bordered
          columns={columns}
          dataSource={paginatedData}
          pagination={false} // disable default
          className="rounded-lg"
        />

        {/* Custom Pagination Box */}
        <div className="mt-4 flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="text-sm text-gray-600">
            Showing {1 + (currentPage - 1) * pageSize} to{" "}
            {Math.min(currentPage * pageSize, data.length)} of {data.length} entries
          </span>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
   </div>
  );
};

export default ShippingOrderList;
