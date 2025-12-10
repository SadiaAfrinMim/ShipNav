// File: FirstLegMasterBLView.jsx
import React from "react";
import { Button } from "antd";

const FirstLegMasterBLView = () => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full  bg-gray-200 flex flex-col">
     

      {/* ── Main Sheet ────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto bg-white border border-gray-500 shadow-sm text-[10px] leading-tight ">
          {/* Title */}
          <div className="border-b border-gray-500 py-3 text-center">
            <div className="font-semibold text-[12px] tracking-wide">
              1ST LEG MASTER B/L
            </div>
          </div>

          {/* Top Info: left & right columns */}
          <div className="grid grid-cols-12 gap-y-1 px-10 pt-6 pb-4 border-b border-gray-500">
            {/* LEFT SIDE */}
            <InfoRow
              leftLabel="DATE *"
              leftValue="02/12/2025"
              rightLabel="REFERENCE"
              rightValue="ESMBI25000001"
            />
            <InfoRow
              leftLabel="MBL NO."
              leftValue="ONEYDACF27869400"
              rightLabel="CARRIER"
              rightValue="ONE LINE"
            />
            <InfoRow
              leftLabel="ORIGIN AGENT"
              leftValue="N2N SUPPLY CHAIN SOLUTIONS LTD"
              rightLabel="DESTINATION AGENT"
              rightValue="ONE CONTAINER LINE GMBH"
            />
            <InfoRow
              leftLabel="POL"
              leftValue="CHITTAGONG"
              rightLabel="POD"
              rightValue="ANTWERP"
            />
            <InfoRow
              leftLabel="ETD DATE"
              leftValue="09/12/2025"
              rightLabel="ETA DATE"
              rightValue="29/01/2026"
            />
            <InfoRow
              leftLabel="STATUS"
              leftValue=""
              rightLabel="REMARK"
              rightValue="ONE QUOTE R00013487EJ"
            />
          </div>

          {/* Table header */}
          <div className="mt-4 mx-4 border border-gray-500">
            <div className="grid grid-cols-12 border-b border-gray-500 bg-gray-50">
              <HeadCell className="col-span-3" text="HAWB" />
              <HeadCell className="col-span-3" text="SHIPPER" />
              <HeadCell className="col-span-2" text="CONSIGNEE" />
              <HeadCell className="col-span-2 text-right" text="QTY" />
              <HeadCell className="col-span-1 text-right" text="CBM" />
              <HeadCell className="col-span-1 text-right" text="GWT" />
            </div>

            {/* Body rows (sample data from screenshot-style) */}
            <BodyRow
              hawb="ESJ#25000002"
              shipper="RADICAL DESIGN LIMITED"
              consignee="OFFTEX AG"
              qty="38,809.00"
              cbm="29.300"
              gwt="5,698.09"
            />
            <BodyRow
              hawb="ESJ#25000003"
              shipper="SOLITEX FASHION LTD."
              consignee="OFFTEX AG"
              qty="5,832.00"
              cbm="8.190"
              gwt="1,409.50"
            />
            <BodyRow
              hawb="ESJ#25000004"
              shipper="ENNICH LIMITED"
              consignee="OFFTEX AG"
              qty="11,400.00"
              cbm="22.900"
              gwt="3,097.36"
            />
            <BodyRow
              hawb="ESJ#25000005"
              shipper="TANZILA TEXTILE LIMITED"
              consignee="METRO BOUTIQUES AG"
              qty="0.00"
              cbm="13.760"
              gwt="2,254.40"
            />
            <BodyRow
              hawb="ESJ#25000008"
              shipper="RADICAL DESIGN LIMITED"
              consignee="OFFTEX AG"
              qty="5,219.00"
              cbm="36.450"
              gwt="7,389.11"
            />
            <BodyRow
              hawb="ESJ#25000009"
              shipper="SOLITEX FASHION LTD."
              consignee="OFFTEX AG"
              qty="0.00"
              cbm="10.640"
              gwt="2,447.40"
            />

            {/* TOTAL row */}
            <div className="grid grid-cols-12">
              <div className="col-span-8 border-r border-t border-gray-500 px-2 py-1 text-center text-[9px] font-semibold">
                TOTAL =
              </div>
              <Cell className="col-span-2 text-right border-t" text="1,08,232.00" />
              <Cell className="col-span-1 text-right border-t" text="121.24" />
              <Cell className="col-span-1 text-right border-t" text="22,295.86" />
            </div>
          </div>

          {/* Bottom signatures */}
          <div className="mt-12 mb-8 px-10 flex justify-between text-[9px]">
            <div className="text-center">
              <div className="border-t border-gray-500 w-40 mx-auto mb-1" />
              PREPARED BY: MD. ABIR HOSSAIN
            </div>
            <div className="text-center">
              <div className="border-t border-gray-500 w-40 mx-auto mb-1" />
              CHECKED BY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Small helper components ───────────────────────── */

const InfoRow = ({ leftLabel, leftValue, rightLabel, rightValue }) => (
  <>
    <div className="col-span-6 flex">
      <div className="w-28 font-semibold">{leftLabel}</div>
      <div className="flex-1">: {leftValue}</div>
    </div>
    <div className="col-span-6 flex">
      <div className="w-32 font-semibold">{rightLabel}</div>
      <div className="flex-1">: {rightValue}</div>
    </div>
  </>
);

const HeadCell = ({ text, className = "" }) => (
  <div
    className={`border-r last:border-r-0 border-gray-500 px-2 py-1 font-semibold text-[9px] flex items-center ${className}`}
  >
    {text}
  </div>
);

const Cell = ({ text, className = "" }) => (
  <div
    className={`border-r last:border-r-0 border-gray-500 px-2 py-1 text-[9px] flex items-center ${className}`}
  >
    {text}
  </div>
);

const BodyRow = ({ hawb, shipper, consignee, qty, cbm, gwt }) => (
  <div className="grid grid-cols-12 border-b border-gray-500 last:border-b-0">
    <Cell className="col-span-3" text={hawb} />
    <Cell className="col-span-3" text={shipper} />
    <Cell className="col-span-2" text={consignee} />
    <Cell className="col-span-2 text-right" text={qty} />
    <Cell className="col-span-1 text-right" text={cbm} />
    <Cell className="col-span-1 text-right" text={gwt} />
  </div>
);

export default FirstLegMasterBLView;
