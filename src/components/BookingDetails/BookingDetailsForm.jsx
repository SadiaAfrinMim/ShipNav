// =============================================
// File: src/components/BookingDetails/BookingDetailsForm.jsx
// Fields-only (NO inner <Form>). Uses parent form context.
// =============================================
import React, { useState } from "react";
import { Form, Input, Select, Radio, Row, Col, DatePicker, Typography, Divider, AutoComplete  } from "antd";
import { catalogs, dateFormat, dateTimeFormat } from "./catalogs";
import dayjs from "dayjs";


export default function BookingDetailsForm({ isAdmin = true }) {
  const colProps = { xs: 24, sm: 12, md: 8 };

  
const [options, setOptions] = useState([]);
const { Title, Text } = Typography;
const { TextArea } = Input;

  return (
    <div style={{ padding: 16 }}>
      <Title level={4} style={{ marginBottom: 8 }}>Booking Details</Title>
      <Text type="secondary">Three columns per row • Searchable dropdowns • Clean defaults</Text>
      <Divider />

      {/* Row 1 */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item
            name="date"
            label="Date"
            initialValue={dayjs()}
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} format={dateFormat} placeholder={dateFormat} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="reference" label="Reference">
            <Input placeholder="Auto / Manual reference" allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="transportMode" label="Transport Mode" rules={[{ required: true }]}>
            <Select showSearch allowClear placeholder="Select SEA or AIR" options={catalogs.transportModes} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 2 */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="combinedTransport" label="Combined Transport">
            <Select showSearch allowClear placeholder="SEA-AIR / AIR-SEA" options={catalogs.combinedTransport} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="freightTerm" label="Freight Term" rules={[{ required: true }]}>
            <Select showSearch allowClear placeholder="Select Incoterm" options={catalogs.freightTerms} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="serviceType" label="Service Type">
            <Select showSearch allowClear placeholder="PORT/DOOR combinations" options={catalogs.serviceTypes} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 3 */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="salesType" label="Sales Type">
            <Select showSearch allowClear placeholder="Select sales type" options={catalogs.salesTypes} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
      <Form.Item
        name="salesPerson"
        label="Sales Person"
        tooltip="Searchable and allows custom input"
        rules={[{ required: true, message: "Please enter a sales person" }]}
      >
        <AutoComplete
          placeholder="Select or type a name"
          options={options}
          onSearch={(value) => {
            if (!value) return setOptions([]);
            setOptions([
              { value: value + " Smith" },
              { value: value + " Johnson" },
              { value: value + " Williams" }
            ]);
          }}
        />
      </Form.Item>

        </Col>
        <Col {...colProps}>
          <Form.Item name="hoDate" label="H/O Date" initialValue={dayjs()} rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} format={dateFormat} placeholder={dateFormat}  />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 4: Parties */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="consignee" label="Consignee">
            <Select showSearch allowClear placeholder="Search consignee" options={catalogs.parties} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="consigneeBank" label="Consignee Bank">
            <Select showSearch allowClear placeholder="Search bank" options={catalogs.banks} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="consigneeBankBranch" label="Consignee Bank Branch">
            <Select showSearch allowClear placeholder="Search branch" options={catalogs.branches} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 5 */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="shipper" label="Shipper">
            <Select showSearch allowClear placeholder="Search shipper" options={catalogs.parties} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="shipperBank" label="Shipper Bank">
            <Select showSearch allowClear placeholder="Search bank" options={catalogs.banks} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="shipperBranch" label="Shipper Bank Branch">
            <Select showSearch allowClear placeholder="Search branch" options={catalogs.branches} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 6: Agreement */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="agreementType" label="Agreement Type" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value="LC">LC</Radio.Button>
              <Radio.Button value="SC">SC</Radio.Button>
              <Radio.Button value="TT">TT</Radio.Button>
              <Radio.Button value="PI">P/I</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="agreementTypeNo" label="Agreement Type No">
            <Input placeholder="Agreement No" allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="agreementTypeDate" initialValue={dayjs()} label="Agreement Type Date">
            <DatePicker style={{ width: "100%" }} format={dateFormat}  placeholder={dateFormat} />
          </Form.Item>
        </Col>
      </Row>


      {/* Row 7: Commodity & Agents */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="commodity" label="Commodity">
            <Select showSearch allowClear placeholder="Search commodity" options={catalogs.commodities} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="agent" label="Agent">
            <Select showSearch allowClear placeholder="Search agent" options={catalogs.agents} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="cnfAgent" label="C&F Agent">
            <Select showSearch allowClear placeholder="Search C&F agent" options={catalogs.agents} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 8: Buying House / Notify Parties */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="buyingHouse" label="Buying House">
            <Select showSearch allowClear placeholder="Type to search or add"  />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="firstNotify" label="First Notify">
            <Select showSearch allowClear placeholder="Search or add" />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="secondNotify" label="Second Notify">
            <Select showSearch allowClear placeholder="Search or add" mode="combobox" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 9: Addresses */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="buyingHouseAddress" label="Buying House Address">
            <TextArea placeholder="Address" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="firstNotifyAddress" label="First Notify Address">
            <TextArea placeholder="Address" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="secondNotifyAddress" label="Second Notify Address">
            <TextArea placeholder="Address" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 10: Commercial & EXP */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="goodsNature" label="Goods Nature">
            <Input placeholder="e.g., General cargo" allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="commInvoiceNo" label="Comm. Invoice No">
            <Input placeholder="Commercial invoice number" allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="commInvoiceDate" label="Comm. Invoice Date" initialValue={dayjs()}>
            <DatePicker style={{ width: "100%" }} format={dateFormat} placeholder={dateFormat} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 11 */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="expNo" label="EXP No">
            <Input placeholder="EXP number" allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="expRefDate" label="EXP Ref Date" initialValue={dayjs()}>
            <DatePicker style={{ width: "100%" }} format={dateFormat} placeholder={dateFormat} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          {isAdmin ? (
            <Form.Item name="status" label="Status (Admin only)">
              <Radio.Group>
                {catalogs.status.map((s) => (
                  <Radio.Button key={s.value} value={s.value}>
                    {s.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : (
            <Form.Item label="Status">
              <Text type="secondary">Visible to admins only</Text>
            </Form.Item>
          )}
        </Col>
      </Row>

      {/* Row 12: Routing */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="originCountry" label="Origin Country" rules={[{ required: true }]}>
            <Select showSearch allowClear placeholder="Search country" options={catalogs.countries} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="destinationCountry" label="Destination Country" rules={[{ required: true }]}>
            <Select showSearch allowClear placeholder="Search country" options={catalogs.countries} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="receivePlace" label="Receive Place">
            <Select showSearch allowClear placeholder="Search location" options={catalogs.locations} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 13 */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="pol" label="POL (Port of Loading)">
            <Select showSearch allowClear placeholder="Search POL" options={catalogs.ports} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="pod" label="POD (Port of Discharge)">
            <Select showSearch allowClear placeholder="Search POD" options={catalogs.ports} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="finalDestination" label="Final Destination">
            <Select showSearch allowClear placeholder="Search destination" options={catalogs.locations} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 14: Marks / Goods / Remark */}
      <Row gutter={[16, 16]}>
        <Col {...colProps}>
          <Form.Item name="marksNo" label="Marks No">
            <Select showSearch allowClear placeholder="Search marks from API" options={catalogs.marks} />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="goodsDescription" label="Goods Description">
            <TextArea placeholder="Brief description of goods" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
          </Form.Item>
        </Col>
        <Col {...colProps}>
          <Form.Item name="remark" label="Remark">
            <TextArea placeholder="Notes / remarks" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
