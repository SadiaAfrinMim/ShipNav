import React from "react";
import { Card } from "antd";

export default function SectionCard({ title, children }) {
  return (
    <Card
      title={title}
      className="mb-6 shadow-sm"
      styles={{
        header: {
          backgroundColor: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        },
      }}
    >
      {children}
    </Card>
  );
}
