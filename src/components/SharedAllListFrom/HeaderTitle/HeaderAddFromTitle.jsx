// File: HeaderAddFromTitle.jsx

import React from 'react';
import {
  PlusOutlined,
  ReloadOutlined,
  RestFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { Link, useLocation } from 'react-router-dom';


// 🧩 JSON-based route → title mapping
const routeTitles = {
  '/export-sea/booking': 'Add Sea Booking',
  '/export-sea/shipping-order': 'Add Shipping Order',
  '/export-sea/cargo-receive': 'Add Cargo Receive',
  '/export-sea/stuffing-plan': 'Add Stuffing Plan',
  '/export-sea/stuffing-package': 'Add Stuffing Package',
  '/export-sea/shipment-advice': 'Add Shipment Advice',
  '/export-sea/hbl': 'Add HBL (House Bill)',
  '/export-sea/mbl': 'Add MBL (Master Bill)',
  '/export-sea/freight-invoice': 'Add Freight Invoice',
  '/export-sea/debit-note': 'Add Debit Note',
  '/export-sea/credit-note': 'Add Credit Note',
  '/export-sea/report/profit-loss': 'Add Profit & Loss Report',
  '/export-sea/report/volume': 'Add Volume Report',

  '/export-air/booking': 'Add Air Booking',
  '/export-air/shipping-order': 'Add Shipping Order',
  '/export-air/cargo-receive': 'Add Cargo Receive',
  '/export-air/mawb': 'Add MAWB',
  '/export-air/freight-invoice': 'Add Freight Invoice',
  '/export-air/debit-note': 'Add Debit Note',
  '/export-air/credit-note': 'Add Credit Note',
  '/export-air/report/profit-loss': 'Add Profit & Loss Report',
  '/export-air/report/volume': 'Add Volume Report',

  '/import-sea/booking': 'Add Sea Booking',
  '/import-sea/master-bl': 'Add Master BL',
  '/import-sea/arrival-notice': 'Add Arrival Notice',
  '/import-sea/forward-letter': 'Add Forward Letter',
  '/import-sea/freight-invoice': 'Add Freight Invoice',
  '/import-sea/debit-note': 'Add Debit Note',
  '/import-sea/credit-note': 'Add Credit Note',
  '/import-sea/report/profit-loss': 'Add Profit & Loss Report',
  '/import-sea/report/volume': 'Add Volume Report',

  '/import-air/booking': 'Add Air Booking',
  '/import-air/master-bl': 'Add Master BL',
  '/import-air/request-letter': 'Add Request Letter',
  '/import-air/forward-letter': 'Add Forward Letter',
  '/import-air/freight-invoice': 'Add Freight Invoice',
  '/import-air/debit-note': 'Add Debit Note',
  '/import-air/credit-note': 'Add Credit Note',
  '/import-air/report/profit-loss': 'Add Profit & Loss Report',
  '/import-air/report/volume': 'Add Volume Report',
};

// 🧠 Fallback title generator if route is not in JSON
const generateTitle = (path) => {
  if (!path) return 'Add Page';
  const parts = path.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || '';
  const formatted = last
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `Add ${formatted}`;
};

const HeaderAddFromTitle = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if path exists in JSON, else fallback
  const title = routeTitles[currentPath] || generateTitle(currentPath);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 24,
        padding: '16px 20px',
        background: '#f0f5ff',
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      }}
    >
      {/* 🔹 Left Title Section */}
      <h2
        style={{
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 24,
          color: '#1890ff',
        }}
      >
        <UnorderedListOutlined /> {title}
      </h2>

      {/* 🔹 Right Buttons Section */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Tooltip title="Reset Form">
          <Button
            icon={<ReloadOutlined />}
            style={{
              background: '#faad14',
              color: '#fff',
              border: 'none',
            }}
            onClick={() => window.location.reload()}
          >
            <RestFilled />
          </Button>
        </Tooltip>

        
      </div>
    </div>
  );
};

export default HeaderAddFromTitle;
