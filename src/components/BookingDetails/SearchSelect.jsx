// =============================================
// File: src/components/BookingDetails/SearchSelect.jsx
// =============================================
import React from "react";
import { Select } from "antd";

export default function SearchSelect({ allowCustom = false, options = [], ...rest }) {
  return (
    <Select
      showSearch
      optionFilterProp="label"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      {...(!allowCustom && { mode: undefined })}
      options={options}
      {...rest}
    />
  );
}
