import React from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header } = Layout;

export default function BookingHeader() {
  return (
    <Header
      className="glass-header"
      style={{
        position: 'relative',          // contain the overlay
        background: 'transparent',     // remove AntD’s opaque bg
        borderBottom: '1px solid rgba(255,255,255,0.15)', // optional
        zIndex: 10                     // keep header above page content
      }}
    >
      {/* Frosted glass overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.08)',   // translucent layer
          backdropFilter: 'blur(10px)',           // glass!
          WebkitBackdropFilter: 'blur(10px)',
          pointerEvents: 'none',                  // don't block clicks
          zIndex: 0
        }}
      />

      {/* Content */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <SaveOutlined style={{ fontSize: 28, marginRight: 14, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))' }} />
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 26, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Add Booking
        </h2>
      </div>
    </Header>
  );
}
