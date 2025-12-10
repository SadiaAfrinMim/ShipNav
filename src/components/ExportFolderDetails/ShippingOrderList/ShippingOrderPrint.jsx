// File: ShippingOrderPrint.jsx
import React from "react";
import { Button } from "antd";
import {
  PrinterOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ShippingOrderPrint = () => {
  const handlePrint = () => window.print();
  const handleClose = () => window.history.back();

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center ">
      <div className="bg-white shadow-md border border-gray-400">
     

        {/* ==== Document Title ==== */}
        <div className="border-b border-gray-400 py-3 text-center">
          <h1 className="text-lg font-semibold tracking-[0.3em]">
            SHIPPING ORDER
          </h1>
        </div>

        {/* ==== Body Wrapper ==== */}
        <div className="text-[10px] leading-tight">
          {/* === Row 1: Dates / Booking info === */}
          <div className="flex border-b border-gray-400">
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              <div className="font-semibold">PRINT DATE :</div>
              <div>03.11.2025</div>
            </div>
            <div className="flex-[1.5] border-r border-gray-400 px-2 py-1">
              <div className="font-semibold">BOOKING NO :</div>
              <div>NEN25/300144</div>
            </div>
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              <div className="font-semibold">DATE :</div>
              <div>03.11.2025</div>
            </div>
            <div className="flex-1 px-2 py-1">
              <div className="font-semibold">SO NO :</div>
              <div>SO230005089</div>
            </div>
          </div>

          {/* === Row 2: Shipper / Consignee header info === */}
          <div className="flex border-b border-gray-400">
            <div className="flex-[1.5] border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">
                Shipper&apos;s Name And Address
              </div>
              <div className="mt-1">
                ANNEX GARMENTS LTD.<br />
                UNIQUE TOWER (2ND FLOOR), 41/1 MADARSAH ROAD<br />
                AZIMPUR, DHAKA, BANGLADESH
              </div>
            </div>
            <div className="flex-[1.5] border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">
                Consignee&apos;s Name And Address
              </div>
              <div className="mt-1">
                RESULT CLOTHING LIMITED<br />
                ELEMENT HOUSE, COMMERCE WAY<br />
                COLCHESTER ESSEX CO2 8HY, U.K.
              </div>
            </div>
            <div className="flex-[1.2] px-2 py-1">
              <div className="font-semibold uppercase">
                Documentary Instructions
              </div>
              <div className="mt-1">
                WE WARRANT/DECLARE THAT THE PARTICULARS FURNISHED BY
                US ARE CORRECT AND COMPLETE AND YOU SHOULD BE FULLY
                RESPONSIBLE FOR THE CONTRACT &amp; SOLICITATION OF CARGO.
              </div>
            </div>
          </div>

          {/* === Row 3: Contact / Acknowledgement === */}
          <div className="flex border-b border-gray-400">
            <div className="flex-[1.5] border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">
                Remarks / Special Notes
              </div>
              <div className="mt-1">
                CONTACT DETAILS OF CONTACT PERSON FOR SHIPPING ORDER:<br />
                CONTACT (1): MR. A — +8801XXXXXXXXX<br />
                CONTACT (2): MR. B — +8801XXXXXXXXX
              </div>
            </div>
            <div className="flex-[1.5] border-r border-gray-400 px-2 py-1 flex flex-col justify-between">
              <div>
                <div className="font-semibold uppercase">
                  Shipper&apos;s Signature &amp; Date
                </div>
                <div className="mt-6 border-t border-gray-400 pt-1 text-center">
                  ___________________________
                </div>
              </div>
              <div className="mt-2">
                <div className="font-semibold uppercase">
                  Signature &amp; Date
                </div>
                <div className="mt-3 border-t border-gray-400 pt-1 text-center">
                  ___________________________
                </div>
              </div>
            </div>
            <div className="flex-[1.2] px-2 py-1">
              <div className="font-semibold uppercase">
                Acknowledgement By NVOC/NVOCC
              </div>
              <div className="mt-1">
                WE ACKNOWLEDGE THAT THE PARTICULARS FURNISHED BY SHIPPER
                ARE CORRECT AND COMPLETE.
              </div>
            </div>
          </div>

          {/* === Row 4: Ports === */}
          <div className="flex border-b border-gray-400">
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">Place Of Receipt</div>
              <div className="mt-2">CHATTOGRAM</div>
            </div>
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">Port Of Loading</div>
              <div className="mt-2">CHATTOGRAM</div>
            </div>
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">Port Of Discharge</div>
              <div className="mt-2">FELIXSTOWE</div>
            </div>
            <div className="flex-1 px-2 py-1">
              <div className="font-semibold uppercase">Final Destination</div>
              <div className="mt-2">FELIXSTOWE</div>
            </div>
          </div>

          {/* === Row 5: Big cargo table === */}
          {/* Header */}
          <div className="flex border-b border-gray-400 font-semibold text-[9px]">
            <div className="w-[24%] border-r border-gray-400 px-2 py-1">
              Marks And Numbers
            </div>
            <div className="w-[12%] border-r border-gray-400 px-2 py-1">
              No. Of Packages
            </div>
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              Description Of Goods
            </div>
            <div className="w-[12%] border-r border-gray-400 px-2 py-1 text-center">
              Gross Weight (KG)
            </div>
            <div className="w-[12%] px-2 py-1 text-center">
              Measurement (CBM)
            </div>
          </div>
          {/* Body */}
          <div className="flex border-b border-gray-400 h-40">
            <div className="w-[24%] border-r border-gray-400 px-2 py-1 flex items-start">
              RESULT
            </div>
            <div className="w-[12%] border-r border-gray-400 px-2 py-1 flex items-center justify-center text-center">
              510.00<br />
              (FIVE HUNDRED TEN ONLY)
            </div>
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              FIVE HUNDRED TEN CARTONS ONLY<br />
              KNITTED GARMENTS<br />
              LONG SLEEVES<br />
              STYLE # 41279K<br />
              HS CODE: 6109.10.00<br />
              STYLE # 41279L<br />
              HS CODE: 6109.10.00<br />
              {/* ...etc – তুমি চাইলে এখানে full list বসাতে পারো */}
            </div>
            <div className="w-[12%] border-r border-gray-400 px-2 py-1 text-center flex items-end justify-center">
              531.50
            </div>
            <div className="w-[12%] px-2 py-1 text-center flex items-end justify-center">
              27.940
            </div>
          </div>

          {/* === Row 6: Warehouse / Declaration === */}
          <div className="flex border-b border-gray-400">
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">
                Warehouse Acknowledgement And Physical Report
              </div>
              <div className="mt-1">
                REMARKS: PLEASE BRING ORIGINAL WITH SIGNATURE AND COMPANY SEAL
                AND COPY TO OUR WAREHOUSE WHEN DELIVERING CARGO.
              </div>
            </div>
            <div className="flex-1 border-r border-gray-400 px-2 py-1">
              <div className="font-semibold uppercase">
                Shipper&apos;s Declaration
              </div>
              <div className="mt-1">
                WE HEREBY DECLARE THAT THE DESCRIPTION OF CONTENT AND
                MEASUREMENT OF THE PACKAGES AND GOODS STATED IN THIS SO
                RECEIPT ARE CORRECT.
              </div>
            </div>
            <div className="flex-1 px-2 py-1">
              <div className="font-semibold uppercase">
                Warehouse Declaration
              </div>
              <div className="mt-1">
                WE ACKNOWLEDGE RECEIPT OF CARGO IN APPARENT GOOD ORDER
                AND CONDITION. DIMENSION FOUND AS STATED IN PHYSICAL REPORT.
              </div>
            </div>
          </div>

          {/* Signature Row */}
          <div className="flex border-b border-gray-400 text-center">
            <div className="flex-1 border-r border-gray-400 px-2 py-3">
              <div className="font-semibold uppercase">
                Shipper&apos;s / Cnee&apos;s Agent&apos;s Signature &amp; Stamp
              </div>
              <div className="mt-6 border-t border-gray-400 pt-1">
                ___________________________
              </div>
            </div>
            <div className="flex-1 px-2 py-3">
              <div className="font-semibold uppercase">
                Signature Of CFS / Dock &amp; Stamp
              </div>
              <div className="mt-6 border-t border-gray-400 pt-1">
                ___________________________
              </div>
            </div>
          </div>

          {/* === Footer small table (PO# etc) === */}
          <div className="border-b border-gray-400">
            {/* Header */}
            <div className="grid grid-cols-11 border-b border-gray-400 font-semibold text-[9px]">
              <div className="col-span-2 border-r border-gray-400 px-1 py-1">
                PO#
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                Style
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                Color
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                S/O
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                Carton
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                Package
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                PCS
              </div>
              <div className="col-span-3 px-1 py-1 text-center">
                Dimension (L x W x H)
              </div>
            </div>
            {/* One sample row */}
            <div className="grid grid-cols-11">
              <div className="col-span-2 border-r border-gray-400 px-1 py-1">
                8327N
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                41279K
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                Navy
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                S/O
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1 text-right">
                510
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1">
                Cartons
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1 text-right">
                8,400
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1 text-right">
                60.0
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1 text-right">
                40.0
              </div>
              <div className="col-span-1 px-1 py-1 text-right">
                31.0
              </div>
            </div>

            {/* Total row */}
            <div className="grid grid-cols-11 border-t border-gray-400">
              <div className="col-span-5 border-r border-gray-400 px-1 py-1 font-semibold text-right">
                TOTAL =
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1 text-right">
                510
              </div>
              <div className="col-span-1 border-r border-gray-400 px-1 py-1" />
              <div className="col-span-1 border-r border-gray-400 px-1 py-1 text-right">
                8,400
              </div>
              <div className="col-span-3 px-1 py-1 text-right">
                CBM 27.940
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingOrderPrint;
