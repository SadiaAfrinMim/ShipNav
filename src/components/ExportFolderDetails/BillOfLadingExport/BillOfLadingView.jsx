// File: BillOfLadingView.jsx
import React from "react";
import { Button } from "antd";

const BillOfLadingView = () => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full  bg-gray-200 flex flex-col">
      

      {/* ——— Main Sheet ——— */}
      <div className="flex-1 overflow-auto ">
        <div className="mx-auto bg-white border border-gray-500 shadow-sm text-[10px] leading-tight">
          {/* Top title row */}
          <div className="border-b border-gray-500 flex">
            {/* Logo area */}
            <div className="w-40 border-r border-gray-500 flex items-center justify-center py-3">
              <div className="w-32 h-10 border border-gray-400 flex items-center justify-center text-[9px] font-bold">
                LOGO
              </div>
            </div>
            {/* Bill of lading title */}
            <div className="flex-1 text-center py-2">
              <div className="font-bold text-[11px] tracking-wide">
                BILL OF LADING
              </div>
              <div className="text-[9px]">
                COMBINED TRANSPORT OR PORT TO PORT BILL OF LADING
              </div>
            </div>
          </div>

          {/* ——— Shipper / Consignee / Notify Party section ——— */}
          <div className="grid grid-cols-12 border-b border-gray-500">
            {/* SHIPPER */}
            <div className="col-span-4 border-r border-gray-500 p-1.5">
              <div className="font-semibold mb-1">SHIPPER</div>
              <div className="text-[9px]">
                ANNUMAN GARMENTS PVT LTD.
                <br />
                VILLAGE, UTTAR GACHABO, ASIA MADRASA ROAD ASIUAL, SAVAR, DHAKA,
                BANGLADESH
              </div>
            </div>

            {/* CONSIGNEE */}
            <div className="col-span-4 border-r border-gray-500 p-1.5">
              <div className="font-semibold mb-1">CONSIGNEE</div>
              <div className="text-[9px]">
                RESULT CLOTHING LIMITED
                <br />
                CLEMENT HOUSE, COMMERCE WAY COLCHESTER ESSEX CO2 8EY, UK
              </div>
            </div>

            {/* NOTIFY PARTY */}
            <div className="col-span-4 p-1.5">
              <div className="font-semibold mb-1">NOTIFY PARTY</div>
              <div className="text-[9px]">
                RESULT CLOTHING LIMITED
                <br />
                CLEMENT HOUSE, COMMERCE WAY COLCHESTER ESSEX CO2 8EY, UK
              </div>
            </div>
          </div>

          {/* ——— Carrier / Place of receipt / Port info etc. ——— */}
          <div className="grid grid-cols-12 border-b border-gray-500">
            <Cell label="PRE-CARRIAGE BY" value="HMM MONGOLIA 0037W" />
            <Cell label="PLACE OF RECEIPT" value="CHITTAGONG, BANGLADESH" />
            <Cell label="VESSEL" value="ONE INTEGRITY 0060W" />
            <Cell label="PORT OF LOADING" value="CHITTAGONG, BANGLADESH" />
            <Cell label="PORT OF DISCHARGE" value="FELIXSTOWE, UNITED KINGDOM" />
            <Cell label="PLACE OF DELIVERY" value="FELIXSTOWE, UNITED KINGDOM" />
          </div>

          {/* ——— Big description / marks & numbers row ——— */}
          <div className="grid grid-cols-12 border-b border-gray-500 min-h-[140px]">
            <div className="col-span-3 border-r border-gray-500 p-1.5">
              <div className="font-semibold">MARKS & NUMBERS</div>
              <div className="text-[9px] mt-1">
                RESULT
                <br />
                CONTAINERS & SEAL NUMBERS
              </div>
            </div>

            <div className="col-span-2 border-r border-gray-500 p-1.5">
              <div className="font-semibold">NUMBER OF PACKAGES</div>
              <div className="mt-1 text-[9px]">641 CARTONS</div>
              <div className="mt-4 text-[9px] italic">
                (Six Hundred And Forty One Only)
              </div>
            </div>

            <div className="col-span-5 border-r border-gray-500 p-1.5">
              <div className="font-semibold">
                DESCRIPTION OF GOODS AND PACKAGES
              </div>
              <div className="text-[9px] mt-1 space-y-0.5">
                <div>READYMADE GARMENTS,</div>
                <div>LONG PANTS</div>
                <div>STYLE # R327X</div>
                <div>HS CODE: 6203.43.00</div>
                <div>...</div>
              </div>
            </div>

            <div className="col-span-1 border-r border-gray-500 p-1.5 text-right">
              <div className="font-semibold">GROSS WEIGHT</div>
              <div className="mt-1 text-[9px]">6,208.80</div>
              <div className="text-[9px]">KILOGRAMS</div>
            </div>

            <div className="col-span-1 p-1.5 text-right">
              <div className="font-semibold">MEASUREMENT</div>
              <div className="mt-1 text-[9px]">27.68</div>
              <div className="text-[9px]">CBM</div>
            </div>
          </div>

          {/* ——— Container row ——— */}
          <div className="grid grid-cols-12 border-b border-gray-500">
            <HeaderCell className="col-span-3" text="CONTAINER NO." />
            <HeaderCell className="col-span-2" text="SIZE / MODE" />
            <HeaderCell className="col-span-2" text="CUSTOMS SEAL NO." />
            <HeaderCell className="col-span-2" text="NO OF PKGS" />
            <HeaderCell className="col-span-1" text="PKG TYPE" />
            <HeaderCell className="col-span-1" text="GROSS WEIGHT" />
            <HeaderCell className="col-span-1" text="VOLUME" />
          </div>

          <div className="grid grid-cols-12 border-b border-gray-500 min-h-[40px]">
            <BodyCell className="col-span-3" text="MNBU3462563" />
            <BodyCell className="col-span-2" text="40'HC / FCL/FCL" />
            <BodyCell className="col-span-2" text="2016052013" />
            <BodyCell className="col-span-2" text="641.00" />
            <BodyCell className="col-span-1" text="CARTONS" />
            <BodyCell className="col-span-1" text="6,208.80 KGS" />
            <BodyCell className="col-span-1" text="27.68 CBM" />
          </div>

          {/* ——— Freight & charges row ——— */}
          <div className="grid grid-cols-12 border-b border-gray-500">
            <HeaderCell className="col-span-4" text="FREIGHT AND CHARGES" />
            <HeaderCell className="col-span-4" text="PREPAID" />
            <HeaderCell className="col-span-4" text="COLLECT" />
          </div>
          <div className="grid grid-cols-12 border-b border-gray-500 min-h-[40px]">
            <BodyCell className="col-span-4" text="CFR" />
            <BodyCell className="col-span-4" text="" />
            <BodyCell className="col-span-4" text="" />
          </div>

          {/* ——— Grand total row ——— */}
          <div className="border-b border-gray-500 flex">
            <div className="flex-1 border-r border-gray-500 px-2 py-1 text-[9px]">
              JURISDICTION AND LAW CLAUSE
              <br />
              <span className="text-[8px]">
                THIS COMBINED TRANSPORT BILL OF LADING SHALL BE GOVERNED BY THE
                LAW OF BANGLADESH...
              </span>
            </div>
            <div className="w-48 px-2 py-1 text-right text-[9px] font-semibold">
              GRAND TOTAL
            </div>
          </div>

          {/* ——— Place & date / signature row ——— */}
          <div className="grid grid-cols-12 border-b border-gray-500">
            <BodyCell
              className="col-span-8"
              text="PLACE AND DATE OF ISSUE: DHAKA, BANGLADESH / 03.12.2025"
            />
            <BodyCell
              className="col-span-4 text-right pr-4"
              text="N2N SUPPLY CHAIN SOLUTIONS LTD. (AS CARRIER)"
            />
          </div>

          {/* bottom spacing for notes */}
          <div className="p-1.5 text-[8px] text-gray-500">
            TERMS & CONDITIONS ON REVERSE
          </div>
        </div>
      </div>
    </div>
  );
};

/** Small helpers */

const Cell = ({ label, value }) => (
  <div className="col-span-6 md:col-span-4 border-r border-gray-500 p-1.5">
    <div className="font-semibold">{label}</div>
    <div className="text-[9px] mt-0.5">{value}</div>
  </div>
);

const HeaderCell = ({ text, className = "" }) => (
  <div
    className={`border-r border-gray-500 px-2 py-1 font-semibold text-[9px] flex items-center ${className}`}
  >
    {text}
  </div>
);

const BodyCell = ({ text, className = "" }) => (
  <div
    className={`border-r last:border-r-0 border-gray-500 px-2 py-1 text-[9px] flex items-center ${className}`}
  >
    {text}
  </div>
);

export default BillOfLadingView;
