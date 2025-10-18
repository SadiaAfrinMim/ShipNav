import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd"; // Import ConfigProvider
import "./index.css";
import App from "./App.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import MindBlowingNavbar from "./components/navbar.jsx";
import Login from "./pages/Login.jsx";
import BookingImportGlassForm from "./components/BookingFromInputField.jsx";
import Dashboard from "./components/ExportFolderDetails/DashBoard.jsx";

import StuffingPlanList from "./components/ExportFolderDetails/StuffingPlanList/StuffingPlanList.jsx";

import CargoExportLayout from "./components/ExportFolderDetails/CargoReceiveList/Layout/CargoExportLayout.jsx";
import CargoEXportAddCargo from "./components/ExportFolderDetails/CargoReceiveList/Layout/CargoEXportAddCargo.jsx";



import BookingExportLayout from "./components/ExportFolderDetails/BookingList/Layout/BookingExportLayout.jsx";
import ShippingEXportAddShippingOrder from "./components/ExportFolderDetails/ShippingOrderList/Layout/ShippingEXportAddShippingOrder.jsx";
import ShippingExportLayout from "./components/ExportFolderDetails/ShippingOrderList/Layout/ShippingExportLayout.jsx";
import StuffingExportLayout from "./components/ExportFolderDetails/StuffingPlanList/Layout/StuffingExportLayout.jsx";
import AddStuffingPlanFromLayout from "./components/ExportFolderDetails/StuffingPlanList/Layout/AddStuffingPlanFromLayout.jsx";

import AddStuffingPackageLayout from "./components/ExportFolderDetails/StuffingPackageList/Layout/StuffingPackageLayout.jsx";

