import React from "react";

const CargoReceivePrint = () => {
  // demo data (পরে API/props থেকে আনবে)
  const topLeft = {
    bookingNo: "ES4525120015",
    date: "04.12.2025",
    cargoReceive: "04.12.2025",
    status: "OPENED",
    shipper: "ANUMAN GARMENTS PVT LTD.",
    carrier: "HMM",
    scNo: "HT/AGPL-12/2025",
    expNo: "0432-000671-2025",
    comInvoiceNo: "AGL/FLH/ITL/53",
    placeOfReceipt: "CHITTAGONG",
    portOfDischarge: "FELIXSTOWE",
  };

  const topRight = {
    consignee: "RESULT CLOTHING LIMITED",
    agent: "PRECISION SUPPLY CHAIN INTERNATIONAL LTD.",
    scDate: "08.07.2025",
    expDate: "01.12.2025",
    comInvoiceDate: "01.12.2025",
    portOfLoading: "CHITTAGONG",
    finalDestination: "FELIXSTOWE",
  };

  const descriptionOfGoods = [
    "READYMADE GARMENTS,",
    "LONG PANTS",
    "STYLE # R327X",
    "H.S CODE: 6203.43.00",
    "SHORT PANTS",
    "STYLE # R328X",
    "H.S CODE: 6203.43.00",
    "LONG PANTS",
    "STYLE # R310X",
    "H.S CODE: 6203.43.00",
    "SHORT PANTS",
    "STYLE # R311X",
    "H.S CODE: 6203.43.00",
    "UNISEX VEST",
    "STYLE # R123X",
    "H.S CODE: 6201.40.00",
  ];

  return (
    <div className="min-h-screen bg-slate-100 ">
      <div className="mx-auto bg-white shadow-md border border-slate-200">
       

        {/* title */}
        <div className="py-4 text-center">
          <h1 className="tracking-[0.3em] text-[13px] font-semibold text-slate-800">
            CARGO RECEIVE
          </h1>
        </div>

        {/* top details */}
        <div className="px-8 pb-4 text-[11px] leading-relaxed text-slate-800">
          <div className="grid grid-cols-2 gap-16">
            {/* left block */}
            <div className="space-y-1.5">
              <DetailRow label="BOOKING NO." value={`: ${topLeft.bookingNo}`} />
              <DetailRow label="DATE" value={`: ${topLeft.date}`} />
              <DetailRow
                label="CARGO RECEIVE"
                value={`: ${topLeft.cargoReceive}`}
              />
              <DetailRow label="STATUS" value={`: ${topLeft.status}`} />
              <DetailRow label="SHIPPER" value={`: ${topLeft.shipper}`} />
              <DetailRow label="CARRIER" value={`: ${topLeft.carrier}`} />
              <DetailRow label="SC NO." value={`: ${topLeft.scNo}`} />
              <DetailRow label="EXP. NO." value={`: ${topLeft.expNo}`} />
              <DetailRow
                label="COM. INVOICE NO."
                value={`: ${topLeft.comInvoiceNo}`}
              />
              <DetailRow
                label="PLACE OF RECEIPT"
                value={`: ${topLeft.placeOfReceipt}`}
              />
              <DetailRow
                label="PORT OF DISCHARGE"
                value={`: ${topLeft.portOfDischarge}`}
              />
            </div>

            {/* right block */}
            <div className="space-y-1.5">
              <DetailRow
                label="CONSIGNEE"
                value={`: ${topRight.consignee}`}
              />
              <DetailRow label="AGENT" value={`: ${topRight.agent}`} />
              <DetailRow label="SC DATE" value={`: ${topRight.scDate}`} />
              <DetailRow label="EXP. DATE" value={`: ${topRight.expDate}`} />
              <DetailRow
                label="COM. INVOICE DATE"
                value={`: ${topRight.comInvoiceDate}`}
              />
              <DetailRow
                label="PORT OF LOADING"
                value={`: ${topRight.portOfLoading}`}
              />
              <DetailRow
                label="FINAL DESTINATION"
                value={`: ${topRight.finalDestination}`}
              />
            </div>
          </div>
        </div>

        {/* middle big row: Marks & Description */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-3 border border-slate-400 text-[11px]">
            <div className="border-r border-slate-400 px-3 py-1.5 font-semibold">
              MARKS & NO.
            </div>
            <div className="border-r border-slate-400 px-3 py-1.5 font-semibold text-center">
              RESULT
            </div>
            <div className="px-3 py-1.5 font-semibold">DESCRIPTION OF GOODS</div>

            {/* content row */}
            <div className="border-t border-r border-slate-400 min-h-[120px]" />
            <div className="border-t border-r border-slate-400 min-h-[120px]" />
            <div className="border-t border-slate-400 px-3 py-2 text-[10px] leading-tight">
              {descriptionOfGoods.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom table */}
        <div className="px-6 pb-4 text-[10px]">
          <table className="w-full border border-slate-400 border-collapse">
            <thead>
              <tr>
                <Th>P/O#</Th>
                <Th>STYLE</Th>
                <Th>COLOR</Th>
                <Th>S/O</Th>
                <Th>CARTON</Th>
                <Th>PACKAGE</Th>
                <Th>PCS</Th>
                <Th colSpan={3}>DIMENSION</Th>
                <Th>CBM</Th>
                <Th>GWT</Th>
              </tr>
              <tr>
                <Th />
                <Th />
                <Th />
                <Th />
                <Th />
                <Th />
                <Th />
                <Th>LENGTH</Th>
                <Th>WIDTH</Th>
                <Th>HEIGHT</Th>
                <Th />
                <Th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>R327X</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td className="text-right">641.00</Td>
                <Td>CARTONS</Td>
                <Td className="text-right">8,610.00</Td>
                <Td className="text-right">60.00</Td>
                <Td className="text-right">40.00</Td>
                <Td className="text-right">18.00</Td>
                <Td className="text-right">27.680</Td>
                <Td className="text-right">6,268.80</Td>
              </tr>

              {/* total row */}
              <tr className="font-semibold">
                <Td colSpan={4} className="text-center">
                  TOTAL =
                </Td>
                <Td className="text-right">641.00</Td>
                <Td></Td>
                <Td className="text-right">8,610.00</Td>
                <Td colSpan={3}></Td>
                <Td className="text-right">27.680</Td>
                <Td className="text-right">6,268.80</Td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* remark */}
        <div className="px-8 pb-6 text-[10px]">
          <div className="flex gap-4">
            <span className="font-semibold">REMARK</span>
            <span>:</span>
            <span className="flex-1 border-b border-dotted border-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex">
    <div className="w-[130px] uppercase tracking-[0.04em]">{label}</div>
    <div className="flex-1">{value}</div>
  </div>
);

const Th = ({ children, colSpan }) => (
  <th
    colSpan={colSpan}
    className="border border-slate-400 px-1.5 py-1 text-[10px] font-semibold text-center"
  >
    {children}
  </th>
);

const Td = ({ children, colSpan, className = "" }) => (
  <td
    colSpan={colSpan}
    className={`border border-slate-400 px-1.5 py-1 align-top ${className}`}
  >
    {children}
  </td>
);

export default CargoReceivePrint;
