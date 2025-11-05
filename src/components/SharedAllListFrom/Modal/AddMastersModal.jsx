import { useState } from "react";
import { dayjs } from 'dayjs';

export const AddMastersModal = ({ open, onClose }) => {
  const [date, setDate] = useState(dayjs("2025-11-05"));
  return (
    <div>
      <div
        style={{
          display: open ? "block" : "none",
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.35)",
          zIndex: 2000,
        }}
      >
        <div
          style={{
            width: 720,
            background: "#fff",
            borderRadius: 4,
            overflow: "hidden",
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          }}
        >
          {/* header */}
          <div
            style={{
              background: "#0ea5e9",
              color: "#fff",
              padding: "8px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 600 }}>▰ Add Cheque</span>
            <Button
              type="text"
              onClick={onClose}
              style={{ color: "#fff" }}
            >
              ✕
            </Button>
          </div>

          {/* body */}
          <div style={{ padding: 16 }}>
            {/* row 1 */}
            <Row gutter={12} align="middle">
              <Col span={16}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Payee Name</div>
                <Input />
              </Col>
              <Col span={8}>
                <div style={{ marginTop: 20 }}>
                  <Checkbox>Accounts Payee Only</Checkbox>
                </div>
              </Col>
            </Row>

            {/* row 2 */}
            <Row gutter={12} align="middle" style={{ marginTop: 8 }}>
              <Col span={16}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Date</div>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  format="DD MMMM, YYYY"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={8}>
                <div style={{ marginTop: 20 }}>
                  <Checkbox>Without Date</Checkbox>
                </div>
              </Col>
            </Row>

            {/* row 3 */}
            <Row gutter={12} align="middle" style={{ marginTop: 8 }}>
              <Col span={16}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Amount</div>
                <Input />
              </Col>
              <Col span={8} style={{ marginTop: 22 }}>
                <Checkbox defaultChecked style={{ marginRight: 12 }}>
                  Lakh / Koti
                </Checkbox>
                <Checkbox>Million / Billion</Checkbox>
              </Col>
            </Row>

            {/* row 4 */}
            <Row style={{ marginTop: 8 }}>
              <Col span={24}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>In Words</div>
                <Input />
              </Col>
            </Row>

            {/* row 5 */}
            <Row style={{ marginTop: 12 }}>
              <Col span={24}>
                <Checkbox>Margins (Pixel)</Checkbox>
              </Col>
            </Row>
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              padding: "10px 16px 12px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Button onClick={onClose} type="text">
              ✕ Close
            </Button>
            <Button
              type="primary"
              style={{ background: "#1677ff" }}
              onClick={onClose}
            >
              ✔ Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