import StuffingPackageLayout from "./components/ExportFolderDetails/StuffingPackageList/Layout/StuffingPackageLayout.jsx";
import ExportSeaShipmentAdviceLayout from "./components/ExportFolderDetails/ExportSeaShipmentAdvice/Layout/ExportSeaShipmentAdviceLayout.jsx";
import ShipmentAdviceFormLayout from "./components/ExportFolderDetails/ExportSeaShipmentAdvice/Layout/ShipmentAdviceFormLayout .jsx";
import BillOfLadingExportLayout from "./components/ExportFolderDetails/BillOfLadingExport/Layout/BillOfLadingExportLayout.jsx";
import BillOfLadingExportFrom from "./components/ExportFolderDetails/BillOfLadingExport/Layout/BillOfLadingExportFrom.jsx";
import LegMasterBillList from "./components/ExportFolderDetails/SharedAllListFrom/SharedList/LegMasterBillList.jsx";
import LegMasterBillListLayout from "./components/ExportFolderDetails/LegMasterBillList/Layout/LegMasterBillListLayout.jsx";
import AddFirstLegMasterBill from "./components/ExportFolderDetails/SharedAllListFrom/SharedFrom/AddFirstLegMasterBill.jsx";
import AddFirstLegMasterBillLayout from "./components/ExportFolderDetails/LegMasterBillList/Layout/AddFirstLegMasterBillLayout.jsx";
import FreightInvoiceListLayout from "./components/ExportFolderDetails/FreightInvoiceList/Layout/FreightInvoiceListLayout.jsx";
import AddDebitNoteLayout from "./components/ExportFolderDetails/DebitNoteList/Layout/AddDebitNoteLayout.jsx";
import DebitNoteListLayout from "./components/ExportFolderDetails/DebitNoteList/Layout/DebitNoteListLayout.jsx";
import AddFreightInvoiceLayout from "./components/ExportFolderDetails/FreightInvoiceList/Layout/AddFreightInvoiceLayout.jsx";
import AddFreightInvoice from "./components/ExportFolderDetails/FreightInvoiceList/AddFreightInvoiceFrom.jsx";
import AddDebitNote from "./components/ExportFolderDetails/SharedAllListFrom/SharedFrom/AddDebitNote.jsx";
import CreditNoteListLayout from "./components/ExportFolderDetails/CreditNoteList/Layout/CreditNoteListLayout.jsx";
import AddCreditNoteListLayout from "./components/ExportFolderDetails/CreditNoteList/Layout/AddCreditNoteListLayout.jsx";
import PLExpSea from "./components/ExportFolderDetails/PLExpSea/PLExpSea.jsx";
import VolumeStatementExpSea from "./components/ExportFolderDetails/VolumeStatementExpSea/VolumeStatementExpSea.jsx";
import ExportSeaBookingLayout from "./components/ExportSeaFolderDetails/ExportSeaBooking/Layout/ExportSeaBookingLayout.jsx";
import ExportSeaAddBooking from "./components/ExportSeaFolderDetails/ExportSeaBooking/Layout/ExportSeaAddBooking.jsx";
import ShippingExportAirLayout from "./components/ExportSeaFolderDetails/ExportSeaShipping/Layout/ShippingExportAirLayout.jsx";
import ShippingEXportAirAddShippingOrder from "./components/ExportSeaFolderDetails/ExportSeaShipping/Layout/ShippingEXportAirAddShippingOrder.jsx";
import ExportAirCargoLayout from "./components/ExportSeaFolderDetails/ExportAirCargo/Layout/ExportAirCargoLayout.jsx";
import ExportAirCargoAddLayout from "./components/ExportSeaFolderDetails/ExportAirCargo/Layout/ExportAirCargoAddLayout.jsx";
import ExportAirMasterListLayout from "./components/ExportSeaFolderDetails/ExportAirMasterBill/Layout/ExportAirMasterListLayout.jsx";
import ExportAirMasterAddBillLayout from "./components/ExportSeaFolderDetails/ExportAirMasterBill/Layout/ExportAirMasterAddBillLayout.jsx";
import ExportAirAddFreightInvoiceLayout from "./components/ExportSeaFolderDetails/FreightInvoiceList/Layout/ExportAirAddFreightInvoiceLayout.jsx";
import ArrivalNoticeListLayout from "./components/ExportSeaFolderDetails/ArrivalNoticeList/Layout/ArrivalNoticeListLayout.jsx";
import AddArrivalNoticeLayout from "./components/ExportSeaFolderDetails/ArrivalNoticeList/Layout/AddArrivalNoticeLayout.jsx";
import ForwardLetterListLayout from "./components/ExportSeaFolderDetails/ForwardLetterList/Layout/ForwardLetterListLayout.jsx";
import AddForwardLetterLayout from "./components/ExportSeaFolderDetails/ForwardLetterList/Layout/AddForwardLetterLayout.jsx";



