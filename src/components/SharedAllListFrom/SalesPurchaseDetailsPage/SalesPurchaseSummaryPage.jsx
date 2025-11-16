import React, { useState } from "react";
import {
  Card,
  Form,
  Select,
  Radio,
  DatePicker,
  Button,
  Table,
} from "antd";
import {
  ReloadOutlined,
  PrinterOutlined,
  SearchOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const SalesPurchaseSummaryPage = () => {
  const [filterType, setFilterType] = useState("month");

  const columns = [
    { title: "S/L No.", dataIndex: "sl", key: "sl", width: 80 },
    { title: "Party", dataIndex: "party", key: "party" },
    { title: "Branch", dataIndex: "branch", key: "branch" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Total Quantity", dataIndex: "qty", key: "qty" },
    { title: "Total Amount", dataIndex: "amount", key: "amount" },
  ];

  return (
    <div className="min-h-screen ">
      {/* FILTER CARD */}
      <Card
        size="small"
        className="mb-4 border border-[#dfe3e6] rounded-sm"
        bodyStyle={{ padding: 0 }}
      >
       

        {/* Filter Form */}
        <div className="px-3 py-3 bg-white">
          <Form layout="vertical" className="grid grid-cols-12 gap-4">
            {/* Party */}
            <Form.Item label="Party" className="col-span-12 md:col-span-3">
              <Select defaultValue="ALL">
                <Option value="ALL">ALL</Option>
                <Option value="p1">ABC Trading</Option>
              </Select>
            </Form.Item>

            {/* Category */}
            <Form.Item label="Category" className="col-span-12 md:col-span-3">
              <Select defaultValue="ALL">
                <Option value="ALL">ALL</Option>
                <Option value="c1">Electronics</Option>
              </Select>
            </Form.Item>

            {/* Month/Year radio and dropdown */}
            <Form.Item label="Filter Type" className="col-span-12 md:col-span-3">
              <Radio.Group
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <Radio value="month">Month</Radio>
                <Radio value="year">Year</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Month or Year Select */}
            {filterType === "month" ? (
              <Form.Item label="Month" className="col-span-12 md:col-span-3">
                <Select defaultValue="November">
                  <Option value="January">January</Option>
                  <Option value="February">February</Option>
                  <Option value="March">March</Option>
                  <Option value="April">April</Option>
                  <Option value="May">May</Option>
                  <Option value="June">June</Option>
                  <Option value="July">July</Option>
                  <Option value="August">August</Option>
                  <Option value="September">September</Option>
                  <Option value="October">October</Option>
                  <Option value="November">November</Option>
                  <Option value="December">December</Option>
                </Select>
              </Form.Item>
            ) : (
              <Form.Item label="Year" className="col-span-12 md:col-span-3">
                <Select defaultValue="2025">
                  <Option value="2024">2024</Option>
                  <Option value="2025">2025</Option>
                  <Option value="2026">2026</Option>
                </Select>
              </Form.Item>
            )}

            {/* Branch below Party */}
            <Form.Item
              label="Branch"
              className="col-span-12 md:col-span-3 md:col-start-1"
            >
              <Select defaultValue="ALL">
                <Option value="ALL">ALL</Option>
                <Option value="b1">Banani</Option>
              </Select>
            </Form.Item>
          </Form>

          <p className="text-xs text-gray-500 mt-1 mb-2">
            * Required Fields
          </p>

          <div className="flex justify-end">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              className="rounded-full px-5 bg-teal-600 hover:bg-teal-700"
            >
              Search
            </Button>
          </div>
        </div>
      </Card>

      {/* REPORT CARD */}
      <Card
        size="small"
        className="border border-[#dfe3e6] rounded-sm"
        bodyStyle={{ padding: 0 }}
      >
        <div className="bg-white px-3 py-4 text-center">
          <p className="font-semibold text-[14px]">
            N2N Supply Chain Solutions Ltd.
          </p>
          <p className="text-xs underline">
            House# 7 (4th Floor), Road# 2/1, Banani, Dhaka, Bangladesh
          </p>
          <p className="text-[11px] mt-1 uppercase tracking-wide">
            SALES SUMMARY REPORT
          </p>

          {/* metadata row */}
          <div className="flex justify-between text-xs mt-4 mb-2">
            <div className="text-left">
              <p>Generated By: nahidridwanul@gmail.com</p>
              <p>Party: --------</p>
              <p>Branch: --------</p>
            </div>
            <div className="text-right">
              <p>Print Date: 10/11/2025 12:36 PM</p>
            </div>
          </div>

          <p className="text-xs mb-2">Category: --------</p>

          <Table
            size="small"
            columns={columns}
            dataSource={[]}
            pagination={false}
            bordered
          />
        </div>
      </Card>
    </div>
  );
};

export default SalesPurchaseSummaryPage;
