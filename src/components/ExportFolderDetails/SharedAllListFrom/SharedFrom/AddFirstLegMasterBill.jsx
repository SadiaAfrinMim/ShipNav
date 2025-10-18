import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Button,
  Typography,
} from "antd";
import { CloseOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const AddFirstLegMasterBill = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Submitted:", values);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden m-4">
      {/* Header */}
    

      {/* Form */}
     <div className="p-4 ">
       <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="p-6"
      >
        <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Date *"
              name="date"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item label="Carrier" name="carrier">
              <Select placeholder="(-- Select/None --)" allowClear>
                <Option value="MSC">MSC</Option>
                <Option value="ONE Line">ONE Line</Option>
                <Option value="HMM">HMM</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Destination Agent" name="destinationAgent">
              <Select placeholder="(-- Select/None --)" allowClear>
                <Option value="N2N Supply Chain Solutions Ltd">
                  N2N Supply Chain Solutions Ltd
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label="POL" name="pol">
              <Select placeholder="(-- Select/None --)" allowClear>
                <Option value="Chittagong">Chittagong</Option>
                <Option value="Singapore">Singapore</Option>
              </Select>
            </Form.Item>

            <Form.Item label="ETD Date" name="etdDate">
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item label="HBL" name="hbl">
              <Select placeholder="None selected" allowClear>
                <Option value="ESMB#25000001">ESMB#25000001</Option>
                <Option value="ESMB#25000002">ESMB#25000002</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col xs={24} md={12}>
            <Form.Item label="MBL No." name="mblNo">
              <Input placeholder="Enter MBL number" />
            </Form.Item>

            <Form.Item label="Origin Agent" name="originAgent">
              <Select placeholder="(-- Select/None --)" allowClear>
                <Option value="N2N Supply Chain Solutions Ltd">
                  N2N Supply Chain Solutions Ltd
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label="POD" name="pod">
              <Select placeholder="(-- Select/None --)" allowClear>
                <Option value="Port Klang">Port Klang</Option>
                <Option value="Dubai">Dubai</Option>
              </Select>
            </Form.Item>

            <Form.Item label="ETA Date" name="etaDate">
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item label="Remark" name="remark">
              <TextArea rows={3} placeholder="Enter remarks" />
            </Form.Item>
          </Col>
        </Row>

        {/* Status */}
        <Form.Item label="Status" name="status" initialValue="Opened">
          <Radio.Group>
            <Radio value="Opened">Opened</Radio>
            <Radio value="Issued">Issued</Radio>
            <Radio value="Reopened">Reopened</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
          <p className="text-xs text-gray-500">* Required Fields</p>
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckOutlined />}
            className="!bg-[#00b4ff] hover:!bg-[#0093d0]"
          >
            Submit
          </Button>
        </div>
      </Form>
     </div>
    </div>
  );
};

export default AddFirstLegMasterBill;
