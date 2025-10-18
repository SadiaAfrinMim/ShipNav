
import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Checkbox,
  Button,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";


const { Option } = Select;
const { TextArea } = Input;

const AddShippingOrder = () => {
  const [formData, setFormData] = useState({
    bookingNo: null,
    cfs: null,
    date: null,
    carrier: null,
    remark: "",
    documents: [],
  });

  return (
   
   <div className="p-4">
     {/* First Row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <label className="block mb-1 font-medium">Booking No.</label>
            <Select
              placeholder="(-- Select/None --)"
              style={{ width: "100%" }}
              onChange={(val) => setFormData({ ...formData, bookingNo: val })}
            >
              <Option value="B001">B001</Option>
              <Option value="B002">B002</Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <label className="block mb-1 font-medium">CFS</label>
            <Select
              placeholder="(-- Select/None --)"
              style={{ width: "100%" }}
              onChange={(val) => setFormData({ ...formData, cfs: val })}
            >
              <Option value="Golden Containers ltd">Golden Containers ltd</Option>
              <Option value="Esack Brothers">Esack Brothers</Option>
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <label className="block mb-1 font-medium">Date *</label>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(val) => setFormData({ ...formData, date: val })}
            />
          </Col>

          <Col xs={24} md={6}>
            <label className="block mb-1 font-medium">Carrier</label>
            <Select
              placeholder="(-- Select/None --)"
              style={{ width: "100%" }}
              onChange={(val) => setFormData({ ...formData, carrier: val })}
            >
              <Option value="MSC">MSC</Option>
              <Option value="ONE Line">ONE Line</Option>
              <Option value="ECU Worldwide">ECU Worldwide</Option>
            </Select>
          </Col>
        </Row>

        {/* Documents Checkboxes */}
        <div className="mt-4">
          <label className="block mb-1 font-medium">Document Accompanied</label>
          <Checkbox.Group
            options={["Commercial Invoice", "Packing List", "GSP", "C/O"]}
            onChange={(val) => setFormData({ ...formData, documents: val })}
          />
        </div>

        {/* Remarks */}
        <div className="mt-4">
          <label className="block mb-1 font-medium">Remark</label>
          <TextArea
            rows={3}
            placeholder="Contact details at Chittagong for signing Shipping Order..."
            onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
          />
        </div>

        {/* Shipper & Consignee Section */}
        <div className="mt-6 border rounded-lg bg-blue-50 p-4">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <h3 className="font-semibold mb-2">Shipper :</h3>
              <p>C&F Agent :</p>
              <p>LC No. :</p>
              <p>Exp No. :</p>
              <p>Com. Invoice No. :</p>
              <p>Place of Receipt :</p>
              <p>Port of Discharge :</p>
              <p>Marks & No. :</p>
              <p>No. of Packages :</p>
              <p>Gross Weight KG :</p>
            </Col>

            <Col xs={24} md={12}>
              <h3 className="font-semibold mb-2">Consignee :</h3>
              <p>LC Date :</p>
              <p>Exp Date :</p>
              <p>Com. Invoice Date :</p>
              <p>Port of Loading :</p>
              <p>Final Destination :</p>
              <p>Description of Goods :</p>
              <p>Measurement CBM :</p>
            </Col>
          </Row>
        </div>

        {/* Required Fields Note */}
        <p className="text-sm text-gray-500 mt-3">* Required Fields</p>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Button type="primary" className="bg-blue-600">
             Submit
          </Button>
        </div>
   </div>
  );
};

export default AddShippingOrder;