const Layout = ({ children }) => {
  return (
    <div>
      <MindBlowingNavbar />
      {children}
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes with navbar */}
        <Route
          path="/"
          element={
            <Layout>
              {/* <BookingImportGlassForm /> */}
              <Dashboard></Dashboard>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-booking"
          element={
            <Layout>
              <BookingImportGlassForm />
              {/* <BookingForm /> */}
            </Layout>
          }
        />
        <Route
          path="/export-sea/booking"
          element={
            <Layout>
              <BookingExportLayout></BookingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/shipping-order"
          element={
            <Layout>
              <ShippingExportLayout></ShippingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-shipping-order"
          element={
            <Layout>
              <ShippingEXportAddShippingOrder></ShippingEXportAddShippingOrder>
            </Layout>
          }
        />
        <Route
          path="/export-sea/cargo-receive"
          element={
            <Layout>
              <CargoExportLayout></CargoExportLayout>
            </Layout>
          }
        />


        <Route
          path="/export-sea/add-cargo-receive"
          element={
            <Layout>
              <CargoEXportAddCargo></CargoEXportAddCargo>
            </Layout>
          }
        />
        <Route
          path="/export-sea/stuffing-plan"
          element={
            <Layout>
              <StuffingExportLayout></StuffingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-stuffing-plan"
          element={
            <Layout>
              <AddStuffingPlanFromLayout></AddStuffingPlanFromLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/stuffing-package"
          element={
            <Layout>
              <StuffingPackageLayout></StuffingPackageLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-stuffing-package"
          element={
            <Layout>
              <AddStuffingPackageLayout></AddStuffingPackageLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/shipment-advice"
          element={
            <Layout>
              <ExportSeaShipmentAdviceLayout></ExportSeaShipmentAdviceLayout>
            </Layout>
          }
        />

        <Route
          path="/export-sea/add-shipment-advice"
          element={
            <Layout>
              <ShipmentAdviceFormLayout></ShipmentAdviceFormLayout>
            </Layout>
          }
        />

        <Route
          path="/export-sea/hbl"
          element={
            <Layout>
              <BillOfLadingExportLayout></BillOfLadingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-hbl"
          element={
            <Layout>
              <BillOfLadingExportFrom></BillOfLadingExportFrom>
            </Layout>
          }
        />
        <Route
          path="/export-sea/mbl"
          element={
            <Layout>
              <LegMasterBillListLayout></LegMasterBillListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-mbl"
          element={
            <Layout>
              <AddFirstLegMasterBillLayout></AddFirstLegMasterBillLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-freight-invoice"
          element={
            <Layout>
              <AddFreightInvoiceLayout></AddFreightInvoiceLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-freight-invoice"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/report/profit-loss"
          element={
            <Layout>
              <PLExpSea></PLExpSea>
            </Layout>
          }
        />
        <Route
          path="/export-sea/report/volume"
          element={
            <Layout>
              <VolumeStatementExpSea></VolumeStatementExpSea>
            </Layout>
          }
        />

        {/* export Air */}
        <Route
          path="/export-air/booking"
          element={
            <Layout>
              <ExportSeaBookingLayout></ExportSeaBookingLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-booking"
          element={
            <Layout>
              <ExportSeaAddBooking></ExportSeaAddBooking>
            </Layout>
          }
        />
        <Route
          path="/export-air/shipping-order"
          element={
            <Layout>
              <ShippingExportAirLayout></ShippingExportAirLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-shipping-order"
          element={
            <Layout>
              <ShippingEXportAirAddShippingOrder></ShippingEXportAirAddShippingOrder>
            </Layout>
          }
        />

        <Route
          path="/export-air/cargo-receive"
          element={
            <Layout>
              <ExportAirCargoLayout></ExportAirCargoLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-cargo-receive"
          element={
            <Layout>
              <ExportAirCargoAddLayout></ExportAirCargoAddLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/mawb"
          element={
            <Layout>
              <ExportAirMasterListLayout></ExportAirMasterListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-mawb"
          element={
            <Layout>
              <ExportAirMasterAddBillLayout></ExportAirMasterAddBillLayout>
            </Layout>
          }
        />

        <Route
          path="/export-air/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />

        

        <Route
          path="/export-air/add-freight-invoice"
          element={
            <Layout>
              <ExportAirAddFreightInvoiceLayout></ExportAirAddFreightInvoiceLayout>
            </Layout>
          }
        />
         <Route
          path="/export-air/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />

        <Route
          path="/export-air/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
         <Route
          path="/export-air/report/profit-loss"
          element={
            <Layout>
              <PLExpSea></PLExpSea>
            </Layout>
          }
        />
        <Route
          path="/export-air/report/volume"
          element={
            <Layout>
              <VolumeStatementExpSea></VolumeStatementExpSea>
            </Layout>
          }
        />

        {/* import Sea */}

          <Route
          path="/import-sea/booking"
          element={
            <Layout>
              <ExportSeaBookingLayout></ExportSeaBookingLayout>
            </Layout>
          }
        />
         <Route
          path="/import-sea/add-booking"
          element={
            <Layout>
              <BookingImportGlassForm />
              {/* <BookingForm /> */}
            </Layout>
          }
        />
          <Route
          path="/import-sea/master-bl"
          element={
            <Layout>
              <LegMasterBillListLayout></LegMasterBillListLayout>
            </Layout>
          }
        />
         <Route
          path="/import-sea/add-master-bl"
          element={
            <Layout>
              <AddFirstLegMasterBillLayout></AddFirstLegMasterBillLayout>
            </Layout>
          }
        />
         <Route
          path="/import-sea/arrival-notice"
          element={
            <Layout>
              <ArrivalNoticeListLayout></ArrivalNoticeListLayout>
            </Layout>
          }
        />
         <Route
          path="/import-sea/add-arrival-notice"
          element={
            <Layout>
              <AddArrivalNoticeLayout></AddArrivalNoticeLayout>
            </Layout>
          }
        />
         <Route
          path="/import-sea/forward-letter"
          element={
            <Layout>
              <ForwardLetterListLayout></ForwardLetterListLayout>
            </Layout>
          }
        />
         <Route
          path="/import-sea/add-forward-letter"
          element={
            <Layout>
              <AddForwardLetterLayout></AddForwardLetterLayout>
            </Layout>
          }
        />




         <Route
          path="/import-sea/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />




         <Route
          path="/import-sea/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />

        

        <Route
          path="/import-sea/add-freight-invoice"
          element={
            <Layout>
              <ExportAirAddFreightInvoiceLayout></ExportAirAddFreightInvoiceLayout>
            </Layout>
          }
        />
         <Route
          path="/import-sea/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />

        <Route
          path="/import-sea/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/report/profit-loss"
          element={
            <Layout>
              <PLExpSea></PLExpSea>
            </Layout>
          }
        />
        <Route
          path="/import-sea/report/volume"
          element={
            <Layout>
              <VolumeStatementExpSea></VolumeStatementExpSea>
            </Layout>
          }
        />


        {/* import air */}

         <Route
          path="/import-air/booking"
          element={
            <Layout>
              <ExportSeaBookingLayout></ExportSeaBookingLayout>
            </Layout>
          }
        />
         <Route
          path="/import-air/add-booking"
          element={
            <Layout>
              <BookingImportGlassForm />
              {/* <BookingForm /> */}
            </Layout>
          }
        />
          <Route
          path="/import-air/master-bl"
          element={
            <Layout>
              <LegMasterBillListLayout></LegMasterBillListLayout>
            </Layout>
          }
        />
         <Route
          path="/import-air/add-master-bl"
          element={
            <Layout>
              <AddFirstLegMasterBillLayout></AddFirstLegMasterBillLayout>
            </Layout>
          }
        />
         <Route
          path="/import-air/arrival-notice"
          element={
            <Layout>
              <ArrivalNoticeListLayout></ArrivalNoticeListLayout>
            </Layout>
          }
        />
         <Route
          path="/import-air/add-arrival-notice"
          element={
            <Layout>
              <AddArrivalNoticeLayout></AddArrivalNoticeLayout>
            </Layout>
          }
        />
         <Route
          path="/import-air/forward-letter"
          element={
            <Layout>
              <ForwardLetterListLayout></ForwardLetterListLayout>
            </Layout>
          }
        />
         <Route
          path="/import-air/add-forward-letter"
          element={
            <Layout>
              <AddForwardLetterLayout></AddForwardLetterLayout>
            </Layout>
          }
        />




         <Route
          path="/import-air/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />




         <Route
          path="/import-air/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />

        

        <Route
          path="/import-air/add-freight-invoice"
          element={
            <Layout>
              <ExportAirAddFreightInvoiceLayout></ExportAirAddFreightInvoiceLayout>
            </Layout>
          }
        />
         <Route
          path="/import-air/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />

        <Route
          path="/import-air/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/report/profit-loss"
          element={
            <Layout>
              <PLExpSea></PLExpSea>
            </Layout>
          }
        />
        <Route
          path="/import-air/report/volume"
          element={
            <Layout>
              <VolumeStatementExpSea></VolumeStatementExpSea>
            </Layout>
          }
        />




        <Route
          path="/dashboard"
          element={
            <Layout>
              <App />
            </Layout>
          }
        />

        {/* Route without navbar (login page) */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);