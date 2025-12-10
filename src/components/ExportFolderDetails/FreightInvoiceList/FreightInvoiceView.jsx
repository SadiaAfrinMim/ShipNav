// File: FreightInvoiceView.jsx
import React from "react";
import { Button } from "antd";
import { PrinterOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------
   STATIC JSON DATA – এখানে সব ডেটা রাখা হয়েছে
------------------------------------------------------------------ */
const freightInvoiceData = {
  title: "FREIGHT INVOICE",

  invoiceInfoLeft: [
    { label: "INVOICE TO", value: "ANJUMAN GARMENTS PVT. LTD." },
    {
      label: "",
      value:
        "UNIQUE, UTTAR GAZIRCHOT, ASHULIA, SAVAR, DHAKA, BANGLADESH",
    },
    { label: "JOB REFERENCE", value: "ESMBI25000002" },
    { label: "HBL", value: "N2NES120014" },
    { label: "MBL", value: "DACES2332000" },
    { label: "POL", value: "CHITTAGONG" },
    { label: "POD", value: "CHITTAGONG" },
    { label: "FINAL DESTINATION", value: "BANGLADESH" },
    { label: "ETD", value: "05/12/2025" },
    { label: "ETA", value: "10/01/2026" },
  ],

  invoiceInfoRight: [
    { label: "INVOICE NO.", value: "ESFII25000001" },
    { label: "INVOICE DATE", value: "05/12/2025" },
    { label: "SHIPPER", value: "ANJUMAN GARMENTS PVT. LTD." },
    { label: "CONSIGNEE", value: "RESULT CLOTHING LIMITED" },
    { label: "CARRIER", value: "HMM" },
    { label: "VESSEL/VOYAGE", value: "HMM MONGIA / 0027N" },
    { label: "COMMODITY", value: "READY MADE GARMENTS" },
    { label: "PACKAGES", value: "510.00" },
    { label: "GWT", value: "5,321.50" },
    { label: "VOLUME WT", value: "37.94 CBM" },
    { label: "TOS", value: "CFR" },
  ],

  tableRows: [
    {
      sl: 1,
      head: "FREIGHT",
      unit: "1.00 40'HC",
      chargeUnit: "984.00",
      currency: "USD",
      chargeAmount: "984.00",
      rate: "122.00",
      amount: "1,20,048.00",
    },
    {
      sl: 2,
      head: "EXPORT DOCS & COLLECTION",
      unit: "1.00 HBL",
      chargeUnit: "2,500.00",
      currency: "BDT",
      chargeAmount: "2,500.00",
      rate: "1.00",
      amount: "2,500.00",
    },
  ],

  totalAmount: "1,22,548.00",
  netReceivable: "1,22,548.00",

  inWords:
    "ONE LAKI TWENTY TWO THOUSAND FIVE HUNDRED AND FORTY EIGHT ONLY.",

  container: "HMMU6454320 - 40'HC",

  notes: [
    'PAYMENT SHOULD BE MADE BY CHEQUE/PAYORDER AND MADE PAYABLE TO "N2NNA LOGISTICS BD".',
    "FAILURE TO PAY WITHIN AGREED CREDIT TERMS MAY LEAD TO THE WITHDRAWAL OF CREDIT FACILITIES OR INTEREST 1.5% PER MONTH WILL BE CHARGED UNTIL FULL PAYMENT.",
    "E.&O.E. ALL BUSINESS TRANSACTIONS ARE IN ACCORDANCE WITH OUR STANDARD TRADING CONDITIONS. ANY DISCREPANCIES TO THE INVOICE MUST MADE WITHIN 7 DAYS FROM THE ABOVE DATE.",
  ],

  bank: {
    name: "NZN SUPPLY CHAIN SOLUTIONS LIMITED",
    number: "1041600060282",
    bank: "EASTERN BANK PLC",
    address: "100 GULSHAN AVENUE, DHAKA, BANGLADESH.",
    branch: "GULSHAN BRANCH",
    routing: "095261720",
    swift: "EBLDBDDH",
  },
};

/* ------------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------------ */
const FreightInvoiceView = () => {
  const navigate = useNavigate();

  const handlePrint = () => window.print();
  const handleClose = () => navigate(-1); // চাইলে এখানে নির্দিষ্ট route দিতে পারো

  return (
    <div className="w-full  bg-gray-200 flex flex-col">
      {/* Top header bar (Print / Close) */}
     
      {/* ── Main Sheet (A4 like) ───────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto  bg-white border border-gray-500 shadow-sm text-[10px] leading-tight">
          {/* Title */}
          <div className="border-b border-gray-500 py-3 text-center">
            <div className="font-semibold text-[12px] tracking-wide">
              {freightInvoiceData.title}
            </div>
          </div>

          {/* Top Info: left & right column */}
          <div className="px-8 pt-6 pb-4 grid grid-cols-2 gap-y-1 border-b border-gray-500">
            {/* LEFT SIDE */}
            <div className="space-y-1">
              {freightInvoiceData.invoiceInfoLeft.map((row, idx) => (
                <InfoRow
                  key={idx}
                  label={row.label}
                  value={row.value}
                />
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-1">
              {freightInvoiceData.invoiceInfoRight.map((row, idx) => (
                <InfoRow
                  key={idx}
                  label={row.label}
                  value={row.value}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="px-4 pt-3 pb-1">
            <table className="w-full border border-gray-500 border-collapse text-[10px]">
              <thead>
                <tr className="bg-gray-50">
                  <Th>S/L</Th>
                  <Th>ACCOUNT HEAD</Th>
                  <Th>UNIT</Th>
                  <Th>CHARGE/ UNIT</Th>
                  <Th>CURRENCY</Th>
                  <Th>CHARGE AMOUNT</Th>
                  <Th>EXCHANGE RATE</Th>
                  <Th>AMOUNT</Th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic rows from JSON */}
                {freightInvoiceData.tableRows.map((row) => (
                  <tr key={row.sl}>
                    <Td className="text-center">{row.sl}</Td>
                    <Td>{row.head}</Td>
                    <Td className="text-center">{row.unit}</Td>
                    <Td className="text-right">{row.chargeUnit}</Td>
                    <Td className="text-center">{row.currency}</Td>
                    <Td className="text-right">{row.chargeAmount}</Td>
                    <Td className="text-right">{row.rate}</Td>
                    <Td className="text-right">{row.amount}</Td>
                  </tr>
                ))}

                {/* TOTAL */}
                <tr>
                  <Td colSpan={7} className="font-semibold text-right">
                    TOTAL AMOUNT =
                  </Td>
                  <Td className="text-right font-semibold">
                    {freightInvoiceData.totalAmount}
                  </Td>
                </tr>
                <tr>
                  <Td colSpan={7} className="font-semibold text-right">
                    NET RECEIVABLE =
                  </Td>
                  <Td className="text-right font-semibold">
                    {freightInvoiceData.netReceivable}
                  </Td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* In Words & Notes + Bank Details */}
          <div className="px-4 pb-6">
            {/* In words */}
            <div className="border border-gray-500 border-t-0 px-2 py-1 text-[9px]">
              <span className="font-semibold mr-1">IN WORDS:</span>
              {freightInvoiceData.inWords}
            </div>

            {/* Container + Notes + Bank box */}
            <div className="mt-2 flex gap-2">
              {/* Left text / notes */}
              <div className="flex-1 text-[9px] border border-gray-500 px-2 py-2 space-y-1">
                <div>
                  CONTAINER NO. AND TYPES: {freightInvoiceData.container}
                </div>

                <ol className="list-decimal ml-4 space-y-0.5 mt-1">
                  {freightInvoiceData.notes.map((n, idx) => (
                    <li key={idx}>{n}</li>
                  ))}
                </ol>
              </div>

              {/* Bank details box (right side) */}
              <div className="w-[380px] border border-gray-500 text-[9px]">
                <div className="border-b border-gray-500 bg-gray-100 text-center font-semibold py-1">
                  BANK DETAILS
                </div>
                <div className="px-3 py-2 space-y-0.5">
                  <div>
                    A/C NAME: {freightInvoiceData.bank.name}
                  </div>
                  <div>
                    A/C NO.: {freightInvoiceData.bank.number}
                  </div>
                  <div>
                    BANK NAME: {freightInvoiceData.bank.bank}
                  </div>
                  <div>
                    BANK ADDRESS: {freightInvoiceData.bank.address}
                  </div>
                  <div>
                    BANK BRANCH: {freightInvoiceData.bank.branch}
                  </div>
                  <div>
                    ROUTING NUMBER: {freightInvoiceData.bank.routing}
                  </div>
                  <div>
                    SWIFT CODE: {freightInvoiceData.bank.swift}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

/* ------------------------------------------------------------------
   Helper components
------------------------------------------------------------------ */

const InfoRow = ({ label, value }) => (
  <div className="flex">
    {label && <div className="w-32 font-semibold">{label}</div>}
    {label && <div className="mx-1">:</div>}
    <div className="flex-1">{value}</div>
  </div>
);

const Th = ({ children }) => (
  <th className="border border-gray-500 px-2 py-1 text-left font-semibold">
    {children}
  </th>
);

const Td = ({ children, className = "", ...rest }) => (
  <td
    className={`border border-gray-500 px-2 py-1 align-top ${className}`}
    {...rest}
  >
    {children}
  </td>
);

export default FreightInvoiceView;
